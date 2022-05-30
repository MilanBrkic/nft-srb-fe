import Constants from '../constants/Constants';
import { Contract, ethers } from 'ethers';
import nftSrbJson from '../abi/NftSrb.json';
import { parseEther } from 'ethers/lib/utils';

export async function requestAccounts() {
  try {
    return await window.ethereum.request({
      method: 'eth_requestAccounts'
    }); 
  } catch (error) {
    console.error(error);    
  }
}
export async function checkForChain(alert) {
  if(window.ethereum){
    const chainId = await getChainId();
    if(parseInt(chainId, 16) !== Constants.EXPECTED_CHAIN_ID){
      try {
        await switchChain();
        return true;
      } catch (error) {
        if (error.code === 4092) {
          const result = await addChain()
          console.log(result);
          return true;
        }
        else{
          console.error(error.message);
          return false;
        }
      }
    }
    return true;
  }
  else{
    alert.error("You don't have metamask installed")
    return false;
  }
}

async function switchChain(){
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: '0x3' }] 
  });
}

async function addChain(){
  await window.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: '0x3',
        rpcUrls: ['https://ropsten.infura.io/v3/'],
        chainName: 'Ropsten Test Network',
        blockExplorerUrls: ['https://ropsten.etherscan.io']
      }
    ]
  });
}
export async function getChainId() {
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
