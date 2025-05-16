
//import model(mongoose schema for events)
import Event from '../models/eventModel.js';
//import mongoose for ObjectId Vallidation
import mongoose from 'mongoose';

//    Get all events
//   GET /events

const getEvents = async (req, res) => {
  try {
    //find all events sorted by date
    const events = await Event.find({}).sort('date');
    res.status(200).json(events);
    // OR for rendering views:
    // res.render('home', { events });
  } catch (error) {
    //internal server error
    res.status(500).json({ message: error.message });
  }
};

//     Get a single event
//  GET /events/:id

const getEvent = async (req, res) => {
  try {
    //find events by mongodb obj-id
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//    Create a new event
//   POST /events

const createEvent = async (req, res) => {
  try {
    // Convert and validate date- object
    const eventData = {
      ...req.body,
      date: new Date(req.body.date)
    };

    // Validate organizer (if not using auth middleware)
    if (!mongoose.Types.ObjectId.isValid(eventData.organizer)) {
      return res.status(400).json({ 
        message: 'Invalid organizer ID format' 
      });
    }

    // Create and validate event
    const event = await Event.create(eventData);
    
    // For API response
    res.status(201).json(event);
    
    // For form submission redirect:
    // res.redirect('/'); 
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Validation Error',
        errors: messages
      });
    }
    
    // Handle duplicate key errors-unique fields
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Duplicate field value entered'
      });
    }
    
    res.status(500).json({ message: error.message });
  }
};

//     Update an event
//   PATCH /events/:id

const updateEvent = async (req, res) => {
  try {
    // Convert date if being updated to date object
    if (req.body.date) {
      req.body.date = new Date(req.body.date);
    }
// find event by id and update with new data
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,// return updated doc
        runValidators: true // run schemas
      }
    );
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Validation Error',
        errors: messages
      });
    }
    
    res.status(500).json({ message: error.message });
  }
};

//     Delete an event
//   DELETE /events/:id

const deleteEvent = async (req, res) => {
  try {
    //find event by id and delete
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// export control function for use in routes
export {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
};