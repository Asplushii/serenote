import React, { useEffect } from 'react';
import LogoutButton from './components/logout';
import NavBar from './components/navbar';
function Home() {
  useEffect(() => {
    window.history.pushState({}, "", "/");
  }, []);

  return (
    <div className="home">
      <h1>Welcome to Our Website</h1>
      <p>This is the homepage of our website. Feel free to explore and learn more about us.</p>
      <LogoutButton />
      <NavBar />
    </div>
  );
}

export default Home;
