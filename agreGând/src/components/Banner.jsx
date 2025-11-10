import { DataContext } from "../context/DataProvider.jsx";
import { useState, useEffect, useContext } from "react";

export default function Banner({ image, text, slider, spliter = true }) {
  const [recentNews, setRecentNews] = useState([]);
  const { articles, loading, error } = useContext(DataContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slider === false) return;
    const sortedArticles = [...articles].sort((a, b) => {
      const dateA = a.publishDate ? new Date(a.publishDate) : new Date(0);
      const dateB = b.publishDate ? new Date(b.publishDate) : new Date(0);
      return dateB - dateA;
    });
    setRecentNews(sortedArticles.slice(0, 5));

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(interval);
  }, [articles]);

  function truncateTitle(title, maxLength = 100) {
    if (title.length <= maxLength) return title;
    return title.slice(0, maxLength) + "...";
  }

  return (
    <div className="banner">
      <div className="titles">
        <h1 className="name">agreGând</h1>
        <h3 className="quote">Siguranță în știri și articole </h3>
      </div>

      {image && (
        <div className="image-wrapper">
          <img src={image} alt="poza" />
        </div>
      )}
      {spliter && (
        <div className="breaker">
          <div className="simple-text">
            <strong>{text}</strong>
          </div>
          {slider && loading && (
            <div
              style={{
                textAlign: "center",
                fontSize: "16px",
                minHeight: "8vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Se încarcă...
            </div>
          )}
          {slider && recentNews.length > 0 && (
            <div className="slider">
              <a
                href={recentNews[currentIndex]?.link}
                className="slider-link"
                target="_blank"
              >
                {truncateTitle(recentNews[currentIndex].title)}
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
