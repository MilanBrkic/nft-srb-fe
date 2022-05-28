import {Button, Modal} from 'react-bootstrap'
import React from 'react';
import './css/modal.css'
import {update} from '../ethereum'
import {withAlert} from 'react-alert'

class NftModal extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          show: props.show,
          nft: props.nft,
          changedNft: {...props.nft}
        }
    }
  
    componentDidUpdate(){
      this.state.show = this.props.show;
    }
    handleClose = () => {
      this.state.show = false
      this.state.changedNft = {...this.state.nft};
      this.forceUpdate();
    }
    handleShow = () => {
      this.state.show = true
      this.forceUpdate();
    }

    onSaleClick = ()=>{
      this.state.changedNft.forSale = !this.state.changedNft.forSale;
      this.forceUpdate();
    }

    handleSave = async ()=>{
      const proceed = this.areInputsValid();
      if(!proceed) return;

      const price = this.state.changedNft.price;
      const forSale = this.state.changedNft.forSale;
      const tokenId = this.state.changedNft.tokenId;
      
      try {
        await update(tokenId, forSale, price)
      } catch (error) {
        console.error(error);        
      }

      this.props.onUpdate(forSale, Number(price));
      this.handleClose();
    }

    areInputsValid = ()=>{
      if(this.state.changedNft.forSale===this.state.nft.forSale && this.state.changedNft.price===this.state.nft.price){
        this.props.alert.error("You did not change any value");
        return false;
      }

      if(isNaN(this.state.changedNft.price)){
        this.props.alert.error("You did not enter a number for price")
        return false;
      }

      const price = Number(this.state.changedNft.price);

      if(price>50000 || price<0.001){
        this.props.alert.error("Please enter a price between 0.001 ETH and 50000ETH");
        return false;
      }
      return true;
    }
    
    render(){
        return (
            <>
              <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <h1 className='bold-font'>{this.state.nft.name}</h1>
                </Modal.Header>
                <Modal.Body>
                  <div className="card-modal">
                    <img id='nft-modal' src={`${this.state.nft.googleId}`} alt={`${this.state.nft.name}`} />  
                    <div className="container-modal">
                    <p className='description-label-modal label-modal'><i>Description:</i></p>
                    <p className='description-modal'>{this.state.nft.description}</p>
                    <p className='price-label-modal label-modal'><i>Price:</i></p>
                          <input className='price-modal' defaultValue={`${this.state.changedNft.price}`} type='text' 
                          onChange={(event)=>{
                            this.state.changedNft.price = event.target.value;
                          }}/>
                            <p className='eth-modal'>ETH</p>
                            <div onClick={this.onSaleClick}
                                className={`sale-label-modal ${this.state.changedNft.forSale ? 'for-sale-label' : 'not-for-sale-label-modal'}`}>
                                {this.state.changedNft.forSale ? "For Sale" : "Not For Sale"}
                            </div>
                            <p className='hint-modal'>Hint: toggle "For Sale" button to change the status</p>
                    </div>                  
                    </div>      
                </Modal.Body>
                <Modal.Footer>
                  <Button className='close-btn bold-font' onClick={this.handleClose}>
                    Close
                  </Button>
                  <Button className='save-btn bold-font' onClick={this.handleSave}>
                    Save
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          );
    }
  }

  export default withAlert()(NftModal)