import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to='/'>
          <img src={require('../../images/nftsrb-logo.png')} width="40" length="40" alt='logo' />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/' activeStyle>
            Nft Srb
          </NavLink>
          <NavLink to='/buy-nfts' activeStyle>
            Buy Nfts
          </NavLink>
          <NavLink to='/my-collection' activeStyle>
            My Collection
          </NavLink>
          <NavLink to='/mint-nfts' activeStyle>
            Mint Nfts
          </NavLink>
          <NavBtnLink to='/sign-in'>Sign In</NavBtnLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
