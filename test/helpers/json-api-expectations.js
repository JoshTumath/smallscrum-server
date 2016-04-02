'use strict';

/**
 * Various anonymous functions and factories to create anonymous functions that
 * can be passed into supertest `expect` methods.
 */
module.exports = {
  /**
   * Checks that a data array containing at least some data is present in the
   * JSON API response.
   */
  containsDataArray() {
    return (res) => {
      if (!(res.body.data || res.body.data instanceof Array)) {
        throw new Error('Missing data array');
      }

      if (res.body.data.length < 1) {
        throw new Error('Data array is empty');
      }
    };
  },

  /**
   * Checks each object within the data array to see if its attributes contains
   * a specified value.
   * @param  {String} name  name of attribute
   * @param  {Object} value value of attribute
   */
  containsAttribute(name, value) {
    return (res) => {
      for (let item of res.body.data) {
        if (
          item.attributes &&
          item.attributes[name] &&
          item.attributes[name] === value
        ) {
          return;
        }
      }

      throw new Error(`Could not find attribute [${name}, ${value}]`);
    };
  },

  /**
   * Checks each object within the data array to see if its relationships
   * contains one of a particular type.
   * @param  {String} type collection type of relationship
   */
  containsRelationship(type) {
    return (res) => {
      for (let item of res.body.data) {
        if (item.relationships) {
          return;
        }
      }

      throw new Error(`Could not find relationship [${type}]`);
    };
  }
};
