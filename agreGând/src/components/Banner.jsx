import { Turtle } from "lucide-react";
import { DataContext } from "../context/DataProvider.jsx";
import { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Banner({ image, text, slider, spliter = true }) {
  const [recentNews, setRecentNews] = useState([]);
  const { articles, loading } = useContext(DataContext);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: "ease",
  };

  useEffect(() => {
    if (slider === false) return;
    const sortedArticles = [...articles].sort((a, b) => {
      const dateA = a.publishDate ? new Date(a.publishDate) : new Date(0);
      const dateB = b.publishDate ? new Date(b.publishDate) : new Date(0);
      return dateB - dateA;
    });
    setRecentNews(sortedArticles.slice(0, 5));
  }, [articles]);

  function truncateTitle(title, maxLength = 70) {
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
                fontSize: "16px",
                minHeight: "8vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              Se încarcă...
            </div>
          )}
          {slider && recentNews.length > 0 && (
            <div className="slider">
              <Slider {...settings}>
                <a
                  href={recentNews[0]?.link}
                  className="slider-link"
                  target="_blank"
                >
                  {truncateTitle(recentNews[0].title)}
                </a>
                <a
                  href={recentNews[1]?.link}
                  className="slider-link"
                  target="_blank"
                >
                  {truncateTitle(recentNews[1].title)}
                </a>
                <a
                  href={recentNews[2]?.link}
                  className="slider-link"
                  target="_blank"
                >
                  {truncateTitle(recentNews[2].title)}
                </a>
                <a
                  href={recentNews[3]?.link}
                  className="slider-link"
                  target="_blank"
                >
                  {truncateTitle(recentNews[3].title)}
                </a>
                <a
                  href={recentNews[4]?.link}
                  className="slider-link"
                  target="_blank"
                >
                  {truncateTitle(recentNews[4].title)}
                </a>
              </Slider>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
