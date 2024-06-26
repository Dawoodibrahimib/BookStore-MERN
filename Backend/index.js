const config = require('./config.js');

const express = require("express");

const mongoose = require("mongoose");

const Book = require("../Backend/models/bookmodel.js")

const app = express();

const cors = require('cors');

const bookRoutes = require("../Backend/Routes/bookRoute.js")


//Middleware for requesting Body

app.use(express.json());


//Middleware for handling CORS Policy
// OPTION:1 Allow all origin with default of cors
//Allow Custom origins
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use("/books",bookRoutes)


app.listen(config.PORT,(req,res) =>
    {
        console.log(`Online on PORT:${config.PORT}`);
    })
    

// -----------------------------------------------------------------------------//
   // Connection to Database

mongoose
.connect(config.mongoDBUrl)
.then(() =>
{
  console.log("Database connected")
})
.catch((error) =>
{
    console.log(error);
})

