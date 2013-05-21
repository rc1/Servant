// # Module Dependencies.
var express = require('express');
var http = require('http');
var lessMiddleware = require('less-middleware');
var path = require('path');
// ## Custom Libs
var jadeMiddleware = require(path.join(__dirname, 'jade-middleware.js'));
var liveReload = require(path.join(__dirname, 'live-reload.js'));

var app = express();
app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(jadeMiddleware({
        src: path.join(__dirname, 'public'),
        jadeOptions: {
            pretty: true,
            filename: path.join(__dirname, 'public/layout.jade')
        }
    }));
    app.use(lessMiddleware({
        src: path.join(__dirname, 'public')
    }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.directory(path.join(__dirname, 'public')));
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
if (process.env.WATCH) {
    liveReload.watch({
        pathPatterns: [path.join(__dirname, 'public')+"/**/*"],
        server: server,
        app: app
    });
    console.log("Watching public and views for changes. Add /watch.js to your html.");
}

