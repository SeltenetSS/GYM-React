

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Select from "react-select";
// import {
//   Accordion,
//   AccordionItem,
//   AccordionItemHeading,
//   AccordionItemButton,
//   AccordionItemPanel,
// } from "react-accessible-accordion";
// import "react-accessible-accordion/dist/fancy-example.css";
// import "./ViewWorkout.css";

// const ViewWorkout = () => {
//   const [plans, setPlans] = useState([]);
//   const [trainers, setTrainers] = useState([]);
//   const [packagesList, setPackagesList] = useState([]);
//   const [equipmentOptions, setEquipmentOptions] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [currentPlan, setCurrentPlan] = useState(null);
//   const [editedPlan, setEditedPlan] = useState({
//     title: "",
//     description: "",
//     trainerId: null,
//     days: [],
//     packageIds: [],
//   });

//   const token = localStorage.getItem("token");
//   const authHeader = { headers: { Authorization: `Bearer ${token}` } };

//   useEffect(() => {
//     async function fetchAll() {
//       const [plansRes, trainersRes, packagesRes, equipRes] = await Promise.all([
//         axios.get("https://localhost:7054/api/WorkoutPlan", authHeader),
//         axios.get("https://localhost:7054/api/Admin/trainers", authHeader),
//         axios.get("https://localhost:7054/api/Package/packages", authHeader),
//         axios.get("https://localhost:7054/api/Equipment/equipments", authHeader),
//       ]);
//       setPlans(plansRes.data);
//       setTrainers(trainersRes.data);
//       setPackagesList(packagesRes.data);
//       setEquipmentOptions(equipRes.data.map(eq => ({ value: eq.id, label: eq.name })));
//     }
//     fetchAll();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Bu workout planını silmək istədiyinizə əminsiniz?")) return;
//     await axios.delete(`https://localhost:7054/api/WorkoutPlan/${id}`, authHeader);
//     setPlans(p => p.filter(x => x.id !== id));
//   };

//   const handleEdit = (plan) => {
//     setCurrentPlan(plan);
//     const daysDto = plan.days.map(day => ({
//       dayNumber: day.dayNumber,
//       exercises: day.exercises.map(ex => ({
//         equipmentId: ex.equipmentId,
//         equipmentName: ex.equipmentName,
//         repetitions: ex.repetitions,
//         duration: ex.duration,
//       })),
//     }));
//     const packageIdsDto = (plan.packageWorkouts || []).map(pw => pw.packageId);
//     setEditedPlan({
//       title: plan.title,
//       description: plan.description,
//       trainerId: plan.trainerId,
//       days: daysDto,
//       packageIds: packageIdsDto,
//     });
//     setIsEditModalOpen(true);
//   };

//   const handleExerciseChange = (dayIdx, exIdx, field, value) => {
//     const updatedDays = [...editedPlan.days];
//     updatedDays[dayIdx].exercises[exIdx][field] = value;
//     setEditedPlan({ ...editedPlan, days: updatedDays });
//   };

//   const handleEquipmentSelect = (dayIdx, exIdx, option) => {
//     const updatedDays = [...editedPlan.days];
//     updatedDays[dayIdx].exercises[exIdx].equipmentId = option.value;
//     updatedDays[dayIdx].exercises[exIdx].equipmentName = option.label;
//     setEditedPlan({ ...editedPlan, days: updatedDays });
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     const dto = { ...editedPlan };
//     await axios.put(
//       `https://localhost:7054/api/WorkoutPlan/${currentPlan.id}`,
//       dto,
//       authHeader
//     );
//     setIsEditModalOpen(false);
//     const fresh = await axios.get("https://localhost:7054/api/WorkoutPlan", authHeader);
//     setPlans(fresh.data);
//     alert("Plan uğurla yeniləndi.");
//   };

//   const trainerOptions = trainers.map(t => ({ value: t.id, label: t.name }));
//   const packageOptions = packagesList.map(p => ({ value: p.id, label: p.packageName }));

