require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config(); 

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.22",
  defaultNetwork: "mumbai",
  networks: {
    mumbai: {
      url: process.env.MUMBAI_RPC,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.POLYSCAN_API_KEY,
  }
};
