import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = document.getElementById('root');
const reactRoot = createRoot(root);

const authorizationParams = {
 redirect_uri: 'https://serenote.vercel.app' + '/foryou',
};

reactRoot.render(
 <Auth0Provider
    domain={domain} 
    clientId={clientId}
    authorizationParams={authorizationParams} 
 >
    <App />
 </Auth0Provider>
);
