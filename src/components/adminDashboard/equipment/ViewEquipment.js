

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./ViewEquipment.css";

// const ViewEquipment = () => {
//   const [equipmentList, setEquipmentList] = useState([]);
//   const [error, setError] = useState("");
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [currentEquipment, setCurrentEquipment] = useState(null);
//   const [editedEquipment, setEditedEquipment] = useState({
//     name: "",
//     description: "",
//     price: 0,
//     unit: "",
//     isAvailable: true,
//     imageUrl: "",
//   });

//   useEffect(() => {
//     const fetchEquipment = async () => {
//       try {
//         const response = await axios.get("https://localhost:7054/api/Equipment/equipments", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         setEquipmentList(response.data);
//       } catch (err) {
//         setError("Failed to load equipment");
//       }
//     };

//     fetchEquipment();
//   }, []);

//   const handleEdit = (equipment) => {
//     setCurrentEquipment(equipment);
//     setEditedEquipment({
//       name: equipment.name,
//       description: equipment.description,
//       price: equipment.price,
//       unit: equipment.unit,
//       isAvailable: equipment.isAvailable,
//       imageUrl: equipment.imageUrl,
//     });
//     setIsEditModalOpen(true);
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `https://localhost:7054/api/Equipment/update-equipment/${currentEquipment.id}`,
//         editedEquipment,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setEquipmentList((prevList) =>
//         prevList.map((eq) =>
//           eq.id === currentEquipment.id ? { ...eq, ...editedEquipment } : eq
//         )
//       );
//       setIsEditModalOpen(false);
//     } catch (error) {
//       setError("Error updating equipment");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this equipment?")) {
//       try {
//         await axios.delete(`https://localhost:7054/api/Equipment/delete/${id}`, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           });          
//         setEquipmentList((prevList) => prevList.filter((eq) => eq.id !== id));
//       } catch (error) {
//         setError("Error deleting equipment");
//       }
//     }
//   };

//   return (
//     <div className="equipment-list-page">
//       <h2>Equipment List</h2>
//       {error && <p className="error-message">{error}</p>}
//       <table className="equipment-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Price</th>
//             <th>Unit</th>
//             <th>Image</th> {/* Replace Available with Image */}
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {equipmentList.length > 0 ? (
//             equipmentList.map((equipment) => (
//               <tr key={equipment.id}>
//                 <td>{equipment.name}</td>
//                 <td>{equipment.description || "No description available"}</td>
//                 <td>{equipment.price} $</td>
//                 <td>{equipment.unit}</td>
//                 <td>
//                   {equipment.imageUrl ? (
//                     <img src={equipment.imageUrl} alt={equipment.name} className="equipment-image" />
//                   ) : (
//                     "No image available"
//                   )}
//                 </td>
//                 <td>
//                   <button className="edit-btn" onClick={() => handleEdit(equipment)}>
//                     Edit
//                   </button>
//                   <button className="delete-btn" onClick={() => handleDelete(equipment.id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6">No equipment available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {isEditModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h2>Edit Equipment</h2>
//             <form onSubmit={handleEditSubmit}>
//               <label>Equipment Name</label>
//               <input
//                 type="text"
//                 value={editedEquipment.name}
//                 onChange={(e) => setEditedEquipment({ ...editedEquipment, name: e.target.value })}
//               />

//               <label>Description</label>
//               <textarea
//                 value={editedEquipment.description}
//                 onChange={(e) => setEditedEquipment({ ...editedEquipment, description: e.target.value })}
//               />

//               <label>Price</label>
//               <input
//                 type="decimal"
//                 value={editedEquipment.price}
//                 onChange={(e) => setEditedEquipment({ ...editedEquipment, price: e.target.value })}
//               />

//               <label>Unit</label>
//               <input
//                 type="number"
//                 value={editedEquipment.unit}
//                 onChange={(e) => setEditedEquipment({ ...editedEquipment, unit: e.target.value })}
//               />

//               <label>Available</label>
//               <input
//                 type="checkbox"
//                 checked={editedEquipment.isAvailable}
//                 onChange={(e) =>
//                   setEditedEquipment({ ...editedEquipment, isAvailable: e.target.checked })
//                 }
//               />

//               <label>Image URL</label>
//               <input
//                 type="text"
//                 value={editedEquipment.imageUrl}
//                 onChange={(e) => setEditedEquipment({ ...editedEquipment, imageUrl: e.target.value })}
//               />

//               <button type="submit">Save Changes</button>
//               <button type="button" onClick={() => setIsEditModalOpen(false)}>
//                 Cancel
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewEquipment;


import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewEquipment.css";

const ViewEquipment = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [error, setError] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEquipment, setCurrentEquipment] = useState(null);
  const [editedEquipment, setEditedEquipment] = useState({
    name: "",
    description: "",
    price: 0,
    unit: "",
    isAvailable: true,
    image: null,  
  });

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get("https://localhost:7054/api/Equipment/equipments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEquipmentList(response.data);
      } catch (err) {
        setError("Failed to load equipment");
      }
    };

    fetchEquipment();
  }, []);

  const handleEdit = (equipment) => {
    setCurrentEquipment(equipment);
    setEditedEquipment({
      name: equipment.name,
      description: equipment.description,
      price: equipment.price,
      unit: equipment.unit,
      isAvailable: equipment.isAvailable,
      image: null, // Reset the image input when editing
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", editedEquipment.name);
    formData.append("description", editedEquipment.description);
    formData.append("price", editedEquipment.price);
    formData.append("unit", editedEquipment.unit);
    formData.append("isAvailable", editedEquipment.isAvailable);
    if (editedEquipment.image) {
      formData.append("image", editedEquipment.image); // Appending the image file
    }

    try {
      await axios.put(
        `https://localhost:7054/api/Equipment/update-equipment/${currentEquipment.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setEquipmentList((prevList) =>
        prevList.map((eq) =>
          eq.id === currentEquipment.id ? { ...eq, ...editedEquipment } : eq
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      setError("Error updating equipment");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this equipment?")) {
      try {
        await axios.delete(`https://localhost:7054/api/Equipment/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEquipmentList((prevList) => prevList.filter((eq) => eq.id !== id));
      } catch (error) {
        setError("Error deleting equipment");
      }
    }
  };

  const handleImageChange = (e) => {
    setEditedEquipment({ ...editedEquipment, image: e.target.files[0] }); // Handle file input change
  };

  return (
    <div className="equipment-list-page">
      <h2>Equipment List</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="equipment-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Unit</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipmentList.length > 0 ? (
            equipmentList.map((equipment) => (
              <tr key={equipment.id}>
                <td>{equipment.name}</td>
                <td>{equipment.description || "No description available"}</td>
                <td>{equipment.price} $</td>
                <td>{equipment.unit}</td>
                <td>
                  {equipment.imageUrl ? (
                    <img src={equipment.imageUrl} alt={equipment.name} className="equipment-image" />
                  ) : (
                    "No image available"
                  )}
                </td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(equipment)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(equipment.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No equipment available</td>
            </tr>
          )}
        </tbody>
      </table>

      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Equipment</h2>
            <form onSubmit={handleEditSubmit}>
              <label>Equipment Name</label>
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

              <label>Available</label>
              <input
                type="checkbox"
                checked={editedEquipment.isAvailable}
                onChange={(e) =>
                  setEditedEquipment({ ...editedEquipment, isAvailable: e.target.checked })
                }
              />

              <label>Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange} // Handle image file change
              />

              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewEquipment;
