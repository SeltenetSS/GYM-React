// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
// import "./AddMember.css";

// const AddMember = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     isActive: false,
//     isApproved: false,
//     phone: "",
//     dateOfBirth: "",
//     imageUrl: null,
//   });

//   const history = useHistory();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, imageUrl: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (key === "imageUrl" && value) {
//         data.append(key, value);
//       } else if (key !== "imageUrl") {
//         data.append(key, value);
//       }
//     });

//     try {
//       await axios.post("https://localhost:7054/api/Admin/add-user", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       alert("User added successfully!");
//       history.push("/admin-dashboard/member");
//     } catch (error) {
//       console.error("Error adding user:", error);
//       alert("Failed to add user.");
//     }
//   };

//   return (
//     <div className="add-member-page">
//       <div className="add-member-wrapper">
//         <h2 className="add-member-title">Add New Member</h2>
//         <form className="add-member-form" onSubmit={handleSubmit}>
//           <div className="add-member-group">
//             <label htmlFor="name">Full Name</label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               placeholder="Enter full name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="add-member-group">
//             <label htmlFor="email">Email Address</label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="example@mail.com"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="add-member-group">
//             <label htmlFor="password">Password</label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               placeholder="Minimum 6 characters"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="add-member-group">
//             <label htmlFor="phone">Phone Number</label>
//             <input
//               id="phone"
//               name="phone"
//               type="tel"
//               placeholder="+994 XX XXX XX XX"
//               value={formData.phone}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="add-member-group">
//             <label htmlFor="dateOfBirth">Date of Birth</label>
//             <input
//               id="dateOfBirth"
//               name="dateOfBirth"
//               type="date"
//               value={formData.dateOfBirth}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="add-member-group checkbox-group">
//             <input
//               id="isActive"
//               name="isActive"
//               type="checkbox"
//               checked={formData.isActive}
//               onChange={handleChange}
//             />
//             <label htmlFor="isActive">Active</label>
//           </div>

//           <div className="add-member-group checkbox-group">
//             <input
//               id="isApproved"
//               name="isApproved"
//               type="checkbox"
//               checked={formData.isApproved}
//               onChange={handleChange}
//             />
//             <label htmlFor="isApproved">Approved</label>
//           </div>

//           <div className="add-member-group">
//             <label htmlFor="imageUrl">Profile Picture</label>
//             <input
//               id="imageUrl"
//               name="imageUrl"
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//             />
//           </div>

//           <button type="submit" className="add-member-button">
//             Add Member
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddMember;


import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./AddMember.css";

const AddMember = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isActive: false,
    isApproved: false,
    phone: "",
    dateOfBirth: "",
    imageUrl: null,
  });

  const [errorMessages, setErrorMessages] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    isApproved: "",
    imageUrl: "",
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageUrl: e.target.files[0] });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^\+994\d{9}$/.test(phone);
  const isValidPassword = (password) => password.length >= 6;

  const validateForm = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = "Name cannot be empty.";
    }

    if (!formData.email || !isValidEmail(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.password || !isValidPassword(formData.password)) {
      errors.password = "Password must be at least 6 characters long.";
    }

    if (formData.phone && !isValidPhone(formData.phone)) {
      errors.phone = "Please enter a valid phone number (+994 XX XXX XX XX).";
    }

    if (!formData.isApproved) {
      errors.isApproved = "User must be approved.";
    }

    if (formData.imageUrl && !formData.imageUrl.name.match(/\.(jpg|jpeg|png)$/)) {
      errors.imageUrl = "Image must be in jpg, jpeg, or png format.";
    }

    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "imageUrl" && value) {
        data.append(key, value);
      } else if (key !== "imageUrl") {
        data.append(key, value);
      }
    });

    try {
      await axios.post("https://localhost:7054/api/Admin/add-user", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("User added successfully!");
      history.push("/admin-dashboard/member");
    } catch (error) {
      console.error("Error while adding user:", error);
      alert("User could not be added.");
    }
  };

  return (
    <div className="add-member-page">
      <div className="add-member-wrapper">
        <h2 className="add-member-title">Add New Member</h2>
        <form className="add-member-form" onSubmit={handleSubmit}>
          <div className="add-member-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errorMessages.name && <span className="error-message">{errorMessages.name}</span>}
          </div>

          <div className="add-member-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errorMessages.email && <span className="error-message">{errorMessages.email}</span>}
          </div>

          <div className="add-member-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errorMessages.password && <span className="error-message">{errorMessages.password}</span>}
          </div>

          <div className="add-member-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+994 XX XXX XX XX"
              value={formData.phone}
              onChange={handleChange}
            />
            {errorMessages.phone && <span className="error-message">{errorMessages.phone}</span>}
          </div>

          <div className="add-member-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>

          <div className="add-member-group checkbox-group">
            <input
              id="isActive"
              name="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={handleChange}
            />
            <label htmlFor="isActive">Active</label>
          </div>

          <div className="add-member-group checkbox-group">
            <input
              id="isApproved"
              name="isApproved"
              type="checkbox"
              checked={formData.isApproved}
              onChange={handleChange}
            />
            <label htmlFor="isApproved">Approved</label>
            {errorMessages.isApproved && <span className="error-message">{errorMessages.isApproved}</span>}
          </div>

          <div className="add-member-group">
            <label htmlFor="imageUrl">Profile Picture</label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {errorMessages.imageUrl && <span className="error-message">{errorMessages.imageUrl}</span>}
          </div>

          <button type="submit" className="add-member-button">
            Add Member
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMember;
