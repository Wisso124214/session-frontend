import React from 'react';
import './ListNotes.css';
import Note from '@components/note/Note';
import PopUpNote from '@components/popUpNote/PopUpNote';
import { AppContext } from '@src/AppContext';


const notesData = [
    {
      id: 1,
      title: 'Note 1. This is a long title to test wrapping',
      content: 'This is the content of note 1. It can be quite long, so it should wrap properly within the note component. This is just a test to see how the content looks when it is long enough to require wrapping.',
      date: '2023-10-01',
    },
    {
      id: 2,
      title: 'Note 2',
      content: 'This is the content of note 2.',
      date: '2023-10-02',
    },
    {
      id: 3,
      title: 'Note 3',
      content: 'This is the content of note 3.',
      date: '2023-10-03',
    },
    {
      id: 4,
      title: 'Note 4',
      content: 'This is the content of note 4.',
      date: '2023-10-04',
    },
    {
      id: 5,
      title: 'Note 5',
      content: 'This is the content of note 5.',
      date: '2023-10-05',
    },
    {
      id: 6,
      title: 'Note 6',
      content: 'This is the content of note 6.',
      date: '2023-10-06',
    },
    {
      id: 7,
      title: 'Note 7',
      content: 'This is the content of note 7.',
      date: '2023-10-07',
    },
    {
      id: 8,
      title: 'Note 8',
      content: 'This is the content of note 8.',
      date: '2023-10-08',
    },
    {
      id: 9,
      title: 'Note 9',
      content: 'This is the content of note 9.',
      date: '2023-10-09',
    },
    {
      id: 10,
      title: 'Note 10',
      content: 'This is the content of note 10.',
      date: '2023-10-10',
    },
    {
      id: 11,
      title: 'Note 11',
      content: 'This is the content of note 11.',
      date: '2023-10-11',
    },
    {
      id: 12,
      title: 'Note 12',
      content: 'This is the content of note 12.',
      date: '2023-10-12',
    },
    {
      id: 13,
      title: 'Note 13',
      content: 'This is the content of note 13.',
      date: '2023-10-13',
    },
    {
      id: 14,
      title: 'Note 14',
      content: 'This is the content of note 14.',
      date: '2023-10-14',
    },
    {
      id: 15,
      title: 'Note 15',
      content: 'This is the content of note 15.',
      date: '2023-10-15',
    },
    {
      id: 16,
      title: 'Note 16',
      content: 'This is the content of note 16.',
      date: '2023-10-16',
    },
    {
      id: 17,
      title: 'Note 17',
      content: 'This is the content of note 17.',
      date: '2023-10-17',
    },
    {
      id: 18,
      title: 'Note 18',
      content: 'This is the content of note 18.',
      date: '2023-10-18',
    },
    {
      id: 19,
      title: 'Note 19',
      content: 'This is the content of note 19.',
      date: '2023-10-19',
    },
    {
      id: 20,
      title: 'Note 20',
      content: 'This is the content of note 20.',
      date: '2023-10-20',
    }, 
  ]

export default function ListNotes({ type = 'default' }) {

  const [showPopUp, setShowPopUp] = React.useState(false);
  const [selectedNote, setSelectedNote] = React.useState(null);

  const hyphenText = (text, chars) => {
    let counter = 0;

    return text ? 
      text.split('').map((element) => {
        counter = element === ' ' ? 0 : counter + 1;
        return counter % chars === 0 && counter !== 0 ? element + '-' : element;
      }).join('')
      : '(none)';
  };

  return (
    <>
      <div className={`list-notes list-notes-${type}`}>
        {notesData.map((note, index) => (
          <Note 
            key={index}
            data={note}
            hyphenText={hyphenText}
            onClick={() => {
              setSelectedNote(note);
              setShowPopUp(true);
            }}
            type={type === 'default' ? 'square' : type} 
            />))}
      </div>
      <PopUpNote showPopUp={showPopUp} setShowPopUp={setShowPopUp} selectedNote={selectedNote} hyphenText={hyphenText} />
    </>
  );
}

