'use strict';

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactApp = require("./es5-lib/ReactApp").default;

var cors = require('cors');
const express = require('express');
const app = express();

app
.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
})
.options('*', function(req, res, next){
    res.end();
})
;

//app.use('/static', express.static('public'));
app.use(express.static('public'));


app.get('/', (req, res) => {
  // instantiate the React component
  const rApp = React.createFactory(ReactApp)({});

  // write out the component to HTML string
  const reactHtml = ReactDOMServer.renderToString(rApp);

  // create final HTML to ship using string templating
  // by injecting the react HTML into this string
  const html = `
    <!DOCTYPE html>
    <html>
     <head>
     <title>Isomorphimg</title>
     <link rel="stylesheet" type="text/css" href="css/styles.css">
     </head>
     <body>
     <div id="app">${reactHtml}</div>
     <script src="js/react-app.js"></script>
     </body>
    </html>
  `;
  // send to the browser
  res.send(html);
});

/*
router.get('/', function(req, res){

});
*/

const server = app.listen(3000, () => {
  let port = server.address().port;
  let date = Date();
console.log(`Server running at http://localhost:${port} ${date}`);
});
