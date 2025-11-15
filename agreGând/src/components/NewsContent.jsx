import { useState, useContext, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { DataContext } from "../context/DataProvider";
import { useNavigate, useParams } from "react-router-dom";

function NewsArticle({ image, title, link, description, categories }) {
  return (
    <div className="news-article">
      <div className="image-wrapper">
        <img src={image} alt={title} />
      </div>
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
  );
}

function OptionsArea({ onClick, options, selected }) {
  const navigate = useNavigate();
  const selectedOption = selected ? selected : "Toate Postările";

  function changeOption(option) {
    if (option === "Toate Postările") navigate("/news");
    else navigate(`/news/${option}`);
  }

  return (
    <div className="options-section">
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
      <hr />
      <div onClick={onClick} className="close-options">
        <X />
        <div>Închide</div>
      </div>
    </div>
  );
}

export default function NewsContent() {
  const { source } = useParams();
  const [toggleOptions, setToggleOptions] = useState(false);
  const { articles } = useContext(DataContext);
  const [show, setShow] = useState(5);

  useEffect(() => {
    setShow(5);
    setToggleOptions(false);
  }, [source]);

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
      <div className="fake-button">
        <button onClick={toggleOptionsView}>
          <span>{options[selectedIndex]}</span>
          <ChevronDown />
        </button>
      </div>
      {toggleOptions && (
        <>
          <OptionsArea
            onClick={toggleOptionsView}
            options={options}
            selected={source}
          />
          <div className="overlay"></div>
        </>
      )}
      <div className="actual-content">
        {filteredArticles.length < show
          ? filteredArticles.map((article) => (
              <NewsArticle
                key={article.link}
                image={article.image}
                title={article.title}
                link={article.link}
                description={article.description}
                categories={[...article.categories]}
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
