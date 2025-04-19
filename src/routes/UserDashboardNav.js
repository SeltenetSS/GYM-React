import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserDashboard from "../components/userDashboard/UserDashboard";

export default function UserDashboardNav() {
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            history.push("/login");
        }

  
        const handlePopState = () => {
            const token = localStorage.getItem("token");
            if (!token) {
                history.push("/login");
            }
        };

        window.addEventListener("popstate", handlePopState);

       
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [history]);

    return (
        <div className="user-dashboard">
            <UserDashboard />
        </div>
    );
}
