import React from 'react';
import { Nav, NavLink, Bars, NavMenu } from './NavbarElements';
import Auth from '../Auth';
import { getAccessToken } from '../../services/Cookie';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accessId: getAccessToken()
    };
  }

  onAuth = () => {
    this.setState({ accessId: getAccessToken() });
    this.forceUpdate();
  };

  onLinkClik = ()=>{
    this.forceUpdate();
  }
  render() {
    const show = this.state.accessId && window.location.href[window.location.href.length-1] !=='/'
    return (
      <>
        <Nav>
          <NavLink to="/">
            <img src={require('../../images/nft-srb-bey-lin.png')} style={{visibility: show ? 'visible' : 'hidden'}}  width="30%" length="30%" alt="logo" />
          </NavLink>

          <NavMenu>
            {this.state.accessId ? <Link className='navbar-link bold-font' onClick={this.onLinkClik} to="/">nft srb</Link> : null}
            {this.state.accessId ? <Link className='navbar-link bold-font' onClick={this.onLinkClik} to="/buy-nfts">buy nfts</Link> : null}
            {this.state.accessId ? <Link className='navbar-link bold-font' onClick={this.onLinkClik} to="/my-collection">my collection</Link> : null}
            {this.state.accessId ? <Link className='navbar-link bold-font' onClick={this.onLinkClik} to="/mint-nfts">mint nfts</Link> : null}
            <Auth onAuth={this.onAuth.bind(this)} />
          </NavMenu>
        </Nav>
      </>
    );
  }
}
