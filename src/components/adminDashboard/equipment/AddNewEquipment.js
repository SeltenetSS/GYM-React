import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./AddNewEquipment.css"; 

const AddNewEquipment = () => {
  const [equipment, setEquipment] = useState({
    name: "",
    description: "",
    isAvailable: true,
    price: "",
    unit: "",
    imageUrl: null,
  });
  const [error, setError] = useState("");
  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEquipment({
      ...equipment,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setEquipment({
      ...equipment,
      imageUrl: e.target.files[0],
    });
  };
  console.log(localStorage.getItem("token"));


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", equipment.name);
    formData.append("description", equipment.description);
    formData.append("isAvailable", equipment.isAvailable);
    formData.append("price", equipment.price);
    formData.append("unit", equipment.unit);
    formData.append("imageUrl", equipment.imageUrl);

 
    try {
      const response = await axios.post("https://localhost:7054/api/Equipment/add-equipment", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        alert("Equipment added successfully!");
        history.push("/admin-dashboard/equipment");
      }
    } catch (err) {
      setError("Failed to add equipment");
    }
  };

  return (
    <div className="admin-add-equipment-page">
      <div className="admin-add-equipment-wrapper">
        <h2 className="admin-add-equipment-title">Add New Equipment</h2>
        {error && <p className="admin-error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="admin-add-equipment-form">
          <div className="admin-form-group">
            <label htmlFor="name">Equipment Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={equipment.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={equipment.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="isAvailable">Available</label>
            <input
              type="checkbox"
              id="isAvailable"
              name="isAvailable"
              checked={equipment.isAvailable}
              onChange={() => setEquipment({ ...equipment, isAvailable: !equipment.isAvailable })}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="price">Price</label>
            <input
              type="decimal"
              id="price"
              name="price"
              value={equipment.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="unit">Unit (kg, gram, etc.)</label>
            <input
              type="number"
              id="unit"
              name="unit"
              value={equipment.unit}
              onChange={handleInputChange}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="imageUrl">Upload Image</label>
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>

          <button type="submit" className="admin-submit-button">
            Add Equipment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewEquipment;


