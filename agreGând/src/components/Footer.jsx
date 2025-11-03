import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <div className="footer">
      <h1>Abonează-te la noutățile noastre</h1>
      <label htmlFor="subscribe">Introdu adresa ta de email:</label>
      <input type="text" name="subscribe" />
      <button>Abonează-te</button>
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
