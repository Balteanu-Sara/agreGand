import "../assets/styles/main.scss";
import banner from "../assets/images/home_banner.jpg";
import { Header, Banner, HomeContent, Footer } from "../components/index";

function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <Banner image={banner} text="Cele mai actuale:" slider={true} />
      <HomeContent />
      <Footer />
    </div>
  );
}

export default Home;
