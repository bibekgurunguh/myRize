const express = require('express');
const session = require('express-session');

const app = express();
const router = require('./router');
const connection = require('./models/index');
const cors = require('cors');

const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(session({
  name: 'sid',
  saveUninitialized: false,
  resave: false,
  secret: 'resmeup',
  cookie: {
    maxAge: 1000 * 60 * 60, // 1hr
    sameSite: true,
    httpOnly: false,
    secure: false,
  },
}));
app.use(router);

(async function () {
  try {
    await connection;
    console.log('DB connected 🔌');
    app.listen(PORT, ()=>{
      console.log(`Servering at http://localhost:${PORT} 🚀`);
    });
  } catch (err) {
    console.log('ERROR: ', err);
  }
})();