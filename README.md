# SmallScrum Server
[![Build Status](https://travis-ci.com/JoshTumath/smallscrum-server.svg?token=tp7LrsAJ5P39ZTw9qWtB&branch=master)](https://travis-ci.com/JoshTumath/smallscrum-server)

This is the server application for SmallScrum. It presents the Ember application
to site visitors and handles the JSON API for communication between the client
and the persistent storage.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* The prerequisites for the SmallScrum Ember application

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `npm build`

If you already have the SmallScrum Ember application repository downloaded onto
your system, you can run `ember build -o path/to/smallscrum-server/public`
instead.

## Running / Development

* `npm start`
* Visit the server at [http://localhost:3000](http://localhost:3000).
