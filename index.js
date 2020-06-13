let express =  require("express");
let mongoose = require("mongoose");
let app = express();
app.use(express.json());
let port = process.env.PORT||4500;
let fawn = require("fawn");
let movie = require("./routes/movieApi")
app.use("/api/movie",movie);
let user = require("./routes/userApi");
app.use("/api/user",user);
mongoose.connect(`mongodb://localhost/CoordinateMongodb&Express`,{useNewUrlParser:true,useUnifiedTopology:true})
        .then(()=>console.log("database got connected"))
        .catch((error)=>console.log(`something went wrong ${error.message}`));
fawn.init(mongoose);
app.listen(port,()=>console.log(`port is working on ${port}`));