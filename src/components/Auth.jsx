import React from 'react';
import backendHttpClient from '../http-client/BackendHttpClient';
import { requestAccounts } from '../ethereum';
import {  getAddress, setAccessToken, setAddress, removeAllCookies } from '../services/Cookie';
class Auth extends React.Component {
  handleOnConnect = async () => {
    const url = '/auth';
    const accounts = await requestAccounts();
    try {
      const response = await backendHttpClient.post(url, { accounts });
      console.log(`Welcome user ${response.address}`);
      this.auth(accounts[0], response.accessId);
    } catch (error) {
      console.log(`Error logging user in ${error.message}`);
    }
  };

  handleOnDisconnect = async()=>{
    removeAllCookies();
    this.props.onAuth();
    this.forceUpdate();
  }
  auth = (address, accessId)=>{
    setAccessToken(accessId);
    setAddress(address);
    this.props.onAuth();
    this.forceUpdate();
  }

  render() {
    return ( 
      <div>
        {
          getAddress() ?
          <button id="auth-btn" onClick={this.handleOnDisconnect}>Disconnect</button> :
          <button id="auth-btn" onClick={this.handleOnConnect}>Connect</button> 
        }
      </div>
    )
  }
}
export default Auth;
