const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");// is handle the error 
const ExpressError = require("../utils/ExpressError.js"); // it is another method for handling the error
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const{ validateReview, isLoggedIN, isReviewAuthor } = require("../middlware.js");
const  reviewController  = require("../controller/review.js");

// reviews post route

router.post("/", isLoggedIN,
     validateReview,
      wrapAsync(reviewController.createReview));

//Delete Review Route
router.delete("/:reviewId", isLoggedIN,
    isReviewAuthor,
    wrapAsync(reviewController.deleteReview));

module.exports = router;