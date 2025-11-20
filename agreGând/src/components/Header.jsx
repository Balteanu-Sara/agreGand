import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "../context/DataProvider.jsx";
import { Menu, Search, X, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

function Logo({ onClick }) {
  return (
    <svg
      onClick={onClick}
      preserveAspectRatio="xMidYMid meet"
      data-bbox="18.4 18.4 163.1 163.1"
      viewBox="18.4 18.4 163.1 163.1"
      className="logo"
      xmlns="http://www.w3.org/2000/svg"
      data-type="color"
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "#comp-jjpbctju svg [data-color=\"1\"] {{fill: '#FFFFFF'}}\n        ",
          }}
        />
      </defs>
      <g>
        <path
          d="M181.2 92.5l-.1-.8h-13.8v-.1H35.9c3.3-25.4 21.7-46.7 46.3-53.8-2.3 3.6-4.4 7.9-6.2 13-2.3 6.5-4.1 14-5.4 22.3l-.1 1h17l.1-.7c1.1-6.3 2.5-12 4.2-17 3.9-11 7.9-13.6 8.5-13.6.6 0 4.6 2.5 8.5 13.6 1.8 4.9 3.2 10.6 4.2 17l.1.7h17l-.1-1c-1.2-8.3-3.1-15.8-5.4-22.3-1.8-5-3.8-9.2-6-12.8 17.8 5.4 32.7 18.5 40.4 35.6l.2.5h18l-.4-1.2c-11.5-32.6-42.4-54.5-76.9-54.5C55 18.4 18.4 55 18.4 99.9c0 2.6.1 5.2.4 7.8l.1.8H131l.8-.1h32.3c-3.3 25.1-21.4 46.3-45.5 53.5 2.3-3.5 4.4-7.9 6.2-13 2.3-6.6 4.2-14.3 5.4-22.7l.1-1h-17l-.1.7c-1.1 6.5-2.5 12.3-4.3 17.4-3.9 11-7.9 13.6-8.5 13.6-.6 0-4.6-2.5-8.5-13.6-1.8-5-3.2-10.9-4.3-17.4l-.1-.7h-17l.1 1c1.3 8.5 3.1 16.1 5.4 22.7 1.8 5.2 4 9.6 6.3 13.2-18.4-5.3-33.9-18.7-41.6-36.4l-.2-.5h-18l.4 1.2c11.3 32.9 42.3 55.1 77.1 55.1 44.9 0 81.5-36.6 81.5-81.5 0-2.5-.1-5-.3-7.5z"
          fill="#FFFFFF"
          data-color={1}
        />
      </g>
    </svg>
  );
}

function SearchButton({ onClick }) {
  return (
    <>
      <svg
        data-bbox="33 33 133.358 133.358"
        viewBox="0 0 200 200"
        className="search"
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg"
        data-type="shape"
      >
        <g>
          <path
            d="M54.758 119.575c-8.658-8.658-13.425-20.167-13.425-32.408 0-12.234 4.767-23.742 13.425-32.4 8.659-8.659 20.167-13.434 32.409-13.434 12.241 0 23.75 4.775 32.408 13.434C128.233 63.425 133 74.933 133 87.167c0 12.241-4.767 23.75-13.425 32.408C110.917 128.233 99.408 133 87.167 133c-12.242 0-23.75-4.767-32.409-13.425Zm111.6 40.892-38.083-38.092c8.425-9.808 13.058-22.133 13.058-35.208 0-14.467-5.633-28.067-15.866-38.292C115.242 38.642 101.633 33 87.167 33 72.7 33 59.1 38.642 48.867 48.875 38.633 59.1 33 72.7 33 87.167c0 14.475 5.633 28.066 15.867 38.3C59.1 135.7 72.7 141.333 87.167 141.333c13.075 0 25.4-4.633 35.216-13.066l38.084 38.091 5.891-5.891Z"
            fill="#FFFFFF"
            fillRule="evenodd"
          ></path>
        </g>
      </svg>
    </>
  );
}

