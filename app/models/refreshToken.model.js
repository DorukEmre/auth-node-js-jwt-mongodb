const mongoose = require("mongoose");
require('dotenv').config()

// This Mongoose model has one-to-one relationship with User model. It contains expiryDate field which value is set by adding config.jwtRefreshExpiration value above.

// There are 2 static methods:
//     createToken: for creating a random token and save new object into MongoDB database
//     verifyExpiration: compare expiryDate with current Date time to check the expiration

const RefreshTokenSchema = new mongoose.Schema({
  token: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  expiryDate: Date,
});

RefreshTokenSchema.statics.createToken = async function (user) {
  let expiredAt = new Date();
  expiredAt.setSeconds(
    expiredAt.getSeconds() + process.env.JWT_REFRESH_EXPIRATION
  );
  let _token = Date.now() + '-' + Math.round(Math.random() * 1E9);
  let _object = new this({
    token: _token,
    user: user._id,
    expiryDate: expiredAt.getTime(),
  });
  console.log(_object);
  let refreshToken = await _object.save();
  return refreshToken.token;
};

RefreshTokenSchema.statics.verifyExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
}

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);

module.exports = RefreshToken;