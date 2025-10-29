import { useState, useEffect } from "react";
import { parseRSSFeed } from "./extractData.js";

const newsSources = {
  hotnews: { name: "HotNews", feedUrl: "https://hotnews.ro/feed" },
  snoop: { name: "Snoop", feedUrl: "https://snoop.ro/feed" },
  declic: { name: "Declic", feedUrl: "https://www.declic.ro/feed" },
  pressone: { name: "PressOne", feedUrl: "https://pressone.ro/feed" },
  recorder: { name: "Recorder", feedUrl: "https://recorder.ro/feed" },
};

export function useData() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const allArticles = [];
      try {
        for (const key in newsSources) {
          const response = await fetch(
            `https://corsproxy.io/?${encodeURIComponent(
              newsSources[key].feedUrl
            )}`
          );

          const feedText = await response.text();
          const sourceArticles = parseRSSFeed(newsSources[key].name, feedText);
          allArticles.push(...sourceArticles);
        }
        setArticles(allArticles);
      } catch (err) {
        setError(err);
        console.error("Error fetching data: ", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { articles, loading, error };
}
