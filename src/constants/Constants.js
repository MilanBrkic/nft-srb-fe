class Constants {
  static BACKEND_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:3005';
  static EXPECTED_CHAIN_ID = process.env.REACT_APP_CHAIN_ID ? Number(process.env.REACT_APP_CHAIN_ID) : 31337;
  static NFT_STORAGE_KEY = process.env.REACT_APP_NFT_STORAGE_KEY;
  static CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
  static SMART_CONTRACT_URL = process.env.SMART_CONTRACT_URL ?? 'http://127.0.0.1:8545/';
}
export default Constants;
