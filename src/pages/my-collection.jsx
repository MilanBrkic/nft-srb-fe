import React from 'react';
import GetAllNfts from '../components/GetAllNfts';
import { redirectToHomePageIfNeeded } from '../helper';
import './pages.css';

export default class MyCollection extends React.Component {
  render() {
    const returnable =  (
      <div className="main-div">
        <h1>My Collection</h1>
        <GetAllNfts />
      </div>
    );

    return redirectToHomePageIfNeeded(returnable);
  }
}
