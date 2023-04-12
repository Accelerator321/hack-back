const { hash } = require('./functions/hash');
const mongoose =require('mongoose');
const bcrypt = require("bcrypt");
require("dotenv").config();
mongoose.connect(
    process.env.connection_string || "mongodb://localhost/opportunity"
  );
  
  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
 

if(!process.env["salt"]){
    
const salt = bcrypt.genSaltSync(15);
process.env["salt"] = salt;

console.log(salt, "\nsalt generated paste in the .env file. eg-> salt =gnerated_salt\n");
}

const admin = require('./model/admin')

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  readline.question('Enter username email and password seperated with space-\n', async(inp) => {
    let [name,email, password]  =inp.split(" ")
    console.log(inp.split(" "))

    password = await hash(password);
    let obj = {
        name,
        password,
        email
      };
      
      let newAdmin = new admin(obj);

      await newAdmin.save();
      console.log('admin created')
    readline.close();
  });