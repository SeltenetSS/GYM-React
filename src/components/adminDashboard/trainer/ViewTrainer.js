import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ViewTrainer.module.css";

const ViewTrainer = () => {
  const [trainers, setTrainers] = useState([]);
  const [editTrainer, setEditTrainer] = useState(null);
  const [editedData, setEditedData] = useState({
    name: "",
    email: "",
    experience: "",
    mobileTelephone: "",
    salary: "",
    imageUrl: null,
  });

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await axios.get("https://localhost:7054/api/Admin/trainers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTrainers(response.data);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  const handleDelete = async (id) => {
    if (id) {
      try {
        await axios.delete(`https://localhost:7054/api/Admin/delete-trainer/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTrainers((prev) => prev.filter((t) => t.id !== id));
      } catch (error) {
        console.error("Error deleting trainer:", error);
      }
    }
  };

  const handleEdit = (trainer) => {
    setEditTrainer(trainer);
    setEditedData({
      name: trainer.name || "",
      email: trainer.email || "",
      experience: trainer.experience || "",
      mobileTelephone: trainer.mobileTelephone || "",
      salary: trainer.salary || "",
      imageUrl: trainer.imageUrl || null,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleImageChange = (e) => {
    setEditedData({ ...editedData, imageUrl: e.target.files[0] });
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editedData.name);
      formData.append("email", editedData.email);
      formData.append("experience", editedData.experience);
      formData.append("mobileTelephone", editedData.mobileTelephone);
      formData.append("salary", editedData.salary);
      if (editedData.imageUrl) {
        formData.append("imageUrl", editedData.imageUrl); // Düzgün fayl əlavə et
      }

      await axios.put(`https://localhost:7054/api/Admin/update-trainer/${editTrainer.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setEditTrainer(null);
      fetchTrainers();
    } catch (error) {
      console.error("Error updating trainer:", error);
    }
  };

  const handleCancel = () => {
    setEditTrainer(null);
  };

  return (
    <div className={styles['view-trainer-wrapper']}>
      <table className={styles['view-trainer-table']}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Experience</th>
            <th>Mobile</th>
            <th>Salary</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((trainer) => (
            <tr key={trainer.id}>
              <td>{trainer.name}</td>
              <td>{trainer.email}</td>
              <td>{trainer.experience}</td>
              <td>{trainer.mobileTelephone}</td>
              <td>{trainer.salary}</td>
              <td>
                <img
                  src={trainer.imageUrl || "default-avatar.png"}
                  alt={trainer.name}
                  className={styles['view-trainer-img']}
                />
              </td>
              <td>
                <button className={styles['view-trainer-btn'] + ' ' + styles.edit} onClick={() => handleEdit(trainer)}>Edit</button>
                <button className={styles['view-trainer-btn'] + ' ' + styles.delete} onClick={() => handleDelete(trainer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editTrainer && (
        <div className={styles['view-trainer-edit-modal']}>
          <h3>Edit Trainer</h3>
          <label>
            Name:
            <input
              name="name"
              value={editedData.name}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Email:
            <input
              name="email"
              value={editedData.email}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Experience:
            <input
              name="experience"
              value={editedData.experience}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Mobile Telephone:
            <input
              name="mobileTelephone"
              value={editedData.mobileTelephone}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Salary:
            <input
              name="salary"
              type="number"
              value={editedData.salary}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Image:
            <input
              type="file"
              onChange={handleImageChange}
            />
          </label>
          <div style={{ marginTop: "15px" }}>
            <button className={styles['view-trainer-btn'] + ' ' + styles.edit} onClick={handleSave}>Save</button>
            <button className={styles['view-trainer-btn'] + ' ' + styles.delete} onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTrainer;
