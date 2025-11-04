import "../assets/styles/main.scss";
import banner from "../assets/images/home_banner.jpg";
import { useData } from "../services/useData";
import { Header, Banner, HomeContent, Footer } from "../components/index";

function Home() {
  const { articles, loading, error } = useData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

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
