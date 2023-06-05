const express = require('express');
require('./dbConn');
const app = express();

app.listen(8080, () => console.log("listning on port 8080"));