import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import "./WorkoutUser.css";

const WorkoutUser = () => {
  const [plans, setPlans] = useState([]);

  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    async function fetchPlans() {
      try {
        const response = await axios.get("https://localhost:7054/api/WorkoutPlan", authHeader);
        setPlans(response.data);
      } catch (error) {
        console.error("Workout planları çəkilərkən xəta baş verdi:", error);
      }
    }

    fetchPlans();
  }, []);

  return (
    <div className="workoutuser-container">
      <h2>Workout Planları</h2>
      <Accordion allowZeroExpanded>
        {plans.map((plan) => (
          <AccordionItem key={plan.id} uuid={plan.id}>
            <AccordionItemHeading>
              <AccordionItemButton>{plan.title}</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="workoutuser-plan-details">
                <p><strong>Açıqlama:</strong> {plan.description}</p>
                <p><strong>Trainer ID:</strong> {plan.trainerId}</p>
                <p><strong>Paket ID:</strong> {plan.packageId}</p>

                <div className="workoutuser-days-list">
                  {plan.days.map((day) => (
                    <div key={day.dayNumber} className="workoutuser-day-card">
                      <h3>Gün {day.dayNumber}</h3>
                      <div className="workoutuser-exercises">
                        {day.exercises.length === 0 ? (
                          <p>Bu gündə məşq yoxdur</p>
                        ) : (
                          day.exercises.map((ex, i) => (
                            <div key={i} className="workoutuser-exercise-card">
                              <p><strong>Avadanlıq:</strong> {ex.equipmentName}</p>
                              <p><strong>Təkrar:</strong> {ex.repetitions}</p>
                              <p><strong>Müddət:</strong> {ex.duration}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default WorkoutUser;
