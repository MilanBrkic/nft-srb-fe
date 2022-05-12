import React from 'react';
import GetAllNfts from '../components/GetAllNfts';
import './pages.css'


const MyCollection = () => {
  return (
    <div className="main-div">
      <h1>My Collection</h1>
      <GetAllNfts/>
    </div>
  );
};

export default MyCollection;
