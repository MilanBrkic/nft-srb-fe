import React from 'react';
import Constants from '../constants/Constants';
import axios from 'axios';

class SigninButton extends React.Component{
     handleClick = async () =>{
        const url = `${Constants.BACKEND_URL}/sign-in`;
        const response = await axios.post(url);
        console.log(response.data);
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