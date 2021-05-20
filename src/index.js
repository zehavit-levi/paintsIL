import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Parse from 'parse'

Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
  'FXaD5rsyoj4aYU8D3oLjTcZjVKzlwYkRxwMm71v3', // This is your Application ID
  'RXHI6S4G631KP66jgzwcgqqNnDQSYwScuyNXr90g' // This is your Javascript key
);
ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
