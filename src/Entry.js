import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './entry.css';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Arrow from './arrow.png'

function Entry() {
  const history = useNavigate();
  const { entryId } = useParams();
  const [entryTitle, setEntryTitle] = useState("");
  const [entryText, setEntryText] = useState("");
  const { user } = useAuth0();
  const userId = user?.sub;
  const [titleError, setTitleError] = useState("");
  const [placeholder, setPlaceholder] = useState("Title"); 
  const [entryColor, setEntryColor] = useState(""); 



  useEffect(() => {
    window.history.pushState({}, "", "/");
    console.log("entryId:", entryId);

    if (entryId) {
      fetchEntry(entryId);
    } else {
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const year = currentDate.getFullYear();
      const hours = currentDate.getHours().toString().padStart(2, '0');
      const minutes = currentDate.getMinutes().toString().padStart(2, '0');
      const seconds = currentDate.getSeconds().toString().padStart(2, '0');
      const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
      setEntryTitle(formattedDate);
    }
  }, [entryId]);

  const fetchEntry = async (entryId) => {
    try {
      const response = await axios.get(`https://serenote.onrender.com/api/entry/${entryId}`);

      if (response.data) {
        setEntryTitle(response.data.title);
        setEntryText(response.data.text);
        setEntryColor(response.data.color);
      } else {
        console.log("Entry not found for ID:", entryId);
      }
    } catch (error) {
      console.error("Error fetching entry:", error);
    }
  }

  const entryStyle = {
    backgroundColor: entryColor,
  };
  const handleSaveAndRedirect = async () => {
    try {
      if (!entryTitle.trim()) {
        setTitleError(titleError);
        setPlaceholder("Cannot be empty");

        setTimeout(() => {
          setTitleError("");
          setPlaceholder("Title");
        }, 3000);

        return; 
      }


      setTitleError("");

      if (entryId) {
        const response = await axios.put(`https://serenote.onrender.com/api/entry/${entryId}`, {
          title: entryTitle,
          text: entryText,
        });
        if (response.status === 200) {
          console.log("Entry updated successfully");
        } else {
          console.log("Failed to update entry");
        }
      } else {
        const response = await axios.post('https://serenote.onrender.com/api/entries', {
          title: entryTitle,
          text: entryText,
          userId: userId,
        });
        if (response.status === 200) {
          console.log("Entry created successfully");
        } else {
          console.log("Failed to create entry");
        }
      }
      history('/journal');
    } catch (error) {
      console.error(error);
    }
  }

  const goBack = () => {
    history('/journal');
  }

  const arrowImageStyle = {
    width: '10px',
    height: '10px',
    padding: '0px 6px 1px 0px' ,
  };

  return (
    <div id="entry" style={entryStyle}>

      <div id="entry-header" style={entryStyle}>
        <button id="done" onClick={goBack} style={entryStyle}>
        <img src={Arrow} alt="Arrow Icon" style={arrowImageStyle} /> All entries
        </button>
        <div class='centered' style={entryStyle}>
        <input
        type="text"
        class='inputs'
        className='titlebox'
        placeholder={placeholder}
        style={entryStyle}
        value={entryTitle}
        onChange={(e) => {
          if (e.target.value.length <= 60) {
            setEntryTitle(e.target.value);
          }
        }}
      />
      </div>
        <button id="done" onClick={handleSaveAndRedirect} style={entryStyle}>
          I'm done
        </button>
      </div>
      <div>

      </div>
      <div id="entry-textarea" style={entryStyle}>
        <textarea
          value={entryText}
          style={entryStyle}
          onChange={(e) => setEntryText(e.target.value)}
          placeholder="Start typing your entry here..."
        />
      </div>
    </div>
  );
}

export default Entry;
