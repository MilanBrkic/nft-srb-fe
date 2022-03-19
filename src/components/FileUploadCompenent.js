import React, { Component } from 'react';
import { requestAccounts } from '../ethereum';
import backendHttpClient from '../http-client/BackendHttpClient';
export default class FileUploadComponent extends Component {
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.fileInput = React.createRef();
        this.state = {
            image: {}
        }
    }
    
    onFileChange(e){
        this.setState({image:e.target.files[0]})
    }

    handleClick = async () =>{
        const image =  this.state.image;
        if(image){
            this.resetFileState();
            const accounts = await requestAccounts();
            const formData = new FormData();
            formData.append('image', image)
            formData.append('account', accounts[0])
            await backendHttpClient.post("/mint", formData);
        }
        else{
            alert("You did not enter an image")
        }
    }

    resetFileState(){
        this.fileInput.current.value = null
        this.setState({image:null})
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                        <h3> Mint </h3>
                        <div className="form-group">
                            <input type="file" onChange={this.onFileChange} ref={this.fileInput}/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" onClick={this.handleClick}>Mint</button>
                        </div>
                </div>
            </div>
        )
    }
}