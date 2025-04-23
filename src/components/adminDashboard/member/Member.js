import React from "react";
import { FaPlus, FaEye, FaCheck, FaIdBadge } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import styles from "./Member.module.css"; 
import SearchBar from "../sidebar/SearchBar";

const Member = () => {
  const history = useHistory();

  const handleAddMember = () => history.push("/admin-dashboard/member/add-member");
  const handleViewMember = () => history.push("/admin-dashboard/member/view-member");
  const handleApproveMember = () => history.push("/admin-dashboard/member/approve-member");
  const handleInfoMember = () => history.push("/admin-dashboard/member/info-member");

  return (
    <div className={styles.memberCardsContainer}>
      <div className={styles.memberCard} onClick={handleAddMember}>
        <div className={styles.memberCardIcon}>
          <FaPlus size={30} />
        </div>
        <div className={styles.memberCardTitle}>Add Member</div>
      </div>

      <div className={styles.memberCard} onClick={handleViewMember}>
        <div className={styles.memberCardIcon}>
          <FaEye size={30} />
        </div>
        <div className={styles.memberCardTitle}>View Member</div>
      </div>

      <div className={styles.memberCard} onClick={handleApproveMember}>
        <div className={styles.memberCardIcon}>
          <FaCheck size={30} />
        </div>
        <div className={styles.memberCardTitle}>Approve Member</div>
      </div>

      <div className={styles.memberCard} onClick={handleInfoMember}>
        <div className={styles.memberCardIcon}>
          <FaIdBadge size={30} />
        </div>
        <div className={styles.memberCardTitle}>Information Member</div>
      </div>
    </div>
  );
};

export default Member;
