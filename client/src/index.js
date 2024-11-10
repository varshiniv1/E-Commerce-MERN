import React from 'react';
import ReactDOM from 'react-dom/client'; // Update import for createRoot
import Routes from './routes';
import Loader from './utils/loader.js'

import './resources/styles/styles.css';

import { Provider } from 'react-redux';
import ReduxStore from './store';

// Get the root element from the DOM
const rootElement = document.getElementById('root');

// Create a root and render the app
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={ReduxStore()}>
      <Routes />
    </Provider>
  </React.StrictMode>
);
