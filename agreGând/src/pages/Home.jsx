import "../assets/styles/main.scss";
import { useData } from "../services/useData";
import { Header, Banner, Content, Footer } from "../components/index";

function Home() {
  const { articles, loading, error } = useData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <div className="container">
      <Header />
      <Banner />
      <Content />
      <Footer />
    </div>
  );
}

export default Home;
