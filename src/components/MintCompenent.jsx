import React, { Component } from 'react';
import { mint } from '../ethereum';
import backendHttpClient from '../http-client/BackendHttpClient';
import { store } from '../services/NFTStorage';
import { checkAspectRatio, checkIfFileIsAnImage } from '../helper';
import { parseEther } from 'ethers/lib/utils';
import { withAlert } from 'react-alert'
import './css/mint.css'
class MintComponent extends Component {
  constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.fileInput = React.createRef();
    this.state = {
      image: {},
      name: '',
      price: '',
      description: ''
    };
  }

  onFileChange(e) {
    this.setState({ image: e.target.files[0] });
  }
  

  handleClick = async () => {
    const isGood = await this.checkFields();
    if(!isGood) return;

    try {
      const image = this.state.image;
  
      const shouldMint = await this.checkIfMinted(image);
      if (shouldMint) {
        this.mint(image, this.state.name.trim(), this.state.description.trim(), this.state.price.trim()).catch((error) => {
          console.log(`Failed while minting | Reason: ${error.message}`);
        });
        this.props.alert.info('Minting should take a few moments.');
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      this.props.alert.error(`${error.message}`)
    }
  };

  
  checkFields = async()=>{
    if(!this.state.image.name){
      this.props.alert.error("No image chosen");
      return false;
    }

    if(!checkIfFileIsAnImage(this.state.image)){
      this.props.alert.error("Must be an image")
      return false;
    }

    const isSquare = await checkAspectRatio(this.state.image)
    if(!isSquare){
      this.props.alert.error("Must be 1x1 aspect ratio")
      return false;
    }

    if(this.state.name.length <2 || this.state.name.length>20){
      this.props.alert.error("Name must be between 2 and 20 characters")
      return false;
    }

    if(isNaN(this.state.price)){
      this.props.alert.error("You did not enter a number for price")
      return false;
    }

    const price = Number(this.state.price);

    if(price>50000 || price<0.001){
      this.props.alert.error("Please enter a price between 0.001 ETH and 50000ETH");
      return false;
    }


    if(this.state.description.length <2 || this.state.description.length>100){
      this.props.alert.error("Description must be between 2 and 100 characters")
      return false;
    }

    return true;
  }
  
  checkIfMinted = async (image) => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      await backendHttpClient.post('/nft/status', formData);
      return true;
    } catch (error) {
      if (error.response) {
        this.props.alert.error(`Error minting image: ${error.response.data}`);
      } else {
        console.log(error);
        this.props.alert.error(`Error minting image: ${error}`);
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
      this.props.alert.info(`Nft ${name} minted`);
    } catch (error) {
      console.error(`Minting failed: ${error.message}`);
      this.props.alert.error("Minting failed")
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
        this.props.alert.error(`Error sending unlock request: ${error.response.data}`);
      } else {
        console.log(error);
        this.props.alert.error(`Error sending unlock request: ${error}`);
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

export default withAlert()(MintComponent)