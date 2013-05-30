# Servant
## Version 4.0.0

Lean [express.js](http://expressjs.com/) project for static website prototyping with jade & less compiling, fast live reloading, directory listing etc.

Server any folder direct from the command line with just:

    $ servant

Alternatively use as a minimal express.js server project for static websites with support for just-in-time less and jade file compiling.

### Features

* Very fast live reloading with [ws](https://github.com/einaros/ws) and [gaze](https://github.com/shama/gaze)
* Compiles matching .less files for any .css requests
* Compiles matching .jade files for any .html requests*
* Optional .jade layout file in root
* Directory listing

_* Requests for '/' will also look for a index.jade file to compile._

## Command line options

    -l, --livereload  Enable live reload
    -p, --port

## Command line tool usage:

Install globally:

    $ npm install -g servant 

From any folder:

    $ servant

## Using as boilerplate app:

    $ git clone git@github.com:rc1/Servant.git
    $ cd Servant
    $ rm -rf .git
    $ node app.js

### Usage

With environment variables

    WATCH=1 PORT=3001 node app.js
