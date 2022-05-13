import React, { Component } from 'react';
import { mint } from '../ethereum';
import backendHttpClient from '../http-client/BackendHttpClient';
import { store } from '../services/NFTStorage';
import { checkAspectRatio, checkIfFileIsAnImage } from '../helper';

export default class MintComponent extends Component {
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
    try {
      if(!image.name) throw Error("No image chosen");      
      checkIfFileIsAnImage(image);
      await checkAspectRatio(image)

      this.resetFileState();
      const shouldMint = await this.checkIfMinted(image);
      if (shouldMint) {
        this.mint(image, 'name', 'descriptor', 100).catch((error) => {
          console.log(`Failed while minting | Reason: ${error.message}`);
        });
        alert('Minting should take a few moments. Please wait...');
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      alert(`Error: ${error.message}`)
    }
  };



  checkIfMinted = async (image) => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      await backendHttpClient.post('/nft/status', formData);
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

  mint = async (image, name, description, price) => {
    const nftstorageResponse = await store(image, name, description);
    console.log('Nft stored to ipfs');
    try {
      await mint(nftstorageResponse.url, price) 
      await this.notifyOfMintCompletion(image, nftstorageResponse, price);
      alert(`Nft ${name} minted`);
    } catch (error) {
      console.error(`Minting failed: ${error.message}`);
      alert("Minting failed")
      await this.unlockNft(image);
    }
  };

  notifyOfMintCompletion = async (image, nftstorageResponse, price) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('ipnft', nftstorageResponse.ipnft);
    formData.append('price', price);

    try {
      await backendHttpClient.post('/mint', formData);
      console.log('Backend notified of image being minted');
    } catch (error) {
      throw Error(`Error notifying Backend | Reason: ${error.message}`)
    }
  };
  unlockNft = async(image)=>{
    const formData = new FormData();
    formData.append('image',image);
    try {
      await backendHttpClient.post('/nft/unlock', formData);
    } catch (error) {
      if (error.response) {
        alert(`Error sending unlock request: ${error.response.data}`);
      } else {
        console.log(error);
        alert(`Error sending unlock request: ${error}`);
      }
    }
  }


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
