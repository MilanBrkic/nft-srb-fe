import { Component } from 'react';
import backendHttpClient from '../http-client/BackendHttpClient';
import Nft from './Nft';
import _ from "lodash";
import { withAlert } from 'react-alert';
import {isEdited} from '../services/Cookie'
 class GetAllNfts extends Component {
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
      this.props.getNftNum(this.state.nfts.length);
      this.forceUpdate();
    } catch (error) {
      console.log(`Error in getting nfts | Reason: ${error.message}`);
      this.props.alert.error("Error in getting nfts")
    }
  };

  render() {
    const arrList = this.state.nfts.map((nft) => {
      const edited = isEdited(nft.tokenId);
      if(edited){
        nft.price = edited.price;
        nft.forSale = edited.forSale;
      }
      return <Nft key={nft.md5Hash} nft={nft}/>;
    });
    return (
      <div className='grid-container'>
        {arrList}
      </div>
    );
  }
}
export default withAlert()(GetAllNfts)
// https://drive.google.com/uc?id=1g3VkpDLF6ohbNYX_-9NiYz_P8hpJbaPM
