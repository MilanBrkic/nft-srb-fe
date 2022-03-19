import React from 'react';
import backendHttpClient from '../http-client/BackendHttpClient';
import {requestAccounts} from '../ethereum'

class SigninButton extends React.Component{

     handleClick = async () =>{
        const url = '/sign-in';
        const accounts = await requestAccounts()

        const user = await backendHttpClient.post(url,{accounts})
        console.log(`Welcome user ${user.address}`)
    }
    
    render(){
        return(
            <button onClick={this.handleClick}>
                Sign-in
            </button>
        )
    }
}
export default SigninButton