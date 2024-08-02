require('dotenv').config(); 
const Web3 = require('web3')

const hre = require("hardhat");

const web3 = new Web3(`https://polygon-mainnet.infura.io/v3/71ebfcb0bb1549c785ddf3f7b1d9e69b`)

async function main() {
    const provider = hre.ethers.provider;
    const wallet = new hre.ethers.Wallet(process.env.MAINNET_PRIVATE_KEY, provider);

    const contractAddr = '0xdd20c7a417f25ab5dc258151c7bb1211089a0068'

    const senderAddr = '0xeD5f82F6DF848983AE8c2Fae3E58a5030c9a0000'

    const receiverAddr = '0xDf0Ac751b9DdB2Dc42b1764401598638371b137e'

    const tokenUri = 'https://yellow-magic-possum-182.mypinata.cloud/ipfs/QmannPn65d6ppwdJ2LzXLTK2bwU93wStmT3SfzDBNU2NSD/knights_vs_wild_2404235.json'

    console.log(process.env.SIGNED_MSG_MAINNET_PRIVATE_KEY)
    
    const signature = web3.eth.accounts.sign(tokenUri, process.env.SIGNED_MSG_MAINNET_PRIVATE_KEY)
    console.log(parseInt(signature.v, 16))
    console.log(signature);

    const prefix = "\x19Ethereum Signed Message:\n";
    const input = prefix + tokenUri.length + tokenUri;
    const inputHex = web3.utils.toHex(input);
    console.log('inputHex')
    console.log(inputHex);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
