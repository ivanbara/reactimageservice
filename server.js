import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'

import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';
import express from 'express';
import uploads from './routes/uploads';
import routes from './routes/mainrouter';

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies
app.use(multer({dest:'./uploads/'}).array('recfile'));

app.use(express.static('public'));
app.use('/api/uploads',  uploads);


app.get('*', (req, res) => {
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message)
    
    } else if (props) {

      const appHtml = renderToString(<RouterContext {...props}/>);
      const html = `
        <!DOCTYPE html>
        <html>
         <head>
         <title>Isomorphimg</title>
         <link rel="stylesheet" type="text/css" href="/css/styles.css">
         <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"> 
         </head>
         <body>
         <div id="app" class="wrapper">${appHtml}</div>
         <script src="/js/react-app.js"></script>
         </body>
        </html>
        `;
      // send to the browser
      res.send(html);
    } else {
      // no errors, no redirect, return not found
      res.status(404).send('Not Found')
    }
  });
})


const server = app.listen(3000, () => {
  let port = server.address().port;
  let date = Date();
console.log(`${date} --- Server running at http://localhost:${port}`);
});
