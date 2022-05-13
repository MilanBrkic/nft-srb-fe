import React from 'react';
import GetNftsToBuy from '../components/GetNftsToBuy';
import {redirectToHomePageIfNeeded} from '../helper'
import './pages.css';

export default class BuyNfts extends React.Component {
  render() {
    const returnable = (
      <div className="main-div">
        <h1>Buy Nfts</h1>
        <GetNftsToBuy />
      </div>
    )

    return redirectToHomePageIfNeeded(returnable)
  }
}