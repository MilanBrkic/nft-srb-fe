import React from 'react';
import { Nav, NavLink, NavMenu } from './NavbarElements';
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

  onLinkClik = () => {
    this.forceUpdate();
  };
  render() {
    const show = this.state.accessId && window.location.pathname !== '/nft-srb-fe';
    return (
      <>
        <Nav>
          <NavLink to="/nft-srb-fe">
            <img
              src={require('../../images/nft-srb-bey-lin.png')}
              style={{ visibility: show ? 'visible' : 'hidden' }}
              width="60%"
              length="60%"
              alt="logo"
            />
          </NavLink>

          <NavMenu className="nav-menu">
            {this.state.accessId ? (
              <Link className="navbar-link bold-font" onClick={this.onLinkClik} to="/nft-srb-fe">
                nft srb
              </Link>
            ) : null}
            {this.state.accessId ? (
              <Link className="navbar-link bold-font" onClick={this.onLinkClik} to="/nft-srb-fe/buy-nfts">
                buy nfts
              </Link>
            ) : null}
            {this.state.accessId ? (
              <Link className="navbar-link bold-font" onClick={this.onLinkClik} to="/nft-srb-fe/my-collection">
                my collection
              </Link>
            ) : null}
            {this.state.accessId ? (
              <Link className="navbar-link bold-font" onClick={this.onLinkClik} to="/nft-srb-fe/mint-nfts">
                mint nfts
              </Link>
            ) : null}
            <Auth onAuth={this.onAuth.bind(this)} />
          </NavMenu>
        </Nav>
      </>
    );
  }
}
