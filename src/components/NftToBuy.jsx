import React from 'react'
import NftModal from './NftModal';
import './css/to-buy.css'
export default class NftToBuy extends React.Component{
    constructor(props){
        super(props);
        this.state = {...this.props.nft, showModal: false};
    }
    onBuyBtn = () => {
        this.state.showModal = true;
        this.forceUpdate();
    }

    onUpdate = (forSale, price)=>{
        this.state.forSale = forSale;
        this.state.price = price;
        this.forceUpdate();
    }
    render(){
        return (
        <div className="card grid-item">
            <NftModal show={this.state.showModal} nft={this.state} onUpdate={this.onUpdate}/>
            <img id='nft' src={`${this.state.googleId}`} alt={`${this.state.name}`} />  
            <div className="container">
                <h5 className='bold-font'>{this.state.name}</h5>
                <div className='sale-and-edit-div'>
                    <p className='price price-buy bold-font'>{this.state.price} ETH</p>
                    <button onClick={this.onBuyBtn}className='buy-btn'>Buy</button>
                </div>
            </div>
        </div>
        )
    }
} 