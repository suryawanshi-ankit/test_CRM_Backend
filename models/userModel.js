const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    maxlength: 40,
  },
  last_name: {
    type: String,
    required: true,
    maxlength: 40,
  },
  email: {
    type: String,
    required: true,
    maxlength: 100,
    unique: true,
  },
  contact_number: {
    type: String,
    required: true,
    maxlength: 100,
    unique: true,
  },
  gender: {
    type: Number,
    required: true,
    maxlength: 2,
  },
  specialization: {
    type: String,
    required: true,
    maxlength: 200,
  },
  work_ex_year: {
    type: Number,
    required: true,
    maxlength: 30,
  },
  candidate_dob: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
    maxlength: 500,
  },
  resume: {
    type: [String, null],
    // required: true,
  },
});

function userValidation(user) {
  const schema = {
    first_name: Joi.string().max(40).required(),
    last_name: Joi.string().max(40).required(),
    email: Joi.string().email().max(100).required(),
    contact_number: Joi.string().max(100).required(), 
    gender: Joi.number().max(2).required(),
    specialization: Joi.string().max(200).required(), 
    work_ex_year: Joi.string().max(30).required(),
    candidate_dob: Joi.string().required(),
    address: Joi.string().max(500).required(),
    resume: Joi.string().allow(null).required(),
  }

  return Joi.validate(user, schema);
}

exports.User = mongoose.model('User', userSchema);
exports.validateUser = userValidation;
