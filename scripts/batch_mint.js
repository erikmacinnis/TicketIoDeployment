require('dotenv').config(); 

const ticketCollection =  require('../artifacts/contracts/TicketIo.sol/TicketCollection.json');
const hre = require("hardhat");

async function main() {
    const provider = hre.ethers.provider;
    const wallet = new hre.ethers.Wallet(process.env.MAINNET_PRIVATE_KEY, provider);

    const contractAddr = process.env.CONTRACT_ADDR
    const ticketIo = await new hre.ethers.Contract(contractAddr, ticketCollection.abi, wallet)

    const num = process.env.NUM_TICKETS
    const toAddress = process.env.OWNER_ADDR

    // Get the current nonce for the wallet address
    const nonce = await provider.getTransactionCount(wallet.address);

    const feeData = await provider.getFeeData();
    const gasPrice = feeData.gasPrice;

    // Include the nonce, gas price, and gas limit in the transaction options
    const transactionOptions = {
        nonce: nonce,
        gasPrice: gasPrice,
    };

    const ticketsMinted = await ticketIo.mintBatch(num, toAddress, transactionOptions)

    console.log(`Transaction Hash: ${ticketsMinted.hash}`)

    console.log(
        `Minted ${num} tickets from ${contractAddr} to address ${toAddress}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
