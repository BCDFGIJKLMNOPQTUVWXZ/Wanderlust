const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require('../models/listing');
const Review = require('../models/review.js');
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { validateReview, isLoggedIn, isAuthor } = require("../middleware.js");

//Reviews
router.post("/", validateReview, isLoggedIn, wrapAsync(async(req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    const { rating, review } = req.body.review;

    console.log("REVIEW POST route hit!");
    console.log("Params:", req.params);
    console.log("Body:", req.body);

    let newReview = new Review({ rating, review });
    newReview.author = req.user._id;
    await newReview.save();

    listing.reviews.push(newReview); // connect review to listing
    await listing.save();

    req.flash("success", "New review uploaded!");
    res.redirect(`/listings/${id}`);
}));

router.delete("/:reviewId", isAuthor, wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    //Deleting a particular review for a place not the whole place.
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Your review is deleted!");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;