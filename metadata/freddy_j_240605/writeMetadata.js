const fs = require('fs');
const path = require('path');

const numTickets = 100

const baseMetadata = {
    "name": "Baba's Lounge Events",
    "performer": "Freddy J",
    "description": "Get Electric!",
    "image": "https://yellow-magic-possum-182.mypinata.cloud/ipfs/QmZuKKHrD2HyA8GMRhiZ6ft8qiGny2CNvBEoqnt7p5EtY9/freddy_j_image.jpg",
    "time": "June 5 10:00pm 2024",
    "eventStart": 1717635600,
    "eventEnd": 1717650000,
    "location": "181 Great George St, Charlottetown, PE",
    "venue": "Baba's Lounge",
    // "groupName": "General Admission",
    "groupName": "VIP Access",
    "isTicket": true,
    "sig": "sig"
}

for (let i = 100; i < numTickets + 100; i++) {
    // const seatNum = ((i % 10) + 1).toString()
    // const row = (Math.floor(i / 10) + 1).toString();
    let metadata = baseMetadata
    // metadata.seat = seatNum
    // metadata.row = row

    let data = JSON.stringify(metadata, null, 2);

    fs.writeFile(path.join(`${__dirname}/freddy_j_240605_metadata`, `freddy_j_240605_metadata${i}.json`), data, (err) => {
        if (err) throw err;
        console.log(`File${i}.json has been saved!`);
    });
}