require('dotenv').config({ path: __dirname + '/.env' }); // <-- Explicit path

const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
connectToMongo();

const app = express()
const port = 5000


 
app.use(cors())
app.use(express.json())

//Avialable Routes
app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`MyNoteBook Backend listening on http://localhost:${port}`)
})

