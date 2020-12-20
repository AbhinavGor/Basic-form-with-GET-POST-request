const express = require('express')
const expressLayouts  = require('express-ejs-layouts')
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser')
require('dotenv').config

const indexRouter = require('./routes/index')

const app = express()

mongoose.connect('mongodb+srv://Abhinav:Abhinav@cluster0.p8lss.mongodb.net/ecell?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=> {
    console.log("MONGO DB CONNECTED!")
}).catch((e)=>console.log("Cannot Connect to Mongo",e))


// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use( express.static( "public" ) );

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({ extended: true })); 

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
  })
);

app.use('/', indexRouter)
const PORT = process.env.PORT || 3000;


app.listen(PORT, console.log(`Server started on port ${PORT}`));