import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AdminDashboard from "../components/adminDashboard/AdminDashboard";

export default function AdminDashboardNav() {
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            history.push("/admin-sign-up"); 
        }
    }, []);

    return (
        <div className="admin-dashboard">
            <AdminDashboard />
        </div>
    );
}
