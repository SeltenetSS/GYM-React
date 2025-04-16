import React from 'react'
import { Icon } from '@iconify/react';
import profile from '../../../assets/profile.png'

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="searchBar col-6" role="search">
        <input className="px-2 col-10" type="search" placeholder="Search" aria-label="Search" />
        <button className="btnSearch col-2 col-lg-auto" type="submit" ><Icon icon="eva:search-outline" /></button>
      </div>
      <div className="profile">
        <img src={profile} alt="profile" />
        <div className="nameProfile">
          <span className="name">Hayabusa Jr</span>
          <span className="level">Admin</span>
        </div>
      </div>
    </div>
  )
}

export default Topbar

// import React, { useEffect, useState } from 'react';
// import { Icon } from '@iconify/react';
// import profile from '../../../assets/profile.png';
// import axios from 'axios';  

// const Topbar = () => {
//   const [adminProfile, setAdminProfile] = useState(null);

//   useEffect(() => {
   
//     axios.get('https://localhost:7054/api/Admin/admin-profile', { 
//       headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
//     })
//       .then((response) => {
//         setAdminProfile(response.data); 
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the admin profile!", error);
//       });
//   }, []);

//   if (!adminProfile) {
//     return <div>Loading...</div>; 
//   }

//   return (
//     <div className="topbar">
//       <div className="searchBar col-6" role="search">
//         <input className="px-2 col-10" type="search" placeholder="Search" aria-label="Search" />
//       </div>
//       <div className="profile">
//         <img src={profile} alt="profile" />
//         <div className="nameProfile">
//           <span className="name">{adminProfile.fullName}</span>
//           <span className="level">Admin</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Topbar;
