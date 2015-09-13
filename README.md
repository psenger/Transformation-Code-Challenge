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

## Testing

This application uses Mocah BDD style testing. Tests can be found in the directory ```test/``` Code coverage is located in

    npm run test

## Generate Documentation

Executing the following NPM command will read the JavaScript files and replace the README.md file with updated JSDocs. The main template is located in ```doc-template/README.md.hbs``` and is a Handlebars Template

    npm run docs

## API

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

