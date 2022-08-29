const { Schema, model } = require("mongoose");


const RepaymentSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId,ref: "User" },
    loan_id: { type: Schema.Types.ObjectId,ref: "Loan" },
    duedate: {type: Date, required:true},
    amount: {type: Number,required: true,},
    amount_paid_on:{type:Date, default:null},
    repayment_status:{type:Boolean, default:false},
  },
  { timestamps: true }
);



module.exports = model("Repayment", RepaymentSchema);

