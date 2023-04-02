  const express = require("express");
  const  ObjectID = require('mongodb').ObjectId;
// Use bodyParser middleware

  //app.use(bodyParser.urlencoded({ extended: false }))
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This section will help you get a list of all the records.
recordRoutes.route("/tweets").get(async function (req, res) {
  // Get records
  const dbConnect = dbo.getDb();
  sort = {'_id': -1}
  dbConnect
    .collection("tweet")
    .find({}).sort({ranking:1}).limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        res.json(result);
      }
    });

});



recordRoutes.route("/sorted").get(async function (req, res) {

  const dbConnect = dbo.getDb();
  sort = {'_id': -1}
  dbConnect
    .collection("tweet").find({}).sort({ranking:1}).limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        res.json(result);
      }
    });

});

recordRoutes.route("/feedback/resp").get(async function (req, res) {
  // Get records
  const dbConnect = dbo.getDb();
  sort = {'_id': -1}

  let {page,limit}=req.query;
  page=parseInt(page)
  limit=parseInt(limit)
  
  const count=await  dbConnect
  .collection("tweet")
  .find({prediction:"feedback",responded:true}).count()
  const pages=Math.ceil(count/limit);
  let skip=(page-1)*limit;



 
  dbConnect
    .collection("tweet")
    .find({prediction:"feedback",responded:true}).sort({ranking:1}).skip(skip).limit(limit)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {

      return res.status(200).json({
        title:"Success",
        posts:result,
        pages
      })
      }
    });


});
recordRoutes.route("/feedback/unresp").get(async function (req, res) {
  // Get records
  const dbConnect = dbo.getDb();
  sort = {'_id': -1}

  let {page,limit}=req.query;
  page=parseInt(page)
  limit=parseInt(limit)


  const count=await  dbConnect
  .collection("tweet")
  .find({prediction:"feedback",responded:false}).count()
  const pages=Math.ceil(count/limit);
  let skip=(page-1)*limit;

 
  dbConnect
    .collection("tweet")
    .find({prediction:"feedback",responded:false}).sort({ranking:1}).skip(skip).limit(limit)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {

      return res.status(200).json({
        title:"Success",
        posts:result,
        pages
      })
      }
    });


});
recordRoutes.route("/emergency/resp").get(async function (req, res) {
  // Get records
  const dbConnect = dbo.getDb();
  sort = {'_id': -1}
  let {page,limit}=req.query;
  page=parseInt(page)
  limit=parseInt(limit)


  const count=await  dbConnect
  .collection("tweet")
  .find({Type:"Emergency",responded:true}).count()
  const pages=Math.ceil(count/limit);
  let skip=(page-1)*limit;

 
  dbConnect
    .collection("tweet")
    .find({Type:"Emergency",responded:true}).sort({ranking:1}).skip(skip).limit(limit)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {

      return res.status(200).json({
        title:"Success",
        posts:result,
        pages
      })
      }
    });

});
recordRoutes.route("/emergency/unresp").get(async function (req, res) {
  // Get records
  const dbConnect = dbo.getDb();
  sort = {'_id': -1}


  let {page,limit}=req.query;
  page=parseInt(page)
  limit=parseInt(limit)


  const count=await  dbConnect
  .collection("tweet")
  .find({Type:"Emergency",responded:false}).count()
  const pages=Math.ceil(count/limit);
  let skip=(page-1)*limit;

  dbConnect
    .collection("tweet")
    .find({Type:"Emergency",responded:false}).sort({ranking:1}).skip(skip).limit(limit)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {

      return res.status(200).json({
        title:"Success",
        posts:result,
        pages
      })
      }
    });

});


recordRoutes.route("/tweets/analysis").get(async function (req, res) {

  // const options = {
  //   day: 'numeric',
  //   month: 'numeric',
  //   year: 'numeric',
  //   timeZone: 'Asia/Kolkata'
  // };
  
  // const d = new Date();
  // const date = d.toLocaleString('en-US', options);

  // console.log("Datee",date)


  const dbConnect = dbo.getDb();

  try {
    const feedbackTweets = await dbConnect.collection("tweet").find({ prediction: "feedback" }).toArray();
   

    const emergencyTweets= await dbConnect.collection("tweet").find({ Type:"Emergency" }).toArray();


    return res.status(200).json({
      title: "Success",
      feedback: feedbackTweets,
      emergency: emergencyTweets
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      title: "Error",
      message: "Internal server error"
    });
  }




  

});

// This section will help you create a new record.
recordRoutes.route("/tweets/reply").post(async function (req, res) {
  // Insert swipe informations]
  console.log("hell");
  console.log(req.body);
  const dbConnect = dbo.getDb();
   dbConnect.collection("tweet").updateOne(
    { "_id": ObjectID(req.body.id)},
       {"$set":{"responded":true},
     "$push": { "reply": req.body.reply } }
  )

  return res.status(200).json({
    title: "Success",
  });
  

});



module.exports = recordRoutes;
