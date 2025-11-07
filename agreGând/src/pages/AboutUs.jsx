import "../assets/styles/main.scss";
import banner from "../assets/images/aboutus_banner.jpg";
import { Header, Banner, AboutUsContent, Footer } from "../components/index";

export default function AboutUs() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <Banner image={banner} text="Despre noi" slider={false} />
      <AboutUsContent />
      <Footer />
    </div>
  );
}
