import Constants from '../constants/Constants';
import { Contract, ethers } from 'ethers';
import nftSrbJson from '../abi/NftSrb.json';
import { parseEther } from 'ethers/lib/utils';

export async function requestAccounts() {
  const chainId = await getChainId();

  if (parseInt(chainId, 16) === Constants.EXPECTED_CHAIN_ID) {
    return window.ethereum.request({
      method: 'eth_requestAccounts'
    });
  } else {
    alert('Connected to a wrong network');
  }
}

async function getChainId() {
  return window.ethereum.request({
    method: 'eth_chainId'
  });
}

export async function mint(url, price) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new Contract(Constants.CONTRACT_ADDRESS, nftSrbJson.abi, signer);
  await contract.mint(url, price);
  console.log(`NFT: ${url} minted`);
}

export async function update(tokenId, forSale, price) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new Contract(Constants.CONTRACT_ADDRESS, nftSrbJson.abi, signer);

  await contract.update(tokenId, forSale, parseEther('' + price));
  console.log(`NFT with tokenId: ${tokenId} updated`);
}

export async function buy(tokenId, price) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new Contract(Constants.CONTRACT_ADDRESS, nftSrbJson.abi, signer);

  await contract.buy(tokenId, { value: parseEther(price + '') });
}
