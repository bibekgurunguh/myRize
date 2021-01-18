const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myrize_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
}, () => {
  console.log('Connected to mongoose 🐭');
});

module.exports = mongoose;