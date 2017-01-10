import fs from 'fs';
import pify from 'pify';
import preprocessor from 'suitcss-preprocessor';
import {options} from './config';

const run = async (t, input, output) => {
  const css = await pify(fs.readFile)(input, 'utf8');
  const fixture = await pify(fs.readFile)(output, 'utf8');
  const result = await preprocessor(css, options);

  t.deepEqual(result.css, fixture);
  t.deepEqual(result.warnings().length, 0);
};

module.exports = {run};
