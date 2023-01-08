const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();

const app = express();
// Middleware
app.use(cors());
// when we will post something in server it will convert the data into json
app.use(express.json());


// Mongodb connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7t8vw3l.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const productCollection = client.db('usedPhoneShop').collection('products');

        app.get('/products', async (req, res) => {
            const query = {};
            const options = await productCollection.find(query).toArray();
            res.send(options);
        })
    }
    finally {

    }
}
run().catch(console.log);



app.get('/', async (req, res) => {
    res.send('Used phone shop server is running');
})

app.listen(port, () => {
    console.log(`Used phone server is running on ${port}`);
})