const { EventEmitter } = require("events");

export class MailEvent extends EventEmitter {
  constructor() {
    super();
  }

  verifyEmail(email) {
    this.emit("verifyEmail", email);
    return;
  }

  forgotPassword(email) {
    this.emit("forgotPassword", email);
    return;
  }

  resetPassword(email) {
    this.emit("resetPassword", email);
    return;
  }
}
