import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const DetailsPage = () => {
  const location = useLocation();
  const correctionType = location.state?.correction || "";
  const [userEmail, setUserEmail] = useState(""); //stores logged in user email

  useEffect(() => {
    // setUserEmail("user@gmail.com")
    const userInfo = localStorage.getItem("user-info");
    const details = JSON.parse(userInfo);
    console.log(details.email);
    if (userInfo) {
      setUserEmail(details.email);
    }
  }, []);

  const [userDetails, setUserDetails] = useState({
    name: "",
    documentId: "",
    phoneNumber: "",
    reason: "",
    addressLine1: "",
    landmark: "",
    state: "",
    pincode: "",
    dateOfBirth: "",
    file: null,
  });

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setUserDetails({ ...userDetails, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/submit", {
        ...userDetails,
        userEmail,
        correctionType,
      });

      alert("Request Submitted Successfully!");
    } catch (error) {
      console.error(error);
      alert("Error submitting request");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-success">Update {correctionType}</h2>
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white shadow-lg rounded-4"
      >
        {/* Name */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Full Name (as per Document ID)
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        {/* Document ID */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Document ID</label>
          <input
            type="text"
            name="documentId"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        {/* Mobile Number */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Mobile Number</label>
          <input
            type="tel"
            name="phoneNumber"
            className="form-control"
            maxLength="10"
            pattern="[0-9]{10}"
            onChange={handleChange}
            required
          />
        </div>

        {/* Correction Type-Specific Fields */}
        {correctionType === "Address" && (
          <>
            <div className="mb-3">
              <label className="form-label fw-semibold">Address Line 1</label>
              <input
                type="text"
                name="addressLine1"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Landmark</label>
              <input
                type="text"
                name="landmark"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">State</label>
              <input
                type="text"
                name="state"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Pincode</label>
              <input
                type="text"
                name="pincode"
                className="form-control"
                maxLength="6"
                pattern="[0-9]{6}"
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {correctionType === "Date of Birth" && (
          <div className="mb-3">
            <label className="form-label fw-semibold">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
        )}

        {(correctionType === "Photo" || correctionType === "Signature") && (
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Upload {correctionType}
            </label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>
        )}

        {/* Reason for Update */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Reason for Update</label>
          <textarea
            name="reason"
            className="form-control"
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button className="btn btn-success w-100 fw-bold">Submit</button>
      </form>
    </div>
  );
};

export default DetailsPage;
