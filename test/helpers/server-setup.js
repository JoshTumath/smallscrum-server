'use strict';

const server = require('../../app');
const store = require('../../app/store');

const PORT = 3000;

module.exports = {
  /**
   * Sets up a server instance for testing.
   * @param {Fortune}  store    A fortune.js store object with configuration
   *                            details of the database.
   * @param {Function} callback Pass the mocha `done` function to detect when
   *                            setup is finished.
   * @return {app}              The express.js server
   */
  create(store, callback) {
    this.store = store;

    const app = server(this.store, `${__dirname}/../../`);

    this.store.connect().then(() => {
      this.server = app.listen(PORT, callback);
    });

    return app;
  },

  /**
   * Tears down a server instance after testing.
   * @param {Function} callback Pass the mocha `done` function to detect when
   *                            teardown is finished.
   */
  destroy(callback) {
    this.store.disconnect().then(() => {
      this.server.close(callback);
    });
  }
};
