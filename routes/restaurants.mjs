import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

//GET - index -  get all restaurants

router.get("/", async (req, res) => {
  let collection = await db.collection("restaurants");
  let results = await collection.find({}).limit(10).toArray();

  res.send(results).status(200);
});

// GET - show - get one restaurant
router.get("/:id", async (req, res) => {
  const collection = await db.collection("restaurants"); // <= name of collection
  const query = { _id: new ObjectId(req.params.id) }; // /restaurants/123456789
  const result = await collection.findOne(query);

  if (!result)
    res.send("Not found").status(404); //if not found set the status to 404
  else res.send(result).status(200);
});

// POST - Create a restaurant

router.post("/", async (req, res) => {
  const collection = await db.collection("restaurants");
  const newDocument = await req.body; //Contains key-value pairs of data submitted in the request body.
  console.log(req.body);
  newDocument.date = new Date(); //when it was inserted into db
  const result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

//UPDATE - update a document

//update the post with a new comment
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $push: { grades: req.body },
  };
  console.log(updates);
  const collection = await db.collection("restaurants");
  const result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// DELETE - delete a restaurant

router.delete('/:id', async(req, res)=>{
    const query = {_id: new ObjectId(req.params.id)}

    const collection = db.collection('restaurants')
    const result = await collection.deleteOne(query)

    res.send(result).status(200)
})

export default router;
