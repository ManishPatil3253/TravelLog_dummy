// client/src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = () => {
    const { auth } = useAuth();
    const location = useLocation();

    // ADDED: Log the check
    console.log(`[ProtectedRoute] Checking access. Token present: ${!!auth?.accessToken}`);

    return (
        auth?.accessToken
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default ProtectedRoute;