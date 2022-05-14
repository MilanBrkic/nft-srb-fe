import React from 'react'
export default class Nft extends React.Component{
    constructor(props){
        super(props);
        this.state = {...this.props.nft};
    }

    render(){
        return (
        <div className="card grid-item">
            <img id='nft' src={`${this.state.googleId}`} alt={`${this.state.name}`} />  
            <div className="container">
                <h5><b>{this.state.name}</b></h5>
                <p>{this.state.price} ETH</p>
            </div>
        </div>
        )
    }
} 