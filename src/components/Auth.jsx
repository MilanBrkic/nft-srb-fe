import React from 'react';
import backendHttpClient from '../http-client/BackendHttpClient';
import { requestAccounts } from '../ethereum';
import {trimAddress} from '../helper'
class Auth extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: "Authenticate",
    }
  }
  handleClick = async () => {
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

  auth = (address, accessId)=>{
    this.props.onAuth(accessId);
    this.setState({text: trimAddress(address)});
    this.forceUpdate();
  }

  render() {
    return <button id="auth-btn" onClick={this.handleClick}>{this.state.text}</button>;
  }
}
export default Auth;
