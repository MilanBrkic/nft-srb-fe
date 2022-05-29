import React from 'react';
import GetAllNfts from '../components/GetAllNfts';
import SortComponent from '../components/SortComponent'
import { redirectToHomePageIfNeeded } from '../helper';
import { SortBy } from '../types/types';
import './pages.css';
export default class MyCollection extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      show: false
    }
    this.child = React.createRef();
  }
  onSortChange = (sort, desc) =>{
    if(sort === SortBy.None) return

    this.child.current.onSortChange(sort,desc);

  }

  getNftNum = (num) =>{
    if(num === 0){
      this.state.show = false
    }
    else this.state.show = true;
    this.forceUpdate()
  }
  render() {
    const returnable =  (
      <div className="main-div">
        <h1 className="my-collection-h1 bold-font">my collection</h1>
        {this.state.show ? <SortComponent onChange={this.onSortChange}/> : null}
        <GetAllNfts ref={this.child} getNftNum={this.getNftNum}/>
      </div>
    );
      //↓ ↑ 🢃 🢁 🠉 🠋 🠕
    return redirectToHomePageIfNeeded(returnable);
  }
}
