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
              <img src={require('../../images/nft-srb-bey-lin.png')} width="30%" length="30%" alt="logo" />
            </NavLink>
          ) : null}

          <Bars />
          <NavMenu>
            {this.state.accessId ? <NavLink to="/">nft srb</NavLink> : null}
            {this.state.accessId ? <NavLink to="/buy-nfts">buy nfts</NavLink> : null}
            {this.state.accessId ? <NavLink to="/my-collection">my collection</NavLink> : null}
            {this.state.accessId ? <NavLink to="/mint-nfts">mint nfts</NavLink> : null}
            <Auth onAuth={this.onAuth.bind(this)} />
          </NavMenu>
        </Nav>
      </>
    );
  }
}
