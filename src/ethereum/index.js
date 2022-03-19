import Constants from "../constants/Constants";

export async function requestAccounts(){
    const chainId = await getChainId();

    if(parseInt(chainId,16)===Constants.EXPECTED_CHAIN_ID){
        return window.ethereum.request({
            method:"eth_requestAccounts"
        })
    } 
    else{
        alert("Connected to a wrong network")
    }
}

async function getChainId(){
    return window.ethereum.request({
        method:"eth_chainId"
    })
}
