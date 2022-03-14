import React, { Component } from 'react';
import backendHttpClient from '../http-client/BackendHttpClient';
export default class FileUploadComponent extends Component {
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.state = {
            image: {}
        }
    }
    
    onFileChange(e){
        this.setState({image:e.target.files[0]})
    }

    handleClick = async () =>{
        const formData = new FormData();
        formData.append('image', this.state.image)
        await backendHttpClient.post("\\mint", formData);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                        <h3>React File Upload</h3>
                        <div className="form-group">
                            <input type="file" onChange={this.onFileChange}/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" onClick={this.handleClick}>Upload</button>
                        </div>
                </div>
            </div>
        )
    }
}