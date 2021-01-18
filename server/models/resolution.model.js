const mongoose = require('mongoose');
const { Schema } = mongoose;

const ResolutionSchema = new Schema ({
  my_resolutions: { type: Boolean, required: true },
  icon: {type: String, required: true},
  backdrop: {type: String, required: true},
  image_ref: String,
  type: String,
  color: String,
  title: {type: String, required: true},
  overview: {type: String, required: true},
  steps: [
    {
      id: Number,
      locked: {type: Boolean, required: true},
      completed: {type: Boolean, required: true},
      label: {type: String, required: true},
      description: [String],
      notes: [
        {
          image: String,
          note: String,
          date: { type: Date, default: Date.now }
        }
      ]
    }
  ],
  reference: String
});

module.exports = mongoose.model('Resolution', ResolutionSchema);