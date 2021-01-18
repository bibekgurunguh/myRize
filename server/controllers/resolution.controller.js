const Resolution = require('../models/resolution.model');

exports.getAllRes = async (_, res) => {
  try {
    const resolutions = await Resolution.find();
    res.send(resolutions);
  } catch (err) {
    console.log('GET RESOLUTION: ', err) ;
    res.sendStatus(500);
  }
};

exports.addRes = async (req, res) => {
  try {
    const updatedRes = await Resolution.updateOne({ image_ref: req.params.ref }, {$set : {my_resolutions: true}});
    res.send(updatedRes);
  } catch (err) {
    console.log('ADD TO MY RESOLUTIONS: ', err) ;
    res.sendStatus(500);
  }
};

exports.remRes = async (req, res) => {
  try {
    const updatedRes = await Resolution.updateOne({ image_ref: req.params.ref }, {$set : {my_resolutions: false}});
    res.send(updatedRes);
  } catch (err) {
    console.log('REMOVE FROM MY RESOLUTIONS: ', err) ;
    res.sendStatus(500);
  }
};

exports.addNote = async (req, res) => {
  try {
    const updatedRes = await Resolution.updateOne({ image_ref: req.params.ref, 'steps.id': req.params.id }, {$push : {'steps.$[].notes': {image: '', note:'happy'}}});
    res.send(updatedRes);
  } catch (err) {
    console.log('ADD NOTE: ', err) ;
    res.sendStatus(500);
  }
};