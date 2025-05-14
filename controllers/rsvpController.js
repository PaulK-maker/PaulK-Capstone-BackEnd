
import Rsvp from '../models/rsvpModel.js';
import Event from '../models/eventModel.js';


const createRsvp = async (req, res) => {
  try {
    const { event, name, email } = req.body;

    // Check if the event exists
    const existingEvent = await Event.findById(event);
    if (!existingEvent) {
      return res.status(400).json({ message: 'Event not found' });
    }

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
// Public
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
//  Public
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

// @desc    Update an RSVP
// @route   PATCH /rsvp/:id
// @access  Public
const updateRsvp = async (req, res) => {
  try {
    const rsvp = await Rsvp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
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

// @desc    Delete an RSVP
// @route   DELETE /rsvp/:id
// @access  Public
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