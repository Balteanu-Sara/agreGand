const newsSources = {
  hotnews: {
    name: "HotNews",
    feedUrl: "https://hotnews.ro/feed",
  },
  snoop: {
    name: "Snoop",
    feedUrl: "https://snoop.ro/feed",
  },
  declic: {
    name: "Declic",
    feedUrl: "https://www.declic.ro/feed",
  },
  pressone: {
    name: "PressOne",
    feedUrl: "https://pressone.ro/api/rss",
  },
  recorder: {
    name: "Recorder",
    feedUrl: "https://recorder.ro/feed",
  },
};

function parseRSSFeed(sourceName, feedUrl) {
  const parser = new DOMParser();
  const xmlContent = parser.parseFromString(feedUrl, "text/xml");

  const isAtom = xmlContent.querySelector("feed") !== null;
  const items = isAtom
    ? xmlContent.querySelectorAll("entry")
    : xmlContent.querySelectorAll("item");

  const articles = [];
  items.forEach((item) => {
    try {
      const title = getTextContent(item, "title");
      const link = isAtom
        ? item.querySelector("link").getAttribute("href")
        : item.getTextContent(item, "link");

      const description = extractDescription(item, isAtom);
      const image = extractImage(item, isAtom);
      const category = extractCategory(item, isAtom);
      const publishDate = extractDate(item, isAtom);

      if (title && link && description) {
        articles.push({
          title: title,
          link: link,
          description: description,
          image: image || null,
          category: category || null,
          publishDate: publishDate || null,
        });
      }
    } catch (error) {
      console.error(`Error parsing information from ${sourceName}:`, error);
    }
  });

  return articles;
}

function extractDescription(item, isAtom) {}

function extractImage(item, isAtom) {}

function extractCategory(item, isAtom) {}

function extractDate(item, isAtom) {}
