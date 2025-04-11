import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewEquipment.css";

const ViewEquipment = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEquipment, setCurrentEquipment] = useState(null);
  const [editedEquipment, setEditedEquipment] = useState({
    name: "",
    description: "",
    isAvailable: true,
    price: "",
    unit: "",
  });

  useEffect(() => {
    fetchEquipments();
  }, []);

  const fetchEquipments = async () => {
    try {
      const response = await axios.get("https://localhost:7054/api/Equipment/get-all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEquipmentList(response.data);
    } catch (error) {
      console.error("Error fetching equipment:", error);
    }
  };

  const handleEdit = (eq) => {
    setCurrentEquipment(eq);
    setEditedEquipment({
      name: eq.name,
      description: eq.description,
      isAvailable: eq.isAvailable,
      price: eq.price,
      unit: eq.unit,
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://localhost:7054/api/Equipment/update-equipment/${currentEquipment.id}`,
        editedEquipment,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsEditModalOpen(false);
      fetchEquipments();
    } catch (error) {
      console.error("Error updating equipment:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this equipment?")) {
      try {
        await axios.delete(`https://localhost:7054/api/Equipment/delete-equipment/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEquipmentList(equipmentList.filter((eq) => eq.id !== id));
      } catch (error) {
        console.error("Error deleting equipment:", error);
      }
    }
  };

  return (
    <div className="equipment-wrapper">
      <table className="equipment-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Available</th>
            <th>Price</th>
            <th>Unit</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipmentList.map((eq) => (
            <tr key={eq.id}>
              <td>{eq.name}</td>
              <td>{eq.description}</td>
              <td>{eq.isAvailable ? "Yes" : "No"}</td>
              <td>{eq.price} ₼</td>
              <td>{eq.unit}</td>
              <td>
                {eq.imageUrl && (
                  <img
                    src={`https://localhost:7054/${eq.imageUrl}`}
                    alt={eq.name}
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                )}
              </td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(eq)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(eq.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Equipment</h2>
            <form onSubmit={handleEditSubmit}>
              <label>Name</label>
              <input
                type="text"
                value={editedEquipment.name}
                onChange={(e) => setEditedEquipment({ ...editedEquipment, name: e.target.value })}
              />

              <label>Description</label>
              <textarea
                value={editedEquipment.description}
                onChange={(e) => setEditedEquipment({ ...editedEquipment, description: e.target.value })}
              />

              <label>Available</label>
              <input
                type="checkbox"
                checked={editedEquipment.isAvailable}
                onChange={() =>
                  setEditedEquipment({ ...editedEquipment, isAvailable: !editedEquipment.isAvailable })
                }
              />

              <label>Price</label>
              <input
                type="number"
                value={editedEquipment.price}
                onChange={(e) => setEditedEquipment({ ...editedEquipment, price: e.target.value })}
              />

              <label>Unit</label>
              <input
                type="text"
                value={editedEquipment.unit}
                onChange={(e) => setEditedEquipment({ ...editedEquipment, unit: e.target.value })}
              />

              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewEquipment;
