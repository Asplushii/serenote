import { useEffect, React } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Main from './Main';
import Home from './Home';
import { useAuth0 } from '@auth0/auth0-react';

function PrivateRoute({ element, isAuthenticated }) {
  return isAuthenticated ? element : <Navigate to="/" />;
}

function App() {
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Main />}
        />
        <Route
          path="/home"
          element={<Home />}
        />
        <Route
          path="/*"
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Navigate to="/home" />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
