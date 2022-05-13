import React from 'react';
import GetAllNfts from '../components/GetAllNfts';
import './pages.css';

export default class MyCollection extends React.Component{
  render(){
    return (
      <div className="main-div">
        <h1>My Collection</h1>
        <GetAllNfts />
      </div>
    );
  }
};
