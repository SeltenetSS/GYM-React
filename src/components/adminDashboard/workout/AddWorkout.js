


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Select from "react-select";
// import "./AddWorkout.css";

// const AddWorkout = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [trainerId, setTrainerId] = useState(null);
//   const [selectedPackages, setSelectedPackages] = useState([]);
//   const [days, setDays] = useState([
//     {
//       dayNumber: 1,
//       exercises: [{ equipment: [], repetitions: 0, duration: "00:00:00" }]
//     }
//   ]);
//   const [deletedDays, setDeletedDays] = useState([]);

//   const [trainers, setTrainers] = useState([]);
//   const [packages, setPackages] = useState([]);
//   const [equipmentOptions, setEquipmentOptions] = useState([]);

//   useEffect(() => {
//     fetchTrainers();
//     fetchPackages();
//     fetchEquipment();
//   }, []);

//   const fetchTrainers = async () => {
//     try {
//       const res = await axios.get("https://localhost:7054/api/Admin/trainers", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//       });
//       setTrainers(res.data);
//     } catch (err) {
//       console.error("Error fetching trainers:", err);
//     }
//   };

//   const fetchPackages = async () => {
//     try {
//       const res = await axios.get("https://localhost:7054/api/Package/packages", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//       });
//       setPackages(res.data);
//     } catch (err) {
//       console.error("Error fetching packages:", err);
//     }
//   };

//   const fetchEquipment = async () => {
//     try {
//       const res = await axios.get("https://localhost:7054/api/Equipment/equipments", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//       });
//       const options = res.data.map(eq => ({ value: eq.id, label: eq.name }));
//       setEquipmentOptions(options);
//     } catch (err) {
//       console.error("Error fetching equipment:", err);
//     }
//   };

//   const addDay = () => {
//     const newDay = {
//       dayNumber: days.length + 1,
//       exercises: [{ equipment: [], repetitions: 0, duration: "00:00:00" }]
//     };
//     setDays([...days, newDay]);
//   };

//   const addExercise = (dayIndex) => {
//     const newDays = [...days];
//     newDays[dayIndex].exercises.push({
//       equipment: [],
//       repetitions: 0,
//       duration: "00:00:00"
//     });
//     setDays(newDays);
//   };

//   const handleExerciseChange = (dayIndex, exIndex, field, value) => {
//     const newDays = [...days];
//     if (field === "repetitions") {
//       const intValue = parseInt(value, 10);
//       if (isNaN(intValue) || intValue < 1) return;
//       newDays[dayIndex].exercises[exIndex][field] = intValue;
//     } else if (field === "duration") {
//       newDays[dayIndex].exercises[exIndex][field] = value;
//     }
//     setDays(newDays);
//   };

//   const handleEquipmentChange = (dayIndex, exIndex, selectedOptions) => {
//     const newDays = [...days];
//     const selected = selectedOptions[0];
//     if (selected) {
//       newDays[dayIndex].exercises[exIndex].equipment = [selected.value];
//       newDays[dayIndex].exercises[exIndex].equipmentName = selected.label;
//     }
//     setDays(newDays);
//   };

//   const handlePackageChange = (selectedOptions) => {
//     const selectedIds = selectedOptions ? selectedOptions.map((pkg) => pkg.value) : [];
//     setSelectedPackages(selectedIds);
//   };

//   const removeDay = (dayIndex) => {
//     const removedDay = days[dayIndex];
//     setDeletedDays([...deletedDays, removedDay]);
//     setDays(days.filter((_, index) => index !== dayIndex));
//   };

//   const undoRemoveDay = () => {
//     if (deletedDays.length > 0) {
//       const lastDeletedDay = deletedDays[deletedDays.length - 1];
//       setDays([...days, lastDeletedDay]);
//       setDeletedDays(deletedDays.slice(0, -1));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation check for required fields
//     if (!title || !description || !trainerId) {
//       alert("Lütfen tüm alanları doldurduğunuzdan emin olun.");
//       return;
//     }

//     const formattedDays = days.map((day) => ({
//       dayNumber: day.dayNumber,
//       exercises: day.exercises.map((ex) => ({
//         equipmentId: ex.equipment[0],
//         equipmentName: ex.equipmentName,
//         repetitions: ex.repetitions,
//         duration: ex.duration
//       }))
//     }));

//     const workoutData = {
//       title,
//       description,
//       trainerId,
//       days: formattedDays,
//       packageIds: selectedPackages
//     };

//     try {
//       await axios.post("https://localhost:7054/api/WorkoutPlan", workoutData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//       });
//       alert("Məşq planı uğurla yaradıldı!");
//       setTitle("");
//       setDescription("");
//       setTrainerId(null);
//       setSelectedPackages([]);
//       setDays([{
//         dayNumber: 1,
//         exercises: [{ equipment: [], repetitions: 0, duration: "00:00:00" }]
//       }]);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const trainerOptions = trainers.map((trainer) => ({
//     value: trainer.id,
//     label: trainer.name
//   }));

