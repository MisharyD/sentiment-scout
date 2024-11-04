const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

notificationSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Notification', notificationSchema);
