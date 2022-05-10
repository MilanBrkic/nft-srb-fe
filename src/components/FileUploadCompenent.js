import React, { Component } from 'react';
import { mint, requestAccounts } from '../ethereum';
import backendHttpClient from '../http-client/BackendHttpClient';
import { store } from '../services/NFTStorage';

export default class FileUploadComponent extends Component {
  constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.fileInput = React.createRef();
    this.state = {
      image: {}
    };
  }

  onFileChange(e) {
    this.setState({ image: e.target.files[0] });
  }

  handleClick = async () => {
    const image = this.state.image;
    if (image.name) {
      this.resetFileState();
      const shouldMint = await this.checkIfMinted(image);
      if (shouldMint) {
        this.mint(image, 'name', 'descriptor').catch((error) => {
          console.log(`Failed while minting | Reason: ${error.message}`);
        });
        alert('Minting should take a few moments. Please wait...');
      }
    } else {
      alert('You did not enter an image');
    }
  };

  checkIfMinted = async (image) => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      await backendHttpClient.post('/image/status', formData);
      return true;
    } catch (error) {
      if (error.response) {
        alert(`Error minting image: ${error.response.data}`);
      } else {
        console.log(error);
        alert(`Error minting image: ${error}`);
      }
      return false;
    }
  };

  mint = async (image, name, description) => {
    const response = await store(image, name, description);
    await mint(response.url);
    console.log(response);
  };

  helpFunction = async () => {
    const image = this.state.image;
    if (image.name) {
      this.resetFileState();
      const accounts = await requestAccounts();
      const formData = new FormData();
      formData.append('image', image);
      formData.append('account', accounts[0]);
      try {
        await backendHttpClient.post('/mint', formData);
        alert('Image will mint in a few minutes');
      } catch (error) {
        if (error.response) {
          console.log(error.response);
          alert(`Error minting image: ${error.response.data}`);
        } else {
          console.log(error);
          alert(`Error minting image: ${error}`);
        }
      }
    } else {
      alert('You did not enter an image');
    }
  };
  resetFileState() {
    this.fileInput.current.value = null;
    this.setState({ image: null });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h3> Mint </h3>
          <div className="form-group">
            <input type="file" onChange={this.onFileChange} ref={this.fileInput} />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" onClick={this.handleClick}>
              Mint
            </button>
          </div>
        </div>
      </div>
    );
  }
}
