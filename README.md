# basic express webserver

To setup:

    $ npm install

To start:

    $ node app.js

Specify port:

    $ node app.js -p 8000

#### File watching & auto reloading

To start with file watching:

    $ node app.js -w

to have your webpage auto reloading/refresh, include:

    <script src="/socket.io/socket.io.js"> 
    </script><script src="/reload.js"></script>


#### Jade and Express routing

In `app.js` uncomment the following lines:

 
    app.get('/', function(req, res) {
        res.render('index', {
            title: 'Simple Server',
            watch: {
                enabled: watch,
                script: '<script src="/socket.io/socket.io.js"></script><script src="/reload.js"></script>'
            }
        });
    });
