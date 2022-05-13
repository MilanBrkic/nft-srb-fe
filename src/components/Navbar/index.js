import React from 'react';
import { Nav, NavLink, Bars, NavMenu } from './NavbarElements';
import Auth from '../Auth';

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <img src={require('../../images/nftsrb-logo.png')} width="40" length="40" alt="logo" />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/">
            Nft Srb
          </NavLink>
          <NavLink to="/buy-nfts">
            Buy Nfts
          </NavLink>
          <NavLink to="/my-collection">
            My Collection
          </NavLink>
          <NavLink to="/mint-nfts">
            Mint Nfts
          </NavLink>
          <Auth />
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
