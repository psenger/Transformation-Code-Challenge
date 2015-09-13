/**
 * Created by philip a senger on 11/09/15.
 */
/* jshint strict: true */
/* global require, console */
'use strict';
var isArray = require ( 'util' ).isArray,
    isNullOrUndefined = require('util' ).isNullOrUndefined,
    isString = require('util').isString;

var msg = 'Could not decode request: JSON parsing failed';

var validatePayload = exports.validatePayload = function validatePayload(req, res, next){
    if ( ! req.body ) {
        res.type('application/json');
        res.status ( 400 );
        res.json ( {
            "error": "Could not decode request: JSON parsing failed"
        } );
    } else  if ( ! req.is('json') ) {
        res.type('application/json');
        res.status ( 400 );
        res.json ( {
            "error": "Could not decode request: JSON parsing failed"
        } );
    } else {
        next('route');
    }
};

/**
 * Convert the Payload Controller
 *
 * @example
 * var router = require('express').Router();
 * router.post('/', controller.convertPayload);
 *
 * @api public
 * @type {Function}
 * @alias controller:convertPayload
 *
 * @param {object} err - express error object
 * @param {object} req - express request object @see {@link http://expressjs.com/api.html#req} for further information.
 * @param {object} res - express response object @see {@link http://expressjs.com/api.html#res} for further information.
 * @param {Function} next - express callback.
 * @returns {*}
 */
var convertPayload = exports.convertPayload = function convertPayload ( req, res, next ) {
    if ( ! ( req.is('json') === 'json' ) ){
        res.type('application/json').status ( 400 ).json ( {
            "error": msg
        } );
    } else if ( req.body && isArray ( req.body.payload ) ) {
        var promise = new Promise ( function ( resolve, reject ) {
            var filtered = req.body.payload.filter ( function ( value ) {
                return ( value && ( value.drm && value.drm === true ) && ( value.episodeCount && typeof value.episodeCount === 'number' && value.episodeCount > 0 ) )
            } );
            if ( filtered ) {
                resolve ( filtered );
            } else {
                resolve ( [] );
            }
        } )
                .then ( function ( result ) {
                return new Promise ( function ( resolve, reject ) {
                    var cleanResults = result.reduce ( function ( previousValue, currentValue ) {
                        var slug = currentValue.slug;
                        var title = currentValue.title;
                        var image = currentValue.image ? currentValue.image.showImage : undefined;
                        if ( slug && title && image ) {
                            previousValue.push ( { image: '' + image, slug: '' + slug, title: '' + title } );
                        }
                        return previousValue;
                    }, [] );
                    console.log ( cleanResults );
                    resolve ( cleanResults );
                } );
            } )
                .then ( function ( result ) {
                res.type('application/json').status ( 200 ).send ( { response: result } );
            } )
            .catch ( function ( e ) {
                throw new Error ( msg );
            } );
    } else {
        res.type('application/json').status ( 200 ).send ( { response: [] } );
    }
};
