import React from "react";
import { Navigate } from "react-router-dom";

const Protect = ({ children }) => {
    const isAuthenticated = false; // Replace with actual authentication logic

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default Protect;