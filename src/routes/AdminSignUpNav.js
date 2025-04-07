
import React from 'react'
import PageHeader from "../components/website/PageHeader";
import AdminSignUp from "../components/adminDashboard/signup/AdminSignUp";


export default function AdminSignUpNav() {
    return (
        <>
            <PageHeader title="AdminSignUp" readOnly />
            <AdminSignUp/>
            
        </>
    )
}
