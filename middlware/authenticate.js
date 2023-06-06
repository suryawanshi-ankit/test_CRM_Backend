const jwt = require('jsonwebtoken');
const SECRET_JWT = "SECRET_JWT";

function authenticate(req, res, next) {
  try {
    const token = req.header('Authorization').split(" ");
    const verification = jwt.verify(token[1], SECRET_JWT);
    console.log('authenticate', verification);
    req.username = verification.username;
    next();
  } catch (error) {
    res.status(422).send("Invalid token!!!");
  }
}

module.exports = authenticate;
