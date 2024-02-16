import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './entry.css'; // Import the CSS file

function Entry() {
  const history = useNavigate();
  const [entryText, setEntryText] = useState("");

  useEffect(() => {
    window.history.pushState({}, "", "/");
  }, []);

  const handleSaveAndRedirect = () => {
    // Save the entry, for example, to a database or storage
    // You can replace this with your actual save logic.

    // Redirect to the journal page.
    history('/journal');
  };

  const goBack = () => {
    history('/journal');
  };

  const startListening = () => {
    if ('SpeechRecognition' in window) {
      const recognition = new window.SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setEntryText(entryText + transcript);
      };
    } else {
      // Handle the case where SpeechRecognition is not supported
      alert("Your browser does not support voice input.");
    }
  };

  return (
    <div id="entry">
      <div id="entry-header">
        <button id="done" onClick={goBack}>
          All entries
        </button>

        <button id="done" onClick={handleSaveAndRedirect}>
          I'm done
        </button>
        
        <button id="voice-button" onClick={startListening}>
          Voice Input
        </button>
      </div>
      <div id="entry-textarea">
        <textarea
          value={entryText}
          onChange={(e) => setEntryText(e.target.value)}
          placeholder="Start typing your entry here..."
        />
      </div>
    </div>
  );
}

export default Entry;
