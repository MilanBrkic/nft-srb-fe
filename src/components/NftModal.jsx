import {Button, Modal} from 'react-bootstrap'
import React from 'react';
export default class NftModal extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          show: props.show
        };
    }
  
    componentDidUpdate(){
      this.state.show = this.props.show;
    }
    handleClose = () => this.setState({show: false});
    handleShow = () => this.setState({show:true});

    render(){
        return (
            <>
              <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
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