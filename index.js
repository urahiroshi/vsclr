const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const vsCodeDir = '.vscode';
const configFile = 'settings.json';

const rand = () => (crypto.randomBytes(1).readUInt8(0));
const rand3 = [0, 0, 0].map(rand);
const selected = rand() % 3;
const selectedVal = rand3[selected];
const nonSelecteds = [0, 1, 2].filter(i => i !== selected);
const nonSelectedVals = nonSelecteds.map(i => (
  Math.floor(
    rand3[i] *
    ((256 - selectedVal) / (rand3[nonSelecteds[0]] + rand3[nonSelecteds[1]]))
  )
));
const rgb = [0, 1, 2].map(i => (
  (i === selected) ? selectedVal : nonSelectedVals[nonSelecteds.indexOf(i)]
)).map(val => (
  `0${val.toString(16)}`.slice(-2)
)).join('');

const config = {
  'workbench.colorCustomizations': {
    'statusBar.background': `#${rgb}`,
  }
};

if (!fs.existsSync(vsCodeDir)) {
  fs.mkdirSync(vsCodeDir);
}
fs.writeFileSync(
  path.join(vsCodeDir, configFile),
  JSON.stringify(config, undefined, 4)
);
