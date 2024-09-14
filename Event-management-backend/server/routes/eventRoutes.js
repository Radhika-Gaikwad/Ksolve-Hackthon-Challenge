const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents, rsvpEvent, deleteEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createEvent);
router.get('/', getAllEvents);
router.post('/:eventId/rsvp', protect, rsvpEvent);
router.delete('/:eventId', protect, deleteEvent);

module.exports = router;
