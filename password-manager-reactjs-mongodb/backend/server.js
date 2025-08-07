// const express = require("express");
// const dotenv = require("dotenv");
// const { MongoClient } = require("mongodb");

import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import bodyParser from 'body-parser'

// console.log(process.env.MONGO_URI)
dotenv.config();

const app = express();
const port = 3000;
app.use(bodyParser.json())

// Connection URL
const url = process.env.MONGO_URI;
// const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "password-manager";

await client.connect();

// Get all the password
app.get("/", async (req, res) => {
  console.log("Connected successfully to server");
  
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// Save a the password
app.post("/", async (req, res) => {
    const password = req.body
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(password);
  res.json({"succes": true, "result":findResult });
});

// Delete a the password
app.delete("/", async (req, res) => {
    const password = req.body
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne(password);
  res.json({"succes": true, "result":findResult });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
