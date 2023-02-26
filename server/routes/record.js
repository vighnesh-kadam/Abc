  const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This section will help you get a list of all the records.
recordRoutes.route("/listings").get(async function (req, res) {
  // Get records
  const dbConnect = dbo.getDb();
  sort = {'_id': -1}
  dbConnect
    .collection("tweet")
    .find({}).sort(sort).limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        res.json(result);
      }
    });

});
recordRoutes.route("/sorted").get(async function (req, res) {
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


// This section will help you create a new record.
recordRoutes.route("/listings/recordSwipe").post(async function (req, res) {
  // Insert swipe informations
  
  const result = await dbo.db("railway_db").collection("tweet_replies").insertOne({});
  console.log(`New tweet reply created with the following id: ${result.insertedId}`);
});

// This section will help you update a record by id.
recordRoutes.route("/listings/updateLike").post(function (req, res) {
  // Update likes
});

// This section will help you delete a record
recordRoutes.route("/listings/delete").delete((req, res) => {
  // Delete documents
});

module.exports = recordRoutes;
