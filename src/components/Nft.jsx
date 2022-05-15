import React from 'react'
import NftModal from './NftModal';
export default class Nft extends React.Component{
    constructor(props){
        super(props);
        this.state = {...this.props.nft, showModal: false};
    }
    onEditBtn = () => {
        this.state.showModal = true;
        this.forceUpdate();
    }

    render(){
        return (
        <div className="card grid-item">
            <NftModal show={this.state.showModal} nft={this.state}/>
            <img id='nft' src={`${this.state.googleId}`} alt={`${this.state.name}`} />  
            <div className="container">
                <h5><b>{this.state.name}</b></h5>
                <div className='sale-and-edit-div'>
                    <p className='price'>{this.state.price} ETH</p>
                    <div className={`sale-label ${this.state.forSale ? 'for-sale-label' : 'not-for-sale-label'}`}>
                        {this.state.forSale ? "For Sale" : "Not For Sale"}
                    </div>
                    <button onClick={this.onEditBtn}className='edit-btn'>Edit</button>
                </div>
            </div>
        </div>
        )
    }
} 