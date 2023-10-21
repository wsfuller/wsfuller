const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

async function getQuotes() {
  const url = "https://www.cosmopolitan.com/entertainment/tv/a38689340/the-office-best-quotes/";
  const __dirname = path.resolve();
  try {
    const response = await fetch(url);
    const html = await response.text();
    const quotes = await generateQuotesArray(html);

    fs.writeFile(__dirname + "/assets/data/quotes.json", JSON.stringify(quotes, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Successfully saved quotes.json")
    })
  } catch (err) {
    console.error('Unable to generate quotes list: ', err);
  }
};

async function generateQuotesArray (html) {
  const quotes = [];
  const $ = cheerio.load(html);
  const $items = $('[data-journey-content="true"]');

  // Was getting some junk for the first 2 elements so filter anything that doesn't start with a quote
  const $filteredItems = $items.filter((index, element) => {
    const text = $(element).text().trim();

    // console.log('text: ', text);

    if (text.startsWith('"') || text.startsWith('“')) return text;
  });

  $filteredItems.each((index, element) => {
    const id = index += 1;
    const text = $(element).text();
    const textArray = text.split(" — ");

    quotes.push({
      id,
      quote: textArray[0].substring(1, textArray[0].length - 1).replaceAll("’", "'"),
      quotedBy: textArray[1].trim(),
    })

  });

  return quotes;

};

getQuotes();
