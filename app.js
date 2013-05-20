
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var lessMiddleware = require('less-middleware');
var path = require('path');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(lessMiddleware({
        src: path.join(__dirname, 'public')
    }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.directory(path.join(__dirname, 'public')));
});

app.configure('production', function(){
    console.log("Should not be used for production");
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
