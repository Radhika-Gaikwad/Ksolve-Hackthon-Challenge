import React, { useState } from 'react';
import axios from 'axios';

const RSVPButton = ({ eventId }) => {
    const [status, setStatus] = useState('');

    const handleRSVP = async (newStatus) => {
        try {
            const res = await axios.post(`/api/events/${eventId}/rsvp`, { status: newStatus });
            setStatus(res.data.status);
            alert(`RSVP updated to: ${newStatus}`);
        } catch (error) {
            console.error('Error RSVPing:', error);
        }
    };

    return (
        <div>
            <p>RSVP Status: {status}</p>
            <button onClick={() => handleRSVP('Yes')}>Yes</button>
            <button onClick={() => handleRSVP('No')}>No</button>
            <button onClick={() => handleRSVP('Maybe')}>Maybe</button>
        </div>
    );
};

export default RSVPButton;
