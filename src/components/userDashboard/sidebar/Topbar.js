

// import React, { useEffect, useState } from 'react';
// import { Icon } from '@iconify/react';
// import defaultProfile from '../../../assets/profile.png'; 
// import axios from 'axios';

// const Topbar = () => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get("https://localhost:7054/api/User/user-profile", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         setUserData(response.data);
//       } catch (error) {
//         console.error("Failed to retrieve user information:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <div className="topbar">
//       <div className="searchBar col-6" role="search">
//         <input 
//           className="px-2 col-10" 
//           type="search" 
//           placeholder="Search" 
//           aria-label="Search" 
//         />
//         <button className="btnSearch col-2 col-lg-auto" type="submit">
//           <Icon icon="eva:search-outline" />
//         </button>
//       </div>

//       <div className="profile">
//         <img
//           src={userData?.imageUrl || defaultProfile}
//           alt="User Profile"
//         />
//         <div className="nameProfile">
//           <span className="name">{userData?.name || "User"}</span>
//           <span className="level">User</span> 
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Topbar;


import React, { useEffect, useState } from 'react';
import defaultProfile from '../../../assets/profile.png'; 
import axios from 'axios';

const Topbar = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://localhost:7054/api/User/user-profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to retrieve user information:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="topbar">
      <div className="profile">
        <img
          src={userData?.imageUrl || defaultProfile}
          alt="User Profile"
        />
        <div className="nameProfile">
          <span className="name">{userData?.name || "User"}</span>
          <span className="level">User</span> 
        </div>
      </div>
    </div>
  );
};

export default Topbar;
