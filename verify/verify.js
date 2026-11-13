// Replays every report in bugs.json against utils.js and prints actual vs expected.
// Run: node verify.js   (exit 0 only if every reported bug is genuinely reproduced)
const u = require('./utils.js');
const reports = require('../bugs.json');
let reproduced = 0;
for (const r of reports) {
  const actual = u[r.fn](r.input);
  const bug = JSON.stringify(actual) !== JSON.stringify(r.expected);
  console.log(`${r.fn}(${JSON.stringify(r.input)}) => actual ${JSON.stringify(actual)}, expected ${JSON.stringify(r.expected)} — ${bug ? 'BUG REPRODUCED' : 'NOT A BUG'}`);
  if (bug) reproduced++;
}
console.log(`reproduced ${reproduced}/${reports.length}`);
process.exit(reproduced === reports.length ? 0 : 1);
