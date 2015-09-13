/**
 * Created by Philip A Senger on 12/09/15.
 */
"use strict";

var assert = require ( 'assert' ),
    Promise = require ( 'bluebird' ),
    curry = require('curry'),
    fs = Promise.promisifyAll ( require ( "fs" ) ),
    request = Promise.promisify ( require ( "request" ) );

Promise.promisifyAll ( fs );
Promise.promisifyAll ( request );

var url = 'http://localhost:3000/';

function readFile ( fileName ) {
    return fs.readFileAsync ( fileName, 'utf8' );
}

function callEndPointWith ( fileName ) {
    if ( fileName === undefined ) {
        return request ( {
            uri: url,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            }
        } );
    }
    return readFile ( fileName )
                .then ( function ( result ) {
                    return request ( {
                        uri: url,
                        method: 'POST',
                        body: result,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json; charset=utf-8'
                        }
                    } );
                 } );
}

function assert200StatusCode ( result ) {
    assert.ok ( result );
    assert.ok ( result[ 0 ] );
    assert.deepEqual ( result[ 0 ].statusCode, 200, 'response was not 200' );
    return new Promise ( function ( resolve, reject ) {
        resolve ( result );
    } );
}

function assert400StatusCode ( result ) {
    assert.ok ( result );
    assert.ok ( result[ 0 ] );
    assert.deepEqual ( result[ 0 ].statusCode, 400, 'response was not 400 ' + result[ 0 ].body );
    return new Promise ( function ( resolve, reject ) {
        resolve ( result );
    } );
}

function assertErrorMsg ( result ) {
    assert.ok ( result );
    assert.ok ( result[ 1 ] );
    var body = JSON.parse ( result[ 1 ] );
    assert.ok ( body );
    assert.ok ( body.error );
    assert.deepEqual ( body.error, 'Could not decode request: JSON parsing failed', 'Error message body was incorrect' );
    return new Promise ( function ( resolve, reject ) {
        // console.log ( body );
        resolve ( result );
    } );
}

function assertResponseAgainst ( filename, result ) {
    assert.ok ( result );
    assert.ok ( result[ 1 ] );
    var body = result[ 1 ];
    return readFile ( filename ).then ( function ( result ) {
        return new Promise ( function ( resolve, reject ) {
            //console.log('-------------------------------------------');
            //console.log( JSON.stringify( JSON.parse(result), '\t', 4) );
            //console.log('-------------------------------------------');
            //console.log( JSON.stringify( JSON.parse(body), '\t', 4) );
            //console.log('-------------------------------------------');
            assert.deepEqual ( JSON.parse(result), JSON.parse(body) );
            resolve ( result );
        } );
    } );
}

