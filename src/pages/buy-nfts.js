import React from 'react';
import GetNftsToBuy from '../components/GetNftsToBuy';
import './pages.css';

export default class BuyNfts extends React.Component {
  render() {
    return (
      <div className="main-div">
        <h1>Buy Nfts</h1>
        <GetNftsToBuy />
      </div>
    );
  }
}
