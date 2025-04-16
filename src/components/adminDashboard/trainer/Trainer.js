import React from "react";
import { FaPlus, FaEye, FaCheck } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import styles from "./Trainer.module.css"; 

const Trainer = () => {
  const history = useHistory();

  const handleAddTrainer = () => history.push("/admin-dashboard/trainer/add-trainer");
  const handleViewTrainer = () => history.push("/admin-dashboard/trainer/view-trainer");
  const handleApproveTrainer = () => history.push("/admin-dashboard/trainer/approve-trainer");

  return (
    <div className={styles.trainerCardsContainer}>
      <div className={styles.trainerCard} onClick={handleAddTrainer}>
        <div className={styles.trainerCardIcon}>
          <FaPlus size={30} />
        </div>
        <div className={styles.trainerCardTitle}>Add Trainer</div>
      </div>

      <div className={styles.trainerCard} onClick={handleViewTrainer}>
        <div className={styles.trainerCardIcon}>
          <FaEye size={30} />
        </div>
        <div className={styles.trainerCardTitle}>View Trainer</div>
      </div>

      <div className={styles.trainerCard} onClick={handleApproveTrainer}>
        <div className={styles.trainerCardIcon}>
          <FaCheck size={30} />
        </div>
        <div className={styles.trainerCardTitle}>Approve Trainer</div>
      </div>
    </div>
  );
};

export default Trainer;
