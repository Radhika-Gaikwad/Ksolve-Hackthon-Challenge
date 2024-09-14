import React, { useState } from 'react';
import axios from 'axios';

const EventCreate = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newEvent = { title, description, date, location };
            await axios.post('/api/events', newEvent);
            alert('Event created successfully!');
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <div>
            <h2>Create a New Event</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <label>Location:</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default EventCreate;
