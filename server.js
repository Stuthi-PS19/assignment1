// Synergia Event Booking API
// Author: Your Name

const express = require('express');
const app = express();
app.use(express.json());

// --------------------------------------
// Mock Data
// --------------------------------------

let events = [
  {
    id: 1,
    name: "Synergia 2025",
    date: "2025-11-07",
    location: "Auditorium",
    description: "Opening event for Synergia"
  },
];

let bookings = [
  {
    id: 1,
    eventId: 1,
    participantName: "Nikitha",
    email: "nikitha@gmail.com"
  },
];

// --------------------------------------
// EVENT ROUTES
// --------------------------------------

// 1. GET /events – Get all events
app.get('/events', (req, res) => {
  res.json(events);
});

// 2. POST /events/add – Create a new event
app.post('/events/add', (req, res) => {
  const { name, date, location, description } = req.body;

  if (!name || !date || !location) {
    return res.status(400).json({ message: "Name, date, and location are required." });
  }

  const newEvent = {
    id: events.length ? events[events.length - 1].id + 1 : 1,
    name,
    date,
    location,
    description: description || ""
  };

  events.push(newEvent);
  res.status(201).json({ message: "Event created successfully", event: newEvent });
});

// 3. GET /event/:id – Get event by ID
app.get('/event/:id', (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).json({ message: "Event not found." });
  res.json(event);
});

// 4. PUT /event/:id – Update event details
app.put('/event/:id', (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).json({ message: "Event not found." });

  const { name, date, location, description } = req.body;
  if (name) event.name = name;
  if (date) event.date = date;
  if (location) event.location = location;
  if (description) event.description = description;

  res.json({ message: "Event updated successfully", event });
});

// 5. DELETE /event/:id – Cancel an event
app.delete('/event/:id', (req, res) => {
  const eventIndex = events.findIndex(e => e.id === parseInt(req.params.id));
  if (eventIndex === -1) return res.status(404).json({ message: "Event not found." });

  events.splice(eventIndex, 1);
  res.json({ message: "Event cancelled successfully." });
});

// --------------------------------------
// BOOKING ROUTES
// --------------------------------------

// 1. GET /api/bookings – Get all event bookings
app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

// 2. POST /api/bookings – Create a new booking
app.post('/api/bookings', (req, res) => {
  const { eventId, participantName, email } = req.body;

  if (!eventId || !participantName || !email) {
    return res.status(400).json({ message: "Event ID, participant name, and email are required." });
  }

  const eventExists = events.some(e => e.id === eventId);
  if (!eventExists) return res.status(404).json({ message: "Event not found." });

  const newBooking = {
    id: bookings.length ? bookings[bookings.length - 1].id + 1 : 1,
    eventId,
    participantName,
    email,
  };

  bookings.push(newBooking);
  res.status(201).json({ message: "Booking created successfully", booking: newBooking });
});

// 3. GET /api/bookings/:id – Get booking by ID
app.get('/api/bookings/:id', (req, res) => {
  const booking = bookings.find(b => b.id === parseInt(req.params.id));
  if (!booking) return res.status(404).json({ message: "Booking not found." });
  res.json(booking);
});

// 4. PUT /api/bookings/:id – Update participant details
app.put('/api/bookings/:id', (req, res) => {
  const booking = bookings.find(b => b.id === parseInt(req.params.id));
  if (!booking) return res.status(404).json({ message: "Booking not found." });

  const { participantName, email } = req.body;
  if (participantName) booking.participantName = participantName;
  if (email) booking.email = email;

  res.json({ message: "Booking updated successfully", booking });
});

// 5. DELETE /api/bookings/:id – Cancel a booking
app.delete('/api/bookings/:id', (req, res) => {
  const bookingIndex = bookings.findIndex(b => b.id === parseInt(req.params.id));
  if (bookingIndex === -1) return res.status(404).json({ message: "Booking not found." });

  bookings.splice(bookingIndex, 1);
  res.json({ message: "Booking cancelled successfully." });
});

// --------------------------------------
// Start Server
// --------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Synergia Event Booking API running on http://localhost:${PORT}`);
});

