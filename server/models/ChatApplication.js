const mongoose = require("mongoose");

const ChatApplicationSchema = new mongoose.Schema({
  phone_number: {
    type: Number,
    required: true,
  },
  email_address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  chat: [
    {
      user_phone_number: {
        type: Number,
        required: true,
      },
      messages: {
        type: String,
        required: true,
      },
      user_reply: {
        type: String,
        required: true,
      },
      time: {
        type: Date,
        default: Date.now(),
        required: true,
      },
    },
  ],
});

/*chat:[{message:{

}}]*/

module.exports = mongoose.model("ChatApplication", ChatApplicationSchema);
