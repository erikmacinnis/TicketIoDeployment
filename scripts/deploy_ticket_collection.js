require('dotenv').config(); 

const hre = require("hardhat");

async function main() {
  const ticketIo = await hre.ethers.deployContract("TicketCollection", 
    [
      process.env.MAX_TICKETS, 
      process.env.OWNER_ADDR, 
      process.env.BASE_URI,
    ]);

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
