const express = require('express');
const router = require('./routes');
const https = require('https');
const fs = require('fs');
const PORT = 8080

require('./dbConn');

const app = express();

app.use(express.json());
app.use('/api.recruitcrm.io/v1', router);

const options = {
  key: fs.readFileSync('/home/developer/private-key.pem'),
  cert: fs.readFileSync('/home/developer/certificate.pem')
};


const server = https.createServer(options, app);

server.listen(PORT, () => console.log("listning on port 8080"));