import "../assets/styles/main.scss";
import banner from "../assets/images/resurse_banner.jpg";
import { Header, Banner, ResourcesContent, Footer } from "../components/index";

function Resources() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <Banner image={banner} text="Resurse implicate" slider={true} />
      <ResourcesContent />
      <Footer />
    </div>
  );
}

export default Resources;
