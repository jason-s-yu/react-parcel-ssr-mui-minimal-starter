import React from 'react';

import { Button } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

export const App = () => {
  return (
    <BrowserRouter>
      <Helmet defaultTitle='Hello World'>
        <meta charSet='utf-8' />
      </Helmet>
      <Switch>
        <Route exact path='/' render={() => <p>Hello</p>} />
        <Route exact path='/test' render={() => <h1>Hello 2</h1>} />
      </Switch>
    </BrowserRouter>
  );
}