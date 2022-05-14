import React from 'react'
export default class Nft extends React.Component{
    constructor(props){
        super(props);
        this.state = {...this.props.nft};
    }

    enlarge= () =>{
        this.props.onEdit(this.state.md5Hash);
        // this.state.enlarge = true;
        this.forceUpdate();
    }

    render(){
        console.log(this.props.visible);
        let addStyle='card-helper';
        if(this.props.visible===true){
            addStyle = 'enlarge';
        }
        else if(this.props.visible===false){
            addStyle='not-visible';
        }
        return (
        <div className={`card grid-item ${addStyle}`}>
            {addStyle==='enlarge' ? <div className='div-for-x'><button className='x-btn'>x</button></div> : null}
            <img id='nft' src={`${this.state.googleId}`} alt={`${this.state.name}`} />  
            <div className="container">
                <h5><b>{this.state.name}</b></h5>
                <div className='sale-and-edit-div'>
                    <p className='price'>{this.state.price} ETH</p>
                    <div className={`sale-label ${this.state.forSale ? 'for-sale-label' : 'not-for-sale-label'}`}>
                        {this.state.forSale ? "For Sale" : "Not For Sale"}
                    </div>
                    <button onClick={this.enlarge} className='edit-btn'>Edit</button>
                </div>
            </div>
        </div>
        )
    }
} 