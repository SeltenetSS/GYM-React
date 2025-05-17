
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./ViewSchedule.css";

// const ViewSchedule = () => {
//   const [schedules, setSchedules] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Modal və form üçün state
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     id: 0,
//     dayOfWeek: "Monday",
//     startHour: "09",
//     startMinute: "00",
//     endHour: "10",
//     endMinute: "00",
//     description: "",
//   });

//   useEffect(() => {
//     fetchSchedules();
//   }, []);

//   const fetchSchedules = async () => {
//     try {
//       const response = await axios.get("https://localhost:7054/api/TrainerSchedule", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setSchedules(response.data);
//     } catch (error) {
//       console.error("Cədvəllər alınarkən xəta:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Silmək istədiyinizə əminsiniz?")) return;

//     try {
//       await axios.delete(`https://localhost:7054/api/TrainerSchedule/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setSchedules(schedules.filter((s) => s.id !== id));
//     } catch (error) {
//       console.error("Silinərkən xəta:", error);
//     }
//   };

//   // Update üçün modal açan funksiya
//   const handleEdit = (schedule) => {
//     const [startHour, startMinute] = schedule.startTime.split(":");
//     const [endHour, endMinute] = schedule.endTime.split(":");

//     setFormData({
//       id: schedule.id,
//       dayOfWeek: schedule.dayOfWeek,
//       startHour,
//       startMinute,
//       endHour,
//       endMinute,
//       description: schedule.description || "",
//     });

//     setIsModalOpen(true);
//   };

//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();

//     const dto = {
//       id: formData.id,
//       dayOfWeek: formData.dayOfWeek,
//       startTime: { hour: parseInt(formData.startHour), minute: parseInt(formData.startMinute) },
//       endTime: { hour: parseInt(formData.endHour), minute: parseInt(formData.endMinute) },
//       description: formData.description,
//     };

//     try {
//       await axios.put("https://localhost:7054/api/TrainerSchedule", dto, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       await fetchSchedules();
//       setIsModalOpen(false);
//     } catch (error) {
//       alert("Yeniləmə zamanı xəta baş verdi: " + (error.response?.data || error.message));
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   if (loading) return <div className="loading">Yüklənir...</div>;

//   return (
//     <div className="schedule-container">
//       <h2>Mövcud Cədvəllər</h2>
//       <table className="schedule-table">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Trener</th>
//             <th>Qrup</th>
//             <th>İstifadəçi</th>
//             <th>Həftənin günü</th>
//             <th>Başlama</th>
//             <th>Bitmə</th>
//             <th>Açıqlama</th>
//             <th>Əməliyyat</th>
//           </tr>
//         </thead>
//         <tbody>
//           {schedules.map((s, index) => (
//             <tr key={s.id}>
//               <td>{index + 1}</td>
//               <td>{s.trainerName}</td>
//               <td>{s.groupName || "-"}</td>
//               <td>{s.userName || "-"}</td>
//               <td>{s.dayOfWeek}</td>
//               <td>{s.startTime}</td>
//               <td>{s.endTime}</td>
//               <td>{s.description || "-"}</td>
//               <td>
//                 <button onClick={() => handleEdit(s)}>Update</button>
//                 <button onClick={() => handleDelete(s.id)} className="delete">
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Modal - yalnız isModalOpen true olanda göstərilir */}
//       {isModalOpen && (
//         <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <h3>Cədvəli Yenilə</h3>
//             <form onSubmit={handleUpdateSubmit}>
//               <label>
//                 Gün:
//                 <select name="dayOfWeek" value={formData.dayOfWeek} onChange={handleChange}>
//                   {[
//                     "Monday",
//                     "Tuesday",
//                     "Wednesday",
//                     "Thursday",
//                     "Friday",
//                     "Saturday",
//                     "Sunday",
//                   ].map((day) => (
//                     <option key={day} value={day}>
//                       {day}
//                     </option>
//                   ))}
//                 </select>
//               </label>

//               <label>
//                 Başlama Saatı:
//                 <input
//                   name="startHour"
//                   type="number"
//                   min="0"
//                   max="23"
//                   value={formData.startHour}
//                   onChange={handleChange}
//                   required
//                 />{" "}
//                 :
//                 <input
//                   name="startMinute"
//                   type="number"
//                   min="0"
//                   max="59"
//                   value={formData.startMinute}
//                   onChange={handleChange}
//                   required
//                 />
//               </label>

//               <label>
//                 Bitmə Saatı:
//                 <input
//                   name="endHour"
//                   type="number"
//                   min="0"
//                   max="23"
//                   value={formData.endHour}
//                   onChange={handleChange}
//                   required
//                 />{" "}
//                 :
//                 <input
//                   name="endMinute"
//                   type="number"
//                   min="0"
//                   max="59"
//                   value={formData.endMinute}
//                   onChange={handleChange}
//                   required
//                 />
//               </label>

