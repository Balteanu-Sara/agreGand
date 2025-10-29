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
        : getTextContent(item, "link");

      const description = extractDescription(item, isAtom);
      const image = extractImage(item, sourceName);
      const categories = extractCategories(item, sourceName);
      const publishDate = extractDate(item, sourceName);

      if (title && link && description) {
        articles.push({
          title: title,
          link: link,
          source: sourceName,
          description: description,
          image: image,
          categories: categories,
          publishDate: publishDate,
        });
      }
    } catch (error) {
      console.error(`Error parsing information from ${sourceName}:`, error);
    }
  });

  return articles;
}

function getTextContent(item, tagName) {
  const element = item.querySelector(tagName);
  return element ? element.textContent : "";
}

function extractDescription(item, isAtom) {
  if (isAtom) {
    return getTextContent(item, "summary");
  }

  const descriptionContent = getTextContent(item, "description")
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .trim();
  if (descriptionContent.includes("<") && descriptionContent.includes(">")) {
    const html = new DOMParser().parseFromString(
      descriptionContent,
      "text/html"
    );
    const descriptionText = html.querySelector("p").textContent.trim();
    return descriptionText;
  }
  return new DOMParser()
    .parseFromString(descriptionContent, "text/html")
    .body.textContent.trim();
}

function extractImage(item, sourceName) {
  if (sourceName === "HotNews" || sourceName === "Recorder") {
    return "";
  } else if (sourceName === "PressOne") {
    const descriptionContent = getTextContent(item, "description")
      .replace(/<!\[CDATA\[|\]\]>/g, "")
      .trim();
    const html = new DOMParser().parseFromString(
      descriptionContent,
      "text/html"
    );
    const firstImage = html.querySelector("img");
    return firstImage ? firstImage.getAttribute("src") : "";
  }

  const content = item.getElementsByTagName("content:encoded")[0].textContent;
  const html = new DOMParser().parseFromString(content, "text/html");
  const firstImage = html.querySelector("img");
  return firstImage ? firstImage.getAttribute("src") : "";
}

function extractCategories(item, sourceName) {
  if (sourceName === "PressOne") {
    return [];
  }

  const categories = [];
  const categoryElements = item.querySelectorAll("category");
  categoryElements.forEach((cat) => categories.push(cat.textContent.trim()));
  return categories;
}

function extractDate(item, sourceName) {
  if (sourceName === "PressOne") {
    return "";
  }
  return getTextContent(item, "pubDate");
}

export { parseRSSFeed };
