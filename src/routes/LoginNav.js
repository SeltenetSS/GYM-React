import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Login from "../components/Login";

export default function LoginNav() {
  const location = useLocation();
  const history = useHistory();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role") || "user";
  const type = queryParams.get("type") || "signin"; 

  return (
    <>
      <PageHeader title={`${type === "signup" ? "Sign Up" : "Sign In"} - ${role.charAt(0).toUpperCase() + role.slice(1)}`} />
      <Login role={role} type={type} />
    </>
  );
}
