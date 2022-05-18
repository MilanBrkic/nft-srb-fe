import {Button, Modal} from 'react-bootstrap'
import React from 'react';

export default class NftModal extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          show: props.show,
          nft: props.nft
        }
    }
  
    componentDidUpdate(){
      this.state.show = this.props.show;
    }
    handleClose = () => {
      this.state.show = false
      this.forceUpdate();
    }
    handleShow = () => {
      this.state.show = true
      this.forceUpdate();
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
                            <p className='price-modal'>{this.state.nft.price} ETH</p>
                            <div className={`sale-label-modal ${this.state.nft.forSale ? 'for-sale-label' : 'not-for-sale-label'}`}>
                                {this.state.nft.forSale ? "For Sale" : "Not For Sale"}
                            </div>
                            <p className='hint-modal'>Hint: toggle "For Sale" button to change the status</p>
                    </div>                  
                    </div>      
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={this.handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          );
    }
  }