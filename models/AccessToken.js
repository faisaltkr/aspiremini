const { Schema, model } = require("mongoose");

const AccessTokenSchema = new Schema(
  {
    user_id:{type:String,required:true},
    access_token: {type: String,required: true},
    createdAt: {type: Date,default: Date.now},
  },
  { timestamps: true }
);

module.exports = model("AccessToken", AccessTokenSchema);
