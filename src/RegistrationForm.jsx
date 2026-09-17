import React, { useState } from "react";

function RegistrationForm({
  selectedEvent,
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
    const value = e.target.name === "phone"
      ? e.target.value.replace(/\D/g, "").slice(-10)
      : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const enrollmentPattern = /^[A-Za-z0-9][A-Za-z0-9/-]{2,19}$/;

    if (formData.phone.length !== 10) {
      window.alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!emailPattern.test(formData.email)) {
      window.alert("Please enter a valid email address.");
      return;
    }

    if (!enrollmentPattern.test(formData.enrollmentId)) {
      window.alert("Enrollment ID must be 3-20 letters, numbers, hyphens, or slashes.");
      return;
    }

    onRegistrationComplete(formData);
  };

  return (
    <div className="form-container">
      <h2 id={titleId}>Register for: {selectedEvent.name}</h2>

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
          <label htmlFor="student-name">Student Name</label>
          <input
            id="student-name"
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label htmlFor="enrollment-id">Enrollment ID</label>
          <input
            id="enrollment-id"
            type="text"
            name="enrollmentId"
            value={formData.enrollmentId}
            onChange={handleChange}
            placeholder="e.g. CSE/2026/001"
            pattern="[A-Za-z0-9][A-Za-z0-9/-]{2,19}"
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            inputMode="numeric"
            maxLength="10"
            pattern="[0-9]{10}"
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