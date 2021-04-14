const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const stuffRoutes = require('./routes/stuff')
const userRoutes = require('./routes/user')
const keys = require('./config/keys')

const app = express()

mongoose.connect(keys.mongoURI , { useNewUrlParser: true })
  .then(()=>{
    console.log('Successfully connected to  mongodb atlas..')
  })
  .catch((error)=>{
    console.log('unable to connect to mongodb atlas..')
    console.error(error);
  });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());
app.use('/api/stuff', stuffRoutes)
app.use('/api/auth', userRoutes)



module.exports = app;
