
const User = require('../models/User');
const Token = require('../models/AccessToken');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET,APP_ENV } = require("../app/config");

const userLogin = async (req, res) => {
    try {
      let { email, password } = req.body;
      //first check if the userid is in the database
  
      let user=false;
      user = await User.findOne({ email:email });
      if (!user) {
        return res.status(422).json({success: false,message: `Invalid login credentials.`});
      }
      if(!user.active){
        return res.status(422).json({ success: false,message: `User is disabled, please contact system admin.`});
      }
      //That means user is existing  and trying to signin from the right portal
      //Now check the password

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        //Sign in the token and issue to the user
        const token = jwt.sign(
          {
            user_id: user._id,
            name:user.name,
            role: user.role,
            email: user.email,
          },
          APP_SECRET,
          { expiresIn: "7d" }
        );
        let today = new Date();
        today.setHours(today.getHours() + 24*7);

      
            //insert/update token to db
        if(APP_ENV=="production")
        {
          const tokenExists = await Token.exists({user_id: user._id}); 
          if(tokenExists){
            const update = await Token.findOneAndUpdate({ user_id:user._id },{ access_token:token }).exec();
          }else{
            const authtoken = await Token.create({ user_id:user._id, access_token:token });
          }
        }else{
          const authtoken = await Token.create({ user_id:user._id, access_token:token });
        }
        
        const result = {
          role: user.role,
          email: user.email,
          token,
          expiresIn: today
        };

        return res.status(200).json({success: true,message: `Hurry! you are now logged in.`,data:result});

      } else {
        return res.status(403).json({success: false,message: `Incorrect password`});
      }
  } catch (error) {
    console.log(error);
    return res.status(500).json({success: false,message: `${error}`});
  }
};



module.exports = {
  userLogin
};