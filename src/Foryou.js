import React, { useEffect } from 'react';
import NavBar from './components/navbar';
function Foryou() {
  useEffect(() => {
    window.history.pushState({}, "", "/");
  }, []);

  return (
    <div id="home">
      <h1>Page in development</h1>
      <NavBar />
    </div>
  );
}

export default Foryou;
