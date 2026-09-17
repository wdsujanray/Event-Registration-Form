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
    if (!selectedEvent) {
      setSelectedEvent(event);
    }
  };

  const handleRegistrationComplete = (formData) => {
    setRegistrationData(formData);
  };

  const handleChooseDifferentEvent = () => {
    setSelectedEvent(null);
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
            locked={
              selectedEvent !== null &&
              selectedEvent.id !== event.id
            }
          />
        ))}
      </div>

      {selectedEvent && (
        <>
          <RegistrationForm
            selectedEvent={selectedEvent}
            onRegistrationComplete={handleRegistrationComplete}
          />
          <button
            className="change-event-button"
            type="button"
            onClick={handleChooseDifferentEvent}
          >
            Choose a different event
          </button>
        </>
      )}
    </div>
  );
}

export default App;