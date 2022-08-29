
const { Schema, model } = require("mongoose");

const LoanSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId,ref: "User" },
    amount: {type: Number,required: true},
    tenure: {type: Number,required: true},
    active:{type:Boolean, default:true},//"PENDING","APPROVED"
    repayment_status:{type:Boolean, default:false},
    loan_is_approved:{ type:Boolean,default:false },
  },
  { timestamps: true }
);



module.exports = model("Loan", LoanSchema);

