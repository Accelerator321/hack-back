const userItem = require("../model/userItem.js");
const path = require("path");
const fs = require("fs");

const mongoose = require("mongoose");
exports.getAllItems = async (req, res) => {
  try {
    
    query = {...(req.query)};

    if(!Object.keys(query).length){
      let allitems = await userItem.find({},null,{sort:{createdAt:-1}});
      return res.json(allitems);
    }

   
      items = await userItem.find(query,null,{sort:{createdAt:-1}});

     
    if (items.length === 0) {
      res.status(500).json("No items present");
      return;
    }
    res.status(200).json(items);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
exports.saveitem = async (req, res) => {
  try {
    let obj;
    if(req.file){

      obj = {
        title: req.body.title,
        user: req.body.user,
        desc: req.body.desc||" ",
        file: path.join("/static/img/", `${req.file.filename}`),
        url: req.body.url||" ",
        folderName:req.body.folderName
      
      };
    }
    else{
      obj = {
        title: req.body.title,
        user: req.body.user,
        desc: req.body.desc||" ",
        url: req.body.url,
        folderName:req.body.folderName
      
      };
    }
    

    let item = new userItem(obj);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getitem = async (req, res) => {
  try{
  // console.log(req.params.id)
  const id = req.params.id;
  // console.log({ id });
  const job = await userItem.findById(id);
  
  res.json(job);
}
catch(err){

  console.log(err);
res.status(500).send(err);}
};

// exports.updateitem = async (req, res) => {
//   try {
//     const id = req.params.id;
//     let query = { ...req.body };
//     if (req.file)
//       query.image = path.join("/static/img/", `${req.file.filename}`);
//     if (req.body.tags) query.tags = req.body.tags.toLowerCase().split(" ");
//     if (req.body.skills) query.skills = req.body.skills.toLowerCase().split(" ");
//     // if(req.body.requirements) query.requirements = req.body.requirements.split("\n");
//     // console.log(query);
//     const item = await userItem.updateOne({ _id: id }, query);
//     res.status(201).json(item);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// };

exports.deleteitem = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await userItem.findByIdAndDelete({ _id: id });
    fs.unlink("." + doc.file, (err) => {
      if (err) console.log(err);
      else {
        console.log(doc.file);
      }
    });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

// exports.refreshDataBase = async (req, res) => {
//   // console.log(refresh)
//   try {
//     do {
//       var temp = await userItem.findOneAndDelete({
//         lastdate: { $lt: new Date(new Date().getTime() - 24 * 60 * 60 * 1000) },
//       });
//       if (temp) {
//         fs.unlink("." + temp.image, (err) => {
//           if (err) console.log(err);
//           else {
//             console.log(temp.image);
//           }
//         });
//       }
//     } while (temp != null);

//     res.status(200).send("Refreshed");
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// };
