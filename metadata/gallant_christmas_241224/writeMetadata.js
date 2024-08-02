const fs = require('fs');
const path = require('path');

const numTickets = 100

const baseMetadata = {
    "name": "Lennie Gallant Christmas Concert",
    "performer": "Lennie Gallant",
    "description": "Come watch the best concert in Charlottetown!",
    "image": "https://yellow-magic-possum-182.mypinata.cloud/ipfs/Qma45JBypPT3Yuivd75pcJmzHtzEnyx2z3yCaZDqs8KXRy/gallant_christmas.jpg",
    "time": "December 24 7:00pm 2024",
    "location": "Charlottetown PEI",
    "venue": "Confederation Centre of the Arts",
    "section": "1",
    "seat": "1",
    "row": "1",
    "column": "",
    "sig": "sig"
}

for (let i = 0; i < numTickets; i++) {
    const seatNum = ((i % 10) + 1).toString()
    const row = (Math.floor(i / 10) + 1).toString();
    let metadata = baseMetadata
    metadata.seat = seatNum
    metadata.row = row

    let data = JSON.stringify(metadata, null, 2);

    fs.writeFile(path.join(`${__dirname}/gallant_christmas_241224_metadata`, `gallant_christmas_241224${i}.json`), data, (err) => {
        if (err) throw err;
        console.log(`File${i}.json has been saved!`);
    });
}