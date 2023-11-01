import React, { useEffect } from 'react';
import NavBar from './components/navbar';
function Foryou() {
  useEffect(() => {
    window.history.pushState({}, "", "/");
  }, []);

  return (
    <div id="home">
      <NavBar />
    </div>
  );
}

export default Foryou;