//   return (
//     <div className="viewworkout-container">
//       <h2>Workout Planlarını Görüntüle</h2>
//       <Accordion allowZeroExpanded>
//         {plans.map(plan => (
//           <AccordionItem key={plan.id} uuid={plan.id}>
//             <AccordionItemHeading>
//               <AccordionItemButton>{plan.title}</AccordionItemButton>
//             </AccordionItemHeading>
//             <AccordionItemPanel>
//               <div className="plan-details">
//                 <p><strong>Açıqlama:</strong> {plan.description}</p>
//                 <p>
//                   <strong>Trainer:</strong>{" "}
//                   {trainerOptions.find(o => o.value === plan.trainerId)?.label || plan.trainerId}
//                 </p>
//                 <div className="days-list">
//                   {plan.days.map(day => (
//                     <div key={day.dayNumber} className="day-card">
//                       <h3>Gün {day.dayNumber}</h3>
//                       <div className="exercises">
//                         {day.exercises.length === 0 
//                           ? <p>Bu gündə məşq yoxdur</p> 
//                           : day.exercises.map((ex, i) => (
//                             <div key={i} className="exercise-card">
//                               <p><strong>Avadanlıq:</strong> {ex.equipmentName}</p>
//                               <p><strong>Repetisiya:</strong> {ex.repetitions}</p>
//                               <p><strong>Müddət:</strong> {ex.duration}</p>
//                             </div>
//                           ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="action-buttons">
//                   <button className="btn-update" onClick={() => handleEdit(plan)}>Yenilə</button>
//                   <button className="btn-delete" onClick={() => handleDelete(plan.id)}>Sil</button>
//                 </div>
//               </div>
//             </AccordionItemPanel>
//           </AccordionItem>
//         ))}
//       </Accordion>

//       {isEditModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h2>Workout Planı Redaktə Et</h2>
//             <form onSubmit={handleEditSubmit}>
//               <label>Başlıq</label>
//               <input
//                 type="text"
//                 value={editedPlan.title}
//                 onChange={e => setEditedPlan({...editedPlan, title: e.target.value})}
//               />

//               <label>Açıqlama</label>
//               <textarea
//                 value={editedPlan.description}
//                 onChange={e => setEditedPlan({...editedPlan, description: e.target.value})}
//               />

//               <label>Trainer</label>
//               <Select
//                 options={trainerOptions}
//                 value={trainerOptions.find(o => o.value === editedPlan.trainerId)}
//                 onChange={opt => setEditedPlan({...editedPlan, trainerId: opt.value})}
//               />

//               <label>Plan Paketləri</label>
//               <Select
//                 isMulti
//                 options={packageOptions}
//                 value={packageOptions.filter(o => editedPlan.packageIds.includes(o.value))}
//                 onChange={opts => setEditedPlan({
//                   ...editedPlan,
//                   packageIds: opts.map(o => o.value)
//                 })}
//               />

//               <label>Günlər və Məşqlər</label>
//               {editedPlan.days.map((day, dIdx) => (
//                 <div key={dIdx} className="edit-day-block">
//                   <h4>Gün {day.dayNumber}</h4>
//                   {day.exercises.map((ex, exIdx) => (
//                     <div key={exIdx} className="edit-exercise-row">
//                       <Select
//                         className="select-equipment"
//                         options={equipmentOptions}
//                         value={equipmentOptions.find(o => o.value === ex.equipmentId)}
//                         onChange={opt => handleEquipmentSelect(dIdx, exIdx, opt)}
//                       />
//                       <input
//                         type="number"
//                         min="1"
//                         value={ex.repetitions}
//                         onChange={e => handleExerciseChange(dIdx, exIdx, "repetitions", parseInt(e.target.value))}
//                         placeholder="Repetisiya"
//                       />
//                       <input
//                         type="text"
//                         value={ex.duration}
//                         onChange={e => handleExerciseChange(dIdx, exIdx, "duration", e.target.value)}
//                         placeholder="Müddət (hh:mm:ss)"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               ))}

//               <div className="modal-buttons">
//                 <button type="submit">Yadda saxla</button>
//                 <button type="button" onClick={() => setIsEditModalOpen(false)}>Ləğv et</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewWorkout;




