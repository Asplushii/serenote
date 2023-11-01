import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import './route.css';
import '../index.css'
import '../App'
function PrivateRoute({ element }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
   return (
      <div className="loading-text-container">
         <div className="loading-text"></div>
      </div>
     );
  }

  return isAuthenticated ? element : <Navigate to="/" />;
}

export default PrivateRoute;
