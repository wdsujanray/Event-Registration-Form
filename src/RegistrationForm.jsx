import React, { useState } from "react";

function RegistrationForm({
  selectedEvent,
  events,
  onEventChange,
  onRegistrationComplete,
  titleId,
}) {
  const [formData, setFormData] = useState({
    studentName: "",
    enrollmentId: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    onRegistrationComplete(formData);
  };

  return (
    <div className="form-container">
      <h2 id={titleId}>Register for: {selectedEvent.name}</h2>

      <div className="event-selector">
        <label htmlFor="event-select">Select a different event</label>
        <select
          id="event-select"
          value={selectedEvent.id}
          onChange={(e) => onEventChange(e.target.value)}
        >
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </select>
      </div>

      <div className="selected-event">
        <p>
          <strong>Date:</strong> {selectedEvent.date}
        </p>

        <p>
          <strong>Venue:</strong> {selectedEvent.venue}
        </p>

        <p>
          <strong>Organizer:</strong> {selectedEvent.organizer}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Student Name</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label>Enrollment ID</label>
          <input
            type="text"
            name="enrollmentId"
            value={formData.enrollmentId}
            onChange={handleChange}
            placeholder="Enter enrollment ID"
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div>
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </div>

        <button type="submit">
          Submit Registration
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;