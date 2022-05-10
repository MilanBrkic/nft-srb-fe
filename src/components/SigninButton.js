import React from 'react';
import backendHttpClient from '../http-client/BackendHttpClient';
import { requestAccounts } from '../ethereum';

class SigninButton extends React.Component {
  handleClick = async () => {
    const url = '/sign-in';
    const accounts = await requestAccounts();
    try {
      const user = await backendHttpClient.post(url, { accounts });
      console.log(`Welcome user ${user.address}`);
    } catch (error) {
      console.log(`Error logging user in ${error.message}`);
    }
  };

  render() {
    return <button onClick={this.handleClick}>Sign-in</button>;
  }
}
export default SigninButton;
