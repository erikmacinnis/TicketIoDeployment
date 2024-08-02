# TicketIo Contract Deployment, Testing, Verification. 

This project use used to deploy TicketIo Contracts.
Currently hardhat is set up to deploy to the Mumbai testnet

**Commands**

npx hardhat compile

npx hardhat coverage

npx hardhat test --parallel

npx hardhat run scripts/deploy.js --network <network>

npx hardhat verify <address> --network sepolia <num_tickets> <owner_addr> <"base_uri">

Example
npx hardhat verify 0x95257f1f8261Bdd1FeA4E5Ae50e6d04b50dD730b --network matic 1000 0xacf53250c5162bd9ce61d30093eedc5518676c55 "https://yellow-magic-possum-182.mypinata.cloud/ipfs/QmRbX9A9dZozmcKK74sJ8WavMNQcK3k3idnwfompRk67b1/islanders_vs_mooseheads_240430"