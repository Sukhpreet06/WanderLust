const listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createreview = async (req, res) => {
    let listingg = await listing.findById(req.params.id);
    console.log(req.body);
    if (!listingg) {
        throw new ExpressError(404, "Listing not found");
    }
    let newReview = new Review(req.body.review);
    newReview.author=req.user._id;

    listingg.reviews.push(newReview);

    await newReview.save();
    await listingg.save();
    req.flash("success", "New Review Created");

    console.log("new Review Saved ");
    res.redirect(`/listings/${listingg._id}`);
};

module.exports.deleteRoute=async (req, res) => {
    let { id, reviewid } = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    await Review.findByIdAndDelete(reviewid);
    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);

};