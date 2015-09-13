# Transformation Code Challenge


[![Build Status](https://travis-ci.org/psenger/Transformation-Code-Challenge.svg?branch=master)](https://travis-ci.org/psenger/Transformation-Code-Challenge)

Written by Philip A Senger

[philip.a.senger@cngrgroup.com](mailto:philip.a.senger@cngrgroup.com) |
mobile: 0406770664 |
[CV/Resume](http://www.visualcv.com/philipsenger) |
[blog](http://www.apachecommonstipsandtricks.blogspot.com/) |
[LinkedIn](http://au.linkedin.com/in/philipsenger) |
[twitter](http://twitter.com/PSengerDownUndr)


This application is a very simple NodeJS REST application designed to transform JSON data that is POST to it.

## Instructions

The returned JSON should have a response key with an array of shows. Each element should have the following fields from the request:

image - corresponding to ```image/showImage``` from the request payload

* slug
* title
* Error Handling

If we send invalid JSON, You'll need to return a JSON response with HTTP status 400 Bad Request, and with a `error` key containing the string Could not decode request. For example:

```
{
    "error": "Could not decode request: JSON parsing failed"
}
```

## Testing

This application uses Mocah BDD style testing. Tests can be found in the directory ```test/``` Code coverage is located in

    npm run test

## Generate Documentation

Executing the following NPM command will read the JavaScript files and replace the README.md file with updated JSDocs. The main template is located in ```doc-template/README.md.hbs``` and is a Handlebars Template

    npm run docs

## Heroku deployment

This application was deployed on Heroku. I had considered deploying to Apigee Edge, but this was easier.

    Script started on Sun Sep 13 17:01:38 2015
    [?1034hbash-3.2$ date;whoami;hostname
    Sun Sep 13 17:01:46 AEST 2015
    psenger
    Philips-MBP
    bash-3.2$ heroku login
    Enter your Heroku credentials.
    Email: xxxxxxxxxxxxxxxxxxxxxxx
    Password (typing will be hidden):
    Authentication successful.
    bash-3.2$ heroku create
    Creating intense-woodland-7710... done, stack is cedar-14
    https://intense-woodland-7710.herokuapp.com/ | https://git.heroku.com/intense-woodland-7710.git
    Git remote heroku added
    bash-3.2$ git push heroku master
    Counting objects: 61, done.
    Delta compression using up to 8 threads.
    Compressing objects:   2% (1/40)
    Compressing objects:   5% (2/40)
    Compressing objects:   7% (3/40)
    Compressing objects:  10% (4/40)
    Compressing objects:  12% (5/40)
    Compressing objects:  15% (6/40)
    Compressing objects:  17% (7/40)
    Compressing objects:  20% (8/40)
    Compressing objects:  22% (9/40)
    Compressing objects:  25% (10/40)
    Compressing objects:  27% (11/40)
    Compressing objects:  30% (12/40)
    Compressing objects:  32% (13/40)
    Compressing objects:  35% (14/40)
    Compressing objects:  37% (15/40)
    Compressing objects:  40% (16/40)
    Compressing objects:  42% (17/40)
    Compressing objects:  45% (18/40)
    Compressing objects:  47% (19/40)
    Compressing objects:  50% (20/40)
    Compressing objects:  52% (21/40)
    Compressing objects:  55% (22/40)
    Compressing objects:  57% (23/40)
    Compressing objects:  60% (24/40)
    Compressing objects:  62% (25/40)
    Compressing objects:  65% (26/40)
    Compressing objects:  67% (27/40)
    Compressing objects:  70% (28/40)
    Compressing objects:  72% (29/40)
    Compressing objects:  75% (30/40)
    Compressing objects:  77% (31/40)
    Compressing objects:  80% (32/40)
    Compressing objects:  82% (33/40)
    Compressing objects:  85% (34/40)
    Compressing objects:  87% (35/40)
    Compressing objects:  90% (36/40)
    Compressing objects:  92% (37/40)
    Compressing objects:  95% (38/40)
    Compressing objects:  97% (39/40)
    Compressing objects: 100% (40/40)
    Compressing objects: 100% (40/40), done.
    Writing objects:   1% (1/61)
    Writing objects:   3% (2/61)
    Writing objects:   4% (3/61)
    Writing objects:   6% (4/61)
    Writing objects:   8% (5/61)
    Writing objects:   9% (6/61)
    Writing objects:  11% (7/61)
    Writing objects:  13% (8/61)
    Writing objects:  14% (9/61)
    Writing objects:  16% (10/61)
    Writing objects:  18% (11/61)
    Writing objects:  19% (12/61)
    Writing objects:  21% (13/61)
    Writing objects:  22% (14/61)
    Writing objects:  24% (15/61)
    Writing objects:  26% (16/61)
    Writing objects:  27% (17/61)
    Writing objects:  29% (18/61)
    Writing objects:  31% (19/61)
    Writing objects:  32% (20/61)
    Writing objects:  34% (21/61)
    Writing objects:  36% (22/61)
    Writing objects:  37% (23/61)
    Writing objects:  39% (24/61)
    Writing objects:  40% (25/61)
    Writing objects:  42% (26/61)
    Writing objects:  44% (27/61)
    Writing objects:  45% (28/61)
    Writing objects:  47% (29/61)
    Writing objects:  49% (30/61)
    Writing objects:  50% (31/61)
    Writing objects:  52% (32/61)
    Writing objects:  54% (33/61)
    Writing objects:  55% (34/61)
    Writing objects:  59% (36/61)
    Writing objects:  60% (37/61)
    Writing objects:  65% (40/61)
    Writing objects:  67% (41/61)
    Writing objects:  68% (42/61)
    Writing objects:  70% (43/61)
    Writing objects:  72% (44/61)
    Writing objects:  73% (45/61)
    Writing objects:  75% (46/61)
    Writing objects:  77% (47/61)
    Writing objects:  78% (48/61)
    Writing objects:  80% (49/61)
    Writing objects:  81% (50/61)
    Writing objects:  83% (51/61)
    Writing objects:  85% (52/61)
    Writing objects:  86% (53/61)
    Writing objects:  88% (54/61)
    Writing objects:  90% (55/61)
    Writing objects:  91% (56/61)
    Writing objects:  93% (57/61)
    Writing objects:  95% (58/61)
    Writing objects:  96% (59/61)
    Writing objects:  98% (60/61)
    Writing objects: 100% (61/61)
    Writing objects: 100% (61/61), 40.93 KiB | 0 bytes/s, done.
    Total 61 (delta 17), reused 0 (delta 0)
    remote: Compressing source files... done.[K
    remote: Building source:[K
    remote:
    remote: -----> Node.js app detected[K
    remote:
    remote: -----> Creating runtime environment[K
    remote:        [K
    remote:        NPM_CONFIG_LOGLEVEL=error[K
    remote:        NPM_CONFIG_PRODUCTION=true[K
    remote:        NODE_ENV=production[K
    remote:        NODE_MODULES_CACHE=true[K
    remote:
    remote: -----> Installing binaries[K
    remote:        engines.node (package.json):  unspecified[K
    remote:        engines.npm (package.json):   unspecified (use default)[K
    remote:        [K
    remote:        Resolving node version (latest stable) via semver.io...[K
    remote:        Downloading and installing node 0.12.7...[K
    remote:        Using default npm version: 2.11.3[K
    remote:
    remote: -----> Restoring cache[K
    remote:        Skipping cache (new runtime signature)[K
    remote:
    remote: -----> Building dependencies[K
    remote:        Pruning any extraneous modules[K
    remote:        Installing node modules (package.json)[K
    remote:        bluebird@2.10.0 node_modules/bluebird[K
    remote:        [K
    remote:        express@4.13.3 node_modules/express[K
    remote:        ├── escape-html@1.0.2[K
    remote:        ├── merge-descriptors@1.0.0[K
    remote:        ├── array-flatten@1.1.1[K
    remote:        ├── cookie@0.1.3[K
    remote:        ├── utils-merge@1.0.0[K
    remote:        ├── cookie-signature@1.0.6[K
    remote:        ├── methods@1.1.1[K
    remote:        ├── fresh@0.3.0[K
    remote:        ├── range-parser@1.0.2[K
    remote:        ├── vary@1.0.1[K
    remote:        ├── path-to-regexp@0.1.7[K
    remote:        ├── content-type@1.0.1[K
    remote:        ├── etag@1.7.0[K
    remote:        ├── parseurl@1.3.0[K
    remote:        ├── content-disposition@0.5.0[K
    remote:        ├── serve-static@1.10.0[K
    remote:        ├── depd@1.0.1[K
    remote:        ├── qs@4.0.0[K
    remote:        ├── on-finished@2.3.0 (ee-first@1.1.1)[K
    remote:        ├── finalhandler@0.4.0 (unpipe@1.0.0)[K
    remote:        ├── debug@2.2.0 (ms@0.7.1)[K
    remote:        ├── proxy-addr@1.0.8 (forwarded@0.1.0, ipaddr.js@1.0.1)[K
    remote:        ├── send@0.13.0 (destroy@1.0.3, statuses@1.2.1, ms@0.7.1, mime@1.3.4, http-errors@1.3.1)[K
    remote:        ├── type-is@1.6.8 (media-typer@0.3.0, mime-types@2.1.6)[K
    remote:        └── accepts@1.2.13 (negotiator@0.5.3, mime-types@2.1.6)[K
    remote:        [K
    remote:        body-parser@1.13.3 node_modules/body-parser[K
    remote:        ├── bytes@2.1.0[K
    remote:        ├── content-type@1.0.1[K
    remote:        ├── depd@1.0.1[K
    remote:        ├── qs@4.0.0[K
    remote:        ├── on-finished@2.3.0 (ee-first@1.1.1)[K
    remote:        ├── http-errors@1.3.1 (inherits@2.0.1, statuses@1.2.1)[K
    remote:        ├── raw-body@2.1.3 (unpipe@1.0.0)[K
    remote:        ├── debug@2.2.0 (ms@0.7.1)[K
    remote:        ├── type-is@1.6.8 (media-typer@0.3.0, mime-types@2.1.6)[K
    remote:        └── iconv-lite@0.4.11[K
    remote:
    remote: -----> Caching build[K
    remote:        Clearing previous node cache[K
    remote:        Saving 1 cacheDirectories (default):[K
    remote:        - node_modules[K
    remote:
    remote: -----> Build succeeded![K
    remote:        ├── bluebird@2.10.0[K
    remote:        ├── body-parser@1.13.3[K
    remote:        └── express@4.13.3[K
    remote:        [K
    remote: -----> Discovering process types[K
    remote:        Procfile declares types   -> (none)[K
    remote:        Default types for Node.js -> web[K
    remote:
    remote: -----> Compressing... done, 10.3MB[K
    remote: -----> Launching... done, v3[K
    remote:        https://intense-woodland-7710.herokuapp.com/ deployed to Heroku[K
    remote:
    remote: Verifying deploy.... done.[K
    To https://git.heroku.com/intense-woodland-7710.git
    * [new branch]      master -> master
    bash-3.2$ heroku ps:scale web=1
    Scaling dynos... done, now running web at 1:Free.
    bash-3.2$ heroku open
    Opening intense-woodland-7710... done
    bash-3.2$ exit
    exit

    Script done on Sun Sep 13 17:03:36 2015

## Test results

Running the tests are simple.

```
npm install
npm test
```

Transformation Code Challenge
Given the service is running
When I post application/xml
:white_check_mark: should produce a 400 code
:white_check_mark: should produce Json Body that has an error message
When I post text/xml
:white_check_mark: should produce a 400 code
:white_check_mark: should produce Json Body that has an error message
When I post xml as json
:white_check_mark: should produce a 400 code
:white_check_mark: should produce Json Body that has an error message
When I post an empty body
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that has no values
When I pass a Body that has valid data
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches
When I pass a body.payload that is missing
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file /Users/psenger/Documents/Dev/Transfor
mation-Code-Challenge/test/request/6.json
When I pass a body.payload that is undefined
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file /Users/psenger/Documents/Dev/Transfor
mation-Code-Challenge/test/request/7.json
When I pass a body.payload that is null
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file /Users/psenger/Documents/Dev/Transfor
mation-Code-Challenge/test/request/8.json
When I pass a body.payload that is object literal
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file /Users/psenger/Documents/Dev/Transfor
mation-Code-Challenge/test/request/9.json
When I pass a body.payload that is number
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/10.json
When I pass a body.payload that is string
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/11.json
When I pass a body.payload that is float
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/12.json
When I pass a body.payload that is boolean
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/15.json
When I pass a body.payload that is empty
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/13.json
When I pass a body.payload contains that is null
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/19.json
When I pass a body.payload contains that is empty object literal
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/21.json
When I pass a body.payload contains that is number
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/22.json
When I pass a body.payload contains that is string
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/23.json
When I pass a body.payload contains that is float
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/24.json
When I pass a body.payload contains that is boolean
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/25.json
When I pass a body.payload contains that is mix of null, undefined, empty, object, literal, number, string, float
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/26.json
When I pass a body.payload contains that is mix of null, empty object literal, number, string, float, valid object
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/27.json
When I pass a show that is missing all valid values
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/31.json
When I pass a show.drm that is null
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/36.json
When I pass a show.drm that is object
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/37.json
When I pass a show.drm that is number
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/38.json
When I pass a show.drm that is string
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/39.json
When I pass a show.drm that is valid true that will produce results
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/40.json
When I pass a show.drm that is valid false that will not produce results
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/41.json
When I pass a show.episodeCount that is undefined
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/44.json
When I pass a show.episodeCount that is null
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/45.json
When I pass a show.episodeCount that is object
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/46.json
When I pass a show.episodeCount that is string
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/47.json
When I pass a show.episodeCount that is valid number 0
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/48.json
When I pass a show.episodeCount that is valid number 5
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/49.json
When I pass a valid final mixed payload
:white_check_mark: should produce a 200 code
:white_check_mark: should produce a JSON body that matches test repose in file test/request/50.json

## API

### Members
<dl>
<dt><a href="#controller_validatePayload">controller:validatePayload</a> ⇒ <code>*</code></dt>
<dd><p>Validate the Payload Controller</p>
</dd>
<dt><a href="#controller_convertPayload">controller:convertPayload</a> ⇒ <code>*</code></dt>
<dd><p>Convert the Payload Controller</p>
</dd>
</dl>
### Functions
<dl>
<dt><a href="#notFoundHandler">notFoundHandler(req, res, next)</a> ⇒ <code>*</code></dt>
<dd><p>Not Found Handler</p>
</dd>
<dt><a href="#genericErrorHandler">genericErrorHandler(req, res, next)</a> ⇒ <code>*</code></dt>
<dd><p>Generic Error Handler</p>
</dd>
</dl>
<a name="controller_validatePayload"></a>
### controller:validatePayload ⇒ <code>\*</code>
Validate the Payload Controller

**Kind**: global variable  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>object</code> | express error object |
| req | <code>object</code> | express request object @see [http://expressjs.com/api.html#req](http://expressjs.com/api.html#req) for further information. |
| res | <code>object</code> | express response object @see [http://expressjs.com/api.html#res](http://expressjs.com/api.html#res) for further information. |
| next | <code>function</code> | express callback. |

**Example**  
```JavaScript
var router = require('express').Router();
router.post('/', controller.validatePayload);
```

-

<a name="controller_convertPayload"></a>
### controller:convertPayload ⇒ <code>\*</code>
Convert the Payload Controller

**Kind**: global variable  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>object</code> | express error object |
| req | <code>object</code> | express request object @see [http://expressjs.com/api.html#req](http://expressjs.com/api.html#req) for further information. |
| res | <code>object</code> | express response object @see [http://expressjs.com/api.html#res](http://expressjs.com/api.html#res) for further information. |
| next | <code>function</code> | express callback. |

**Example**  
```JavaScript
var router = require('express').Router();
router.post('/', controller.convertPayload);
```

-

<a name="notFoundHandler"></a>
### notFoundHandler(req, res, next) ⇒ <code>\*</code>
Not Found Handler

**Kind**: global function  
**Api**: private  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>object</code> | express request object @see [http://expressjs.com/api.html#req](http://expressjs.com/api.html#req) for further information. |
| res | <code>object</code> | express response object @see [http://expressjs.com/api.html#res](http://expressjs.com/api.html#res) for further information. |
| next | <code>function</code> | express callback. |

**Example**  
```JavaScript
router.use ( notFoundHandler );
```

-

<a name="genericErrorHandler"></a>
### genericErrorHandler(req, res, next) ⇒ <code>\*</code>
Generic Error Handler

**Kind**: global function  
**Api**: private  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>object</code> | express request object @see [http://expressjs.com/api.html#req](http://expressjs.com/api.html#req) for further information. |
| res | <code>object</code> | express response object @see [http://expressjs.com/api.html#res](http://expressjs.com/api.html#res) for further information. |
| next | <code>function</code> | express callback. |

**Example**  
```JavaScript
router.use ( genericErrorHandler );
```

-

