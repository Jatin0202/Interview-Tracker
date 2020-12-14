const mongoose= require('mongoose');

// database connection
const dbURI= "mongodb://127.0.0.1:27017/Interview-Tracker"
mongoose.connect(dbURI, {useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true});
