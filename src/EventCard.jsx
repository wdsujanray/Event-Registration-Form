import React from "react";

function EventCard({ event, onSelectEvent, locked }) {
  return (
    <div className={`event-card ${locked ? "locked" : ""}`}>
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
        disabled={locked}
      >
        {locked ? "Event Selected" : "Register"}
      </button>
    </div>
  );
}

export default EventCard;