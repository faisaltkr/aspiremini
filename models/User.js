const { Schema, model } = require("mongoose");


const UserSchema = new Schema(
  {
    name: { type: String,required: true },
    email: {type: String,default:""},
    password: {type: String,required: true,},
    active:{type:Boolean, default:true},
    role: {type: String,default: "customer",enum: ["superadmin","customer"]},
  },
  { timestamps: true }
);



module.exports = model("User", UserSchema);

