import React from "react";

function EventCard({ event, onSelectEvent, selected }) {
  return (
    <div className={`event-card ${selected ? "selected" : ""}`}>
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
        {selected ? "Selected" : "Register"}
      </button>
    </div>
  );
}

export default EventCard;