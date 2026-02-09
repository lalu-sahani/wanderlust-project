//now wer are structuring our routes in a clean format so we can easily understand.
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIN, isOwner, validateListing } = require("../middlware.js");
const  listingController  = require("../controller/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

// 1. NEW route (pehle)
router.get("/new", isLoggedIN,wrapAsync (listingController.renderNewForm));

// 2. EDIT route (dusra)
router.get("/:id/edit",isLoggedIN, 
    isOwner,wrapAsync (listingController.editListing));


router.route("/")
.get(wrapAsync (listingController.index))
.post(isLoggedIN,validateListing, upload.single("listing[image]"), wrapAsync (listingController.createListing));



// router.get("/", wrapAsync (listingController.index));
// 5. CREATE route
// router.post("/",isLoggedIN,validateListing, wrapAsync (listingController.createListing))

// show, update and delete route are define below using router.route method
router.route("/:id")
.get(wrapAsync (listingController.showListing))
.put(isLoggedIN,  isOwner, upload.single("listing[image]"), validateListing,  wrapAsync (listingController.updateListing))
.delete(isLoggedIN,isOwner,wrapAsync (listingController.destroyListing));

// 6. UPDATE route
// router.put("/:id", isLoggedIN,  isOwner,  validateListing,  wrapAsync (listingController.updateListing));

//delete route
// router.delete("/:id", isLoggedIN, isOwner, wrapAsync (listingController.destroyListing));

module.exports = router;