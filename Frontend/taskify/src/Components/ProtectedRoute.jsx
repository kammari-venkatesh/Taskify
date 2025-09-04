import { Navigate } from "react-router";
import Cookies from 'js-cookie';
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!Cookies.get('jwtToken');

  return isAuthenticated ? children : <Navigate to="/login" />;
};


export default ProtectedRoute;
