const express = require('express')
const expressLayouts  = require('express-ejs-layouts')
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser')

const app = express()

//Connect db
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use( express.static( "public" ) );

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
limit: '2mb',
extended: true
})); 

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
  })
);


const PORT = process.env.PORT || 3000;


app.listen(PORT, console.log(`Server started on port ${PORT}`));