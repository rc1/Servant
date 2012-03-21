// include
var express = require('express');
var app = module.exports = express.createServer();

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
    app.use(express.static(__dirname + '/public'));
    app.use(express.directory(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
//

// routes
app.get('/', function(req, res) {
    res.render('index', {
        title: 'Express'
    });
});
// start
if (process.argv.length == 3) {
    app.listen(process.argv[2]);
} else if (process.argv.length == 4) {
    app.listen(process.argv[3]);
} else {
    console.log("Listen on default port. Run with `node app.js -p 8080` to specify port");
    app.listen(9000);
}
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
