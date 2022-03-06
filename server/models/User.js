const mongoose = require("mongoose");

const { Schema } = mongoose;

// User model
const UserSchema = new Schema({
  balance: {
    type: Number,
    default: 0,
    min: 0
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  registeredAt: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);
