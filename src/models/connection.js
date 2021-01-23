const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConnectionSchema = new mongoose.Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    friendsList: [{ type: Schema.Types.ObjectId, ref: "User" }],
    req_sent: [{ type: Schema.Types.ObjectId, ref: "User" }],
    req_recieved: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

ConnectionSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      user_id: this.user_id,
      friendsList: this.friendsList,
      req_sent: this.req_sent,
      req_recieved: this.req_recieved
    };
  }
};

module.exports = mongoose.model('Connection', ConnectionSchema);
