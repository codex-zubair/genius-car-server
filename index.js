const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;



// Mongo DB Connector
const { MongoClient, ServerApiVersion } = require('mongodb');

// Connecting ENV
require('dotenv').config();



// middle wares
app.use(cors());
// Middle wares
// Automatically convert into json when we post data from client side
app.use(express.json());


// DB_USER =dbUser3
// PASSWORD =9okgKumeRernJmwU

// dbuser4
// MyhOETUaXjTtNGir


const uri = "mongodb+srv://dbuser4:MyhOETUaXjTtNGir@cluster0.9zcs4sa.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try {
        // !Creating database ServicesCollection
        const servicesCollection = client.db("userCollectionDB").collection("users");



        // !Creating database for order collection
        const orderCollection = client.db("orderCollectionDB").collection("orders");











        // ! Storing Order  by posting
        app.post('/orders' ,async(req,res)=>{
            const order = req.body;
            const result =  await orderCollection.insertOne(order);
            res.send(result);
        })


        // ! Getting ORDERS BY QUERY SYSTEM
        app.get('/orders', async (req,res)=> {

            console.log(req.query.email)
            let query ={};

            if(req.query.email)
            {
                query= {email: req.query.email};
            }

            const cursor = orderCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);

        })
        





        // })
        // *!Getting data from the database all
        app.get('/services',async(req,res)=> {

            // query Data to get all data
            const query = {};

            // it will give just first one data
            // const cursor = await database.findOne(query);

            // Finding data from the database
            const cursor = await servicesCollection.find(query);


            // Convert into array to use client side.
            services = await cursor.toArray();

            // Sending the data to client side.
            res.send(services);
            // res.send(cursor);
        })






        // *!Getting specific Data from data base.
        app.get('/checkout/:id', async(req,res)=> {
            // Getting the id from the sender
            const id = req.params.id;

            // Query the id from the data base.
            const query  = {_id : id};

            // getting the data from the database query wise.
            // !FIND ONE SYSTEM FOR FINDING ONE DATA MUST AND NO 
            // !NEED TO CONVERT TO USE IT
            const service = await servicesCollection.findOne(query);



            // Converting the data to use it
            res.send(service);

        })

    }
    finally {
        console.log("Finally Work Done!")
        console.log("we will not close the connection!")
    }


  

}


run().catch(error => console.log(error))




app.get('/', (req, res) => {
    res.send('Im working from genius car!');
})



app.listen(port, () => {
    console.log("my running port are " + port)
})