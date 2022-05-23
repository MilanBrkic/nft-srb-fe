import React from 'react';
import GetAllNfts from '../components/GetAllNfts';
import SortComponent from '../components/SortComponent'
import { redirectToHomePageIfNeeded } from '../helper';
import { SortBy } from '../types/types';
import './pages.css';
export default class MyCollection extends React.Component {
  constructor(props){
    super(props);
    this.child = React.createRef();
  }
  onSortChange = (sort, desc) =>{
    if(sort === SortBy.None) return

    this.child.current.onSortChange(sort,desc);

  }
  render() {
    const returnable =  (
      <div className="main-div">
        <h1 className="my-collection-h1 bold-font">my collection</h1>
        <SortComponent onChange={this.onSortChange}/>
        <GetAllNfts ref={this.child}/>
      </div>
    );
      //↓ ↑ 🢃 🢁 🠉 🠋 🠕
    return redirectToHomePageIfNeeded(returnable);
  }
}
