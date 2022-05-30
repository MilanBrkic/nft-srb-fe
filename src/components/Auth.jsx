import React from 'react';
import backendHttpClient from '../http-client/BackendHttpClient';
import { requestAccounts, checkForChain } from '../ethereum';
import {  getAddress, setAccessToken, setAddress, removeAllCookies } from '../services/Cookie';
import { Redirect } from 'react-router-dom';
import {trimAddress} from '../helper'
import {withAlert} from 'react-alert'
class Auth extends React.Component {
  handleOnConnect = async () => {    
    const proceed = await checkForChain(this.props.alert);
    if(!proceed){
      return;
    }

    const accounts = await requestAccounts();
    try {
      const url = '/auth';
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
          <div className='when-connected-div'>
            <button className='bold-font auth-btn' onClick={this.handleOnDisconnect}>disconnect</button>
            <button className=' bold-font wallet-btn'>{trimAddress(getAddress())}</button>
          </div>
           :
          <div>
            <button className="bold-font auth-btn" onClick={this.handleOnConnect}>connect</button> 
            <Redirect to="/"/>
          </div>
        }
      </div>
    )
  }
}
export default withAlert()(Auth);
