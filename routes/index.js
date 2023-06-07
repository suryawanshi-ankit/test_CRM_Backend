const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET_JWT = "SECRET_JWT";
const authenticate = require('../middlware/authenticate');
const { User, validateUser } = require('../models/userModel');

router.post('/login', (req, res) => {
  try {
    if (req.body.username === 'admin' && req.body.password === 'admin@123') {
      const token = jwt.sign({ username: req.body.username }, SECRET_JWT);
      res.status(200).header('auth-token', token).send("Login is done work for token!!!");
    } else {
      res.status(422).send("Incorrect username or email!!!");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error!!!");
  }
});

router.post('/candidates', authenticate, async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(422).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(422).send("allready exists this email");

    user = new User(req.body);
    user = await user.save();
    if (user) return res.status(201).send(user);

  } catch (error) {
    console.log("Error", error);
    return res.status(400).send(error);
  }
});

router.get('/candidates', authenticate, async (req, res) => {
  try {
    const { page, limit } = req.body;
    const skipValue = (page - 1) * limit;

    let userList = await User.find().skip(skipValue).limit(limit);
    let response = {
      "current_page": page,
      "first_page_url": "string",
      "from": ((page - 1) * limit + 1),
      "next_page_url": "null",
      "path": "string",
      "per_page": limit,
      "prev_page_url": "null",
      "to": ((page - 1) * limit + limit),
      "data": userList
    };
    if (userList) return res.status(200).send(response);
    else return res.status(400).send("Bad Request");

  } catch (error) {
    console.log("Error", error);
    return res.status(400).send(error);
  }
});

router.get('/candidates/search', authenticate, async (req, res) => {
  try {
    const { page, limit, first_name, last_name, email } = req.body;
    const skipValue = (page - 1) * limit;

    let userList = await User.find({ first_name: first_name, email: email, last_name: last_name }).skip(skipValue).limit(limit);
    let response = {
      "current_page": page,
      "first_page_url": "string",
      "from": ((page - 1) * limit + 1),
      "next_page_url": "null",
      "path": "string",
      "per_page": limit,
      "prev_page_url": "null",
      "to": ((page - 1) * limit + limit),
      "data": userList
    };
    if (userList) return res.status(200).send(response);
    else return res.status(400).send("Bad Request");

  } catch (error) {
    console.log("Error", error);
    return res.status(400).send(error);
  }
});

router.get('/candidates/:id', authenticate, async (req, res) => {
  try {

    let userList = await User.find({ _id: req.params.id });
    if (userList) return res.status(200).send(userList);
    else return res.status(400).send("Bad Request");

  } catch (error) {
    console.log("Error", error);
    return res.status(400).send(error);
  }
});

module.exports = router;
