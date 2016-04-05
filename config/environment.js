'use strict';

const ENV = {
  DB: {
    URL: 'mongodb://localhost:27017/smallscrum'
  }
};

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {

}

if (process.env.NODE_ENV === 'test') {
  ENV.DB.URL = 'mongodb://localhost:27017/smallscrumtest';
}

if (process.env.NODE_ENV === 'production') {

}

module.exports = ENV;
