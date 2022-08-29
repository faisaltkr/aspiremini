const Loan = require("../models/Loan");
const Repayment = require("../models/Repayment");
const LoanResource = require("../resources/LoanResource");
const moment = require("moment");

const index = async (req, res) => {
    try {

        if (req.user.role != "superadmin") {
            const loans = await Loan.find({user_id:req.user.user_id});
            const data = await Promise.all(
                loans.map(async (loan) => {
                    const repayments = await Repayment.find({ loan_id: loan._id }, "-createdAt -updatedAt -__v");

                    const collection = await LoanResource.collection(repayments);

                    return {
                        user_id: loan.user_id._id,
                        loan_id: loan._id,
                        amount: loan.amount,
                        status: (loan.loan_is_approved) ? "Approved" : "Pending",
                        repayment_status: loan.repayment_status,
                        created_at: loan.createdAt,
                        repayment_schedule: collection
                    }
                })
            )

            return res.status(200).json({
                success: true,
                message: `success`,
                data: data
            });
        }

        const loans = await Loan.find({},).populate({ path: 'user_id' });
        const data = await Promise.all(
            loans.map(async (loan) => {
                const repayments = await Repayment.find({ loan_id: loan._id }, "-createdAt -updatedAt -__v");

                const collection = await LoanResource.collection(repayments);

                return {
                    name: (loan.user_id) ? loan.user_id.name : "",
                    user_id: loan.user_id._id,
                    loan_id: loan._id,
                    amount: loan.amount,
                    status: (loan.loan_is_approved) ? "Approved" : "Pending",
                    repayment_status: loan.repayment_status,
                    created_at: loan.createdAt,
                    repayment_schedules: collection
                }
            })
        )

        return res.status(200).json({
            success: true,
            message: `success`,
            data: data
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `${error}`,
        });
    }
}

const store = async (req, res) => {

    try {

        const reqObj = req.body;
        //validation process
        if (reqObj.amount === "undefined" || reqObj.amount === "" || reqObj.amount == undefined) {
            return res.status(422).json({
                success: false,
                message: `Amount is required.`,
            });
        }

        if (reqObj.tenure === "undefined" || reqObj.tenure === "" || reqObj.tenure == undefined) {
            return res.status(422).json({
                success: false,
                message: `Tenure is required.`,
            });
        }

        if (isNaN(reqObj.tenure)) {
            return res.status(422).json({
                success: false,
                message: `Tenure is numeric`,
            });
        }


        //loanproducts are weekly loans that is 7 days repayment
        //calculation of cumber of Repayment
        const loan = await Loan.create({
            user_id: req.user.user_id,
            amount: reqObj.amount,
            tenure: reqObj.tenure,
        });


        return res.status(200).json({
            success: true,
            message: `success`,
            data: loan
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `${error}`,
        });
    }

}


const loanapprove = async (req, res) => {
    try {

        if (req.user.role != "superadmin") {
            return res.status(403).json({
                success: false,
                message: `Permission denied`,
            });
        }
        const reqObj = req.body;
        if (reqObj.user_id === "undefined" || reqObj.user_id === "" || reqObj.user_id == undefined) {
            return res.status(422).json({
                success: false,
                message: `User id is required.`,
            });
        }

        if (reqObj.loan_id === "undefined" || reqObj.loan_id === "" || reqObj.loan_id == undefined) {
            return res.status(422).json({
                success: false,
                message: `Loan id is required.`,
            });
        }

        const { user_id, loan_id } = req.body;

        if (loan) {
            const loan = await Loan.findById(loan_id);
            let duedate = "";

            for (let i = 1; i <= loan.tenure; i++) {

                let duedate = moment(new Date()).add(i * 7, 'days');
                let amount = parseFloat(loan.amount) / loan.tenure;
                await Repayment.create({
                    user_id: user_id,
                    loan_id: loan._id,
                    duedate: duedate,
                    amount: amount
                });

            }

            loan.loan_is_approved = true;
            await loan.save();

            return res.status(201).json({
                success: true,
                message: `success`,
                data: loan
            });
        } else {
            return res.status(422).json({
                success: false,
                message: `Loan id is Invalid`
            });
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `${error}`,
        });
    }
}


const repayment = async (req, res) => {
    try {

        const reqObj = req.body;
        if (reqObj.repayment_id === "undefined" || reqObj.repayment_id === "" || reqObj.repayment_id == undefined) {
            return res.status(422).json({
                success: false,
                message: `Loan Repayment id is required.`,
            });
        }

        const repay = await Repayment.findById(reqObj.repayment_id);

        const  { amount_paid = repay.amount } =  req.body

        if(amount_paid<repay.amount){
            return res.status(422).json({
                success: false,
                message: `Loan amount is less than due amount.`,
            });
        }
        if(repay){
            repay.amount_paid_on = new Date();
            repay.repayment_status=true;
            repay.amount = amount_paid;
            await repay.save();


            //after completing repayments
            const schedules = await Repayment.find({loan_id:repay.loan_id})
            if(schedules && schedules.length > 0){

                if(schedules.every( (val, i, arr) => val.repayment_status ==true ))
                {
                  await Loan.findOneAndUpdate({loan_id:repay.loan_id},{repayment_status:true});
                } 
         
              }
            return res.status(201).json({
                success: true,
                message: `success`,
                data: repay
            });
        }else{
            return res.status(422).json({
                success: false,
                message: `Repayment id is Invalid`
            });
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `${error}`,
        });
    }
}


const show = async (req, res) => {
    try {

        const loans = await Loan.find({user_id:req.user.user_id});
        const data = await Promise.all(
            loans.map(async (loan) => {
                const repayments = await Repayment.find({ loan_id: loan._id }, "-createdAt -updatedAt -__v");

                return {
                    name: (loan.user_id) ? loan.user_id.name : "",
                    user_id: loan.user_id._id,
                    loan_id: loan._id,
                    amount: loan.amount,
                    status: (loan.loan_is_approved) ? "Approved" : "Pending",
                    repayment_status: loan.repayment_status,
                    created_at: loan.createdAt,
                    repayment_schedules: repayments
                }
            })
        )

        return res.status(200).json({
            success: true,
            message: `success`,
            data: data
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `${error}`,
        });
    }
}




module.exports = {
    index, store, loanapprove, repayment, show
}
