import { Button, Modal } from 'react-bootstrap';
import React from 'react';
import './css/modal.css';
import { withAlert } from 'react-alert';
import './css/to-buy-modal.css'
import {buy} from '../ethereum'
import {addToBought} from '../services/Cookie';
class NftToBuyModal extends React.Component {
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

handleBuy = async ()=>{
  try {
    await buy(this.state.nft.tokenId, this.state.nft.price);
    addToBought(this.state.nft.tokenId);
  } catch (error) {
    console.log(`Error while buying nft | Reason: ${error.message}`);
    this.props.alert.error("Error while buying nft")
  }
  this.props.buyHappened(this.state.nft.tokenId);
  this.handleClose();
}

render(){
    return (
        <>
          <Modal dialogClassName='modal-body-to-buy' show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
            <h1 className='bold-font'>{this.state.nft.name}</h1>
            </Modal.Header>
            <Modal.Body >
              <div className="card-modal card-model-to-buy">
                <img id='nft-modal' src={`${this.state.nft.googleId}`} alt={`${this.state.nft.name}`} />  
                <div className="container-modal container-modal-to-buy">
                  <div>
                    <p className='description-label-modal label-modal'><i>Description:</i></p>
                    <p className='description-modal-to-buy'>{this.state.nft.description}</p>
                  </div>
                  <div className='eth-div'>
                    <p className='eth-to-buy-modal bold-font'>{this.state.nft.price} <p className='eth'>ETH</p> </p>
                  </div>
                </div>                  
              </div>      
            </Modal.Body>
            <Modal.Footer>
              <Button className='close-btn bold-font' onClick={this.handleClose}>
                Close
              </Button>
              <Button className='save-btn bold-font' onClick={this.handleBuy}>
                Buy
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}
}
export default withAlert()(NftToBuyModal);
