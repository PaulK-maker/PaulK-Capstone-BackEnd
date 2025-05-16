// Import mongoose for schema and model creation

import mongoose from 'mongoose';
// Define the event schema
const eventSchema = new mongoose.Schema({
   // Title of the event (required)
  title: {
    type: String,
    required: [true, 'Please add a title']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
// Descriptin 10 charactes
    minlength: [10, 'Description must be at least 10 characters'] //validate length
  },
  // Date of the event (required, must be a future date)
  date: {
    type: Date,
    required: [true, 'Please add a date'],
    validate: {
      validator: function(value) {
        return value > new Date(); // validate check if the date is in the future
      },
      message: 'Date must be in the future'
    }
  },
  // Location of the event (required)
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
   // Optional reference to the company hosting or related to the event
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: false 
  },
  //  reference to the user who created/organized the event
  organizer: {
    //removed organizer here -false
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  //  I can Add other relevant fields like ..(event type, capacity, etc.)
}, {
  timestamps: true
});

//event indexes

eventSchema.index({ date: 1 }); // Index date for faster date-based queries
eventSchema.index({ location: 1 }); // Index location for faster location-based queries
eventSchema.index({ title: 'text', description: 'text' });

const Event = mongoose.model('Event', eventSchema);

export default Event;