//   const packageOptions = packages.map((pkg) => ({
//     value: pkg.id,
//     label: pkg.packageName
//   }));

//   return (
//     <div className="addworkout-container">
//       <h2 className="addworkout-title">Yeni Məşq Planı Əlavə Et</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="addworkout-form-group">
//           <label>Başlıq</label>
//           <input value={title} onChange={(e) => setTitle(e.target.value)} required />
//         </div>

//         <div className="addworkout-form-group">
//           <label>Açıqlama</label>
//           <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
//         </div>

//         <div className="addworkout-form-group">
//           <label>Trainer</label>
//           <Select
//             options={trainerOptions}
//             value={trainerOptions.find((t) => t.value === trainerId)}
//             onChange={(option) => setTrainerId(option?.value || null)}
//           />
//         </div>

//         <div className="addworkout-form-group">
//           <label>Plan Paketləri</label>
//           <Select
//             isMulti
//             options={packageOptions}
//             value={packageOptions.filter((p) => selectedPackages.includes(p.value))}
//             onChange={handlePackageChange}
//           />
//         </div>

//         <div className="addworkout-form-group">
//           <label>Günlər</label>
//           {days.map((day, dayIndex) => (
//             <div key={dayIndex} className="addworkout-day-block">
//               <div className="addworkout-day-header">
//                 <h3>Gün {day.dayNumber}</h3>
//                 <button type="button" className="remove-day-btn" onClick={() => removeDay(dayIndex)}>
//                   Günü Sil
//                 </button>
//               </div>

//               {day.exercises.map((exercise, exIndex) => (
//                 <div key={exIndex} className="addworkout-exercise">
//                   <div className="addworkout-form-group">
//                     <label>Avadanlıq</label>
//                     <Select
//                       options={equipmentOptions}
//                       value={equipmentOptions.find((eq) => eq.value === exercise.equipment[0])}
//                       onChange={(selectedOptions) => handleEquipmentChange(dayIndex, exIndex, selectedOptions)}
//                     />
//                   </div>
//                   <div className="addworkout-form-group">
//                     <label>Repetisiya</label>
//                     <input
//                       type="number"
//                       value={exercise.repetitions}
//                       onChange={(e) => handleExerciseChange(dayIndex, exIndex, "repetitions", e.target.value)}
//                     />
//                   </div>
//                   <div className="addworkout-form-group">
//                     <label>Vaxt</label>
//                     <input
//                       type="text"
//                       value={exercise.duration}
//                       onChange={(e) => handleExerciseChange(dayIndex, exIndex, "duration", e.target.value)}
//                     />
//                   </div>
//                 </div>
//               ))}

//               <button type="button" onClick={() => addExercise(dayIndex)}>Yeni Təkrarı Əlavə Et</button>
//             </div>
//           ))}

//           <button type="button" onClick={addDay}>Yeni Gün Əlavə Et</button>
//         </div>

//         <button type="submit" className="addworkout-submit">Yarad</button>
//       </form>

//       <button type="button" onClick={undoRemoveDay}>Son Silinən Günün Geri Alınması</button>
//     </div>
//   );
// };

// export default AddWorkout;






import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "./AddWorkout.css";

