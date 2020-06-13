let express = require("express");
let router = express.Router();
let movieModel = require("../database/movie");

router.post("/movieshow", async(req,res)=>{
    let {error}= movieModel.MovieValidation(req.body);
    if(error){return res.status(400).send({msg:error.details[0].message})};
    let newData = new movieModel.movieModel({
        name:req.body.name,
        genre:req.body.genre,
        stocks:req.body.stocks
    });
    let data = await newData.save();
    res.send({d:data});
})


module.exports=router;