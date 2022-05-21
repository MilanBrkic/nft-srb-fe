import React from 'react';
import GetAllNfts from '../components/GetAllNfts';
import SortComponent from '../components/SortComponent'
import { redirectToHomePageIfNeeded } from '../helper';
import './pages.css';

export default class MyCollection extends React.Component {
  render() {
    const returnable =  (
      <div className="main-div">
        <h1 className="my-collection-h1 bold-font">my collection</h1>
        <SortComponent/>
        <GetAllNfts />
      </div>
    );
      //↓ ↑ 🢃 🢁 🠉 🠋 🠕
    return redirectToHomePageIfNeeded(returnable);
  }
}
