const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listing = require("../models/listing.js")
const { isLoggedIn, isOwner, validatelisting } = require("../middleware.js");

const listingcontroller=require("../controllers/listing.js");
const multer = require('multer');
const {storage}=require("../cloudconfig.js");
const upload = multer({ storage });


router.route("/")
.get(wrapAsync(listingcontroller.index))
.post(
     isLoggedIn,
     upload.single("nlisting[image]"),
     validatelisting, 
     wrapAsync(listingcontroller.createListing)
);

//new route
router.get("/new", isLoggedIn, listingcontroller.renderNewForm );
router.get("/search", listingcontroller.searchoptn );

router.route("/:id")
.get(wrapAsync(listingcontroller.showListing)
).put(
     isLoggedIn,
      isOwner,
      upload.single("nlisting[image]"),
      validatelisting,
      wrapAsync(listingcontroller.updateListing)
).delete(isLoggedIn, isOwner, wrapAsync(listingcontroller.destroyListing)
);

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingcontroller.rendereditForm)
);

module.exports = router;