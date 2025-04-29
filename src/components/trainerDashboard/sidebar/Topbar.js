// import React from 'react'
// import { Icon } from '@iconify/react';
// import profile from '../../../assets/profile.png'

// const Topbar = () => {
//   return (
//     <div className="topbar">
//       <div className="searchBar col-6" role="search">
//         <input className="px-2 col-10" type="search" placeholder="Search" aria-label="Search" />
//         <button className="btnSearch col-2 col-lg-auto" type="submit" ><Icon icon="eva:search-outline" /></button>
//       </div>
//       <div className="profile">
//         <img src={profile} alt="profile" />
//         <div className="nameProfile">
//           <span className="name">Someone</span>
//           <span className="level">Trainer</span>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Topbar


import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import defaultProfile from '../../../assets/profile.png'; 
import axios from 'axios';

const Topbar = () => {
  const [trainerData, setTrainerData] = useState(null);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const response = await axios.get("https://localhost:7054/api/Trainer/trainer-profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTrainerData(response.data);
      } catch (error) {
        console.error("Trainer məlumatı gətirilə bilmədi:", error);
      }
    };

    fetchTrainer();
  }, []);

  return (
    <div className="topbar">
      <div className="searchBar col-6" role="search">
        <input className="px-2 col-10" type="search" placeholder="Search" aria-label="Search" />
        <button className="btnSearch col-2 col-lg-auto" type="submit">
          <Icon icon="eva:search-outline" />
        </button>
      </div>

      <div className="profile">
        <img
          src={trainerData?.imageUrl ? trainerData.imageUrl : defaultProfile}
          alt="profile"
        />
        <div className="nameProfile">
          <span className="name">{trainerData?.name || "Trainer"}</span>
          <span className="level">Trainer</span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
