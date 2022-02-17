const fileName = process.argv.slice(2)[0];
const fs = require('fs');
const net = require('net');


const conn = net.createConnection({
  host: 'localhost',
  port: 3000
}, () => {
  console.log('connected');
});

conn.setEncoding('utf8');
conn.write(fileName);
conn.on('data', (data) => {
  fs.writeFile(`./clientFolder/${fileName}`, data, err => {
    if (err) {
      console.error(err);
      return;
    }
  });
});