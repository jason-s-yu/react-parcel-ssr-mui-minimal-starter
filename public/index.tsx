import React from 'react';
import ReactDOM from 'react-dom';

import { App } from '../src/app';

if (process.env.DEVELOPMENT_MODE) {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );

  (module as any).hot.accept();
} else {
  ReactDOM.hydrate(
    <App />,
    document.getElementById('root')
  );
}
