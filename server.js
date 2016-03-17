'use strict';

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactApp = require("./es5-lib/ReactApp").default;

var cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());

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

app.get('/bears', function(req, res){
	res.json({data: [{"id":"id g",
		"url": "https:\/\/scontent.cdninstagram.com\/t51.2885-19\/11007937_381359188712407_493937690_a.jpg",
		"src": "https:\/\/scontent.cdninstagram.com\/t51.2885-15\/s320x320\/e35\/12819137_765877360181023_2038294020_n.jpg?ig_cache_key=MTIwODA3ODQxMDU5ODEyODE3NQ%3D%3D.2",
		"title": "pic"},
		{"id":"id d",
		"url": "https:\/\/scontent.cdninstagram.com\/t51.2885-19\/11007937_381359188712407_493937690_a.jpg",
		"src": "https:\/\/scontent.cdninstagram.com\/t51.2885-19\/11007937_381359188712407_493937690_a.jpg",
		"title": "pic"}]
		});
});

const server = app.listen(3000, () => {
  let port = server.address().port;
  let date = Date();
console.log(`Server running at http://localhost:${port} ${date}`);
});
