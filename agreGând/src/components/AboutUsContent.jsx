import { Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Form() {
  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  const [email, setEmail] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [response, setResponse] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!nume || !prenume || !email || !mesaj) {
      setResponse("Completează toate câmpurile pentru a trimite!");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setResponse("Adresa de email nu este validă.");
      return;
    }
    setResponse("Trimis cu succes!");
    setNume("");
    setPrenume("");
    setEmail("");
    setMesaj("");
  }

  return (
    <form onSubmit={handleSubmit} className="forms">
      <div className="field">
        <label htmlFor="nume">Nume</label>
        <div className="fake-input">
          <input
            type="text"
            name="nume"
            value={nume}
            onChange={(e) => setNume(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="prenume">Prenume</label>
        <div className="fake-input">
          <input
            type="text"
            name="prenume"
            value={prenume}
            onChange={(e) => setPrenume(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <div className="fake-input">
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="mesaj">Mesaj</label>
        <div className="fake-input">
          <input
            type="text"
            name="mesaj"
            value={mesaj}
            onChange={(e) => setMesaj(e.target.value)}
            className="mesaj"
          />
        </div>
      </div>
      <button type="submit">Trimite</button>
      {response && <p>{response}</p>}
    </form>
  );
}

function Contact() {
  return (
    <div className="contact">
      <h1>Contactează-ne pentru mai multe detalii sau colaborări!</h1>
      <div>
        <div className="contact-fields">
          <div className="contact-field">
            <h2>Email:</h2>
            <div
              style={{
                fontSize: "20px",
                fontFamily: "proxima-n-w01-reg, sans-serif",
              }}
            >
              office@agregand.ro
            </div>
          </div>
          <div className="contact-field">
            <h2>Rețele de socializare:</h2>
            <div className="data-contact">
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
        </div>
        <Form />{" "}
      </div>
    </div>
  );
}

function Purpose() {
  return (
    <div className="purpose">
      <h1>Scop</h1>
      <p>
        Platforma <strong>agreGând</strong> are menirea să reprezinte un spațiu
        accesibil și bine structurat, care facilitează distribuirea știrilor și
        articolelor de actualitate, aducând în atenția utilizatorilor subiecte
        relevante și de interes public. Prin filtrarea, organizarea și
        prezentarea conținutului într-o manieră clară și intuitivă, platforma
        ajută utilizatorii să economisească timp și să obțină o imagine de
        ansamblu echilibrată asupra evenimentelor curente, fără a fi copleșiți
        de volumul mare de informație disponibil online.{" "}
      </p>
      <p>
        Au fost selecționate cu vigilență surse de încredere, enumerate și
        descrise{" "}
        <span style={{ fontStyle: "italic" }}>
          <Link to="/resources" className="to-resources">
            aici
          </Link>
        </span>
        , deoarece diversitatea temelor abordate, transparența modului în care
        acestea sunt prezentate și verificarea informațiilor înainte de
        publicare reprezintă puncte esențiale pentru noi. În acest fel,{" "}
        <strong>agreGând</strong> încurajează formarea unei opinii informate,
        critice și independente.
      </p>
    </div>
  );
}

export default function AboutUsContent() {
  return (
    <div className="aboutus-content">
      <Purpose />
      <Contact />
    </div>
  );
}
