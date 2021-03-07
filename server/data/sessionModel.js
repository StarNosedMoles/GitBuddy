const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('dotenv').config();

const MONGO_URI =
  `mongodb+srv://kushal:${process.env.MONGO_PASSWORD}@cluster0.islaj.mongodb.net/gitbuddy?retryWrites=true&w=majority`;

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'gitbuddy',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 30, default: Date.now },
});

const Session = mongoose.model('session', sessionSchema);

module.exports = Session;
