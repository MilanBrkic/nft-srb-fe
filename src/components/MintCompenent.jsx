import React, { Component } from 'react';
import { mint } from '../ethereum';
import backendHttpClient from '../http-client/BackendHttpClient';
import { store } from '../services/NFTStorage';
import { checkAspectRatio, checkIfFileIsAnImage } from '../helper';
import { parseEther } from 'ethers/lib/utils';
import './css/mint.css'
export default class MintComponent extends Component {
  constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.fileInput = React.createRef();
    this.state = {
      image: {},
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

      const shouldMint = await this.checkIfMinted(image);
      if (shouldMint) {
        this.mint(image, this.state.name.trim(), this.state.description.trim(), this.state.price.trim()).catch((error) => {
          console.log(`Failed while minting | Reason: ${error.message}`);
        });
        alert('Minting should take a few moments. Please wait...');
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      alert(`Error: ${error.message}`)
    }
  };

  /*
  checkFields = ()=>{
    if(this.state.name.length>20) // TODO warn msg

    if(this.state.price>1000) // TODO warn msg
    if(this.state.description.length>140) // TODO warn msg
  }
  */


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
    this.resetFileState();
    const nftstorageResponse = await store(image, name, description);
    console.log('Nft stored to ipfs');

    try {
      await mint(nftstorageResponse.url, parseEther(price)._hex);
      await this.notifyOfMintCompletion(image, nftstorageResponse, Number(price));
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
    this.inputDescription.value = '';
    this.inputName.value = '';
    this.inputPrice.value = '';
    this.state.name = '';
    this.state.price = '';
    this.state.description = '';
    this.forceUpdate();
  }

  render() {
    return (
      <div className="container-mint">
          <h3 className='bold-font mint-header'> Mint </h3>
            <input type="file" className="mint-file" onChange={this.onFileChange} ref={this.fileInput} />
          <label htmlFor="nft-name">Name</label>
          <input type="text" name="" ref={el=>this.inputName = el} id="nft-name" onChange={(event)=>{
            this.state.name = event.target.value;
          }}/>

          <label htmlFor="nft-price">Price in ETH</label>
          <input type="text" name="" ref={el=>this.inputPrice = el} id="nft-price" onChange={(event)=>{
            this.state.price = event.target.value;
          }}/>

          <label htmlFor="nft-description">Description</label>
          <textarea name="" ref={el=>this.inputDescription = el} id="nft-description" cols="30" rows="3"
          
          onChange={(event)=>{
            this.state.description = event.target.value;
          }}/>
          <div className='mint-btn-div'>
            <button className="mint-btn" onClick={this.handleClick}>
              Mint
            </button>
          </div>
          
      </div>
    );
  }
}
