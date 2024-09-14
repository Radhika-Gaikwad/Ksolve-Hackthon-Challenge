import React from 'react';
import EventList from './components/EventList';
import EventCreate from './components/EventCreate';

function App() {
    return (
        <div>
            <h1>Event Management System</h1>
            <EventCreate />
            <EventList />
        </div>
    );
}

export default App;
