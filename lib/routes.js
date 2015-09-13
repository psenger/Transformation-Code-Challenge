/**
 * Created by philip a senger on 11/09/15.
 */
/* jshint strict: true */
/* global require, console */
'use strict';

var router = require ( 'express' ).Router (),
    bodyParser  = require('body-parser' ),
    controller = require ( './controller' );

function notFoundHandler ( req, res, next ) {
    console.error ( req  );
    res.status( 404 );
    res.json ( {
        "error": "Not Found"
    } );
}

function genericErrorHandler ( err, req, res, next ) {
    console.error ( err.message );
    console.error ( err.stack );
    res.type('application/json');
    res.status ( 400 );
    res.json ( {
        "error": "Could not decode request: JSON parsing failed"
    } );
}
var jsonParser = bodyParser.json({inflate:true,limit:'100kb',strict:true,type:'application/json'});

router.post ( '/', jsonParser, /** controller.validatePayload,  **/ controller.convertPayload );
router.use ( notFoundHandler );
router.use ( genericErrorHandler );
module.exports = router;