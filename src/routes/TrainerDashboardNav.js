import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TrainerDashboard from "../components/trainerDashboard/TrainerDashboard";

export default function TrainerDashboardNav() {
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
        <div className="trainer-dashboard">
            <TrainerDashboard />
        </div>
    );
}
