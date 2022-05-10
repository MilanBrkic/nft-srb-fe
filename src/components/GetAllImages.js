import { Component } from 'react';
import Constants from '../constants/Constants';
import backendHttpClient from '../http-client/BackendHttpClient';

export default class GetAllImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  handleClick = async () => {
    const address = '0x70997970c51812dc3a010c7d01b50e0d17dc79c8';
    const url = `/user/${address}/images`;

    try {
      const images = await backendHttpClient.get(url);
      const googleUrls = images.map((image) => Constants.GOOGLE_DRIVE_URL + image.googleId);
      console.log(`getAllImages: ${JSON.stringify(googleUrls)}`);
      this.state.images = googleUrls;
      this.forceUpdate();
    } catch (error) {
      console.log(`Error in getting images | Reason: ${error.message}`);
    }
  };

  render() {
    const arrList = this.state.images.map((img) => {
      return <img key={`${img}`} src={`${img}`} alt="" width="300" />;
    });
    return (
      <div>
        <button onClick={this.handleClick}>Get all images</button>
        <div>{arrList}</div>
      </div>
    );
  }
}

// https://drive.google.com/uc?id=1g3VkpDLF6ohbNYX_-9NiYz_P8hpJbaPM
