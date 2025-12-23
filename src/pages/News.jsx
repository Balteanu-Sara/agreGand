import "../assets/styles/main.scss";
import { Header, Banner, NewsContent, Footer } from "../components/index";

export default function News() {
  const width = window.innerWidth;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      {width < 1024 ? (
        <Banner text={"Toate Știrile"} slider={false} />
      ) : (
        <Banner text="" slider={false} spliter={false} />
      )}
      <NewsContent />
      <Footer />
    </div>
  );
}
