import "../assets/styles/main.scss";
import { Header, Banner, SearchContent, Footer } from "../components/index";

export default function SearchResults() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <Banner spliter={false} />
      <SearchContent />
      <Footer />
    </div>
  );
}
