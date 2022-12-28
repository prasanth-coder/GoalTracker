const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose'); 
const cors = require('cors');
require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({ extended : false}))
app.use(bodyparser.json());
app.use(cors())
const uri = process.env.ATLAS_URI;


mongoose.set("strictQuery", false);
mongoose.connect(uri,err => {
    if(err) throw err;
})
const connection = mongoose.connection;
connection.once('open',() => {
    console.log('Database connection extablished successfully');
})

app.use('/api/goals',require('./routes/goalRoutes'))
app.use('/api/users',require('./routes/userRoutes'))


const port = 4000;
app.listen(port,() => {
    console.log("server running on the port "+port);
})