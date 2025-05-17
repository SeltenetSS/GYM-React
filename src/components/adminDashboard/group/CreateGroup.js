// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./CreateGroup.css";
// const CreateGroup = () => {
//   const [groupName, setGroupName] = useState("");
//   const [packages, setPackages] = useState([]);
//   const [selectedPackageId, setSelectedPackageId] = useState("");

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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = {
//         name: groupName,
//         packageId: parseInt(selectedPackageId),
//       };

//       await axios.post("https://localhost:7054/api/Group", data, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       alert("Group created successfully!");
//       setGroupName("");
//       setSelectedPackageId("");
//     } catch (error) {
//       console.error("Error creating group:", error);
//       alert("Group creation failed!");
//     }
//   };

//   return (
//     <div className="create-group-container">
//       <h2>Create Group</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Group Name:</label>
//           <input
//             type="text"
//             value={groupName}
//             onChange={(e) => setGroupName(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label>Select Package:</label>
//           <select
//             value={selectedPackageId}
//             onChange={(e) => setSelectedPackageId(e.target.value)}
//             required
//           >
//             <option value="">-- Select Package --</option>
//             {packages.map((pkg) => (
//               <option key={pkg.id} value={pkg.id}>
//                 • {pkg.packageName} - {pkg.price} AZN / {pkg.durationInMonths} ay
//               </option>
//             ))}
//           </select>
//         </div>

//         <button type="submit">Create Group</button>
//       </form>
//     </div>
//   );
// };

// export default CreateGroup;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CreateGroup.css";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [packages, setPackages] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [selectedTrainerId, setSelectedTrainerId] = useState("");

  useEffect(() => {
    fetchPackages();
    fetchTrainers();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: groupName,
        packageId: parseInt(selectedPackageId),
        trainerId: parseInt(selectedTrainerId),
      };

      await axios.post("https://localhost:7054/api/Group", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Group created successfully!");
      setGroupName("");
      setSelectedPackageId("");
      setSelectedTrainerId("");
    } catch (error) {
      console.error("Error creating group:", error);
      alert("Group creation failed!");
    }
  };

  return (
    <div className="create-group-container">
      <h2>Create Group</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Group Name:</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Select Package:</label>
          <select
            value={selectedPackageId}
            onChange={(e) => setSelectedPackageId(e.target.value)}
            required
          >
            <option value="">-- Select Package --</option>
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                • {pkg.packageName} - {pkg.price} AZN / {pkg.durationInMonths} ay
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Select Trainer:</label>
          <select
            value={selectedTrainerId}
            onChange={(e) => setSelectedTrainerId(e.target.value)}
            required
          >
            <option value="">-- Select Trainer --</option>
            {trainers.map((trainer) => (
              <option key={trainer.id} value={trainer.id}>
                {trainer.name} {trainer.lastName}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Create Group</button>
      </form>
    </div>
  );
};

export default CreateGroup;
