const fs = require('fs');
const path = require('path');

const notesFile = path.join(__dirname, 'notes.json');

const loadNotes = () => {
  try {
    if (fs.existsSync(notesFile)) {
      const dataBuffer = fs.readFileSync(notesFile);
      const dataJSON = dataBuffer.toString();
      return JSON.parse(dataJSON);
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync(notesFile, dataJSON);
};

const addNote = (title, body) => {
  const notes = loadNotes();
  
  const duplicateNote = notes.find(note => note.title === title);
  
  if (duplicateNote) {
    return false;
  }
  
  notes.push({
    title,
    body,
    createdAt: new Date().toISOString()
  });
  
  saveNotes(notes);
  return true;
};

const removeNote = (title) => {
  const notes = loadNotes();
  
  const notesToKeep = notes.filter(note => note.title !== title);
  
  if (notes.length === notesToKeep.length) {
    return false;
  }
  
  saveNotes(notesToKeep);
  return true;
};

const readNote = (title) => {
  const notes = loadNotes();
  
  const note = notes.find(note => note.title === title);
  
  if (!note) {
    return null;
  }
  
  return note;
};

const listNotes = () => {
  const notes = loadNotes();
  return notes;
};

module.exports = {
  addNote,
  removeNote,
  readNote,
  listNotes
};
