import { useContext } from "react";
import { DataContext } from "../context/DataProvider.jsx";

export default function HomeContent() {
  const { articles, loading, error } = useContext(DataContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <div className="home-content">
      <h1>De actualitate</h1>
      <ul>
        {articles
          .map((article) => {
            return (
              <li key={article.title + article.link}>
                <h2>
                  <a href={article.link} target="_blank">
                    {article.title}
                  </a>
                </h2>
                <br />
                <p>Descriere: {article.description}</p>
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                )}
                <p>Sursa: {article.source}</p>
                <p>Data publicarii: {article.publishDate}</p>
                {article.categories.length > 0 &&
                  article.categories.map((cat, index) => (
                    <span key={cat + index}>| {cat} | </span>
                  ))}
                <hr />
              </li>
            );
          })
          .slice(0, 5)}
      </ul>
    </div>
  );
}
