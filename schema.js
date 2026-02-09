// utils/schema.js - YEH EXACT BANAO
const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(), 
        price: Joi.number().required().min(0),
        image: Joi.string().allow('', null).optional()
        
    }).required()
});

// now we are going to creare a new schema for review model

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required()
})