import React from 'react';
import MintComponent from '../components/MintCompenent';
import { redirectToHomePageIfNeeded } from '../helper';
import './pages.css';

export default class MintNfts extends React.Component {
  render() {
    const returnable = (
      <div className="main-div">
        <MintComponent />
      </div>
    );
    return redirectToHomePageIfNeeded(returnable);
  }
}
