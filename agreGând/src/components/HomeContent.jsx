import { useContext } from "react";
import { DataContext } from "../context/DataProvider.jsx";
import { useNavigate } from "react-router-dom";

function HomeArticle({ image, title, link, categories }) {
  return (
    <div className="home-article">
      <div className="image-wrapper">
        <img src={image} alt={title} />
      </div>
      <h1>
        <a href={link} target="_blank">
          {title.slice(0, 100) + "..."}
        </a>
      </h1>
      <hr />
      <div className="categories">
        {categories.slice(0, 3).map((cat, index) => (
          <p key={cat + index}>{cat}</p>
        ))}
      </div>
    </div>
  );
}

function HomeSection({ source }) {
  const navigate = useNavigate();
  const { articles } = useContext(DataContext);
  const filteredArticles = articles
    .filter((article) => article.source === source)
    .slice(0, 3);

  function goNews() {
    navigate(`/news/${source.toLowerCase()}`);
  }

  return (
    <div className="content-section">
      <h2>{source}</h2>
      <div className="content-section-articles">
        {filteredArticles.map((article) => {
          return (
            <HomeArticle
              key={article.link}
              image={article.image}
              title={article.title}
              link={article.link}
              categories={[...article.categories]}
            />
          );
        })}
      </div>
      <button onClick={goNews}>Vezi mai multe de la {source}</button>
    </div>
  );
}

export default function HomeContent() {
  const { loading, error } = useContext(DataContext);

  if (loading) return <div className="other-content">Se încarcă...</div>;
  if (error)
    return <div className="other-content">Eroare : {error.message}</div>;

  return (
    <div className="home-content">
      <HomeSection source="PressOne" />
      <HomeSection source="Context" />
      <HomeSection source="Snoop" />
      <HomeSection source="HotNews" />
      <HomeSection source="Declic" />
      <HomeSection source="Recorder" />
    </div>
  );
}
