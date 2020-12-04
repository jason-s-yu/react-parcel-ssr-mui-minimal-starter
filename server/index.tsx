import compression from 'compression';
import express from 'express';
import path from 'path';
import fs from 'fs';
import React from 'react';
import ReactDOM from 'react-dom/server';
import cheerio from 'cheerio';
import { Helmet } from 'react-helmet';
import { StaticRouter } from 'react-router-dom';

import { App } from '../src/app';

const templatePath = path.join(__dirname, '..', 'public', 'index.html');
const HTML_TEMPLATE = fs.readFileSync(templatePath).toString();

const generateHtml = (markup: string) => {
  const helmet = Helmet.renderStatic();

  const $template = cheerio.load(HTML_TEMPLATE);
  $template('head').append(helmet.title.toString() + helmet.meta.toString() + helmet.link.toString());
  $template('#app').html(markup);

  return $template.html();
}

const app = express();

app.use(compression());

app.use('/dist', express.static(`${__dirname}/../public`));

app.get('/*', (req, res) => {
  const context = {};
  const router = <StaticRouter location={req.originalUrl} context={context}><App /></StaticRouter>;
  const markup = ReactDOM.renderToString(router);

  // If react-router is redirecting, do it on the server side
  if ((context as any).url) {
    res.redirect(301, (context as any).url);
  } else {
    // Format the HTML using the template and send the result
    const html = generateHtml(markup);
    res.send(html);
  }
});

app.use('*', (req, _) => console.log(`Request received at ${req.path}.`));

const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log(`Listening on port ${port}..., dirname: ${path.join(__dirname, '..', 'public')}`);
});
