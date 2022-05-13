import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { getAddress, removeAllCookies } from './services/Cookie';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

window.ethereum.on('accountsChanged', function (changedAddress) {
  const previousAddress = getAddress();
  if(previousAddress){
    if(changedAddress!==previousAddress){
      alert("Wallet changed, we'll need to disconnect you, please reconnect again");
      removeAllCookies();
      window.location.reload();
    }
  }
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
