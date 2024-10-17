import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    const userEmail = localStorage.getItem('userEmail'); // Corrected key

    return userEmail ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
