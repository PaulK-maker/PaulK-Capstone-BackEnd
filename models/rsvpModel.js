
//rsvpschema
import mongoose from 'mongoose';

const rsvpSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please add your name']
  },
  email: {
    type: String,
    required: [true, 'Please add your email'],
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Rsvp = mongoose.model('Rsvp', rsvpSchema);

export default Rsvp;