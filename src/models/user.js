const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    mobile: { type: Number, required: [true, 'Mobile Number is required.'] },
    password: { type: String },
    email: {
      type: String,
      validate: {
        validator: (email) => {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email)
        },
        message: 'Email validation failed'
      }
    }
  },
  { timestamps: true }
);

UserSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      mobile: this.mobile,
      is_active: this.is_active,
      email: this.email,
      friendsList: this.friendsList,
      sentRequest: this.sentRequest,
    };
  }
};

module.exports = mongoose.model('User', UserSchema);
