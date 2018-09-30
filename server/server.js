import React from 'react';
import { renderToString } from 'react-dom/server';
import buildPath from '../build/asset-manifest.json';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const favicon = require('connect-favicons');

app.use(favicon('./build'));
app.use(cookieParser());
app.use(bodyParser.json());

app.use((req, res, next) => {
  if (req.url.startsWith('/static/')) {
    return next();
  }
  const frontComponents = renderToString(
    <div className="App">
      <header className="App-header">
        <img src={buildPath['static\\media\\logo.svg']} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  );
  const _frontHtml = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
      <title>React App</title>
      <link rel="stylesheet" type="text/css" href="/${buildPath['main.css']}">
    </head>
      <body>
        <div id="root">${frontComponents}</div>
        <script src="/${buildPath['main.js']}"></script>
      </body>
    </html>`;
  res.send(_frontHtml);
});
app.use('/', express.static(path.resolve('build')));

app.listen('9000', function() {
  console.log('open Browser http://localhost:9000');
});
