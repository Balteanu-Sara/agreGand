import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import News from "./pages/News";
import Resources from "./pages/Resources";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:source" element={<News />} />
        <Route path="/resources" elements={<Resources />} />
      </Routes>
    </Router>
  );
}

export default App;
