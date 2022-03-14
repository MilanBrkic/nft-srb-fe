import React from 'react';
import Constants from '../constants/Constants';
import axios from 'axios';

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
            const url = `${Constants.BACKEND_URL}/sign-in`;
            const user = await axios.post(url, {accounts})
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