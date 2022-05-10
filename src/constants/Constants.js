class Constants{
    static BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT ? Number(process.env.REACT_APP_BACKEND_PORT,10) : 3005;
    static BASE_BACKEND_URL = process.env.REACT_APP_BASE_BACKEND_URL ?? "http://localhost"
    static BACKEND_URL = `${Constants.BASE_BACKEND_URL}:${Constants.BACKEND_PORT}`
    static EXPECTED_CHAIN_ID = process.env.REACT_APP_CHAIN_ID ?  Number(process.env.REACT_APP_CHAIN_ID) : 31337;
    static GOOGLE_DRIVE_URL = "https://drive.google.com/uc?id="
    static NFT_STORAGE_KEY = process.env.REACT_APP_NFT_STORAGE_KEY;
    static CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS
    static SMART_CONTRACT_URL = process.env.SMART_CONTRACT_URL ?? 'http://127.0.0.1:8545/';
}
export default Constants