////////////////////////////////////////////////



import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import "./ViewWorkout.css";

const ViewWorkout = () => {
  const [plans, setPlans] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [packagesList, setPackagesList] = useState([]);
  const [equipmentOptions, setEquipmentOptions] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [editedPlan, setEditedPlan] = useState({
    title: "",
    description: "",
    trainerId: null,
    days: [],
    packageIds: [],
  });

  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    async function fetchAll() {
      const [plansRes, trainersRes, packagesRes, equipRes] = await Promise.all([
        axios.get("https://localhost:7054/api/WorkoutPlan", authHeader),
        axios.get("https://localhost:7054/api/Admin/trainers", authHeader),
        axios.get("https://localhost:7054/api/Package/packages", authHeader),
        axios.get("https://localhost:7054/api/Equipment/equipments", authHeader),
      ]);
      setPlans(plansRes.data);
      setTrainers(trainersRes.data);
      setPackagesList(packagesRes.data);
      setEquipmentOptions(
        equipRes.data.map((eq) => ({ value: eq.name, label: eq.name }))
      );
    }
    fetchAll();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bu workout planını silmək istədiyinizə əminsiniz?")) return;
    await axios.delete(`https://localhost:7054/api/WorkoutPlan/${id}`, authHeader);
    setPlans((p) => p.filter((x) => x.id !== id));
  };

  const handleEdit = (plan) => {
    setCurrentPlan(plan);
    const daysDto = plan.days.map((day) => ({
      dayNumber: day.dayNumber,
      exercises: day.exercises.map((ex) => ({
        equipmentName: ex.equipmentName,
        repetitions: ex.repetitions,
        duration: ex.duration,
      })),
    }));
    const packageIdsDto = (plan.packageWorkouts || []).map((pw) => pw.packageId);
    setEditedPlan({
      title: plan.title,
      description: plan.description,
      trainerId: plan.trainerId,
      days: daysDto,
      packageIds: packageIdsDto,
    });
    setIsEditModalOpen(true);
  };

  const handleExerciseChange = (dayIdx, exIdx, field, value) => {
    const updatedDays = [...editedPlan.days];
    updatedDays[dayIdx].exercises[exIdx][field] = value;
    setEditedPlan({ ...editedPlan, days: updatedDays });
  };

  const handleEquipmentSelect = (dayIdx, exIdx, option) => {
    const updatedDays = [...editedPlan.days];
    updatedDays[dayIdx].exercises[exIdx].equipmentName = option.value;
    setEditedPlan({ ...editedPlan, days: updatedDays });
  };

 const handleEditSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.put(
      `https://localhost:7054/api/WorkoutPlan/${currentPlan.id}`,
      editedPlan,
      authHeader
    );
    setIsEditModalOpen(false);
    const fresh = await axios.get("https://localhost:7054/api/WorkoutPlan", authHeader);
    
    setPlans(fresh.data);
    alert("Plan uğurla yeniləndi.");
  } catch (error) {
    console.error("Update error:", error.response?.data || error.message);
    alert("Yeniləmə zamanı xəta baş verdi. Detalları console-da yoxla.");
  }
};


  const trainerOptions = trainers.map((t) => ({ value: t.id, label: t.name }));
  const packageOptions = packagesList.map((p) => ({ value: p.id, label: p.packageName }));

  return (
    <div className="viewworkout-container">
      <h2>Workout Planlarını Görüntüle</h2>
      <Accordion allowZeroExpanded>
        {plans.map((plan) => (
          <AccordionItem key={plan.id} uuid={plan.id}>
            <AccordionItemHeading>
              <AccordionItemButton>{plan.title}</AccordionItemButton>
            </AccordionItemHeading>
      <AccordionItemPanel>
  <div className="plan-details">
    <p>
      <strong>Açıqlama:</strong> {plan.description}
    </p>
    <p>
      <strong>Trainer:</strong>{" "}
      {trainerOptions.find((o) => o.value === plan.trainerId)?.label ||
        plan.trainerId}
    </p>
     <p>
      <strong>Mesq Paketi:</strong>{" "}
      {packageOptions.find((p) => p.value === plan.packageId)?.label ||
        plan.packageId}
    </p>
 

    <div className="days-list">
      {plan.days.map((day) => (
        <div key={day.dayNumber} className="day-card">
          <h3>Gün {day.dayNumber}</h3>
          <div className="exercises">
            {day.exercises.length === 0 ? (
              <p>Bu gündə məşq yoxdur</p>
            ) : (
              day.exercises.map((ex, i) => (
                <div key={i} className="exercise-card">
                  <p>
                    <strong>Avadanlıq:</strong> {ex.equipmentName}
                  </p>
                  <p>
                    <strong>Repetisiya:</strong> {ex.repetitions}
                  </p>
                  <p>
                    <strong>Müddət:</strong> {ex.duration}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
    <div className="action-buttons">
      <button
        className="btn-update"
        onClick={() => handleEdit(plan)}
      >
        Yenilə
      </button>
      <button
        className="btn-delete"
        onClick={() => handleDelete(plan.id)}
      >
        Sil
      </button>
    </div>
  </div>
</AccordionItemPanel>

          </AccordionItem>
        ))}
      </Accordion>

      {isEditModalOpen && (
        <div className="workoutupdate-overlay">
          <div className="workoutupdate-content">
            <h2>Workout Planı Redaktə Et</h2>
            <form onSubmit={handleEditSubmit}>
              <label>Başlıq</label>
              <input
                type="text"
                value={editedPlan.title}
                onChange={(e) =>
                  setEditedPlan({ ...editedPlan, title: e.target.value })
                }
              />

              <label>Açıqlama</label>
              <textarea
                value={editedPlan.description}
                onChange={(e) =>
                  setEditedPlan({ ...editedPlan, description: e.target.value })
                }
              />

              <label>Trainer</label>
              <Select
                options={trainerOptions}
                value={trainerOptions.find(
                  (o) => o.value === editedPlan.trainerId
                )}
                onChange={(opt) =>
                  setEditedPlan({ ...editedPlan, trainerId: opt.value })
                }
              />

                <label>Package Name </label>
              <Select
                options={packageOptions}
                value={packageOptions.find(
                  (p) => p.value === editedPlan.packageId
                )}
                onChange={(opt) =>
                  setEditedPlan({ ...editedPlan, packageId: opt.value })
                }
              />


              {/* <label>Plan Paketləri</label>
              <Select
                isMulti
                options={packageOptions}
                value={packageOptions.filter((o) =>
                  editedPlan.packageIds.includes(o.value)
                )}
                onChange={(opts) =>
                  setEditedPlan({
                    ...editedPlan,
                    packageIds: opts.map((o) => o.value),
                  })
                }
              /> */}

              <label>Günlər və Məşqlər</label>
              {editedPlan.days.map((day, dIdx) => (
                <div key={dIdx} className="edit-day-block">
                  <h4>Gün {day.dayNumber}</h4>
                  {day.exercises.map((ex, exIdx) => (
                    <div key={exIdx} className="edit-exercise-row">
                      <Select
                        className="select-equipment"
                        options={equipmentOptions}
                        value={equipmentOptions.find(
                          (o) => o.value === ex.equipmentName
                        )}
                        onChange={(opt) =>
                          handleEquipmentSelect(dIdx, exIdx, opt)
                        }
                      />
                      <input
                        type="number"
                        min="1"
                        value={ex.repetitions}
                        onChange={(e) =>
                          handleExerciseChange(
                            dIdx,
                            exIdx,
                            "repetitions",
                            parseInt(e.target.value)
                          )
                        }
                        placeholder="Repetisiya"
                      />
                      <input
                        type="text"
                        value={ex.duration}
                        onChange={(e) =>
                          handleExerciseChange(
                            dIdx,
                            exIdx,
                            "duration",
                            e.target.value
                          )
                        }
                        placeholder="Müddət (hh:mm:ss)"
                      />
                    </div>
                  ))}
                </div>
              ))}

              <div className="modal-buttons">
                <button type="submit">Yadda saxla</button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Ləğv et
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewWorkout;
