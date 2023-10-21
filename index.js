const { promises: fs } = require('fs');
const path = require('path');
const quotes = require('./assets/data/quotes.json');

async function main() {
  const readmeTemplate = (
    await fs.readFile(path.join(process.cwd(), './README.template.md'))
  ).toString('utf8');
  const randomQuoteIndex = Math.floor(Math.random() * quotes.length);
  const { quote, quotedBy } = quotes[randomQuoteIndex];

  const readme = readmeTemplate
    .replace('{{office_quote}}', `${quote}`)
    .replace(
      '{{office_quoted_by}}',
      `${quotedBy}`
    );

  await fs.writeFile('README.md', readme);
}

main();
