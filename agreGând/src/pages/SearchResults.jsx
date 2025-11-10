import "../assets/styles/main.scss";
import { Header, SearchContent, Footer } from "../components/index";

export default function SearchResults() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <SearchContent />
      <Footer />
    </div>
  );
}
