const Resource = require('resources.js');

class LoanResource extends Resource {

    toArray() {
        return  {
            _id: this._id,
            user_id: this.user_id,
            loan_id: this.loan_id,
            duedate: this.duedate,
            amount: this.amount,
            amount_paid_on: this.amount_paid_on,
            repayment_status: (this.repayment_status) ? "Paid" : "Pending"
          }
      
    }
}



module.exports = LoanResource;
