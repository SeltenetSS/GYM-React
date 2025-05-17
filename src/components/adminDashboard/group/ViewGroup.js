import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./ViewGroup.css";

const ViewGroups = () => {
  const [groups, setGroups] = useState([]);
  const [packages, setPackages] = useState([]);
  const [trainers, setTrainers] = useState([]);

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    packageId: "",
    trainerId: "",
  });

  useEffect(() => {
    fetchGroups();
    fetchPackages();
    fetchTrainers();
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await axios.get(
        "https://localhost:7054/api/Group/all-groups",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setGroups(res.data);
    } catch (err) {
      console.error("Fetch groups error:", err);
    }
  };

  const fetchPackages = async () => {
    try {
      const res = await axios.get(
        "https://localhost:7054/api/Package/packages",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setPackages(res.data);
    } catch (err) {
      console.error("Fetch packages error:", err);
    }
  };

  const fetchTrainers = async () => {
    try {
      const res = await axios.get(
        "https://localhost:7054/api/Admin/trainers",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTrainers(res.data);
    } catch (err) {
      console.error("Fetch trainers error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;

    try {
      await axios.delete(`https://localhost:7054/api/Group/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchGroups();
    } catch (err) {
      console.error("Delete group error:", err);
    }
  };

  const openModal = (group) => {
    setSelectedGroup(group);
    setFormData({
      name: group.name || "",
      packageId: group.packageId?.toString() || "",
      trainerId: group.trainerId?.toString() || "",
    });
    setModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        "https://localhost:7054/api/Group",
        {
          id: selectedGroup.id,
          name: formData.name,
          packageId: parseInt(formData.packageId),
          trainerId: parseInt(formData.trainerId),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setModalVisible(false);
      setSelectedGroup(null);
      setFormData({ name: "", packageId: "", trainerId: "" });
      fetchGroups();
    } catch (err) {
      console.error("Update group error:", err);
    }
  };

  return (
    <div className="view-group-container">
      <h2 className="view-group-title">Existing Groups</h2>

      <table className="view-group-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Package Name</th>
            <th>Trainer Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.id}>
              <td>{group.id}</td>
              <td>{group.name}</td>
              <td>{group.packageName}</td>
              <td>{group.trainerName}</td>
              <td>
                <div className="view-group-actions">
                  <FaEdit
                    className="view-group-icon edit"
                    onClick={() => openModal(group)}
                    title="Edit"
                  />
                  <FaTrash
                    className="view-group-icon delete"
                    onClick={() => handleDelete(group.id)}
                    title="Delete"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalVisible && (
        <div className="view-group-modal">
          <div className="view-group-modal-content">
            <h3>Edit Group</h3>

            <input
              className="view-group-input"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Group Name"
            />

            <div>
              <label>Select Package:</label>
              <select
                value={formData.packageId}
                onChange={(e) =>
                  setFormData({ ...formData, packageId: e.target.value })
                }
                required
              >
                <option value="">-- Select Package --</option>
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.packageName} - {pkg.price} AZN / {pkg.durationInMonths} months
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Select Trainer:</label>
              <select
                value={formData.trainerId}
                onChange={(e) =>
                  setFormData({ ...formData, trainerId: e.target.value })
                }
                required
              >
                <option value="">-- Select Trainer --</option>
                {trainers.map((trainer) => (
                  <option key={trainer.id} value={trainer.id}>
                    {trainer.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="view-group-modal-actions">
              <button className="view-group-btn save" onClick={handleUpdate}>
                Save
              </button>
              <button
                className="view-group-btn cancel"
                onClick={() => setModalVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewGroups;
