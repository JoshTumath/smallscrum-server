/*
 * Run `node bin/build.js` to download, build and save the Ember project into
 * the /public directory.
 *
 * Parameters:
 *   --cache -c Keeps a cached copy of the Ember project so that it and its
 *              npm and bower packages don't have to be downloaded and built
 *              each time. Useful during development.
 */

'use strict';

const exec = require('child_process').execSync;
const fs = require('fs');

const EMBER_REPO = 'git@github.com:JoshTumath/smallscrum.git';
const CACHE_DIR = '.ember';

(() => {
  // Check that we are in the root directory of the smallscrum-server
  try {
    fs.accessSync('package.json');
    fs.accessSync('server.js');
  } catch (e) {
    console.log('Error: Command should be run in the root of the project directory');
    process.exit(1);
  }

  try {
    fs.statSync(CACHE_DIR).isDirectory();
    
    console.log(`Downloading updates from ${EMBER_REPO}...`);
    exec('git pull');
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log(`Downloading repository from ${EMBER_REPO}...`);
      exec(`git clone ${EMBER_REPO} ${CACHE_DIR}`);
    } else {
      console.log(e.toString());
      process.exit(1);
    }
  }

  console.log('Installing/updating packages from npm and bower...');
  exec(`cd ${CACHE_DIR} && npm install && bower install`);

  console.log('Building ...');
  exec(`cd ${CACHE_DIR} && ember build -o ../public`);
})();
