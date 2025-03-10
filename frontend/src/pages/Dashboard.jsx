import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css"
function Dashboard() {
  const navigate = useNavigate();
  const [correction, setCorrection] = useState("");

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(correction){
      navigate("/details",{state:{correction}});
    }
    else{
    alert("Request not submited");
    }
  };
  const formSections = [
    {
      title: "Aadhaar Correction",
      color: "blue",
      btnColor: "blue",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8_XFM0Ct7i8xiil8u_Dg_b2jJ4PdXJU_GeA&s",
      options: ["Date of Birth", "Address", "Phone Number", "Father's Name", "Husband's Name"],
    },
    {
      title: "PAN Card Update",
      color: "green",
      btnColor: "green",
      image: "https://pvccardwala.com/wp-content/uploads/2022/11/WhatsApp-Image-2022-11-12-at-5.02.59-PM.jpeg",
      options: ["Name", "Date of Birth", "Photo", "Signature"],
    },
    {
      title: "Family ID Update",
      color: "purple",
      btnColor: "purple",
      image: "https://imgv2-2-f.scribdassets.com/img/document/637294912/original/b3496a7c04/1?v=1",
      options: ["Add Member", "Remove Member", "Address Change", "Name Correction"],
    },
    {
      title: "Ration Card Update",
      color: "red",
      btnColor: "red",
      image: "https://www.paymeindia.in/blog/wp-content/uploads/2023/11/what-is-ration-card-in-india-history-and-benefits.jpg",
      options: ["Add Member", "Remove Member", "Address Change", "Category Change"],
    },
  ];

  return(
    
    <div className="dashboard">
      {/* Main Content */}
      <div className="main-content">
       <div className="form-container">
        {formSections.map((item, index) => (
          <div className="form-card" key={index}>
            <h2 className="form-title" style={{ color: item.color }}>{item.title}</h2>
            <img src={item.image} alt={`${item.title}-image`} className="form-image" />
            <form onSubmit={handleSubmit}>
              <label className="form-label">Select Update Type</label>
              <select className="form-select" onChange={(e) => setCorrection(e.target.value)}>
                <option value="">-- Select Update --</option>
                {item.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
              <button className="submit-btn" style={{ backgroundColor: item.btnColor }}>Submit Request</button>
            </form>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
