import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/DataProvider";
import {
  Search,
  X,
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function SearchContent() {
  const navigate = useNavigate();
  const { query } = useParams();
  const { articles } = useContext(DataContext);

  const [loading, setLoading] = useState(false);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [lastInput, setLastInput] = useState(query || "");
  const [currentIndexes, setCurrentIndexes] = useState({ start: 0, end: 9 });

  const width = window.innerWidth;

  useEffect(() => setLastInput(query || ""), [query]);

  useEffect(() => {
    setCurrentIndexes({ start: 0, end: 9 });
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
      <div className="title">Rezultatele căutării</div>
      <div className="content">
        <div className="search-area">
          <Search />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleEnter}
            placeholder="Caută..."
          />
          <X
            onClick={() => {
              setInputValue("");
            }}
          />
        </div>
        <div className="results">
          {loading && <div className="overlay"></div>}
          <div className="results-area">
            {!loading && lastInput && filteredArticles.length === 0 && (
              <>
                <p>0 rezultate pentru "{lastInput}"</p>
                <div>Nu au fost găsite rezultate!</div>
              </>
            )}
            {filteredArticles.length !== 0 && (
              <>
                <p>
                  {filteredArticles.length} rezultate pentru "{lastInput}"
                </p>
                <div>
                  {filteredArticles
                    .filter((article, index) => {
                      if (
                        index >= currentIndexes.start &&
                        index <= currentIndexes.end
                      )
                        return article;
                    })
                    .map((article) => (
                      <div key={article.link} className="result">
                        <div className="image-wrapper">
                          <img src={article.image} alt="poza" />
                        </div>
                        <div className="text">
                          <a href={article.link} target="_blank">
                            {width >= 1024
                              ? article.title.slice(0, 100) + "..."
                              : article.title.slice(0, 80) + "..."}
                          </a>
                          <p>
                            {width >= 1024
                              ? article.description.slice(0, 200) + "..."
                              : article.description.slice(0, 50) + "..."}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
            {filteredArticles.length > 10 && (
              <div className="manage-results">
                {filteredArticles.length > 20 && (
                  <ChevronsLeft
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setCurrentIndexes({ start: 0, end: 9 });
                    }}
                  />
                )}
                <ChevronLeft
                  onClick={() => {
                    if (currentIndexes.start > 0) {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setCurrentIndexes({
                        start: currentIndexes.start - 10,
                        end: currentIndexes.start - 1,
                      });
                    }
                  }}
                />
                <p>
                  {Math.floor(currentIndexes.end / 10) + 1}/
                  {Math.floor(filteredArticles.length / 10) +
                    (filteredArticles.length % 10 === 0 ? 0 : 1)}{" "}
                </p>
                <ChevronRight
                  onClick={() => {
                    if (
                      currentIndexes.start <
                      10 * Math.floor(filteredArticles.length / 10)
                    ) {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setCurrentIndexes({
                        start: currentIndexes.start + 10,
                        end:
                          currentIndexes.end + 10 < filteredArticles.length
                            ? currentIndexes.end + 10
                            : filteredArticles.length - 1,
                      });
                    }
                  }}
                />
                {filteredArticles.length > 20 && (
                  <ChevronsRight
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setCurrentIndexes({
                        start:
                          filteredArticles.length % 10 === 0
                            ? 10 *
                              (Math.floor(filteredArticles.length / 10) - 1)
                            : 10 * Math.floor(filteredArticles.length / 10),
                        end: filteredArticles.length - 1,
                      });
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
