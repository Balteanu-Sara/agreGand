import { useState, useContext, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { DataContext } from "../context/DataProvider";
import { useNavigate, useParams } from "react-router-dom";

function NewsArticle({
  image,
  title,
  link,
  description,
  categories,
  all = false,
}) {
  return (
    <div className={all ? "news-article all" : "news-article"}>
      <div className={all ? "image-wrapper all" : "image-wrapper"}>
        <img src={image} alt={title} />
      </div>
      <div className="text">
        <h1>
          <a href={link} target="_blank">
            {title}
          </a>
        </h1>
        <div className="description">{description}</div>
        <hr />
        <div className="categories">
          {categories.slice(0, 3).map((cat, index) => (
            <p key={cat + index}>{cat}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

function OptionsArea({ options, selected, onClick = false }) {
  const navigate = useNavigate();
  const selectedOption = selected ? selected : "Toate Postările";
  const width = window.innerWidth;

  function changeOption(option) {
    if (option === "Toate Postările") navigate("/news");
    else navigate(`/news/${option}`);
  }

  return (
    <div className={!selected ? "options-section all" : "options-section"}>
      <div className="actual-options">
        {options.map((option, index) => (
          <div
            onClick={() => changeOption(option)}
            key={option + index}
            className={option === selectedOption ? "selected" : "not-selected"}
          >
            {option}
          </div>
        ))}
      </div>
      {width < 1024 && (
        <>
          <hr />
          <div onClick={onClick} className="close-options">
            <X />
            <div>Închide</div>
          </div>{" "}
        </>
      )}
    </div>
  );
}

export default function NewsContent() {
  const { source } = useParams();
  const [toggleOptions, setToggleOptions] = useState(false);
  const { articles } = useContext(DataContext);
  const [show, setShow] = useState(5);

  useEffect(() => {
    if (toggleOptions) {
      document.body.classList.add("block-screen");
    } else document.body.classList.remove("block-screen");
  }, [toggleOptions]);

  useEffect(() => {
    setShow(5);
    setToggleOptions(false);
  }, [source]);

  const width = window.innerWidth;

  const options = [
    "Toate Postările",
    "PressOne",
    "Context",
    "Snoop",
    "HotNews",
    "Declic",
    "Recorder",
  ];

  const selectedIndex = source ? options.indexOf(source) : 0;

  const filteredArticles =
    selectedIndex === 0
      ? [...articles]
      : articles.filter((article) => article.source === options[selectedIndex]);

  function changeShownArticles() {
    setShow((prev) => prev + 5);
  }

  function toggleOptionsView() {
    setToggleOptions((prev) => !prev);
  }

  return (
    <div className="news-content">
      {width < 1024 && (
        <div className="fake-button">
          <button onClick={toggleOptionsView}>
            <span>{options[selectedIndex]}</span>
            <ChevronDown />
          </button>
        </div>
      )}
      {toggleOptions && (
        <>
          <OptionsArea
            options={options}
            selected={source}
            onClick={toggleOptionsView}
          />
          <div className="overlay"></div>
        </>
      )}
      {width >= 1024 && <OptionsArea options={options} selected={source} />}
      <div className={!source ? "actual-content all" : "actual-content"}>
        {filteredArticles.length < show
          ? filteredArticles.map((article) => (
              <NewsArticle
                key={article.link}
                image={article.image}
                title={article.title}
                link={article.link}
                description={article.description}
                categories={[...article.categories]}
                all={source ? false : true}
              />
            ))
          : filteredArticles
              .map((article) => (
                <NewsArticle
                  key={article.link}
                  image={article.image}
                  title={article.title}
                  link={article.link}
                  description={article.description}
                  categories={[...article.categories]}
                  all={source ? false : true}
                />
              ))
              .slice(0, show)}
      </div>
      {filteredArticles.slice(0, show).length !== filteredArticles.length && (
        <button onClick={changeShownArticles} className="show-button">
          Arată mai mult
        </button>
      )}
    </div>
  );
}
