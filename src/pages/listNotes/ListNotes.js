import React from 'react';
import './ListNotes.css';
import Note from '@components/note/Note';
import PopUpNote from '@components/popUpNote/PopUpNote';
import { AppContext } from '@src/AppContext';
import config from '@config/config.js';

export default function ListNotes({ type = 'default' }) {
  const notesData = config.PROJECTS_URL;

  const [showPopUp, setShowPopUp] = React.useState(false);
  const [selectedNote, setSelectedNote] = React.useState(null);

  return (
    <>
      <div className={`list-notes list-notes-${type}`}>
        {notesData.map((note, index) => (
          <Note 
            key={index}
            data={note}
            onClick={() => {
              window.location = note.url;
            }}
            type={type === 'default' ? 'square' : type} 
            />))}
      </div>
    </>
  );
}

