# TicketIo Contract Deployment, Testing, Verification. 

This project use used to deploy TicketIo Contracts.
Currently hardhat is set up to deploy to the Mumbai testnet

**Commands**
npx hardhat compile
npx hardhat coverage
npx hardhat test --parallel
npx hardhat run scripts/deploy.js --network <network>
npx hardhat verify <address> --network sepolia <num_tickets> <owner_addr> <"base_uri">


