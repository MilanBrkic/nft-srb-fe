import React from 'react';
import GetNftsToBuy from '../components/GetNftsToBuy';
import './pages.css';

const BuyNfts = () => {
  return (
    <div className="main-div">
      <h1>Buy Nfts</h1>
      <GetNftsToBuy />
    </div>
  );
};

export default BuyNfts;
