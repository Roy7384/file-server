const fileName = process.argv.slice(2)[0];
const stdin = process.stdin;
const fs = require('fs');
const net = require('net');

// setup connection
const conn = net.createConnection({
  host: 'localhost',
  port: 3000
}, () => {
  console.log('connected');
});
// once we have conn this connection object, we send fileName to the server
conn.write(fileName);

// helper function to wirte file to clientFoler
const download = function(data, file) {
  fs.writeFile(`./clientFolder/${file}`, data, err => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

const dlCommand = [fileName];

// request other files can be done by typing in the file name
stdin.on('data', (input) => {
  const inputStr = input.toString().slice(0, -1);
  conn.write(inputStr);
  dlCommand.push(inputStr);
});


// downloading the first request
conn.setEncoding('utf8');
conn.on('data', (data) => {
  download(data, dlCommand.at(-1));
  console.log(`Downloaded ${dlCommand.at(-1)} to clientFolder`);
});
