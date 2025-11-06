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
      <div className="categories">
        {categories.slice(0, 3).map((cat, index) => (
          <p key={cat + index}>{cat}</p>
        ))}
      </div>
      <hr />
    </div>
  );
}

function OptionsArea({ onClick, options }) {
  const navigate = useNavigate();

  function changeOption(option) {
    if (option === "Toate postările") navigate("/news");
    else navigate(`/news/${option}`);
  }

  return (
    <div className="options-section">
      <div className="actual-options">
        {options.map((option, index) => (
          <div onClick={() => changeOption(option)} key={option + index}>
            {option}
          </div>
        ))}
      </div>
      <hr />
      <div onClick={onClick}>
        <X />
        <div>Inchide</div>
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
    "Toate postările",
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

  console.log("filteredArticles length: ");

  return (
    <div className="news-content">
      <div className="fake-button">
        <button onClick={toggleOptionsView}>
          <span>{options[selectedIndex]}</span>
          <ChevronDown />
        </button>
      </div>
      {toggleOptions && (
        <OptionsArea onClick={toggleOptionsView} options={options} />
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
