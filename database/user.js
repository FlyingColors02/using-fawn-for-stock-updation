let mongoose = require("mongoose");
let Joi = require("@hapi/joi");
let movie= require("./movie");
let userSchema =  new mongoose.Schema({
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, required:true},
    movieId:{type:movie.movieSchema}
});

let userModel = mongoose.model("users",userSchema);

function UserValidation(error){
    let Schema = Joi.object({
        firstname:Joi.string().required(),
        lastname:Joi.string().required(),
        email:Joi.string().required(),
        movieId:Joi.string().required()
    })
    return Schema.validate(error);
}

module.exports = {userModel,UserValidation};