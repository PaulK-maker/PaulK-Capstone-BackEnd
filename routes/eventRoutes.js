
//CRUD ROUTES

import express from 'express';
import Event from '../models/eventModel.js';
const router = express.Router();
import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js';

// Middleware to validate event ID and Render Json
router.param("id", async (req, res, next, id) => {
  try {
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        message: "Invalid Event ID format!"
       
      });
    }
    next();
  } catch (error) {
    console.error("Error in event ID validation middleware:", error);
    return res.status(500).json({
     
    message: "Internal server error!"
    });
  }
});
//Search events by Title
router.get('/search', async (req, res)=>{
const{query} = req.query;

try{
  const results = await Event.find({
    $or:[
      { title: { $regex: query, $options: 'i' } },
      { location: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } }
    ]
  });
  res.json(results);
}catch(error){
  console.error('Error Searching', error)
  res.status(500).json({message:'server error during search'})
}
})

// GET /events - List all events
router.get('/', getEvents);

// GET /events/:id - Retrieve details of a single event
router.get('/:id', getEvent);

// POST /events - Create a new event
router.post('/', createEvent);

// PATCH /events/:id - Update details of a single event
router.patch('/:id', updateEvent);

// DELETE /events/:id - Delete an event
router.delete('/:id', deleteEvent);

// Route to test validation
router.post('/test-validation', async (req, res) => {
  try {
    // Attempt to create an invalid event (missing required fields)
    await Event.create({});
  } catch (error) {
    // Display validation error
    res.status(400).json({ message: 'Validation error', errors: error.errors });
  }
});

export default router