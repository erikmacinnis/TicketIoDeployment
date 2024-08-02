const fs = require('fs');
const path = require('path');

const numTickets = 100

const baseMetadata = {
    "name": "Blockchain Life",
    "performer": "Blockchain Life",
    "description": "Join the Best Blockchain Event in the World",
    "image": "https://yellow-magic-possum-182.mypinata.cloud/ipfs/QmZ3J7zSGGNNqrB4PHVU2gn7J9Mw2rL33nPRrHum78Gega/BlockchainLife.jpg",
    "time": "November 24 7:00pm 2024",
    "eventStart": 1732489200,
    "eventEnd": 1732503600,
    "location": "Dubai, UAE",
    "venue": "Shangri-La Hotel Dubai",
    // "groupName": "General Admission",
    // "groupName": "VIP Access",
    "groupName": "Startup Admission",
    "isTicket": true,
    "sig": "sig"
}

for (let i = 200; i < numTickets + 200; i++) {
    // const seatNum = ((i % 10) + 1).toString()
    // const row = (Math.floor(i / 10) + 1).toString();
    let metadata = baseMetadata
    // metadata.seat = seatNum
    // metadata.row = row

    let data = JSON.stringify(metadata, null, 2);

    fs.writeFile(path.join(`${__dirname}/blockchain_life_241224_metadata`, `blockchain_life_241224${i}.json`), data, (err) => {
        if (err) throw err;
        console.log(`File${i}.json has been saved!`);
    });
}