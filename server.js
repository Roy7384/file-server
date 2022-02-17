const fs = require('fs');
const net = require('net');

const server = net.createServer();

server.on('connection', (client) => {
  console.log('client connected');
  client.setEncoding('utf8');
  client.on('data', (data) => {
    console.log(`client requested ${data}`);
    fs.readFile(`./serverFile/${data}`, 'utf8', (err, data) => {
      client.write(data);
    });
  });
});

server.listen(3000, () => {
  console.log('server listening on port 3000');
});