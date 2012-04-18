// include
var express = require('express');
var app = module.exports = express.createServer();
var lessErrorHandler = require ('connect-less-errors');

// configure
app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('view options', {
        pretty: true
    });
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.compiler({src: __dirname + '/public/', enable:['less']}));
    app.use(lessErrorHandler);
    app.use(express.static(__dirname + '/public'));
    app.use(express.directory(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// routes
/*
app.get('/', function(req, res) {
    res.render('index', {
        title: 'Simple Server',
        watch: {
            enabled: watch,
            script: '<script src="/socket.io/socket.io.js"></script><script src="/reload.js"></script>'
        }
    });
});
*/

// watch routes
app.get("/reload.js", function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/javascript'});
    res.end("var socket = io.connect(); socket.on('file_did_change', function (data) {   if (data.file_extension === '.css' || data.file_extension == '.less') { var queryString = '?reload=' + new Date().getTime(); $('link[rel=\"stylesheet\"]').each(function () { if (this.href.indexOf(\"typekit\") === -1) { this.href = this.href.replace(/\\?.*|$/, queryString); } }); } else {   window.location.reload();  }  });");
});

var argv = require('optimist')
            .alias('p', 'port')
            .describe('p', 'port number')
            .boolean('w')
            .alias('w', 'watch')
            .describe('w', 'watch files for changes and reload').argv,
    port = argv.p || 4000,
    watch = argv.w || false;

app.listen(port);

if (watch) {
    var sio = require('socket.io'),
        watch = require('watch'),
        path = require('path');

    // use socket.io
    var io = sio.listen(app);
    io.set('log level', 0);
    io.sockets.on('connection', function (socket) { console.log(" -- browser connected."); } );

    // watch files for changes
    watch.createMonitor(__dirname + '/public', { ignoreDotFiles: true}, function (monitor) {
        monitor.on("changed", function (f, curr, prev) {
            console.log(path.extname(f));
            io.sockets.emit('file_did_change', {
                file_extension: path.extname(f)
            }); 
        });
        monitor.on("removed", function (f, stat) {
            io.sockets.emit('file_did_change', {
                file_extension: path.extname(f)
            }); 
        });
    });
    watch.createMonitor(__dirname + '/views', { ignoreDotFiles: true}, function (monitor) {
        monitor.on("changed", function (f, curr, prev) {
            io.sockets.emit('file_did_change', {
                file_extension: path.extname(f)
            }); 
        });
        monitor.on("removed", function (f, stat) {
            io.sockets.emit('file_did_change', {
                file_extension: path.extname(f)
            }); 
        });
    });

    // tell people about it
    console.log("Socket.io will annouce file changes");
}

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);