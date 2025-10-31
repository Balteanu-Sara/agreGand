import banner from "../assets/images/static_banner.jpg";

export default function Banner() {
  return (
    <div className="banner">
      <div>
        <h1 className="name">agreGând</h1>
        <h3 className="quote">Siguranță în știri și articole </h3>
      </div>

      <img src={banner} alt="poza" />
      <div className="slider">Un chenar miscator</div>
    </div>
  );
}
