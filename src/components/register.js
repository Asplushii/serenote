import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Register = () => {
    
    const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
        <button className="create-button" onClick={() => loginWithRedirect({authorizationParams: {
            screen_hint: "signup",
          }})}>
            Create an Account
        </button>
    )
  );
};

export default Register;
