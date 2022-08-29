const Nodemailer = require('nodemailer');


class MailService {
    /**
     * @description send custom emails
     * @params maildata
     */
     constructor () {
        // Create instance mail transporter configs
        this.transporter = Nodemailer.createTransport({
            //host: "smtp.gmail.com",
           // port: 465,
            service: 'gmail',
            auth: {
                user: "from@metrictreelabs.com",
                pass: "fohpgzoguaaydzcb"
            }
          });
    }

    async send(mailData) {
        try{

            const mailOptions = {
              from: '"FROM NAME" no_replay@nbfc.metrictreelabs.com',  // sender address
              to: mailData.to,   // list of receivers
              subject: mailData.subject,
              text: 'That was easy!',
              html: mailData.content,
            };
      
            this.transporter.sendMail(mailOptions, function (err, info) {
               if(err)
                 console.log(err)
               else
                 console.log(info);
            });
          }catch (error){
              console.log(error)
          }
    }
}

module.exports = MailService;