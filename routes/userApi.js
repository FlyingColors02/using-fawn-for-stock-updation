let express = require("express");
let router = express.Router();
let fawn = require("fawn");
let userModel = require("../database/user.js");
let movie = require("../database/movie")

router.post("/user",async(req,res)=>{
    let {error} = userModel.UserValidation(req.body);
    if(error){return res.status(400).send({message:error.details[0].message});}

    let m= await movie.movieModel.findById(req.body.movieId);
    if(m.stocks===0){return res.status(403).send({message:"OUT OF STOCKS"})};

    let newData = new userModel.userModel({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        movieId:{
            name:m.name,
            genre:m.genre,
            stocks:m.stocks
        }
    });
    await fawn
        .Task()
        .save("users",newData)
        .update("movies",{_id:m._id},{$inc:{stocks:-1}})
        .run();

    res.send(newData);
    // let data = await newData.save();
    // m.stocks--;
    // await m.update();
    // res.send({d:data});
})


module.exports=router;