import React from 'react';
import backendHttpClient from '../http-client/BackendHttpClient';
import { requestAccounts } from '../ethereum';

class Auth extends React.Component {
  handleClick = async () => {
    const url = '/auth';
    const accounts = await requestAccounts();
    try {
      const user = await backendHttpClient.post(url, { accounts });
      console.log(`Welcome user ${user.address}`);
    } catch (error) {
      console.log(`Error logging user in ${error.message}`);
    }
  };

  render() {
    return <button id="auth-btn" onClick={this.handleClick}>Authenticate</button>;
  }
}
export default Auth;
