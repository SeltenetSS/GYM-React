import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GroupDetails.css";

const GroupDetails = () => {
  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [showModalGroupId, setShowModalGroupId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);  // İstifadəçi məlumatı üçün state
  const [warningMessage, setWarningMessage] = useState("");  // Yeni state to hold warning message

  // Fetch all groups from the API
  const fetchGroups = async () => {
    try {
      const response = await axios.get("https://localhost:7054/api/Group/all-groups", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setGroups(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // Fetch all members from the API
  const fetchMembers = async () => {
    try {
      const res = await axios.get("https://localhost:7054/api/Admin/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMembers(res.data);
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  };

  // Fetch users of a specific group from the API
  const fetchGroupUsers = async (groupId) => {
    try {
      const res = await axios.get(`https://localhost:7054/api/Group/${groupId}/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(res.data);
      setSelectedGroupId(groupId);
    } catch (error) {
      console.error("User fetch error:", error);
    }
  };

  // Add a user to a specific group
  const handleAddUser = async () => {
    // Check if the user is already in the group
    const isUserInGroup = users.some((user) => user.id === parseInt(selectedUserId));
    
    if (isUserInGroup) {
      setWarningMessage("This user is already a member of the group.");
      return;  // Stop execution if user is already in the group
    } else {
      setWarningMessage(""); // Clear warning if user is not in the group
    }

    try {
      await axios.post(
        "https://localhost:7054/api/Group/addUser",
        {
          groupId: showModalGroupId,
          userId: parseInt(selectedUserId),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setShowModalGroupId(null);
      setSelectedUserId("");
      fetchGroupUsers(showModalGroupId);
    } catch (error) {
      console.error("Add user error:", error);
    }
  };

  // Delete a user from a specific group
  const handleDeleteUser = async (groupId, userId) => {
    try {
      await axios.delete(`https://localhost:7054/api/Group/${groupId}/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchGroupUsers(groupId);
    } catch (error) {
      console.error("Delete user error:", error);
    }
  };

  // Fetch and display the details of a specific user
  const handleUserClick = async (userId) => {
    try {
      const res = await axios.get(`https://localhost:7054/api/User/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSelectedUser(res.data);  // Seçilmiş istifadəçi məlumatını saxla
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Fetch groups and members when the component is mounted
  useEffect(() => {
    fetchGroups();
    fetchMembers();
  }, []);

  return (
    <div className="group-details-container">
      {groups.map((group) => (
        <div className="group-details-card" key={group.id}>
          <h3>{group.name}</h3>
          <p>Package: {group.packageName}</p>

          <button onClick={() => setShowModalGroupId(group.id)}>Add User</button>
          <button onClick={() => fetchGroupUsers(group.id)}>View Users</button>

          {selectedGroupId === group.id && users.length > 0 && (
            <div className="group-details-modal-overlay">
              <div className="group-details-modal">
                <h2>Users in {group.name}</h2>
                <table className="group-details-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} onClick={() => handleUserClick(user.id)}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <button onClick={() => handleDeleteUser(group.id, user.id)}>🗑️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="group-details-modal-buttons">
                  <button onClick={() => setSelectedGroupId(null)}>Close</button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add User Modal */}
      {showModalGroupId && (
        <div className="group-details-modal-overlay">
          <div className="group-details-modal">
            <h2>Select a user to add</h2>
            {warningMessage && <p style={{ color: "red" }}>{warningMessage}</p>}
            <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
              <option value="">Select user</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name} ({member.email})
                </option>
              ))}
            </select>
            <div className="group-details-modal-buttons">
              <button onClick={handleAddUser}>Add</button>
              <button onClick={() => setShowModalGroupId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="group-details-modal-overlay">
          <div className="group-details-modal">
            <h2>User Details</h2>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phone || "N/A"}</p>
            <p><strong>Package Name:</strong> {selectedUser.packageName || "N/A"}</p>
            <p><strong>Date of Birth:</strong> {selectedUser.dateOfBirth ? new Date(selectedUser.dateOfBirth).toLocaleDateString() : "N/A"}</p>
            <p><strong>Created Date:</strong> {new Date(selectedUser.createdDate).toLocaleDateString()}</p>
            <div className="group-details-modal-buttons">
              <button onClick={() => setSelectedUser(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupDetails;