function SearchArea({ onClick }) {
  const navigate = useNavigate();
  const { articles } = useContext(DataContext);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [filteredArticles, setFilteredArticles] = useState([...articles]);
  const [query, setQuery] = useState("");

  const width = window.innerWidth;

  useEffect(() => {
    console.log(query);
    if (query === "") {
      console.log("e gol");
      setFilteredArticles([...articles]);
      setLoadingFilter(false);
      return;
    }
    console.log("caut");
    setLoadingFilter(true);
    const timeout = setTimeout(() => {
      const results = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.source.toLowerCase().includes(query.toLowerCase()) ||
          article.categories.some((category) =>
            category.toLowerCase().includes(query.toLowerCase())
          )
      );
      setFilteredArticles([...results]);
      console.log("am gasit rezultate: ", results);
      setLoadingFilter(false);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [query, articles]);

  return (
    <div className="search-area">
      <div className="search-container">
        <div className="left-side">
          <Search />
          <input
            type="text"
            placeholder="Caută..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div onClick={onClick} className="right-side">
          Închide
        </div>
      </div>
      <div className="results-area">
        <p>Rezultate</p>
        {loadingFilter && <div className="loading">Se încarcă...</div>}
        {!loadingFilter && !filteredArticles.length && query && (
          <div className="results-not-found">
            Nu s-au găsit rezultate pentru: {query}
          </div>
        )}
        {!loadingFilter && (
          <div className="results-found">
            <div className="actual-results">
              {filteredArticles.slice(0, 3).map((article) => {
                return (
                  <div className="result" key={article.link}>
                    <div className="image-wrapper">
                      <img src={article.image} alt="poza" />
                    </div>
                    <div className="text">
                      <div className="title">
                        {article.title.slice(0, 40) + "..."}
                      </div>
                      <div className="description">
                        {article.description.slice(0, 55) + "..."}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => {
                onClick();
                navigate(`/search/${query}`);
              }}
            >
              <span>Vezi toate rezultatele</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function NavBar({ onClick, show }) {
  const currentUrl = window.location.href;

  return (
    <div className={"navigation-area " + show}>
      <ul>
        <li>
          <Link
            to="/"
            className={
              "menu-element" + (currentUrl.endsWith("/") ? " selected" : "")
            }
            onClick={onClick}
          >
            Acasă
          </Link>
        </li>
        <li>
          <Link
            to="/news"
            className={
              "menu-element" + (currentUrl.includes("news") ? " selected" : "")
            }
          >
            Știri
          </Link>
        </li>
        <li>
          <Link
            to="/resources"
            className={
              "menu-element" +
              (currentUrl.includes("resources") ? " selected" : "")
            }
          >
            Resurse
          </Link>
        </li>
        <li>
          <Link
            to="/about-us"
            className={
              "menu-element" +
              (currentUrl.includes("about-us") ? " selected" : "")
            }
          >
            Despre noi
          </Link>
        </li>
      </ul>

      <X onClick={onClick} className="close-button" />
    </div>
  );
}

function NavBarOptions() {
  const currentUrl = window.location.href;

  return (
    <ul>
      <li>
        <Link
          to="/"
          className={
            "menu-option" + (currentUrl.endsWith("/") ? " selected" : "")
          }
        >
          Acasă
        </Link>
      </li>
      <li>
        <Link
          to="/news"
          className={
            "menu-option" + (currentUrl.includes("news") ? " selected" : "")
          }
        >
          Știri
        </Link>
      </li>
      <li>
        <Link
          to="/resources"
          className={
            "menu-option" +
            (currentUrl.includes("resources") ? " selected" : "")
          }
        >
          Resurse
        </Link>
      </li>
      <li>
        <Link
          to="/about-us"
          className={
            "menu-option" + (currentUrl.includes("about-us") ? " selected" : "")
          }
        >
          Despre noi
        </Link>
      </li>
    </ul>
  );
}

function Logos() {
  return (
    <div className="logos">
      <a href="">
        <Facebook />
      </a>
      <a href="">
        <Twitter />
      </a>
      <a href="">
        <Instagram />
      </a>
    </div>
  );
}

export default function Header() {
  const navigate = useNavigate();
  const [toggleSearch, setToggleSearch] = useState(false);
  const [toggleNavBar, setToggleNavBar] = useState(false);
  const [show, setShow] = useState("");

  const width = window.innerWidth;

  useEffect(() => {
    if (toggleSearch) {
      document.body.classList.add("block-screen");
    } else document.body.classList.remove("block-screen");
  }, [toggleSearch]);

  useEffect(() => {
    if (toggleNavBar) {
      setShow("show");
      return;
    }
    if (!toggleNavBar && show === "show") {
      setShow("close");
      const timeout = setTimeout(() => {
        setShow("");
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [toggleNavBar]);

  function goHome() {
    navigate("/");
  }

  function toggleSearchView() {
    setToggleSearch(!toggleSearch);
  }

  function toggleNavBarView() {
    setToggleNavBar(!toggleNavBar);
  }

  return (
    <div className="header">
      {toggleSearch && (
        <>
          <div className="backdrop"></div>
          <SearchArea onClick={toggleSearchView} />
        </>
      )}
      {width < 1024 && (
        <>
          <div className="left-side">
            <Logo onClick={goHome} />
            <SearchButton onClick={toggleSearchView} />
          </div>
          <div className="right-side">
            <Menu onClick={toggleNavBarView} className="nav-button" />
          </div>
          <NavBar onClick={toggleNavBarView} show={show} />
        </>
      )}
      {width >= 1024 && (
        <>
          <div className="left-side">
            <div>
              <Logo onClick={goHome} />
            </div>
            <NavBarOptions />
          </div>
          <div className="right-side">
            <SearchButton onClick={toggleSearchView} />
            <Logos />
          </div>
        </>
      )}
    </div>
  );
}
