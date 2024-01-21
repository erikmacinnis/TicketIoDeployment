// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

// Address 0xd87F40Cc3237A26E1B9b1ed996f2aC19fFb42aA4
async function main() {
  const ticketIo = await hre.ethers.deployContract("TicketCollection", [110, "0x044f060D389Dc8102430be326C7d45caad02d727", ""]);

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
