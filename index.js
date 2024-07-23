const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

URL = 'mongodb+srv://simonexlue:1234567890@cluster0.tuua8rh.mongodb.net/Summer24';

// Create a Schema object

const Schema = mongoose.Schema;

const mySchema = new Schema({
  myName: {type: String},
  mySID: {type: Number}
})

// Create a Model object

const User = mongoose.model("S24student", mySchema);


app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form
  myuri = req.body.myuri

  const myName = req.body.myName || "Simone Lue";
  const mySID = req.body.mySID || 300276605;

  // connect to the database and log the connection

  await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');    
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

  // add the data to the database
    const newData = new User({
      myName,
      mySID
    });

    await newData.save()

  // send a response to the user
  res.send(`<h1>Document  Added</h1>`);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
