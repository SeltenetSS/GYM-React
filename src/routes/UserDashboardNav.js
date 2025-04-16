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
    }, []);

    return (
        <div className="user-dashboard">
            <UserDashboard />
        </div>
    );
}
