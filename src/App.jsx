import React, { useState } from "react";
import EventCard from "./EventCard";
import RegistrationForm from "./RegistrationForm";
import RegistrationSuccess from "./RegistrationSuccess";
import "./App.css";

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationData, setRegistrationData] = useState(null);

  const events = [
    {
      id: 1,
      name: "Tech Fest 2026",
      date: "Oct 15, 2026",
      venue: "Main Auditorium",
      organizer: "Department of CS",
      description:
        "An annual technical symposium featuring hackathons and coding contests.",
    },
    {
      id: 2,
      name: "Cultural Night",
      date: "Nov 05, 2026",
      venue: "Open Air Theatre",
      organizer: "Cultural Committee",
      description:
        "A celebration of music, dance, and art performances.",
    },
    {
      id: 3,
      name: "Robotics Workshop",
      date: "Dec 01, 2026",
      venue: "Lab 3",
      organizer: "Robotics Club",
      description:
        "A hands-on workshop on building autonomous robots.",
    },
  ];

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleEventChange = (eventId) => {
    const event = events.find((item) => item.id === Number(eventId));
    setSelectedEvent(event);
  };

  const handleCloseRegistration = () => {
    setSelectedEvent(null);
  };

  const handleRegistrationComplete = (formData) => {
    setRegistrationData(formData);
  };

  /* Separate Success Page */

  if (registrationData && selectedEvent) {
    return (
      <RegistrationSuccess
        formData={registrationData}
        selectedEvent={selectedEvent}
      />
    );
  }

  return (
    <div className="app">
      <h1>University Event Registration</h1>

      <div className="events-container">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onSelectEvent={handleSelectEvent}
          />
        ))}
      </div>

      {selectedEvent && (
        <div className="modal-backdrop" onMouseDown={handleCloseRegistration}>
          <div
            className="registration-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="registration-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              aria-label="Close registration form"
              onClick={handleCloseRegistration}
            >
              &times;
            </button>
            <RegistrationForm
              selectedEvent={selectedEvent}
              events={events}
              onEventChange={handleEventChange}
              onRegistrationComplete={handleRegistrationComplete}
              titleId="registration-modal-title"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;