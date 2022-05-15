import React from 'react';
import GetAllNfts from '../components/GetAllNfts';
import { redirectToHomePageIfNeeded } from '../helper';
import './pages.css';

export default class MyCollection extends React.Component {
  render() {
    const returnable =  (
      <div className="main-div">
        <h1 className="my-collection-h1">my collection</h1>
        <GetAllNfts />
      </div>
    );

    return redirectToHomePageIfNeeded(returnable);
  }
}
