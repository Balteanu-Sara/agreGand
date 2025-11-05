import "../assets/styles/main.scss";
import { Header, Banner, NewsContent, Footer } from "../components/index";

export default function News() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <Banner text={"Toate Știrile"} slider={false} />
      <NewsContent />
      <Footer />
    </div>
  );
}
