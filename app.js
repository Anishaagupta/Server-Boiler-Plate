const express = require('express');
const { Mongoose } = require('mongoose');
const app= express();
const PORT = 5000
const mongoose = require('mongoose');
const {MONGODB} = require('./keys');

const customMiddleware = (req,res,next) => {
    console.log("Middleware is Running in between.");
    next();
}
// app.use(customMiddleware); if middleware is using for all routes, otherwise
// KntYmFGGovgWqbsd

mongoose.connect(MONGODB, { useUnifiedTopology: true, useNewUrlParser: true } );
mongoose.connection.on('connected', () => {
    console.log('connected to mongo db!');
})
mongoose.connection.on('error', (err) => {
    console.log('error', err);
})

require('./model/user');
require('./model/post');

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));

// app.get('/', (req,res)=>{
//     console.log("Home Page");
//     res.send("Hello Ji!");
// })

// app.get('/about',customMiddleware,(req,res)=>{
//     console.log("About Page");
//     res.send("About Page");
// })


app.listen(PORT,()=>{console.log("Server is started on port 5000")});