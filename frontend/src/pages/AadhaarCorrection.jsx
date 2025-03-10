import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./AadharCorrection.css";

function AadhaarCorrection() {
  const [correction, setCorrection] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Request submitted for: ${correction}`);
  };

  return (
    <div
  className="container-fluid vh-100 d-flex align-items-center justify-content-center"
  style={{
    background: "linear-gradient(135deg, rgb(211, 211, 211), rgb(236, 235, 236))",
  }}
>
  <div className="main-container">
    <div className="row g-4 justify-content-center">
      {/* Aadhaar Correction Section */}
      <div className="col-12 col-md-6 col-lg-4">
        <div className="p-4 bg-white shadow-lg rounded-4">
          <h2 className="text-center fw-bold mb-4 text-primary">Aadhaar Correction</h2>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8_XFM0Ct7i8xiil8u_Dg_b2jJ4PdXJU_GeA&s"
            alt="aadhar-image"
            className="img-fluid mb-3"
            style={{ height: "150px", width: "100%" }}
          />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Select Correction Type</label>
              <select className="form-select border-primary shadow-sm" onChange={(e) => setCorrection(e.target.value)}>
                <option value="">-- Select Correction --</option>
                <option value="DOB">Date of Birth</option>
                <option value="Address">Address</option>
                <option value="Phone">Phone Number</option>
                <option value="Father's Name">Father's Name</option>
                <option value="Husband's Name">Husband's Name</option>
              </select>
            </div>
            <button className="btn btn-primary w-100 fw-bold shadow-sm">Submit Request</button>
          </form>
        </div>
      </div>

      {/* PAN Card Update Section */}
      <div className="col-12 col-md-6 col-lg-4">
        <div className="p-4 bg-white shadow-lg rounded-4">
          <h2 className="text-center fw-bold mb-4 text-success">PAN Card Update</h2>
          <img
            src="https://pvccardwala.com/wp-content/uploads/2022/11/WhatsApp-Image-2022-11-12-at-5.02.59-PM.jpeg"
            alt="pan-image"
            className="img-fluid mb-3"
            style={{ height: "150px", width: "100%" }}
          />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Select Update Type</label>
              <select className="form-select border-success shadow-sm" onChange={(e) => setCorrection(e.target.value)}>
                <option value="">-- Select Update --</option>
                <option value="Name">Name</option>
                <option value="DOB">Date of Birth</option>
                <option value="Photo">Photo</option>
                <option value="Signature">Signature</option>
              </select>
            </div>
            <button className="btn btn-success w-100 fw-bold shadow-sm">Submit Request</button>
          </form>
        </div>
      </div>

      {/* Family ID Update Section */}
      <div className="col-12 col-md-6 col-lg-4">
        <div className="p-4 bg-white shadow-lg rounded-4">
          <h2 className="text-center fw-bold mb-4 text-primary">Family ID Update</h2>
          <img
            src="https://imgv2-2-f.scribdassets.com/img/document/637294912/original/b3496a7c04/1?v=1"
            alt="family-id-image"
            className="img-fluid mb-3"
            style={{ height: "150px", width: "100%" }}
          />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Select Update Type</label>
              <select className="form-select border-primary shadow-sm" onChange={(e) => setCorrection(e.target.value)}>
                <option value="">-- Select Update --</option>
                <option value="Add Member">Add Member</option>
                <option value="Remove Member">Remove Member</option>
                <option value="Address Change">Address Change</option>
                <option value="Name Correction">Name Correction</option>
              </select>
            </div>
            <button className="btn btn-primary w-100 fw-bold shadow-sm">Submit Request</button>
          </form>
        </div>
      </div>

      {/* Ration Card Update Section */}
      <div className="col-12 col-md-6 col-lg-4">
        <div className="p-4 bg-white shadow-lg rounded-4">
          <h2 className="text-center fw-bold mb-4 text-danger">Ration Card Update</h2>
          <img
            src="https://www.paymeindia.in/blog/wp-content/uploads/2023/11/what-is-ration-card-in-india-history-and-benefits.jpg"
            alt="ration-card-image"
            className="img-fluid mb-3"
            style={{ height: "150px", width: "100%" }}
          />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Select Update Type</label>
              <select className="form-select border-danger shadow-sm" onChange={(e) => setCorrection(e.target.value)}>
                <option value="">-- Select Update --</option>
                <option value="Add Member">Add Member</option>
                <option value="Remove Member">Remove Member</option>
                <option value="Address Change">Address Change</option>
                <option value="Category Change">Category Change</option>
              </select>
            </div>
            <button className="btn btn-danger w-100 fw-bold shadow-sm">Submit Request</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>

  
  );
}

export default AadhaarCorrection;
