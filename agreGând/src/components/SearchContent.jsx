import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/DataProvider";

export default function SearchContent() {
  const navigate = useNavigate();
  const { query } = useParams();
  const { articles } = useContext(DataContext);

  const [loading, setLoading] = useState(false);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [lastInput, setLastInput] = useState(query || "");

  useEffect(() => {
    if (!lastInput) {
      setFilteredArticles([...articles]);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(() => {
      const results = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(lastInput.toLowerCase()) ||
          article.source.toLowerCase().includes(lastInput.toLowerCase()) ||
          article.categories.some((category) =>
            category.toLowerCase().includes(lastInput.toLowerCase())
          )
      );
      setFilteredArticles(results);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [lastInput, articles]);

  function handleEnter(e) {
    if (e.key === "Enter") {
      setLastInput(inputValue);
      navigate(`/search/${inputValue}`, { replace: true });
      setInputValue("");
    }
    return;
  }

  return (
    <div className="search-content">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleEnter}
      />
      {loading && <div>Se încarcă...</div>}
      {!loading && lastInput && filteredArticles.length === 0 && (
        <>
          <p>0 rezultate pentru "{lastInput}"</p>
          <div>Nu au fost găsite rezultate!</div>
        </>
      )}
      {!loading && filteredArticles.length !== 0 && (
        <>
          <p>
            {filteredArticles.length} rezultate pentru "{lastInput}"
          </p>
          <div>
            {filteredArticles.map((article) => (
              <p key={article.link}>
                <a href={article.link}>{article.title}</a>
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
