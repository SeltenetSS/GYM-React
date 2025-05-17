import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./AddProduct.css";

const AddProduct = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pointCost: 0,
    stock: 0,
    imageUrl: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("Name", formData.name);
    data.append("Description", formData.description);
    data.append("PointCost", formData.pointCost);
    data.append("Stock", formData.stock);
    if (formData.imageUrl) {
      data.append("ImageUrl", formData.imageUrl);
    }

    try {
      await axios.post("https://localhost:7054/api/Product/add-product", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Product added successfully!");
      history.push("/admin-dashboard/product"); 
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="add-product-form">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" onChange={handleChange} required />
        </div>
        <div>
          <label>Point Cost:</label>
          <input type="number" name="pointCost" onChange={handleChange} required />
        </div>
        <div>
          <label>Stock:</label>
          <input type="number" name="stock" onChange={handleChange} required />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name="imageUrl" accept="image/*" onChange={handleChange} />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
