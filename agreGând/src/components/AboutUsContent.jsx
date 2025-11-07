import { Facebook, Twitter, Instagram } from "lucide-react";
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
      <label htmlFor="nume">Nume</label>
      <input
        type="text"
        name="nume"
        value={nume}
        onChange={(e) => setNume(e.target.value)}
      />
      <label htmlFor="prenume">Preume</label>
      <input
        type="text"
        name="prenume"
        value={prenume}
        onChange={(e) => setPrenume(e.target.value)}
      />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="mesaj">Mesaj</label>
      <textarea
        name="mesaj"
        value={mesaj}
        onChange={(e) => setMesaj(e.target.value)}
      ></textarea>
      <button type="submit">Trimite</button>
      {response && <p>{response}</p>}
    </form>
  );
}

function Contact() {
  return (
    <div className="contact">
      <h1>Contactează-ne!</h1>
      <h2>Email:</h2>
      <div>office@agregand.ro</div>
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
      <Form />
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
        de volumul mare de informație disponibil online. Au fost selecționate cu
        vigilență surse de încredere, enumerate și descrise <a href="">aici</a>,
        deoarece diversitatea temelor abordate, transparența modului în care
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
