import { Component } from 'react';
import Constants from '../constants/Constants';
import backendHttpClient from '../http-client/BackendHttpClient';
import { requestAccounts } from '../ethereum';

export default class GetAllNfts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nfts: []
    };
  }

  handleClick = async () => {
    const accounts = await requestAccounts();

    const address = accounts[0];
    const url = `/user/${address}/nfts`;

    try {
      const nfts = await backendHttpClient.get(url);
      const googleUrls = nfts.map((nft) => Constants.GOOGLE_DRIVE_URL + nft.googleId);
      console.log(`getAllImages: ${JSON.stringify(googleUrls)}`);
      this.state.nfts = googleUrls;
      this.forceUpdate();
    } catch (error) {
      console.log(`Error in getting nfts | Reason: ${error.message}`);
    }
  };

  render() {
    const arrList = this.state.nfts.map((nft) => {
      return <img key={`${nft}`} src={`${nft}`} alt="" width="300" />;
    });
    return (
      <div>
        <button onClick={this.handleClick}>Get all Nfts</button>
        <div>{arrList}</div>
      </div>
    );
  }
}

// https://drive.google.com/uc?id=1g3VkpDLF6ohbNYX_-9NiYz_P8hpJbaPM
