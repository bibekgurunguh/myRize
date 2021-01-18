const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema ({
  email: {type: String, required: true},
  password: {type: String, required: true},
  first: {type: String, required: true},
  last: {type: String, required: true},
  settings: Object,
  my_resolutions: [
    {
      resolution: {type: String, required: true},
      completedSteps: [Number]
    }
  ],
  notes: [
    {
      resolution: {type: String, required: true},
      stepId: {type: Number, required: true},
      image: String,
      note: String,
      date: {type: Date, default: Date.now}
    }
  ]
});

module.exports = mongoose.model('Users', UserSchema);