import React from 'react';
import './pages.css';

export default class NftSrb extends React.Component {
  render() {
      return (
        <div className="main-div">
          <img src={require('../images/logo-sive-linhije-copy.png')} alt="nftsrb"></img>
          <h3 className='about-us-title bold-font'>What we do</h3>
        </div>
      );
  }
}
