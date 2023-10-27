// Register.js
import React, { useState } from 'react';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Handle registration logic (e.g., validation and user creation)
    // For this example, just log the values to the console
    console.log('Email:', email);
    console.log('Password:', password);
  }

  return (
    <div>
      <h2>Register</h2>
      <form>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
}

export default Register;
