const express = require('express')
const app = express()
const port = 4000

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://khbaedev:rkdgus01!@boilerplate.rygsb63.mongodb.net/?retryWrites=true&w=majority&appName=boilerplate', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})