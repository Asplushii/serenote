import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Main';
import Foryou from './Foryou'
import Journal from './Journal'
import Moodboards from './Moodboards'
import PrivateRoute from './components/route';
import Entry from './Entry'
function App() {
 console.log('App is rendering...');

 return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Main />}
        />
        <Route
          path="/foryou"
          element={<PrivateRoute element={<Foryou />} />}
        />
        <Route
          path="/journal"
          element={<PrivateRoute element={<Journal />} />}
        />
        <Route
          path="/moodboards"
          element={<PrivateRoute element={<Moodboards />} />}
        />
        <Route
          path="/entry"
          element={<PrivateRoute element={<Entry />} />}
        />
        <Route path="/entry/:entryId" element={<PrivateRoute element={<Entry />} />} />

      </Routes>
    </Router>
 );
}

export default App;