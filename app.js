var expressJS = require('express');
var notesMemoController = require('./Controller/notesMemoController');

var application = expressJS();
var port = 3000;

application.set('view engine', 'ejs');
application.use( "/assets", expressJS.static("./assets") );

notesMemoController( application );

application.listen( port );

console.log( port );