const AddWorkout = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [trainerId, setTrainerId] = useState(null);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [days, setDays] = useState([{ dayNumber: 1, exercises: [createEmptyExercise()] }]);
  const [deletedDays, setDeletedDays] = useState([]);

  const [trainers, setTrainers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [equipmentOptions, setEquipmentOptions] = useState([]);

  function createEmptyExercise() {
    return { equipment: [], equipmentName: "", repetitions: 0, duration: "00:00:00" };
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await Promise.all([fetchTrainers(), fetchPackages(), fetchEquipment()]);
  };

  const fetchTrainers = async () => {
    try {
      const { data } = await axios.get("https://localhost:7054/api/Admin/trainers", authHeader());
      setTrainers(data);
    } catch (err) {
      console.error("Trainer fetch error:", err);
    }
  };

  const fetchPackages = async () => {
    try {
      const { data } = await axios.get("https://localhost:7054/api/Package/packages", authHeader());
      setPackages(data);
    } catch (err) {
      console.error("Package fetch error:", err);
    }
  };

  const fetchEquipment = async () => {
    try {
      const { data } = await axios.get("https://localhost:7054/api/Equipment/equipments", authHeader());
      setEquipmentOptions(data.map(eq => ({ value: eq.id, label: eq.name })));
    } catch (err) {
      console.error("Equipment fetch error:", err);
    }
  };

  const authHeader = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

  const handleExerciseChange = (dayIndex, exIndex, field, value) => {
    const newDays = [...days];
    if (field === "repetitions") {
      const parsed = parseInt(value);
      if (!isNaN(parsed) && parsed > 0) newDays[dayIndex].exercises[exIndex][field] = parsed;
    } else {
      newDays[dayIndex].exercises[exIndex][field] = value;
    }
    setDays(newDays);
  };

  const handleEquipmentChange = (dayIndex, exIndex, selectedOption) => {
    const newDays = [...days];
    if (selectedOption) {
      newDays[dayIndex].exercises[exIndex].equipment = [selectedOption.value];
      newDays[dayIndex].exercises[exIndex].equipmentName = selectedOption.label;
    }
    setDays(newDays);
  };

  const addDay = () => setDays([...days, { dayNumber: days.length + 1, exercises: [createEmptyExercise()] }]);

  const addExercise = (dayIndex) => {
    const newDays = [...days];
    newDays[dayIndex].exercises.push(createEmptyExercise());
    setDays(newDays);
  };

  const removeDay = (index) => {
    const copy = [...days];
    setDeletedDays([...deletedDays, copy[index]]);
    setDays(copy.filter((_, i) => i !== index));
  };

  const undoRemoveDay = () => {
    if (deletedDays.length > 0) {
      const restored = deletedDays.pop();
      setDays([...days, restored]);
      setDeletedDays([...deletedDays]);
    }
  };

  const handlePackageChange = (selected) => setSelectedPackages(selected.map(pkg => pkg.value));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !trainerId) return alert("Zəhmət olmasa bütün sahələri doldurun.");

    const workoutData = {
      title,
      description,
      trainerId,
      days: days.map(day => ({
        dayNumber: day.dayNumber,
        exercises: day.exercises.map(ex => ({
          equipmentId: ex.equipment[0],
          equipmentName: ex.equipmentName,
          repetitions: ex.repetitions,
          duration: ex.duration
        }))
      })),
      packageIds: selectedPackages
    };

    try {
      await axios.post("https://localhost:7054/api/WorkoutPlan", workoutData, authHeader());
      alert("Məşq planı uğurla əlavə olundu!");
      resetForm();
    } catch (err) {
      console.error("Workout create error:", err);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTrainerId(null);
    setSelectedPackages([]);
    setDays([{ dayNumber: 1, exercises: [createEmptyExercise()] }]);
  };

  return (
    <div className="addworkout-container">
      <h2 className="addworkout-title">Yeni Məşq Planı Əlavə Et</h2>
      <form onSubmit={handleSubmit}>
        <div className="addworkout-form-group">
          <label>Başlıq</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="addworkout-form-group">
          <label>Açıqlama</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="addworkout-form-group">
          <label>Trainer</label>
          <Select
            options={trainers.map(t => ({ value: t.id, label: t.name }))}
            value={trainers.map(t => ({ value: t.id, label: t.name })).find(t => t.value === trainerId)}
            onChange={(option) => setTrainerId(option?.value || null)}
          />
        </div>
        <div className="addworkout-form-group">
          <label>Plan Paketləri</label>
          <Select
            isMulti
            options={packages.map(p => ({ value: p.id, label: p.packageName }))}
            value={packages.map(p => ({ value: p.id, label: p.packageName })).filter(p => selectedPackages.includes(p.value))}
            onChange={handlePackageChange}
          />
        </div>

        <div className="addworkout-form-group">
          <label>Günlər</label>
          {days.map((day, dayIndex) => (
            <div key={dayIndex} className="addworkout-day-block">
              <div className="addworkout-day-header">
                <h3>Gün {day.dayNumber}</h3>
                <button type="button" className="remove-day-btn" onClick={() => removeDay(dayIndex)}>Sil</button>
              </div>
              {day.exercises.map((exercise, exIndex) => (
                <div key={exIndex} className="addworkout-exercise">
                  <div className="addworkout-form-group">
                    <label>Avadanlıq</label>
                    <Select
                      options={equipmentOptions}
                      value={equipmentOptions.find(eq => eq.value === exercise.equipment[0])}
                      onChange={(option) => handleEquipmentChange(dayIndex, exIndex, option)}
                    />
                  </div>
                  <div className="addworkout-form-group">
                    <label>Təkrar</label>
                    <input type="number" value={exercise.repetitions} onChange={(e) => handleExerciseChange(dayIndex, exIndex, "repetitions", e.target.value)} />
                  </div>
                  <div className="addworkout-form-group">
                    <label>Vaxt</label>
                    <input type="text" value={exercise.duration} onChange={(e) => handleExerciseChange(dayIndex, exIndex, "duration", e.target.value)} />
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => addExercise(dayIndex)}>Təkrar Əlavə Et</button>
            </div>
          ))}
          <button type="button" onClick={addDay}>Yeni Gün Əlavə Et</button>
        </div>

        <button type="submit" className="addworkout-submit">Yarat</button>
      </form>
      <button type="button" onClick={undoRemoveDay}>Son Silinən Günü Geri Al</button>
    </div>
  );
};

export default AddWorkout;