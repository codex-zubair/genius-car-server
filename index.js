const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


// Connecting ENV
require('dotenv').config();



// middle wares
app.use(cors());
// Middle wares
// Automatically convert into json when we post data from client side
app.use(express.json());






const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.PASSWORD}@cluster0.9zcs4sa.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const user = () => {


}




app.get('/', (req, res) => {
    res.send('Im working from genius car!');
})



app.listen(port, () => {
    console.log("my running port are " + port)
})