import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InfoMember.css';

function InfoMember() {
  const [members, setMembers] = useState([]);
  const [editMemberId, setEditMemberId] = useState(null);
  const [updatedMember, setUpdatedMember] = useState({
    name: '',
    phone: '',
    packageName: '',
    packagePrice: '',
    trainerName: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetchInfoUsers();
  }, []);
  
  const fetchInfoUsers = async () => {
    try {
      const response = await axios.get("https://localhost:7054/api/User/details", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
        },
      });
      console.log('API response:', response.data);
      setMembers(response.data || []);
      setMessage('');
    } catch (error) {
      console.error('Error fetching members:', error);
      setMembers([]);
      setMessage('No members found.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleEditClick = (id) => {
    const memberToEdit = members.find((member) => member.id === id);
    setEditMemberId(id);
    setUpdatedMember({
      name: memberToEdit.name,
      phone: memberToEdit.phone,
      packageName: memberToEdit.packageName,
      packagePrice: memberToEdit.packagePrice,
      trainerName: memberToEdit.trainerName,
      imageUrl: memberToEdit.imageUrl
    });
  };

  const handleUpdateClick = async (id) => {
    try {
      await axios.put(`https://localhost:7054/api/User/${id}/details`, updatedMember, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert('User updated successfully');
      setMembers(
        members.map((member) =>
          member.id === id ? { ...member, ...updatedMember } : member
        )
      );
      setEditMemberId(null);
    } catch (error) {
      console.error('Error updating member:', error);
      alert('Failed to update user');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedMember((prev) => ({
          ...prev,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="info-member-container">
      <h2>Members</h2>
      {loading ? (
        <p>Loading...</p>
      ) : message ? (
        <p>{message}</p>
      ) : (
        <table className="info-member-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Package</th>
              <th>Price</th>
              <th>Trainer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.length > 0 ? (
              members.map((member) => (
                <tr key={member.id}>
                  <td>
                    {member.imageUrl ? (
                      <img src={member.imageUrl} alt={member.name} />
                    ) : (
                      <span>No image</span>
                    )}
                  </td>
                  <td>{member.name}</td>
                  <td>{member.phone}</td>
                  <td>{member.packageName}</td>
                  <td>{member.packagePrice} ₼</td>
                  <td>{member.trainerName}</td>
                  <td>
                    <button
                      className="info-member-button"
                      onClick={() => handleEditClick(member.id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No members available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {editMemberId && (
        <div className="info-member-edit-form">
          <h3>Edit Member</h3>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={updatedMember.name}
            onChange={handleInputChange}
          />
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={updatedMember.phone}
            onChange={handleInputChange}
          />
          <label>Package Name:</label>
          <input
            type="text"
            name="packageName"
            value={updatedMember.packageName}
            onChange={handleInputChange}
          />
          <label>Package Price:</label>
          <input
            type="number"
            name="packagePrice"
            value={updatedMember.packagePrice || ''}
            onChange={handleInputChange}
          />
          <label>Trainer Name:</label>
          <input
            type="text"
            name="trainerName"
            value={updatedMember.trainerName}
            onChange={handleInputChange}
          />
          <label>Image:</label>
          <input
            type="file"
            name="imageUrl"
            onChange={handleFileChange}
          />
          <div className="info-member-edit-buttons">
            <button
              className="info-member-save-button"
              onClick={() => handleUpdateClick(editMemberId)}
            >
              Save
            </button>
            <button
              className="info-member-cancel-button"
              onClick={() => setEditMemberId(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoMember;
