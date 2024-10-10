const Listing = require("./models/listing");
const Review= require("./models/review")
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema}= require("./schema.js");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You Must Be LoggedIn For Creating And Updating  A  Listing..!");
        return res.redirect("/login");
    }
    next();
};

module.exports.savedredirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};
module.exports.isOwner = async(req,res,next)=>{
    let{id}=req.params;
    let listingg=await Listing.findById(id);
    if(!listingg.owner.equals(res.locals.currUser._id)){
        req.flash("error","You Are not an owner of this Listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validatelisting = (req , res , next)=>{
    const {error} =listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(','); // Get a readable error message
        throw new ExpressError(400, msg); // Pass the message to the error handler
    } else {
        next(); // Proceed if no error
    }
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(','); // Get a readable error message
        throw new ExpressError(400, msg); // Pass the message to the error handler
    } else {
        next(); // Proceed if no error
    }
};

module.exports.isReviewAuthor = async(req,res,next)=>{
    let{id,reviewid}=req.params;
    let review=await Review.findById(reviewid);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are Not The Author Of  This Review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};