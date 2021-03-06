// Copyright 2016 Antonio De Lucreziis

require('./public/scripts/util.js');

var logic = require('./logic/logic.js');

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

// # Routers
app.use( '/public' , require('./routers/public.js')(express, __dirname) );
app.use( '/app'    , require('./routers/webapp.js')(express, __dirname) );
app.use( '/api'    , require('./routers/api.js')(express, __dirname) );

// app.use('/favicon.png', express.static(__dirname + '/delucreziotto-1@small.png'));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
