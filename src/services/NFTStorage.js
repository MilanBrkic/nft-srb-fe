import Constants from '../constants/Constants';
import { NFTStorage } from 'nft.storage';
export async function store(image, name, description) {
  // create a new NFTStorage client using our API key
  const nftstorage = new NFTStorage({ token: Constants.NFT_STORAGE_KEY });
  // call client.store, passing in the image & metadata
  return nftstorage.store({
    image,
    name,
    description
  });
}
