



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
    </div>
  );
};

export default ViewWorkout;
