const mongoose = require("mongoose");
const schema = mongoose.Schema;
// const { isEmail } = require("validator");
// const bcrypt = require("bcrypt");

const customerSchema = new schema({
  plan: String,
  status: {
    type: String,
    default: "",
  },
  key: {
    type: String,
    default: null,
  },
  lastDeposit: {
    type: Number,
    default: 0,
  },
  lastLogin: String,
  role: {
    type: String,
    default: "customer",
  },
  image: String,
  wallet: {
    type: Number,
    default: 0,
  },
  country: {
    type: String,
    lowercase: true
  },
  initials: String,
  firstname: {
    type: String,
    lowercase: true,
    // required: [true, "Please enter your firstname"],
  },
  lastname: {
    type: String,
    lowercase: true,
    // required: [true, "Please enter your lastname"],
  },
  email: {
    type: String,
    lowercase: true,
    unique: { required: true },
    // required: [true, "Please enter your email!"],
    // validate: [isEmail, "Please enter a valid email address!"],
  },
  password: {
    type: String,
    // required: [true, "Provide a secure password!"],
    // minlength: [6, "Minimun password length is 6 characters"],
  },
  date: {
    type: String,
    default: Date,
  },
  referral: {
    type: Number,
    default: 0,
  },
  bonus: {
    type: Number,
    default: 0,
  },
  payouts: [Number],
  deposit: [Number],
  transcations: Array,
  //   role: 'basic'
});




module.exports = mongoose.models.Customer || mongoose.model("Customer", customerSchema);
