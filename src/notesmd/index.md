send mail if there is an issue with the webhook
add notification schema. notifications will appear in the client dashboard
const mongoose = require("mongoose");

````
recipients = [
    alluseers,
    oneuser,
    onechama,
    allchamas,

]
}
```;

const notifications = new mongoose.Schema(
  {
    recipient: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notifications", notifications);
````
