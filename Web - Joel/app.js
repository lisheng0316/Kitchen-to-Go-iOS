/**
 * Creates the server, listen for requests and routes
 * the request for its respective handler.
 * @author: Joel R. Corporan
 */
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var helmet = require('helmet');

// var config = require('./config/config.js');
var routes = require('./request-handlers/routes.js');
// var RequestHandlers = require('./request-handlers/handlers.js');
// var Database = require('./database/databaseManager.js');
// var noSQLDatabase = require('./database/mongoManager.js');

var app = express();


app.set('view engine', 'html');
app.set('layout', 'home');
app.engine('html', require('hogan-express'));
app.set('views', __dirname + '/public/templates');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({strict: false}));
app.use(helmet());

// app.locals.STATIC = '/'

// set static directories
app.use('/', express.static(path.join(__dirname, 'public'))); //Uncomment if you need to.


// Make sure all request return CORS headers
app.use(function (req, res, next) {
    var origin = req.get('origin');
    if (!origin || origin === 'undefined' || origin.length == 0) {
        origin = req.get('host');
    }
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token, newpassword');

    next();
});

// Node App Port
// var port = config.port || 3000;
var port = 3000;


routes(app, "handlers", "db", "noSQLdb");

createServer(port);

/**
 * Creates the server.
 */
function createServer(config_port) {
	
  var port = config_port;
  app.listen(port);
 
	console.log("Server running on %s mode. Listening on port %d", app.settings.env, port);
}