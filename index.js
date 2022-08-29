const cors = require("cors");
const express = require("express");
const bp = require("body-parser");
const { connect } = require("mongoose");
const { success, error } = require("consola"); 

//Bring the app constants
const { DB, PORT } = require("./app/config");



//initialize application
const app = express();




//Initializing Middlewares
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static('public'));


//routes
app.use('/api/v1/users',require('./routes/users'));
app.use('/api/v1/loans',require('./routes/loans'));



const startApp = async () => {
  try {
    //connection with DB
    await connect(DB)
    success({
      message: `Successfully connected with the database \n${DB}`,
      badge: true,
    });
    //Start listening for the server on PORT
    app.listen(PORT, () =>
      success({
        message: `Server is running on \n${PORT}`,
        badge: true,
      })
    );
  } catch (err) {
   
    error({
      message: `Unable to connect with the database \n${err}`,
      badge: true,
    })
    startApp();
  }
};

startApp();

