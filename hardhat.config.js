require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config(); 

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.22",
  defaultNetwork: "matic",
  networks: {
    // mumbai: {
    //   url: process.env.MUMBAI_RPC,
    //   accounts: [process.env.MUMBAI_PRIVATE_KEY],
    // },
    matic: {
      url: process.env.MAINNET_RPC,
      accounts: [process.env.MAINNET_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.POLYSCAN_API_KEY,
  }
};
