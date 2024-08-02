require('dotenv').config(); 

const hre = require("hardhat");

async function main() {
  const provider = hre.ethers.provider;
  const wallet = new hre.ethers.Wallet(process.env.MAINNET_PRIVATE_KEY, hre.ethers.provider);
  const nonce = await hre.ethers.provider.getTransactionCount(wallet.address, "pending");
  const feeData = await provider.getFeeData();
  const gasPrice = feeData.maxFeePerGas;
 
  const ticketIo = await hre.ethers.deployContract("TicketCollection", 
    [
      process.env.MAX_TICKETS, 
      process.env.OWNER_ADDR, 
      process.env.BASE_URI,
    ],
    {
      nonce: nonce,
      gasPrice: gasPrice,
    }
  );

  await ticketIo.waitForDeployment();

  console.log(
    `ticketIo with  deployed to ${ticketIo.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
