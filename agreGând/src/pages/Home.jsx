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

      {/* <h1>agreGând</h1>
      <ul>
        Stiri de actualitate:
        {articles.map((article) => {
          return (
            <li key={article.title + article.link}>
              <h2>
                <a href={article.link} target="_blank">
                  {article.title}
                </a>
              </h2>
              <br />
              <p>Descriere: {article.description}</p>
              {article.image && <img src={article.image} alt={article.title} />}
              <p>Sursa: {article.source}</p>
              <p>Data publicarii: {article.publishDate}</p>
              {article.categories.length > 0 &&
                article.categories.map((cat, index) => (
                  <span key={cat + index}>| {cat} | </span>
                ))}
              <hr />
            </li>
          );
        })}
      </ul> */}
    </div>
  );
}

export default Home;
