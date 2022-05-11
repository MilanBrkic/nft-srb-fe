import Constants from '../constants/Constants';
import { Contract, ethers } from 'ethers';
import nftSrbJson from '../nft-smart-contract/artifacts/contracts/NftSrb.sol/NftSrb.json';

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
