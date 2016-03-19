'use strict';

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactApp = require("./es5-lib/ReactApp").default;

const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const express = require('express');
const uploads = require('./routes/uploads');
const app = express();
app.use(cors());




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(multer({dest:'./uploads/'}).array('recfile'));



//app.use('/static', express.static('public'));
app.use(express.static('public'));

app.use('/api/uploads',  uploads);



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
		 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">	
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



const server = app.listen(3000, () => {
  let port = server.address().port;
  let date = Date();
console.log(`Server running at http://localhost:${port} ${date}`);
});
