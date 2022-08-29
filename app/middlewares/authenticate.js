
const jwt = require("jsonwebtoken");
const Token = require("../../models/AccessToken");

module.exports = async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null) return res
          .status(401)
          .json({ status: "error", message: "Unauthenticated" });
  
      jwt.verify(token, process.env.APP_SECRET, async (err, user) => {
        console.log(err);
        if (err) return res.status(403).json({ message:`Invalid Token`,success:false });
        const tokenExists = await Token.exists({ access_token:token });
        if(!tokenExists) return res.status(403).json({ message:`Invalid Token`,success:false });
        req.user = user;
        next();
      });
    } catch (error) {
      return res
        .status(401)
        .json({ status: "error", message: "Unauthenticated" });
    }
  };