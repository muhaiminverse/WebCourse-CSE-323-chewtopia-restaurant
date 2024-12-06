const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();  // run `node` in terminal -> require('crypto').randomBytes(64).toString('hex')
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.listen(port, () => {
  console.log(`Bistro Boss is running on port ${port}`);
});



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lps03.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const menuCollection = client.db('bistroDB').collection('menu')
    const usersCollection = client.db('bistroDB').collection('users')
    const reviews = client.db('bistroDB').collection('reviews')
    const cartsCollection = client.db('bistroDB').collection('carts')

    // middleware
    const verifyToken = (req, res, next) => {
      console.log('inside verify token', req.headers.authorization);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: 'unauthorized access' });
      }
      const token = req.headers.authorization.split(' ')[1]; // we split the spacce between 'bearer' and 'token', which is in an array
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => { // very( what you verify, secret which is your token)
        if (err) {
          return res.status(401).send({ message: 'unauthorized access' })
        }
        req.decoded = decoded;
        next();
      })
    }

    // use verify admin after verifytoken has been approved
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email
      const query = { email: email }
      const user = await usersCollection.findOne(query)
      const isAdmin = user?.role === 'admin'
      if(!isAdmin) {
        return res.status(403).send({ message: 'forbidden access' })
      }
      next();
    }

    // jwt related api
    app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      res.send({ token });
    })


    // user related apis
    app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
      // console.log(req.headers);
      const result = await usersCollection.find().toArray();
      res.send(result);
    })

    //admin 
    app.get('/users/admin/:email', verifyToken, async (req, res) => {
      // console.log(req.headers);
      const email = req.params.email;
      
      if (email !== req.decoded.email) {
        return res.status(403).send({ message: 'forbidden access' })
      }

      const query = { email: email }
      const user = await usersCollection.findOne(query)
      let admin = false;
      if (user) {
        admin = user?.role === 'admin';
      }
      res.send({ admin });
    })



    app.post('/users', async (req, res) => {
      const user = req.body
      // insert email if user does not exist
      // other ways you can do this(1. email unique in mongodbcollection index catagory, 2. upsert, 3. simple checking)
      const query = { email: user.email }
      const existinguser = await usersCollection.findOne(query)
      if (existinguser) {
        return res.send({ message: 'user already exists', insertedID: null })
      }


      const result = await usersCollection.insertOne(user)
      res.send(result)
    })

    app.patch('/users/admin/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          role: 'admin'
        }
      }
      const result = await usersCollection.updateOne(filter, updatedDoc);
      res.send(result);
    })

    app.delete('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) } // this mf caused problems with 3 projects of mine, properly import OjectId from mongodb
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    })

    // menu
    app.get('/menu', async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    })

    // reviews
    app.get('/reviews', async (req, res) => {
      const result = await reviews.find().toArray();
      res.send(result);
    })

    // carts collection
    app.get('/carts', async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await cartsCollection.find(query).toArray();
      res.send(result);
    });

    app.post('/carts', async (req, res) => {
      const cartItem = req.body
      const result = await cartsCollection.insertOne(cartItem)
      res.send(result)
    })

    app.delete('/carts/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) } // this mf caused problems with 3 projects of mine, properly import OjectId from mongodb
      const result = await cartsCollection.deleteOne(query);
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



/*
NAMING CONVENTIONS
----------------------------------------------------------------
app.get('/users')
app.get('/users/:id')
app.post('/users')
app.put('/users/:id')
app.patch('/users/:id')
app.delete('/users/:id')

const reviews= client.db('bistroDB').collection('reviews')
*/ 