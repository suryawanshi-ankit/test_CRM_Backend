const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/rcm')
  .then(() => console.log("connected to mongoDB"))
  .catch(() => console.log("Error in connecting mongoDB"));
