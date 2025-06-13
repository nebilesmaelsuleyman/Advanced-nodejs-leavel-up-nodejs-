const mongoose = require('mongoose');
const validator = require('validator');
const toJson = require('@meanie/mongoose-to-json');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      private: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            'Password should contain at least one uppercase letter, one lowercase letter, one         number, and one special character',
          );
        }
      },
    },
  },
  {
    timestamps: true,
  },
);
userSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email });
  // return true if user found
  return !!user;
};
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 12);
  }
  next();
});

userSchema.plugin(toJson);

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};
const User = mongoose.model('USer', userSchema);
module.exports = User;
