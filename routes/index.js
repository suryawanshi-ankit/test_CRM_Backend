const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET_JWT = "SECRET_JWT";
const authenticate = require('../middlware/authenticate');
const { User, validateUser } = require('../models/userModel');

router.post('/login', (req, res) => {
  try {
    if (req.body.username === 'admin' && req.body.password === 'admin@123') {
      const token = jwt.sign({username: req.body.username}, SECRET_JWT);
      res.status(200).header('auth-token', token).send("Login is done work for token!!!");
    } else {
      res.status(422).send("Incorrect username or email!!!");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error!!!");                       
  }
});

router.post('/candidates', authenticate ,async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(422).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(422).send("allready exists this email");

    user = new User(req.body);
    user = await user.save();
    if (user) return res.status(201).send(user);

  } catch (error) {
    console.log("Error", error);
  }
})



module.exports = router;