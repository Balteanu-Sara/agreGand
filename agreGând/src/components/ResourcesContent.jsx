import pressone from "../assets/images/pressone.jpg";
import context from "../assets/images/context.jpg";
import hotnews from "../assets/images/hotnews.webp";
import snoop from "../assets/images/snoop.png";
import declic from "../assets/images/declic.png";
import recorder from "../assets/images/recorder.jpg";

function Resource({ image, title, link, description }) {
  return (
    <div className="resource">
      <div className="image-wrapper">
        <img src={image} alt={title} />
      </div>
      <div className="text">
        <h2>
          <a href={link} target="_blank">
            {title}
          </a>
        </h2>
        <cite className="description">{description}</cite>
      </div>
    </div>
  );
}

export default function ResourcesContent() {
  return (
    <div className="resources-content">
      <Resource
        image={pressone}
        title="PressOne"
        link="https://pressone.ro/despre-noi"
        description="PressOne și-a propus încă de la început să extragă din realitatea românească subiecte relevante, care nu există pe agenda publică. În plus, dorește să ofere adâncime și context actualității, precum și să prezinte oameni ale căror povești de viață ne inspiră."
      />
      <Resource
        image={context}
        title="Context"
        link="https://context.ro/despre-noi"
        description=",,Documentăm în mod independent activitatea instituțiilor publice, companiilor și entităților responsabile din societate, inclusiv comportamentul reprezentanților oficiali de la toate nivelurile administrative și guvernamentale. Suntem preocupați ca instituțiile și actorii societății noastre să fie supuși unui control civil real.'' "
      />
      <Resource
        image={hotnews}
        title="HotNews"
        link="https://hotnews.ro/redactie"
        description="HotNews este una dintre cele mai vechi surse de știri din România, cunoscută pentru actualizările rapide și acoperirea amplă a subiectelor politice, economice și sociale. Se bazează pe principii precum informarea corectă și verificată, separarea clară dintre știre și opinie, respectarea interesului public și independența față de partide politice."
      />
      <Resource
        image={snoop}
        title="Snoop"
        link="https://snoop.ro/cine-suntem/"
        description=",,Snoop va munci să apere interesul public, în sensul de a descoperi și expune infracțiuni sau abuzuri împotriva sănătății publice, drepturilor și libertăților cetățeanului. Vom scrie despre cazuri care să prevină ca publicul să fie înșelat sau nedreptățit de acțiuni ale statului, indivizilor sau organizațiilor, indiferent cât de puternice sunt acestea.'' "
      />
      <Resource
        image={declic}
        title="Declic"
        link="https://www.declic.ro/despre-noi"
        description=",,Suntem o echipă mică la Declic, dar facem lucruri minunate cu resurse puține. Îi ajutăm pe cei care vor să se implice prin inițierea unei petiții proprii sau reacționăm cu rapiditate atunci când sunt chestiuni arzătoare care cer implicarea unei comunități mari de cetățeni vigilenți.''"
      />
      <Resource
        image={recorder}
        title="Recorder"
        link="https://recorder.ro/cine-suntem"
        description="Recorder a pornit la drum cu o echipă formată din numai patru oameni și și-a propus să mărească redacția doar dacă aceasta va putea fi susținută din surse sută la sută transparente. În ultimii șapte ani, materialele noastre au convins zeci de mii de oameni să doneze pentru jurnalism și ne-au redat încrederea în forța și importanța acestei meserii."
      />
    </div>
  );
}
