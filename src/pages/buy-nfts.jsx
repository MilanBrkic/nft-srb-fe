import React from 'react';
import GetNftsToBuy from '../components/GetNftsToBuy';
import {redirectToHomePageIfNeeded} from '../helper'
import './pages.css';
import { SortBy } from '../types/types';
import SortComponent from '../components/SortComponent'


export default class BuyNfts extends React.Component {
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
    const returnable = (
      <div className="main-div">
        <h1 className='my-collection-h1 bold-font'>buy nfts</h1>
        {this.state.show ? <SortComponent hideSale={true} onChange={this.onSortChange}/> : null}
        <GetNftsToBuy  ref={this.child} getNftNum={this.getNftNum} />
      </div>
    )

    return redirectToHomePageIfNeeded(returnable)
  }
}
