import React from 'react';
import { Nav, NavLink, Bars, NavMenu } from './NavbarElements';
import Auth from '../Auth';
import { getAccessToken } from '../../services/Cookie';

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
  render() {
    return (
      <>
        <Nav>
          {this.state.accessId ? (
            <NavLink to="/">
              <img src={require('../../images/nftsrb-logo.png')} width="40" length="40" alt="logo" />
            </NavLink>
          ) : null}

          <Bars />
          <NavMenu>
            {this.state.accessId ? <NavLink to="/">Nft Srb</NavLink> : null}
            {this.state.accessId ? <NavLink to="/buy-nfts">Buy Nfts</NavLink> : null}
            {this.state.accessId ? <NavLink to="/my-collection">My Collection</NavLink> : null}
            {this.state.accessId ? <NavLink to="/mint-nfts">Mint Nfts</NavLink> : null}
            <Auth onAuth={this.onAuth.bind(this)} />
          </NavMenu>
        </Nav>
      </>
    );
  }
}
