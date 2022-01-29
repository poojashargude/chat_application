const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema({
  phone_number: {
    type: Number,
    required: true,
  },
  chat: [
    {
      isAdmin: {
        type: Boolean,
        default: false,
        required: true,
      },
      messages: {
        type: String,
        required: true,
      },
      date_time: {
        type: Date,
        default: Date.now(),
        required: true,
      },
    },
  ],
});

/*chat:[{message:{

}}]*/

module.exports = mongoose.model("Messages", MessagesSchema);
