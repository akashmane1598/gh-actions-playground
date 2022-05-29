import { execa } from 'execa';
import { readFile } from 'fs/promises';
import path from 'path';
// import { DeserializationManager, Logger } from '@hypertrace/hyperdash/dist/hyperdash.es5.js';
const validate = async () => {
  try {
    const { stdout } = await execa('git', [`diff`, '--name-only', 'master', '--', './dashboards/*.json']);
    const jsonFiles = stdout.split('\n');
    console.log('JSON files:');
    const hasJSON = jsonFiles.length === 0 && jsonFiles[0];

    // const logger = new Logger();
    // const deserializer = new DeserializationManager(logger);
    if (!hasJSON) {
      console.log('No JSON updates present. Exiting...');
      return;
    }
    for (let i = 0; i < jsonFiles.length; i++) {
      const jsonString = await readFile(path.join(process.cwd(), jsonFiles[i]));
      const json = JSON.parse(`${jsonString}` ?? '{}');
      const isValid = true; // deserializer.deserialize(json);
    }
  } catch (error) {
    console.log(error);
  }
};

validate();
