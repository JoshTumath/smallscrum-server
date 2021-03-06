# SmallScrum Server
[![Build Status](https://travis-ci.org/JoshTumath/smallscrum-server.svg?branch=master)](https://travis-ci.org/JoshTumath/smallscrum-server)

This is the server application for SmallScrum. It presents the Ember application
to site visitors and handles the JSON API for communication between the client
and the persistent storage.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) 4.x LTS version (with NPM)
* [MongoDB](https://www.mongodb.com/)
* [Mocha](https://mochajs.org/)

If you do not already have the SmallScrum Ember application repository set up
on your system, you will need the prerequisites for that as well.

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `npm build`

If you already have the SmallScrum Ember application repository downloaded onto
your system, you can run `ember build -o path/to/smallscrum-server/public`
instead from there.

## Running / Development

* `npm start`
* Visit the server at [http://localhost:3000](http://localhost:3000).

### Running Tests

* `mocha`
