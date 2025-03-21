
import React from 'react'
import PageHeader from "../components/PageHeader";
import AdminSignUp from "../components/AdminSignUp";


export default function AdminSignUpNav() {
    return (
        <>
            <PageHeader title="AdminSignUp" readOnly />
            <AdminSignUp/>
            
        </>
    )
}
