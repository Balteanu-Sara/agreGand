import { Facebook, Twitter, Instagram } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const currentUrl = window.location.href;

  function handleClick() {
    if (query.length === 0) {
      setMessage("Adresa de email nu poate fi goală.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(query)) {
      setMessage("Adresa de email nu este validă.");
      return;
    }
    setMessage("Te-ai abonat cu succes!");
    setQuery("");
  }

  return (
    <div className="footer">
      <div className="sides">
        <div className="left-side">
          <h1>Abonează-te la noutățile noastre!</h1>
          <div className="user-input">
            <label htmlFor="subscribe">Introdu adresa ta de email:</label>
            <div>
              <input
                type="text"
                name="subscribe"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button onClick={handleClick}>
              <span>Abonează-te</span>
            </button>
            {message && <p>{message}</p>}
          </div>
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
        </div>
        <div className="right-side">
          <ul>
            <li>
              <Link
                to="/"
                className={
                  "menu-element" + (currentUrl.endsWith("/") ? " selected" : "")
                }
              >
                Acasă
              </Link>
            </li>
            <li>
              <Link
                to="/news"
                className={
                  "menu-element" +
                  (currentUrl.includes("news") ? " selected" : "")
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
        </div>
      </div>
      <p>
        Copyright © {new Date().getFullYear()} <strong>agreGând</strong> -
        Powered and secured by{" "}
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noreferrer"
          className="footer-link"
        >
          Vercel
        </a>
      </p>
    </div>
  );
}
