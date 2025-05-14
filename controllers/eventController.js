// import Event from '../models/eventModel.js';

// // @desc    Get all events
// // @route   GET /events
// // @access  Public
// const getEvents = async (req, res) => {
//   try {
//     const events = await Event.find({});
//     res.status(200).json(events);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Get a single event
// // @route   GET /events/:id
// // @access  Public
// const getEvent = async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
//     res.status(200).json(event);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Create a new event
// // @route   POST /events
// // @access  Public
// const createEvent = async (req, res) => {
//   try {
//     const event = await Event.create(req.body);
//     res.status(201).json(event);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Update an event
// // @route   PATCH /events/:id
// // @access  Public
// const updateEvent = async (req, res) => {
//   try {
//     const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true
//     });
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
//     res.status(200).json(event);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// const deleteEvent = async (req, res) => {
//   try {
//     const event = await Event.findByIdAndDelete(req.params.id);
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
//     res.status(200).json({ message: 'Event deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export {
//   getEvents,
//   getEvent,
//   createEvent,
//   updateEvent,
//   deleteEvent
// };


import Event from '../models/eventModel.js';
import mongoose from 'mongoose';

// @desc    Get all events
// @route   GET /events
// @access  Public
const getEvents = async (req, res) => {
  try {
    const events = await Event.find({}).sort('date');
    res.status(200).json(events);
    // OR for rendering views:
    // res.render('home', { events });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single event
// @route   GET /events/:id
// @access  Public
const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new event
// @route   POST /events
// @access  Public
const createEvent = async (req, res) => {
  try {
    // Convert and validate date
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
    
    // Handle duplicate key errors
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
//  Public
const updateEvent = async (req, res) => {
  try {
    // Convert date if being updated
    if (req.body.date) {
      req.body.date = new Date(req.body.date);
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
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

// @desc    Delete an event
// @route   DELETE /events/:id
// @access  Public
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
};