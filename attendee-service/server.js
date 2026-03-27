const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// FIXED: Match the variable name in docker-compose.yml
const dbURI = process.env.MONGODB_URI || "mongodb://mongo-db:27017/attendee_db"; 

mongoose.connect(dbURI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB Error:", err.message));

const BookingSchema = new mongoose.Schema({
    username: { type: String, required: true },
    venueName: { type: String, required: true },
    ticketCount: { type: Number, default: 1 },
    attendees: { type: [String], default: [] }, 
    totalAmount: { type: Number, required: true },
    status: { type: String, default: "Confirmed" },
    bookingDate: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', BookingSchema);

// FIXED ROUTES: Changed from /api/bookings to /api/booking
app.post('/api/booking', async (req, res) => {
    try {
        const { username, venueName, ticketCount, attendees, totalAmount } = req.body;
        const newBooking = new Booking({ username, venueName, ticketCount, attendees, totalAmount });
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (err) { 
        console.error(err);
        res.status(500).json({ error: "Failed to save booking" }); 
    }
});

app.get('/api/booking', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (err) { res.status(500).json({ error: "Failed to fetch bookings" }); }
});

app.delete('/api/booking/:id', async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: "Record cleared successfully" });
    } catch (err) { res.status(500).json({ error: "Delete failed" }); }
});

// PATCH added for the "Cancel Booking" button in your UI
app.patch('/api/booking/:id', async (req, res) => {
    try {
        const updated = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: "Update failed" }); }
});

const PORT = 5001;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Attendee Service live on port ${PORT}`));