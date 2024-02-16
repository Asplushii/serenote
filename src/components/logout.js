import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../index.css'

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: 'https://serenote.vercel.app' })}>
      Log Out
    </button>
  );
};

export default LogoutButton;
