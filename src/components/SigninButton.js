import React from 'react';
import backendHttpClient from '../http-client/BackendHttpClient';

class SigninButton extends React.Component{

     handleClick = async () =>{
        const chainId = await window.ethereum.request({
            method:"eth_chainId"
        })
        
        if(parseInt(chainId,16)===31337){
            console.log("Connected to the right chain");
            const accounts = await window.ethereum.request({
                method:"eth_requestAccounts"
            })
            const url = '/sign-in';
            const user = await backendHttpClient.post(url,{accounts})
            console.log(`Welcome user ${user.address}`)
        } 
        else{
            console.log("Connected to the wrong chain");
        } 
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