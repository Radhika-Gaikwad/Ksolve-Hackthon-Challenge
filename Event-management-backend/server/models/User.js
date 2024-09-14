const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    rsvps: [{
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        },
        status: {
            type: String,
            enum: ['Yes', 'No', 'Maybe'],
            default: 'Maybe',
        }
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
