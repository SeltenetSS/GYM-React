

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./ViewPackage.css";

// const ViewPackage = () => {
//   const [packages, setPackages] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [currentPackage, setCurrentPackage] = useState(null);
//   const [editedPackage, setEditedPackage] = useState({
//     packageName: "",
//     description: "",
//     durationInMonths: 0,
//     price: 0,
//   });

//   useEffect(() => {
//     fetchPackages();
//   }, []);

//   const fetchPackages = async () => {
//     try {
//       const response = await axios.get("https://localhost:7054/api/Package/packages", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setPackages(response.data);
//     } catch (error) {
//       console.error("Error fetching packages:", error);
//     }
//   };

//   const handleEdit = (pkg) => {
//     setCurrentPackage(pkg);
//     setEditedPackage({
//       packageName: pkg.packageName,
//       description: pkg.description,
//       durationInMonths: pkg.durationInMonths,
//       price: pkg.price,
//     });
//     setIsEditModalOpen(true);
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `https://localhost:7054/api/Package/update-package/${currentPackage.id}`,
//         editedPackage,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       fetchPackages();
//       setIsEditModalOpen(false); 
//     } catch (error) {
//       console.error("Error updating package:", error);
//     }
//   };


//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this package?")) {
//       try {
//         const response = await axios.delete(`https://localhost:7054/api/Package/delete-package/${id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         if (response.status === 200) {
//           setPackages(packages.filter(pkg => pkg.id !== id));
//         }
//       } catch (error) {
//         console.error("Error deleting package:", error);
//       }
//     }
//   };
  
//   return (
//     <div className="package-wrapper">
//       <table className="package-table">
//       <thead>
//   <tr>
//     <th>ID</th> 
//     <th>Title</th>
//     <th>Description</th>
//     <th>Duration (Months)</th>
//     <th>Price</th>
//     <th>Actions</th>
//   </tr>
// </thead>

// <tbody>
//   {packages.map((pkg) => (
//     <tr key={pkg.id}>
//       <td>{pkg.id}</td> 
//       <td>{pkg.packageName}</td>
//       <td>{pkg.description}</td>
//       <td>{pkg.durationInMonths}</td>
//       <td>{pkg.price} ₼</td>
//       <td>
//       <div class="action-buttons">
//   <button class="action-icon edit" title="Edit"></button>
//   <button class="action-icon delete" title="Delete"></button>
// </div>

//       </td>
//     </tr>
//   ))}
// </tbody>

//       </table>

   
//       {isEditModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h2>Edit Package</h2>
//             <form onSubmit={handleEditSubmit}>
//               <label>Package Title</label>
//               <input
//                 type="text"
//                 value={editedPackage.packageName}
//                 onChange={(e) =>
//                   setEditedPackage({ ...editedPackage, packageName: e.target.value })
//                 }
//               />

//               <label>Description</label>
//               <textarea
//                 value={editedPackage.description}
//                 onChange={(e) =>
//                   setEditedPackage({ ...editedPackage, description: e.target.value })
//                 }
//               />

//               <label>Duration (Months)</label>
//               <input
//                 type="number"
//                 value={editedPackage.durationInMonths}
//                 onChange={(e) =>
//                   setEditedPackage({ ...editedPackage, durationInMonths: e.target.value })
//                 }
//               />

//               <label>Price</label>
//               <input
//                 type="number"
//                 value={editedPackage.price}
//                 onChange={(e) =>
//                   setEditedPackage({ ...editedPackage, price: e.target.value })
//                 }
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

// export default ViewPackage;





import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewPackage.css";

const ViewPackage = () => {
  const [packages, setPackages] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [editedPackage, setEditedPackage] = useState({
    packageName: "",
    description: "",
    durationInMonths: 0,
    price: 0,
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get("https://localhost:7054/api/Package/packages", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPackages(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  const handleEdit = (pkg) => {
    setCurrentPackage(pkg);
    setEditedPackage({
      packageName: pkg.packageName,
      description: pkg.description,
      durationInMonths: pkg.durationInMonths,
      price: pkg.price,
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://localhost:7054/api/Package/update-package/${currentPackage.id}`,
        editedPackage,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchPackages();
      setIsEditModalOpen(false); 
    } catch (error) {
      console.error("Error updating package:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        const response = await axios.delete(`https://localhost:7054/api/Package/delete-package/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          setPackages(packages.filter(pkg => pkg.id !== id));
        }
      } catch (error) {
        console.error("Error deleting package:", error);
      }
    }
  };

  return (
    <div className="package-wrapper">
      <table className="package-table">
        <thead>
          <tr>
            <th>ID</th> 
            <th>Title</th>
            <th>Description</th>
            <th>Duration (Months)</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.id}>
              <td>{pkg.id}</td> 
              <td>{pkg.packageName}</td>
              <td>{pkg.description}</td>
              <td>{pkg.durationInMonths}</td>
              <td>{pkg.price} ₼</td>
              <td>
                <div className="action-buttons">
                  <button
                    className="action-icon edit"
                    title="Edit"
                    onClick={() => handleEdit(pkg)}
                  >
                 
                  </button>
                  <button
                    className="action-icon delete"
                    title="Delete"
                    onClick={() => handleDelete(pkg.id)}
                  >
                 
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    {isEditModalOpen && (
  <div className="modal-overlay">
    <div className="view-package-edit-modal">
      <h2>Edit Package</h2>
      <form onSubmit={handleEditSubmit}>
        <label>Package Title</label>
        <input
          type="text"
          value={editedPackage.packageName}
          onChange={(e) =>
            setEditedPackage({ ...editedPackage, packageName: e.target.value })
          }
        />

        <label>Description</label>
        <textarea
          value={editedPackage.description}
          onChange={(e) =>
            setEditedPackage({ ...editedPackage, description: e.target.value })
          }
        />

        <label>Duration (Months)</label>
        <input
          type="number"
          value={editedPackage.durationInMonths}
          onChange={(e) =>
            setEditedPackage({ ...editedPackage, durationInMonths: e.target.value })
          }
        />

        <label>Price</label>
        <input
          type="number"
          value={editedPackage.price}
          onChange={(e) =>
            setEditedPackage({ ...editedPackage, price: e.target.value })
          }
        />

        <div className="edit-actions">
          <button type="submit">Save Changes</button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setIsEditModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default ViewPackage;
