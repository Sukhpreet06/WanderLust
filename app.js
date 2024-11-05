if(process.env.NODE_ENV != "production"){
require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate=require("ejs-mate")
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport=require("passport");
const Localstrategy=require("passport-local");
const User = require("./models/user.js");
const  listingRouter =require("./routes/listing.js");
const  reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const dburl= 'mongodb+srv://sukhpreetsinghjii:sukh123@cluster0.wnp48.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const SECRET = mysupersecretcode;

 async function main() {
    try {
        await mongoose.connect(dburl);
        console.log("Connection successful");
    } catch (err) {
        console.error("Connection error:", err);
    }
}



main();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
 app.use(express.urlencoded({ extended: true }));
 app.use(methodOverride("_method"));
 app.engine("ejs",ejsmate);
 app.use(express.static(path.join(__dirname,"/public")));
 
 
 const  store = MongoStore.create({
    mongoUrl: dburl,
    crypto: {
        secret:SECRET,
    },
    touchAfter: 24 * 3600,
 });
 store.on("error", () =>{
    console.log("Error in Mongo Session store ",err);
 });

 const sessionOptions = {
    store,
    secret :SECRET,
    resave :false,
    saveUninitialized :true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        httpOnly :true
    },
 };

 

app.use(session(sessionOptions));
app.use(flash());

//congigure startegy
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success =req.flash("success");
    res.locals.error =req.flash("error");
    res.locals.currUser = req.user;
    next();

})




app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

app.get("/show",(req,res)=>{
    //res.render("listings/index.ejs"); 
    res.send("hey show here");
});


app.all("*",(req, res, next)=>{
    next(new ExpressError(404," Ahmmmm Page Not Found !"));
});
//Middelware___1

app.use((err, req, res, next)=>{
    if(!err){
        err={}; // ensure error is an object
    }
    if(!err.message){
        err.message="something went wrongg yrr :"
    }
    let {statusCode=500 , message="Something went wrong !"} = err;
    //console.log(err);
    res.status(statusCode).render("error.ejs",{err});
     //res.status(statusCode).send(message);
     //res.render("error.ejs",{err});
})

app.listen(8080, () => {
    console.log("server is  listening to port 8080");
});

