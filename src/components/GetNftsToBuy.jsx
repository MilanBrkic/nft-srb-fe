import { Component } from 'react';
import backendHttpClient from '../http-client/BackendHttpClient';
import NftToBuy from './NftToBuy';
import { withAlert } from 'react-alert';
import _ from "lodash";
import { getBought } from '../services/Cookie';


class GetNftsToBuy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nfts: []
    };
  }

  componentDidMount(){
    this.getMarketplace();
  }

  onSortChange= (sort,desc) =>{
    this.state.nfts =  _.orderBy(this.state.nfts, [sort], [desc ? 'desc' : 'asc'])
    this.forceUpdate();
  }
  getMarketplace = async () => {
    const url = `/marketplace`;

    try {
      const nfts = await backendHttpClient.get(url);
      this.state.nfts = nfts;
      this.props.getNftNum(this.state.nfts.length);
      this.forceUpdate();
    } catch (error) {
      console.log(`Error in getting nfts | Reason: ${error.message}`);
    }
  };

  removeNft =(tokenId)=>{
    this.state.nfts = this.state.nfts.filter(nft=>nft.tokenId!==tokenId)
    this.forceUpdate();
  }

  render() {
    const arrList = this.state.nfts.filter((nft)=>{
      const bought = getBought()
      if(bought.has(nft.tokenId)){
        return false;
      }
      else return true;
    }).map((nft) => {
      return <NftToBuy removeNft={this.removeNft} key={nft.md5Hash} nft={nft}/>;
    });
    return (
      <div className='grid-container'>
        {arrList}
      </div>
    );
  }
}
export default withAlert()(GetNftsToBuy)
// https://drive.google.com/uc?id=1g3VkpDLF6ohbNYX_-9NiYz_P8hpJbaPM
