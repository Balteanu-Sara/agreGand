import { useState, useContext } from "react";
import { DataContext } from "../context/DataProvider";

function OptionsArea({ onClick, options, index }) {
  return (
    <div className="options-section">
      <div className="actual-options"></div>
    </div>
  );
}

export default function NewsContent() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toggleOptions, setToggleOptions] = useState(false);
  const { articles } = useContext(DataContext);
  const options = [
    "Toate postările",
    "PressOne",
    "Context",
    "Snoop",
    "HotNews",
    "Declic",
    "Recorder",
  ];

  const filteredArticles =
    selectedIndex === 0
      ? articles
      : articles.filter((article) => article.source === options[selectedIndex]);

  function toggleOptionsView() {
    setToggleOptions(!toggleOptions);
  }

  return (
    <div className="news-content">
      <div className="fake-button">
        <button onClick={toggleOptionsView}>
          <span>{options[selectedIndex]}</span>
        </button>
      </div>
      {}
      {selectedIndex === 0 && (
        <OptionsArea
          onClick={toggleOptionsView}
          options={options}
          index={selectedIndex}
        />
      )}
    </div>
  );
}
