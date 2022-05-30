import React from 'react';
import './pages.css';

export default class NftSrb extends React.Component {
  render() {
      return (
        <div className="main-div">
          <img src={require('../images/logo-sive-linhije-copy.png')} alt="nftsrb"></img>
          <h3 className='about-us-title bold-font'>Who are we</h3>
          <p className='about-us-text'>First Serbian NFT marketplace.</p>
          <h3 className='about-us-title bold-font'>What we do</h3>
          <p className='about-us-text'>
            We bring you the most flexible and affordable marketplace in the region.<br/>
            Your job is to make art, we'll do the rest!
          </p>
        </div>
      );
  }
}
