import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RSVPButton from './RSVPButton';

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('/api/events');
                setEvents(res.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div>
            <h2>Upcoming Events</h2>
            {events.length === 0 ? (
                <p>No events found.</p>
            ) : (
                <ul>
                    {events.map(event => (
                        <li key={event._id}>
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                            <p>Location: {event.location}</p>
                            <RSVPButton eventId={event._id} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EventList;
