import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { getAddress, removeAllCookies } from './services/Cookie';
import {getChainId} from './ethereum'
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Constants from './constants/Constants';

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 4000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
};

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </React.StrictMode>,

  document.getElementById('root')
);

window.ethereum?.on('accountsChanged', function (changedAddress) {
  const previousAddress = getAddress();
  if (previousAddress) {
    if (changedAddress !== previousAddress) {
      alert("Wallet changed, we'll need to disconnect you, please reconnect again");
      removeAllCookies();
      window.location.reload();
    }
  }
});

window.ethereum?.on('chainChanged', async () => {
  const chainId = await getChainId();
  if(parseInt(chainId, 16) !== Constants.EXPECTED_CHAIN_ID){
    alert("Chain changed, we'll need to disconnect you, please reconnect again");
    removeAllCookies();
    window.location.reload();
  }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
