
const User = require('../models/User');
const bcrypt = require("bcryptjs");
const helper = require("../app/helper/base");

const index = async (req, res) => {

    try {
        const users = await User.find({},"_id name email active role createdAt")
        return res.status(200).json({
            success:true,
            message:`success`,
            data: users
        })
        
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

        const userObj = req.body;

        //validation process
    if (userObj.name === "undefined" || userObj.name === "" || userObj.name == undefined) {
        return res.status(422).json({
          success: false,
          message: `User name is required.`,
        });
      }

      if (userObj.email === "undefined" || userObj.email === "" || userObj.email == undefined) {
        return res.status(422).json({
          success: false,
          message: `User email id is required.`,
        });
      }
      const validateEmailIdIstaken = await User.findOne({email:req.body.email});
      if (validateEmailIdIstaken) {
        return res.status(422).json({
          success: false,
          message: `Email id is already taken.`,
        });
      }

      //after validation create user
      const { password = await helper.makeRandom(10) } = req.body;


      const user = await User.create({
        name: userObj.name,
        email: userObj.email,
        role: 'superadmin',
        password: await bcrypt.hash(password, 12),
      });

      if (user){
        return res.status(201).json({ message: "successfully created", success: true, data: user });
      }
      return res.status(400).json({ message: "Unknown Error", success: false });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: `${error}`,
        });
    }
}




module.exports = {
    index, store
}