//               <label>
//                 Açıqlama:
//                 <input
//                   name="description"
//                   type="text"
//                   value={formData.description}
//                   onChange={handleChange}
//                 />
//               </label>

//               <div className="modal-buttons">
//                 <button type="submit">Yenilə</button>
//                 <button type="button" onClick={() => setIsModalOpen(false)}>
//                   Bağla
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewSchedule;



import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewSchedule.css";

const ViewSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [formData, setFormData] = useState({
    id: 0,
    dayOfWeek: "Monday",
    startHour: "09",
    startMinute: "00",
    endHour: "10",
    endMinute: "00",
    description: ""
  });

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get("https://localhost:7054/api/TrainerSchedule", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSchedules(response.data);
    } catch (error) {
      console.error("Cədvəllər alınarkən xəta:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Silmək istədiyinizə əminsiniz?")) return;

    try {
      await axios.delete(`https://localhost:7054/api/TrainerSchedule/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSchedules(schedules.filter(s => s.id !== id));
    } catch (error) {
      console.error("Silinərkən xəta:", error);
    }
  };

  const handleEdit = (schedule) => {
    setEditingSchedule(schedule.id);
    const [startHour, startMinute] = schedule.startTime.split(":");
    const [endHour, endMinute] = schedule.endTime.split(":");
    setFormData({
      id: schedule.id,
      dayOfWeek: schedule.dayOfWeek,
      startHour,
      startMinute,
      endHour,
      endMinute,
      description: schedule.description || ""
    });
  };

 const handleUpdateSubmit = async (e) => {
  e.preventDefault();

  // Saat və dəqiqələri birləşdirib "HH:mm" formatına çeviririk
  const formatTime = (hour, minute) => {
    const h = hour.toString().padStart(2, '0');
    const m = minute.toString().padStart(2, '0');
    return `${h}:${m}`;
  };

  const dto = {
    id: formData.id,
    dayOfWeek: formData.dayOfWeek,
    startTime: formatTime(formData.startHour, formData.startMinute),
    endTime: formatTime(formData.endHour, formData.endMinute),
    description: formData.description,
  };

  console.log("Göndərilən DTO:", dto);

  try {
    await axios.put("https://localhost:7054/api/TrainerSchedule", dto, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    await fetchSchedules();
    setEditingSchedule(null);
  } catch (error) {
    console.error("Yeniləmə zamanı xəta:", error.response?.data || error.message);
    alert("Yeniləmə zamanı xəta baş verdi: " + JSON.stringify(error.response?.data || error.message));
  }
};


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="loading">Yüklənir...</div>;

  return (
    <div className="schedule-container">
      <h2>Mövcud Cədvəllər</h2>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Trener</th>
            <th>Qrup</th>
            <th>İstifadəçi</th>
            <th>Həftənin günü</th>
            <th>Başlama</th>
            <th>Bitmə</th>
            <th>Açıqlama</th>
            <th>Əməliyyat</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((s, index) => (
            <tr key={s.id}>
              <td>{index + 1}</td>
              <td>{s.trainerName}</td>
              <td>{s.groupName || "-"}</td>
              <td>{s.userName || "-"}</td>
              <td>{s.dayOfWeek}</td>
              <td>{s.startTime}</td>
              <td>{s.endTime}</td>
              <td>{s.description || "-"}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Update</button>
                <button onClick={() => handleDelete(s.id)} className="delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingSchedule && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form className="update-form" onSubmit={handleUpdateSubmit}>
              <h3>Cədvəli Yenilə</h3>
              <label>
                Gün:
                {/* <select name="dayOfWeek" value={formData.dayOfWeek} onChange={handleChange}>
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select> */}

<select
  name="dayOfWeek"
  value={formData.dayOfWeek}
  onChange={(e) =>
    setFormData({
      ...formData,
      dayOfWeek: e.target.value,
    })
  }
>
  {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
    <option key={day} value={day}>{day}</option>
  ))}
</select>

              </label>

              <label>
                Başlama Saatı:
                <input
                  name="startHour"
                  type="number"
                  min="0"
                  max="23"
                  value={formData.startHour}
                  onChange={handleChange}
                /> :
                <input
                  name="startMinute"
                  type="number"
                  min="0"
                  max="59"
                  value={formData.startMinute}
                  onChange={handleChange}
                />
              </label>

              <label>
                Bitmə Saatı:
                <input
                  name="endHour"
                  type="number"
                  min="0"
                  max="23"
                  value={formData.endHour}
                  onChange={handleChange}
                /> :
                <input
                  name="endMinute"
                  type="number"
                  min="0"
                  max="59"
                  value={formData.endMinute}
                  onChange={handleChange}
                />
              </label>

              <label>
                Açıqlama:
                <input
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </label>

              <div className="modal-buttons">
                <button type="submit">Yenilə</button>
                <button type="button" onClick={() => setEditingSchedule(null)}>Bağla</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewSchedule;
