let mongoose =  require("mongoose");
let Joi = require("@hapi/joi");


let movieSchema = new mongoose.Schema({
    name:{type:String,required:true},
    genre:{type:String},
    stocks:{type:Number,required:true}
})

let movieModel = mongoose.model("movies",movieSchema);

function MovieValidation(error){
    let Schema = Joi.object({
        name:Joi.string().required(),
        genre:Joi.string().required(),
        stocks:Joi.number().required()
    });
    return Schema.validate(error);
}

module.exports={ movieModel, MovieValidation,movieSchema };