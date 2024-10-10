const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, 
    isLoggedIn,
    isReviewAuthor,}=require("../middleware.js");
    
const reviewControler = require("../controllers/review.js");






//Review route post Route

router.post("/",isLoggedIn ,validateReview, wrapAsync(reviewControler.createreview));

//Delete Review Route
router.delete("/:reviewid",isLoggedIn,isReviewAuthor, wrapAsync(reviewControler.deleteRoute)
);


module.exports = router;
