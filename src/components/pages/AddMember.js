import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";  
import "./AddMember.css"; 

const AddMember = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dateOfBirth: "",
    imageUrl: null,
  });

  const history = useHistory();  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageUrl: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("phone", formData.phone);
    data.append("dateOfBirth", formData.dateOfBirth);
    if (formData.imageUrl) {
      data.append("imageUrl", formData.imageUrl);
    }

    axios
      .post("http://localhost:7054/api/members", data)
      .then((response) => {
        console.log("User added successfully:", response.data);
        history.push("/admin-dashboard/member");
      })
      .catch((error) => {
        console.error("There was an error adding the member:", error);
      });
  };

  return (
    <div className="add-member-container">
      <h2>Add New Member</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Profile Image:</label>
          <input
            type="file"
            name="imageUrl"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit">Add Member</button>
      </form>
    </div>
  );
};

export default AddMember;
