

// # Module Dependencies.
var express = require('express');
var http = require('http');
var lessMiddleware = require('less-middleware');
var path = require('path');
var fs = require('fs');

// Paths – Allow server to serve any directory
var argv = require('optimist').argv;
var serveFromDirectory = argv.d || argv.dirname || path.join(__dirname, 'public/');
console.log(serveFromDirectory);

// ## Custom Modules
var jadeMiddleware = require(path.join(__dirname, 'jade-middleware.js'));
var liveReload = require(path.join(__dirname, 'live-reload.js'));

var app = express();
app.configure(function(){
    app.set('port', process.env.PORT || argv.p || 3000);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    var jadeOptions = {
        pretty: true
    };
    var jadeLayoutFile = path.join(serveFromDirectory, 'layout.jade');
    if ( fs.existsSync( jadeLayoutFile ) ) {
        jadeOptions.filename = jadeLayoutFile;
    }
    app.use(jadeMiddleware({
        src: serveFromDirectory,
        jadeOptions: jadeOptions
    }));
    app.use(lessMiddleware({
        src: serveFromDirectory
    }));
    app.use(express.static(serveFromDirectory));
    app.use(express.directory(serveFromDirectory));
});

app.configure('production', function(){
    console.log("Should not be used for production");
});

var server = http.createServer(app);
server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

// # Live Reloading
// To watch `WATCH=1 node app.js`
if (process.env.WATCH || argv.w || argv.watch) {
    liveReload.watch({
        pathPatterns: [path.join(__dirname, 'public')+"/**/*"],
        server: server,
        app: app
    });
    console.log("Watching public and views for changes. Add /watch.js to your html.");
}

