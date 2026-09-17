import React from "react";

function EventCard({ event, onSelectEvent }) {
  return (
    <div className="event-card">
      <h3>{event.name}</h3>

      <p>
        <strong>Date:</strong> {event.date}
      </p>

      <p>
        <strong>Venue:</strong> {event.venue}
      </p>

      <p>
        <strong>Organizer:</strong> {event.organizer}
      </p>

      <p>{event.description}</p>

      <button
        onClick={() => onSelectEvent(event)}
      >
        Event Registration
      </button>
    </div>
  );
}

export default EventCard;