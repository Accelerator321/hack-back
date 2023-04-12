const express = require("express");
const app = express();
const cors=require("cors");
require("dotenv").config();
const PORT = process.env.port || 3000;
var cookieParser = require("cookie-parser");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
const jwt = require("jsonwebtoken");
const {auth } = require("./functions/required");
// _______________GETitems_________
const itemRoute= require("./routes/itemRoute");
app.use("/items", itemRoute);

// ___________ADMIN_________
const userRoute = require("./routes/user");
app.use("/user", userRoute);

// __________EXPRESS Setup______________

app.use("/static", express.static("static")); // serving static files
app.use(express.json({limit: '50mb'}));
app.use(
  express.urlencoded({
    limit: '50mb',
    extended: false,
  })
);
app.use(cors(
  {
    credentials: true
  }
));

app.get("/", (req, res) => {
  res.send("Welcome to opportunity backend");
});

const folders = require("./model/folderModel.js");
app.post('/newfolder',auth,async (req,res)=>{

  try{
  let obj = {name:req.body.name,
    email:req.body.email
  };
  let item = new folders(obj);
    await item.save();
    res.status(201).json(item);
  }
  catch(err){
    console.log(err);
    res.status(500).json(err);
  }

  

});

app.get('/folders/:email',async(req,res)=>{
  try{
    const email = req.params.email;
    // console.log(req.body)
  let obj = {email:email}
  let arr= await folders.find(obj);
  res.status(200).json(arr);
  }
  catch(err){
    console.log(arr);
    res.status(500).send(err);
  }
})
const user = require("./model/userModel.js");
app.get('/verify',async (req,res)=>{
  try {
    var token = req.get("Authorization");
    if (token) {
      token = token.split(" ")[1];
      // console.log(token);
      var decoded = jwt.verify(token, process.env.jwt_secret);
      if (decoded.email) {
        let use = await user.find({email:decoded.email});
        res.status(200).json(use[0]);
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
})

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
