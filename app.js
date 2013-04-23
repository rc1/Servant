
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var lessMiddleware = require('less-middleware');
var path = require('path');

var app = express();

app.configure(function(){
    app.use(function(req, res, next) {
        app.locals.pretty = true;
        next();
    });
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(lessMiddleware({
        src: path.join(__dirname, 'public')
    }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.directory(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get("/", function (req, res) {
    res.render("index", {
        title : "Title"
    });
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
