import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../index.css'

const Register = () => {
    
    const { loginWithRedirect } = useAuth0();

  return (
        <button className="create-button" onClick={() => loginWithRedirect({authorizationParams: {
            screen_hint: "signup",
          }})}>
            Create an Account
        </button>
  );
};

export default Register;
