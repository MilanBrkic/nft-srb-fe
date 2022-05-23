import { Component } from 'react';
import backendHttpClient from '../http-client/BackendHttpClient';
import Nft from './Nft';
import _ from "lodash";


export default class GetAllNfts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nfts: []
    };

  }

  componentDidMount(){
    this.getMyCollection();
  }

  onSortChange= (sort,desc) =>{
    this.state.nfts =  _.orderBy(this.state.nfts, [sort], [desc ? 'desc' : 'asc'])
    this.forceUpdate();
  }

  getMyCollection = async () => {
    const url = `/user/nfts`;
    try {
      const nfts = await backendHttpClient.get(url);
      this.state.nfts = nfts;
      this.forceUpdate();
    } catch (error) {
      console.log(`Error in getting nfts | Reason: ${error.message}`);
    }
  };

  render() {
    const arrList = this.state.nfts.map((nft) => {
      return <Nft key={nft.md5Hash} nft={nft}/>;
    });
    return (
      <div className='grid-container'>
        {arrList}
      </div>
    );
  }
}

// https://drive.google.com/uc?id=1g3VkpDLF6ohbNYX_-9NiYz_P8hpJbaPM
