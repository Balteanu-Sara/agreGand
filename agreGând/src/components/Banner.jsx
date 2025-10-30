import banner from "../assets/images/static_banner.jpg";

export default function Banner() {
  return (
    <div className="banner">
      <img
        src={banner}
        alt="poza"
        style={{ maxWidth: "100%", height: "auto", display: "block" }}
      />
      <div className="slider">Un chenar miscator</div>
    </div>
  );
}
