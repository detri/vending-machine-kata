import React from 'react';
import ReactDOM from 'react-dom';
import VendingMachine from './components/VendingMachine';
import * as serviceWorker from './serviceWorker';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: lightblue;
  }
`;

ReactDOM.render(
  <React.Fragment>
    <GlobalStyle />
    <VendingMachine />
  </React.Fragment>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
