const Event = require('../models/Event');
const User = require('../models/User');

// Create a new event
exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, location } = req.body;
        const event = new Event({
            title,
            description,
            date,
            location,
            createdBy: req.user._id,
        });
        const savedEvent = await event.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('attendees').exec();
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// RSVP to an event
exports.rsvpEvent = async (req, res) => {
    const { eventId } = req.params;
    const { status } = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const user = await User.findById(req.user._id);
        const existingRSVP = user.rsvps.find(rsvp => rsvp.eventId.equals(eventId));

        if (existingRSVP) {
            existingRSVP.status = status;
        } else {
            user.rsvps.push({ eventId, status });
        }

        await user.save();

        if (!event.attendees.includes(req.user._id)) {
            event.attendees.push(req.user._id);
        }
        await event.save();

        res.status(200).json({ message: `RSVP status set to ${status}` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
    const { eventId } = req.params;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        await Event.findByIdAndDelete(eventId);
        res.status(200).json({ message: 'Event deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
