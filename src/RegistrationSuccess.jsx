import React from "react";

function RegistrationSuccess({ formData, selectedEvent }) {
  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">✓</div>

        <h1>Registration Successful!</h1>

        <p className="success-text">
          Your registration has been completed successfully.
        </p>

        <div className="registration-details">
          <p>
            <strong>Student Name:</strong>{" "}
            {formData.studentName}
          </p>

          <p>
            <strong>Enrollment ID:</strong>{" "}
            {formData.enrollmentId}
          </p>

          <p>
            <strong>Email:</strong> {formData.email}
          </p>

          <p>
            <strong>Phone:</strong> {formData.phone}
          </p>

          <p>
            <strong>Event:</strong> {selectedEvent.name}
          </p>

          <p>
            <strong>Date:</strong> {selectedEvent.date}
          </p>

          <p>
            <strong>Venue:</strong> {selectedEvent.venue}
          </p>

          <p>
            <strong>Organizer:</strong>{" "}
            {selectedEvent.organizer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegistrationSuccess;