import React, { useState } from "react";

const phoneCountries = [
  { code: "IN", name: "India", dialCode: "+91", digits: 10 },
  { code: "US", name: "United States", dialCode: "+1", digits: 10 },
  { code: "CA", name: "Canada", dialCode: "+1", digits: 10 },
  { code: "GB", name: "United Kingdom", dialCode: "+44", digits: 10 },
  { code: "AU", name: "Australia", dialCode: "+61", digits: 9 },
  { code: "BD", name: "Bangladesh", dialCode: "+880", digits: 10 },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971", digits: 9 },
];

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
    country: "IN",
  });

  const selectedCountry = phoneCountries.find(
    (country) => country.code === formData.country
  );

  const handleChange = (e) => {
    const value = e.target.name === "phone"
      ? e.target.value.replace(/\D/g, "").slice(-selectedCountry.digits)
      : e.target.name === "enrollmentId"
        ? e.target.value.toUpperCase()
      : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleCountryChange = (e) => {
    setFormData({
      ...formData,
      country: e.target.value,
      phone: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const enrollmentPattern = /^ADTU\/\d+\/\d{4}-\d{2}\/[A-Z]{4}\/\d{3}$/;

    if (formData.phone.length !== selectedCountry.digits) {
      window.alert(
        `Please enter a valid ${selectedCountry.digits}-digit phone number for ${selectedCountry.name}.`
      );
      return;
    }

    if (!emailPattern.test(formData.email)) {
      window.alert("Please enter a valid email address.");
      return;
    }

    if (!enrollmentPattern.test(formData.enrollmentId)) {
      window.alert("Enrollment ID must follow this format: ADTU/1/2024-27/BCAO/119.");
      return;
    }

    onRegistrationComplete({
      ...formData,
      phone: `${selectedCountry.dialCode} ${formData.phone}`,
      countryName: selectedCountry.name,
    });
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
            placeholder="ADTU/1/2024-27/BCAO/119"
            pattern="ADTU/[0-9]+/[0-9]{4}-[0-9]{2}/[A-Z]{4}/[0-9]{3}"
            title="Use the format ADTU/1/2024-27/BCAO/119"
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

        <div className="phone-field">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleCountryChange}
          >
            {phoneCountries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name} ({country.dialCode})
              </option>
            ))}
          </select>

          <label htmlFor="phone">Phone number</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={`${selectedCountry.digits}-digit number`}
            inputMode="numeric"
            maxLength={selectedCountry.digits}
            pattern={`[0-9]{${selectedCountry.digits}}`}
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