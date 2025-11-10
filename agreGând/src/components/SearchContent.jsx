import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/DataProvider";

export default function SearchContent() {
  const navigate = useNavigate();
  const { query } = useParams();
  const { articles } = useContext(DataContext);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [filteredArticles, setFilteredArticles] = useState([...articles]);
  const [inputValue, setInputValue] = useState(query || "");

  useEffect(() => {
    if (query && inputValue !== query) {
      navigate("/search", { replace: true });
      console.log("inainte sa fie diferit: ", query, inputValue);
    }
  }, [inputValue]);

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div> Asta e inputul: {inputValue}</div>
    </>
  );
}
