/**
 * Created by philip a senger on 11/09/15.
 */
/* jshint strict: true */
/* global require, console */
'use strict';

var express     = require('express' ),
    routes      = require('./lib/routes');

var app = express();

app.disable('x-powered-by');
app.disable('etag');
app.use('/', routes);

app.listen(process.env.PORT || 3000, function() {
  console.log('Express server listening on port %s', process.env.PORT || 3000);
});

