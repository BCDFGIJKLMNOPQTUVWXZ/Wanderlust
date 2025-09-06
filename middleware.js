const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema} = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    console.log(req.path, "..", req.originalUrl);

    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        console.log(req.session.redirectUrl);
        req.flash("error", "You must be logged in to airbnb your place.");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
        //  delete req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async(req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (
      !(
        res.locals.currentUser &&
        listing.Owner._id.equals(res.locals.currentUser._id)
      )
    ) {
      req.flash("error", "You don't have permission to edit");
      return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing = (req, res, next) => {
  //Joi is validating the schema
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
    //Joi is validating the schema
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
     next();
    }
 };

module.exports.isAuthor = async(req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (
      !(
        res.locals.currentUser &&
        review.author._id.equals(res.locals.currentUser._id)
      )
    ) {
      req.flash("error", "You did't create this review");
      return res.redirect(`/listings/${id}`);
    }
    next();
};
