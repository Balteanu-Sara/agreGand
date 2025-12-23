import { DataContext } from "../context/DataProvider.jsx";
import { useState, useEffect, useContext, useRef } from "react";
import { TailSpin } from "react-loader-spinner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner_video from "../assets/images/video.mp4";

function NewsSlider() {
  const { articles, loading } = useContext(DataContext);
  const [slides, setSlides] = useState([{ type: "text" }]);
  const width = window.innerWidth;

  console.log(loading);

  useEffect(() => {
    console.log(loading);
    if (!loading) {
      console.log(slides);

      const timeout = setTimeout(() => {
        setSlides((prev) => prev.slice(1));
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [loading, slides]);

  useEffect(() => {
    const sortedArticles = [...articles].sort((a, b) => {
      const dateA = a.publishDate ? new Date(a.publishDate) : new Date(0);
      const dateB = b.publishDate ? new Date(b.publishDate) : new Date(0);
      return dateB - dateA;
    });
    setSlides((prev) => [...prev, sortedArticles]);
  }, [articles]);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: "ease",
  };

  if (width > 1024) {
    settings["swipe"] = false;
    settings["touchMove"] = false;
  }

  function truncateTitle(title, maxLength = 70) {
    if (width >= 1300) maxLength = 90;
    if (width >= 1700) maxLength = 110;
    if (width >= 1900) maxLength = 130;
    if (title.length <= maxLength) return title;
    return title.slice(0, maxLength) + "...";
  }

  return (
    <div className="slider">
      <Slider {...settings}>
        {slides.length &&
          slides.map((slide) => {
            if (slide.type === "text") {
              return (
                <div className="simple-text" key={slide.type}>
                  <strong>Cele mai actuale știri</strong>
                </div>
              );
            } else {
              return (
                <a
                  href={slide.link}
                  className="slider-link"
                  target="_blank"
                  key={slide.link}
                >
                  {truncateTitle(slide.title)}
                </a>
              );
            }
          })}
      </Slider>
    </div>
  );
}

export default function Banner({ image, text, slider, spliter = true }) {
  const [recentNews, setRecentNews] = useState([]);
  const { articles, loading } = useContext(DataContext);

  const width = window.innerWidth;
  const currentUrl = window.location.href;

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: "ease",
  };

  if (width > 1024) {
    settings["swipe"] = false;
    settings["touchMove"] = false;
  }

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
    if (width >= 1300) maxLength = 90;
    if (width >= 1700) maxLength = 110;
    if (width >= 1900) maxLength = 130;
    if (title.length <= maxLength) return title;
    return title.slice(0, maxLength) + "...";
  }

  return (
    <div className="banner">
      <div className="titles">
        <h1 className="name">agreGând</h1>
        <h3 className="quote">Siguranță în știri și articole </h3>
      </div>

      {currentUrl.endsWith("/") &&
      !currentUrl.includes("search") &&
      width >= 1024 ? (
        <div className="image-wrapper">
          <video autoPlay loop muted disablePictureInPicture>
            <source src={banner_video} type="video/mp4" />
          </video>
        </div>
      ) : (
        image && (
          <div className="image-wrapper">
            <img src={image} alt="poza" />
          </div>
        )
      )}

      {spliter && (
        <div
          className={width >= 1024 && slider ? "breaker wslider" : "breaker"}
        >
          <div className="simple-text">
            <strong>{text}</strong>
          </div>

          {/* {currentUrl.endsWith("/") && slider && <NewsSlider />} */}
          {slider && loading && (
            <div
              style={{
                fontSize: "16px",
                minHeight: "8vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TailSpin
                color="#ffffff"
                width="50"
                height="50"
                ariaLabel="tail-spin-loading"
              />
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
