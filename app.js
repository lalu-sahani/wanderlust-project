if (process.env.NODE_ENV != "production")
    {
        require('dotenv').config();
    }
    console.log(process.env.SECRET);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate"); //ejs-mate help us to create multiple boilerplate 
// const wrapAsync = require("./utils/wrapAsync.js");// is handle the error 
// const ExpressError = require("./utils/ExpressError.js"); // it is another method for handling the error
// const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");

const listingRouter= require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

app.use(express.json());

const dbUrl = process.env.ATLASDB_URL;

async function main() {
    await mongoose.connect(dbUrl);
    
}
main()
.then(()=>{
    console.log(" successful");
    console.log(dbUrl);
})
.catch((err)=>{
    console.log(err);
});

app.set("views",path.join(__dirname, "/views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

//this is for connect mongo db with mongodb atlas
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{ 
        secret: process.env.SECRET ,
    },
    touchAfter: 24 * 3600,
    //  autoRemove: 'native'
});

store.on("error", (err) =>{
    console.log("ERROR IN MONGO SEESSION STORE", err);
});


const sessionOption = {   
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    
    cookie: {
        expires: Date.now() + 7* 24 * 60 * 60 * 1000 ,
        maxAge: 7*24*60*60*1000,
        httpOnly:true  //this is for to save our data from cross-crisping-attacks(search about this and read and read )
    },
};



app.use(session(sessionOption)); //now we are adding session middleware that can track my session.
app.use(flash());


//for using passport packages we need to session middleware 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

 
app.use((req, res, next) =>{ // this middlware is used to pass local variable to our ejs file 
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// app.get("/", (req, res)=>{
//    res.send("hii I am root route.");
// });


app.use("/listings", listingRouter);

app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// =========== COMPLETE ERROR HANDLER ===========
app.use((err, req, res, next) => {
    console.error("🔴 ERROR:", err.name, err.message);
    
    let statusCode = 500;
    let message = "Something went wrong!";
    
    // ExpressError
    if (err.statusCode && typeof err.statusCode === 'number') {
        statusCode = err.statusCode;
        message = err.message;
    }
    // MongoDB Validation Error
    else if (err.name === 'ValidationError') {
        statusCode = 400;
        message = `Validation Error: ${err.message}`;
    }
    // MongoDB Cast Error (invalid ID)
    else if (err.name === 'CastError') {
        statusCode = 400;
        message = "Invalid ID format";
    }
    // Mongoose duplicate key error
    else if (err.code === 11000) {
        statusCode = 400;
        message = "Duplicate value entered";
    }
    
    console.log(`📤 Sending response: ${statusCode} - ${message}`);
    res.status(statusCode).send(message);
});

app.listen(8080, () =>{
     console.log("server is listening to the port");
});