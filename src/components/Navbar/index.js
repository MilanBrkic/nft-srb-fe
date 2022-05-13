import React from 'react';
import { Nav, NavLink, Bars, NavMenu } from './NavbarElements';
import Auth from '../Auth';

export default class Navbar extends React.Component {
  constructor(props){
    super(props);

    this.state={
      showResults: false,
    }
  }

  onAuth = (accessId)=>{
    this.setState({showResults: true})
    this.forceUpdate();
    console.log(accessId);
  }
  render(){
    return (
      <>
        <Nav>
        {this.state.showResults ?  
        <NavLink to="/">
            <img src={require('../../images/nftsrb-logo.png')} width="40" length="40" alt="logo" />
        </NavLink> : null}
         
          <Bars />
        <NavMenu>
            {this.state.showResults ? <NavLink to="/">Nft Srb</NavLink> : null}
            {this.state.showResults ? <NavLink to="/buy-nfts">Buy Nfts</NavLink> : null}
            {this.state.showResults ? <NavLink to="/my-collection">My Collection</NavLink> : null}
            {this.state.showResults ? <NavLink to="/mint-nfts">Mint Nfts</NavLink> : null}
            <Auth onAuth={this.onAuth.bind(this)} />
          </NavMenu>
        </Nav>
      </>
    );
  }
};
