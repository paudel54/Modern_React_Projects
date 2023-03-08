import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import "antd/dist/antd.css"

// importing reducerroot
import rootReducer from './reducers/index'

// REDUX
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// store
const store = createStore(rootReducer, composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>

);

