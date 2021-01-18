const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.createAccount = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) return res.status(409).send({ error: '409', message: 'User already exists'});
  try {
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ ...req.body, password: hash });
    const user = await newUser.save();
    req.session.uid = user._id;
    res.status(201).send({ message: 'Account created. Please Log in'});
  } catch (err) {
    console.log('ACCOUNT CREATION ERROR 😱: ', err) ;
    res.sendStatus(400).send({ error, message: 'Could not create account' });
  }
};

exports.getAllUsers = async (_, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.log('ALL USERS ERROR 😱: ', err) ;
    res.sendStatus(500);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    req.session.uid = user._id;
    res.status(200).send(user);
  } catch (err) {
    console.log('LOG IN ERROR 😱: ', err);
    res.status(401).send({ error: '401', message: 'Username or password is incorrect' });
  }
};

exports.logout = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send({ error, message: 'Could not log out, please try again' });
    } else {
      res.clearCookie('sid');
      res.sendStatus(200);
    }
  });
}

exports.getProfileInfo = async (req, res) => {
  try {
    const { _id, first, last } = req.body;
    const user = { _id,  first, last };
    res.status(200).send(user);
  } catch (err) {
    res.status(404).send({ error, message: 'User not found' });
  }
}

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({_id: req.params.id});
    res.send(user);
  } catch (err) {
    console.log('GET USER 😱: ', err) ;
    res.sendStatus(500);
  }
};

exports.addRes = async (req, res) => {
  try {
    const updatedUser = await User.updateOne({_id: req.body.userId}, {$push : {my_resolutions:
      {
        resolution: req.body.resolution,
        completedSteps: []
      }
    }});
    res.send(updatedUser);
  } catch (err) {
    console.log('ADD RES: ', err) ;
    res.sendStatus(500);
  }
};

exports.completeStep = async (req, res) => {
  try {
    const updatedUser = await User.updateOne({_id: req.body.userId, my_resolutions: {'$elemMatch': {resolution: req.body.resolution}}},
    {$push : {'my_resolutions.$.completedSteps': req.body.stepId}});
    res.send(updatedUser);
  } catch (err) {
    console.log('COMPLETE STEP: ', err) ;
    res.sendStatus(500);
  }
};

exports.addNote = async (req, res) => {
  try {
    const updatedUser = await User.updateOne({ _id: req.body.userId }, {$push : {notes:
      {
        resolution: req.body.resolution,
        stepId: req.body.stepId,
        image: req.body.image,
        note: req.body.note,
        date: req.body.date,
      }}});
    res.send(updatedUser);
  } catch (err) {
    console.log('ADD NOTE: ', err) ;
    res.sendStatus(500);
  }
};

exports.getNotes = async (req, res) => {
  try {
    const updatedUser = await User.findOne({ _id: req.params.userId });
    res.send(updatedUser);
  } catch (err) {
    console.log('GET NOTES: ', err) ;
    res.sendStatus(500);
  }
};