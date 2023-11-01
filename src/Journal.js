import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './components/navbar';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import './journal.css';

function Journal() {
  const [entries, setEntries] = useState([]);
  const [selectedEntries, setSelectedEntries] = useState({});
  const { user } = useAuth0();
  const userId = user?.sub;

  useEffect(() => {
    window.history.pushState({}, "", "/");
    fetchEntries(userId);
  }, [userId]);

  const fetchEntries = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/entries/${userId}`);
      if (response.data && response.data.entries) {
        setEntries(response.data.entries);
      } else {
        console.log("No entries found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEntrySelection = (entryId) => {
    setSelectedEntries((prevSelected) => ({
      ...prevSelected,
      [entryId]: !prevSelected[entryId],
    }));
  };
  

  const deleteSelectedEntries = async () => {
    const selectedEntryIds = Object.keys(selectedEntries).filter(
      (entryId) => selectedEntries[entryId]
    );

    if (selectedEntryIds.length === 0) {
      alert("Please select entries to delete.");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5000/api/entries`, {
        data: { entryIds: selectedEntryIds },
      });
      if (response.status === 200) {
        fetchEntries(userId);
        setSelectedEntries({});
      } else {
        console.log("Failed to delete entries");
      }
    } catch (error) {
      console.error(error);
    }
  };
  function darkenHslColor(hslColor, percentage) {
    const [hue, saturation, lightness] = hslColor.match(/\d+/g).map(Number);
    const newLightness = lightness - (lightness * percentage) / 100;
    return `hsl(${hue}, ${saturation}%, ${newLightness}%)`;
  }
  function getDarkerColor(hslColor) {
    return darkenHslColor(hslColor, 15);
  }  
  return (
    <div>
      <div className='memo'>
        <span className='memories'>Journal</span>
        <span className='small'>See your entries</span>
      </div>
      <button id='button' onClick={deleteSelectedEntries}>
        Delete Entries
      </button>
      <NavBar />

      <div class="scrollbox">
        <div className="scrollbox-item button" id="scrollbox-create">
          <div className="create-entry">
            <span>Create new entry</span>
          </div>
          <Link to="/entry">
            <button className="entry continue-button">Continue</button>
          </Link>
        </div>
        {entries.slice().reverse().map((entry) => (
          <div
          key={entry._id}
          className="scrollbox-item"
          style={{
            backgroundColor: entry.color,
            backgroundImage: selectedEntries[entry._id]
            ? `linear-gradient(225deg, ${getDarkerColor(entry.color)} 0%, ${getDarkerColor(entry.color)} 12%, ${entry.color} 12%, ${entry.color} 100%)`
              : 'none',
          }}
        
><input
      type="checkbox"
      checked={selectedEntries[entry._id] || false}
      onChange={() => handleEntrySelection(entry._id)}
      style={{ '--entry-color': `${getDarkerColor(entry.color)}` }}
    />

            <Link to={`/entry/${entry._id}`}>
              <button className='entry' style={{ textAlign: 'left' }}>
                {entry.entryDate}
              </button>
              <button
                class='title'
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: entry.title.split(' ').length > 4 ? 2 : 1,
                  maxHeight: '10.85em',
                  textAlign: 'left',
                  lineHeight: '1.1em',
                  whiteSpace: 'normal',
                  wordWrap: 'break-word',
                  textDecoration: 'none',
                  marginTop: entry.title.length <= 10 || !entry.title.includes(' ') ? '20px' : '0',
                }}
              >
                {entry.title.includes(' ') ? entry.title : (entry.title.length >= 15 || /[ijltf]/i.test(entry.title.slice(0, 15)) ? entry.title.slice(0, 14) : entry.title)}
              </button>
            </Link>
            <div class="checkbox-container">
  </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default Journal;
