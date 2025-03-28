// import React from 'react';
// import { FaPlus, FaEye, FaCheck } from 'react-icons/fa'; // İkonlar
// import { useHistory } from 'react-router-dom'; // React Router v5 - useHistory
// import "./Member.css"; // CSS faylının düzgün import edildiyini yoxla

// const Member = () => {
//   const history = useHistory(); // Keçid funksiyasını yaradıq

//   // Keçidlər
//   const handleAddMember = () => history.push("/add-member");
//   const handleViewMember = () => history.push("/view-member");
//   const handleApproveMember = () => history.push("/approve-member");

//   return (
//     <div className="member-cards-container">
//       {/* Add Member Card */}
//       <div className="card" onClick={handleAddMember}>
//         <div className="card-icon">
//           <FaPlus size={30} />
//         </div>
//         <div className="card-title">Add Member</div>
//       </div>

//       {/* View Member Card */}
//       <div className="card" onClick={handleViewMember}>
//         <div className="card-icon">
//           <FaEye size={30} />
//         </div>
//         <div className="card-title">View Member</div>
//       </div>

//       {/* Approve Member Card */}
//       <div className="card" onClick={handleApproveMember}>
//         <div className="card-icon">
//           <FaCheck size={30} />
//         </div>
//         <div className="card-title">Approve Member</div>
//       </div>
//     </div>
//   );
// };

// export default Member;



import React from "react";
import { FaPlus, FaEye, FaCheck } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import styles from "./Member.module.css"; // CSS modulu import et

const Member = () => {
  const history = useHistory();

  const handleAddMember = () => history.push("/admin-dashboard/member/add-member");
  const handleViewMember = () => history.push("/admin-dashboard/member/view-member");
  const handleApproveMember = () => history.push("/admin-dashboard/member/approve-member");

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
    </div>
  );
};

export default Member;
