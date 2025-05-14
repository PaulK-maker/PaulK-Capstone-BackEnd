import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { logger } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import rsvpRoute from './routes/rsvpRoute.js';  // Import rsvpRoute
import seedRoute from './routes/seedRoute.js';
import methodOverride from 'method-override';
import Event from './models/eventModel.js'; // Import the Event model
import User from './models/userModel.js';
import Company from './models/companyModel.js'
// import userRouter from './routes/user.js';

// const express = require('express');

import cors from 'cors';


dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

//Used expressLayouts to render my header and footer
// import expressLayouts from 'express-ejs-layouts'
// const expressLayouts =import('express-ejs-layouts');
// app.use(expressLayouts);
// app.set('layout', 'layouts/main');


 const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors()); 
// Middleware setup
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use('/api/events', eventRoutes);
app.use(methodOverride('_method'));
app.use('/users', userRoutes);


// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// View engine setup
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// app.set('layout', 'layouts/main');
// app.use(expressLayouts);

app.get('/about', (req, res) => {
  res.render('pages/about', { title: 'About' });
  

});

// Routes setup
app.use("/events", eventRoutes);
app.use("/users", userRoutes);
app.use("/companies", companyRoutes);
app.use('/rsvp', rsvpRoute);  // Use rsvpRoute
app.use('/seed', seedRoute);

// Updated route handler to fetch events
// app.get("/", async (req, res) => {
//   try {
//     const events = await Event.find({}); // Fetch all events from the database
//     res.render("pages/home", { title: "Home", events: events }); // Pass the events to the view
//   } catch (error) {
//     console.error("Error fetching events:", error);
//     res.status(500).send("Error fetching events");
//   }
// });

// app.get("/", async (req, res) => {
//   try {
//     const events = await Event.find({});
//     const users = await User.find(); 
//     const companies = await Company.find(); 

//     res.render("pages/home", {
//       title: "Home",
//       events: events,
//       users: users, // Pass users to template
//       companies: companies // Pass companies to template
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).render("pages/error", {
//       title: "Error",
//       message: "Failed to load page resources"
//     });
//   }
// });

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// Error handling
app.use((req, res, next) => {
  res.status(404).json({ error: "Resource Not Found" });
});
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));





