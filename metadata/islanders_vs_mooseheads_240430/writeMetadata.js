const fs = require('fs');
const path = require('path');

const numTickets = 100

const baseMetadata = {
    "name": "Charlottetown Islanders vs Halifax Mooseheads",
    "performer": "Charlottetown Islanders",
    "description": "Intense Maritime QMJHL Match Up",
    "image": "https://yellow-magic-possum-182.mypinata.cloud/ipfs/Qma3huQ6dCGUjFGL7W4Q1CjvAv98DXoieFfSMN5VxsmJQG/islandersVsMooseheads.jpg",
    "time": "April 30 7:00pm 2024",
    "location": "Charlottetown PEI",
    "venue": "Eastlink Center",
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

    fs.writeFile(path.join(`${__dirname}/islanders_vs_mooseheads_240430_metadata`, `islanders_vs_mooseheads_240430${i}.json`), data, (err) => {
        if (err) throw err;
        console.log(`File${i}.json has been saved!`);
    });
}