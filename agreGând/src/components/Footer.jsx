import { Facebook, Twitter, Instagram } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

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
      <h1>Abonează-te la noutățile noastre</h1>
      <div className="user-input">
        <label htmlFor="subscribe">Introdu adresa ta de email:</label>
        <input
          type="text"
          name="subscribe"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleClick}>
          <span>Abonează-te</span>
        </button>
        {message && <p>{message}</p>}
      </div>
      <div className="logos">
        <Facebook />
        <Twitter />
        <Instagram />
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
