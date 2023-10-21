/* The office API at the time of writing does not support the random quote endpoint
   Because of this a scraper was written to pull quotes from Cosmopolitan top 100 quotes
   and stored in static JSON file.
*/
require('isomorphic-unfetch');
const { promises: fs } = require('fs');
const path = require('path');

async function main() {
  const readmeTemplate = (
    await fs.readFile(path.join(process.cwd(), './README.template.md'))
  ).toString('utf8');

  const { data } = await (
    await fetch('https://officeapi.dev/api/quotes/random')
  ).json();

  const readme = readmeTemplate
    .replace('{{office_quote}}', `${data.content}`)
    .replace(
      '{{office_quoted_by}}',
      `${data.character.firstname} ${data.character.lastname}`
    );

  await fs.writeFile('README.md', readme);
}

main();
