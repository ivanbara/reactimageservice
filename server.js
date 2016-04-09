import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'

import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';
import express from 'express';
import uploads from './routesServer/uploads';
import routes from './routes/mainrouter';

const app = express();
app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies
app.use(multer({dest:'./uploads/'}).array('recfile'));

//app.use('/static', express.static('public'));
app.use(express.static('public'));
app.use('/api/uploads',  uploads);

//app.use(routes);

app.get('*', (req, res) => {
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirect) {
      // we haven't talked about `onEnter` hooks on routes, but before a
      // route is entered, it can redirect. Here we handle on the server.
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      // if we got props then we matched a route and can render
      const appHtml = renderToString(<RouterContext {...props}/>);
      const html = `
        <!DOCTYPE html>
        <html>
         <head>
         <title>Isomorphimg</title>
         <link rel="stylesheet" type="text/css" href="css/styles.css">
         <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"> 
         </head>
         <body>
         <div id="app">${appHtml}</div>
         <script src="js/react-app.js"></script>
         </body>
        </html>
        `;
      // send to the browser
      res.send(html);
    } else {
      // no errors, no redirect, we just didn't match anything
      res.status(404).send('Not Found')
    }
  });
})

/*
app.get('/', (req, res) => {
  // instantiate the React component
  const rApp = React.createFactory(MainPage)({});

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

*/

const server = app.listen(3000, () => {
  let port = server.address().port;
  let date = Date();
console.log(`${date} --- Server running at http://localhost:${port}`);
});
