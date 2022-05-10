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
    try {
      const formData = new FormData();
      formData.append('image', image);
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
    const nftstorageResponse = await store(image, name, description);
    // await Promise.all([mint(nftstorageResponse.url), this.notifyOfMintCompletion(image, nftstorageResponse)]);
    await this.notifyOfMintCompletion(image, nftstorageResponse)
  };

  notifyOfMintCompletion = async (image, nftstorageResponse) => {
    const accounts = await requestAccounts();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('account', accounts[0]);
    formData.append('ipnft', nftstorageResponse.ipnft);
    formData.append('url', nftstorageResponse.url);
    try {
      await backendHttpClient.post('/mint', formData);
      console.log('Backend notified of image being minted');
    } catch (error) {
        if (error.response) {
            console.log(error.response);
            alert(`Error minting image: ${error.response.data}`);
        } else {
            console.log(error);
            alert(`Error notifying backend: ${error}`);
        }
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
