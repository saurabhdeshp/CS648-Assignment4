require('dotenv').config();
const { MongoClient } = require('mongodb');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { readFileSync } = require('fs');
const path = require('path');

const COUNTERS = 'counters';
const PRODUCTS = 'products';
let DB;

const url = process.env.DB_URL || 'mongodb+srv://mongodb+srv://assignment4:CS648@cluster0.scjap.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const connectToDb = async () => {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  DB = client.db();
};

const sequenceNumDocument = async (name) => {
  const result = await DB
    .collection(COUNTERS)
    .findOneAndUpdate(
      { _id: name },
      {
        $inc: { sequenceNum: 1 },
        $set: { _id: name },
      },
      { returnOriginal: false, upsert: true },

    );
  return result.value.sequenceNum;
};

const getAllProducts = async () => DB.collection(PRODUCTS).find({}).toArray();

const addProduct = async (_, product) => {
  const productInsert = { ...product };
  productInsert.id = await sequenceNumDocument(PRODUCTS);
  const result = await DB.collection(PRODUCTS).insertOne(productInsert);
  return DB.collection(PRODUCTS).findOne({ _id: result.insertedId });
};

const app = express();

app.use(express.static('public'));

const resolvers = {
  Query: {
    getAllProducts,
  },
  Mutation: {
    addProduct,
  },
};

const server = new ApolloServer({
  typeDefs: readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8'),
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

const port = 3000 || process.env.API_SERVER_PORT;

const run = async () => {
  try {
    await connectToDb();
    app.listen(3000, () => {
      console.log(`API server started: ${port}`);
    });
  } catch (error) {
    console.log('DB Connection Error - ', error);
  }
};

run();
