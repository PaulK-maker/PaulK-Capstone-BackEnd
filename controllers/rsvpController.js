// import RSVP and event from mongoose models
import Rsvp from '../models/rsvpModel.js';
import Event from '../models/eventModel.js';

//create new rsvp
//route post/rsvp

const createRsvp = async (req, res) => {
  try {
    const { event, name, email } = req.body;

    // Check if the referenced event exists
    const existingEvent = await Event.findById(event);
    if (!existingEvent) {
       // If the event does not exist, return an error
      return res.status(400).json({ message: 'Event not found' });
    }
// create rsvp document
    const rsvp = await Rsvp.create({
      event,
      name,
      email
    });

    res.status(201).json({ message: 'RSVP created successfully', rsvp });
  } catch (error) {
    console.error("Error creating RSVP:", error);
    res.status(500).json({ message: error.message });
  }
};

//   Get all RSVPs
// GET /rsvp

const getRsvps = async (req, res) => {
  try {
    const rsvps = await Rsvp.find().populate('event', 'title'); // Populate the event details
    res.status(200).json(rsvps);
  } catch (error) {
    console.error("Error getting RSVPs:", error);
    res.status(500).json({ message: error.message });
  }
};

//   Get a single RSVP
//   GET /rsvp/:id

const getRsvp = async (req, res) => {
    try {
      const rsvp = await Rsvp.findById(req.params.id).populate('event', 'title'); // Populate the event details
      if (!rsvp) {
        return res.status(404).json({ message: 'RSVP not found' });
      }
      res.status(200).json(rsvp);
    } catch (error) {
      console.error("Error getting RSVP:", error);
      res.status(500).json({ message: error.message });
    }
  };

//  Update an RSVP
// PATCH /rsvp/:id

const updateRsvp = async (req, res) => {
  try {
    // Find RSVP by ID and update with new data
    const rsvp = await Rsvp.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //// Return the updated document
      runValidators: true  // Run schema validators on update
    });

    if (!rsvp) {
      return res.status(404).json({ message: 'RSVP not found' });
    }

    res.status(200).json({ message: 'RSVP updated successfully', rsvp });
  } catch (error) {
    console.error("Error updating RSVP:", error);
    res.status(500).json({ message: error.message });
  }
};

//  Delete an RSVP
// DELETE /rsvp/:id

const deleteRsvp = async (req, res) => {
  try {
    const rsvp = await Rsvp.findByIdAndDelete(req.params.id);

    if (!rsvp) {
      return res.status(404).json({ message: 'RSVP not found' });
    }

    res.status(200).json({ message: 'RSVP deleted successfully' });
  } catch (error) {
    console.error("Error deleting RSVP:", error);
    res.status(500).json({ message: error.message });
  }
};

export {
  createRsvp,
  getRsvps,
  getRsvp,
  updateRsvp,
  deleteRsvp
};