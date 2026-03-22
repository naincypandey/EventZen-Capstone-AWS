const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const dbURI = process.env.MONGO_URI; 

mongoose.connect(dbURI)
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch(err => console.error("❌ MongoDB Error:", err.message));

// --- SCHEMA ---
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

// --- API ENDPOINTS ---

app.post('/api/bookings', async (req, res) => {
    try {
        const { username, venueName, ticketCount, attendees, totalAmount } = req.body;
        const newBooking = new Booking({ username, venueName, ticketCount, attendees, totalAmount });
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (err) { res.status(500).json({ error: "Failed to save" }); }
});

app.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (err) { res.status(500).json({ error: "Failed to fetch" }); }
});

app.patch('/api/bookings/:id', async (req, res) => {
    try {
        const updated = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: "Update failed" }); }
});

// --- NEW: DELETE ENDPOINT FOR ADMIN ---
app.delete('/api/bookings/:id', async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: "Record cleared successfully" });
    } catch (err) { res.status(500).json({ error: "Delete failed" }); }
});

const PORT = 5001;
app.listen(PORT, () => console.log(`🚀 Node.js Service on port ${PORT}`));