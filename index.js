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
