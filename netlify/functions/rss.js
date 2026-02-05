export async function handler(event) {
  const feedUrl = event.queryStringParameters?.url;

  if (!feedUrl) {
    return {
      statusCode: 400,
      body: "Missing feed URL",
    };
  }

  try {
    const response = await fetch(feedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: `Failed to fetch RSS: ${response.statusText}`,
      };
    }

    const xml = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/xml",
      },
      body: xml,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: "Server error fetching RSS",
    };
  }
}