describe( 'Transformation Code Challenge', function () {

    context ( 'Given the service is running', function () {

        this.timeout(0);

        describe ( 'When I post application/xml', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = request ( {
                        uri: url,
                        method: 'POST',
                        body: "<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>",
                        headers: {
                            'Accept': 'application/xml',
                            'Content-Type': 'application/xml; charset=utf-8' // text/xml
                        }
                    } )
                    .then ( function ( result ) {
                        return new Promise ( function ( resolve, reject ) {
                            resolve ( result );
                            done ();
                        } );
                    } );
            } );
            it ( 'should produce a 400 code', function ( done ) {
                promise.then ( assert400StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce Json Body that has an error message', function ( done ) {
                promise.then ( assertErrorMsg ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );

        describe ( 'When I post text/xml', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = request ( {
                    uri: url,
                    method: 'POST',
                    body: "<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>",
                    headers: {
                        'Accept': 'text/xml',
                        'Content-Type': 'text/xml; charset=utf-8' //
                    }
                } ) .then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 400 code', function ( done ) {
                promise.then ( assert400StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce Json Body that has an error message', function ( done ) {
                promise.then ( assertErrorMsg ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );

        describe ( 'When I post xml as json', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = request ( {
                    uri: url,
                    method: 'POST',
                    body: "<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                } ) .then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 400 code', function ( done ) {
                promise.then ( assert400StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce Json Body that has an error message', function ( done ) {
                promise.then ( assertErrorMsg ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );

        describe ( 'When I post an empty body', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/2.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            //it ( 'should produce a 400 code', function ( done ) {
            //    promise.then ( assert400StatusCode ).then ( function ( result ) {
            //        done ();
            //    } );
            //} );
            //it ( 'should produce Json Body that has an error message', function ( done ) {
            //    promise.then ( assertErrorMsg ).then ( function ( result ) {
            //        done ();
            //    } );
            //} );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce a JSON body that has no values', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );

        describe ( 'When I pass a Body that has valid data', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/3.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce a JSON body that matches', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/3.json' ) ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );

        describe ( 'When I pass a body.payload that is missing', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/6.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/6.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );

        describe ( 'When I pass a body.payload that is undefined', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/7.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/7.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );

        describe ( 'When I pass a body.payload that is null', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/8.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/8.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );

        describe ( 'When I pass a body.payload that is object literal', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/9.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/9.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );

        describe ( 'When I pass a body.payload that is number', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/10.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/10.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );

        describe ( 'When I pass a body.payload that is string', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/11.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/11.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );

        describe ( 'When I pass a body.payload that is float', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/12.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/12.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );

        describe ( 'When I pass a body.payload that is boolean', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/15.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/15.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );

        describe ( 'When I pass a body.payload that is empty', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/13.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/13.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );


        //describe.skip( 'When I pass a body.payload that is filled', function ( done ) {
        //    var promise = null;
        //    before ( function ( done ) {
        //        promise = callEndPointWith ( __dirname + '/request/14.txt' ).then ( function ( result ) {
        //            return new Promise ( function ( resolve, reject ) {
        //                resolve ( result );
        //                done ();
        //            } );
        //        } );
        //    } );
        //    it ( 'should produce a 200 code', function ( done ) {
        //        promise.then ( assert200StatusCode ).then ( function ( result ) {  done(); } );
        //    } );
        //    it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/14.txt', function ( done ) {
        //        promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/14.txt' ) ).then ( function ( result ) {  done(); } );
        //    } );
        //} );

        describe ( 'When I pass a body.payload contains that is null', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/19.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/19.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );

        describe ( 'When I pass a body.payload contains that is empty object literal', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/21.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/21.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );

        describe ( 'When I pass a body.payload contains that is number', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/22.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/22.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );

        describe ( 'When I pass a body.payload contains that is string ', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/23.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/23.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );

        describe ( 'When I pass a body.payload contains that is float', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/24.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/24.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );

        describe ( 'When I pass a body.payload contains that is boolean', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/25.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/25.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );

        describe ( 'When I pass a body.payload contains that is mix of null, undefined, empty, object, literal, number, string, float', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/26.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/26.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );

        describe( 'When I pass a body.payload contains that is mix of null, empty object literal, number, string, float, valid object', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/27.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {  done(); } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/27.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/27.json' ) ).then ( function ( result ) {  done(); } );
            } );
        } );

        describe ( 'When I pass a show that is missing all valid values', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/31.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/31.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );


        describe ( 'When I pass a show.drm that is null', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/36.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/36.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );

        describe ( 'When I pass a show.drm that is object', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/37.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/37.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );
        describe ( 'When I pass a show.drm that is number', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/38.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/38.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );
        describe ( 'When I pass a show.drm that is string', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/39.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {
                    done ();
                } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/39.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {
                    done ();
                } );
            } );
        } );

        describe( 'When I pass a show.drm that is valid true that will produce results', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/40.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {  done(); } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/40.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/40.json' ) ).then ( function ( result ) {  done(); } );
            } );
        } );

        describe( 'When I pass a show.drm that is valid false that will not produce results', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/41.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {  done(); } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/41.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {  done(); } );
            } );
        } );

        describe( 'When I pass a show.episodeCount that is undefined', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/44.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {  done(); } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/44.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {  done(); } );
            } );
        } );

        describe( 'When I pass a show.episodeCount that is null', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/45.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {  done(); } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/45.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {  done(); } );
            } );
        } );
        describe( 'When I pass a show.episodeCount that is object', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/46.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {  done(); } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/46.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {  done(); } );
            } );
        } );
        describe( 'When I pass a show.episodeCount that is string', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/47.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {  done(); } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/47.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {  done(); } );
            } );
        } );

        describe( 'When I pass a show.episodeCount that is valid number 0', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/48.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {  done(); } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/48.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/empty.json' ) ).then ( function ( result ) {  done(); } );
            } );
        } );
        describe( 'When I pass a show.episodeCount that is valid number 5', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/49.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {  done(); } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/49.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/49.json' ) ).then ( function ( result ) {  done(); } );
            } );
        } );

        describe( 'When I pass a valid final mixed payload', function ( done ) {
            var promise = null;
            before ( function ( done ) {
                promise = callEndPointWith ( __dirname + '/request/50.json' ).then ( function ( result ) {
                    return new Promise ( function ( resolve, reject ) {
                        resolve ( result );
                        done ();
                    } );
                } );
            } );
            it ( 'should produce a 200 code', function ( done ) {
                promise.then ( assert200StatusCode ).then ( function ( result ) {  done(); } );
            } );
            it ( 'should produce a JSON body that matches test repose in file ' + __dirname + '/request/50.json', function ( done ) {
                promise.then ( curry ( assertResponseAgainst ) ( __dirname + '/response/50.json' ) ).then ( function ( result ) {  done(); } );
            } );
        } );
    } );
} );

