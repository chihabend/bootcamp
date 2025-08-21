const yargs = require('yargs');
const notes = require('./notes');

yargs.version('1.0.0');

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    const success = notes.addNote(argv.title, argv.body);
    if (success) {
      console.log('Note added successfully!');
    } else {
      console.log('Note already exists');
    }
  }
});

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title to remove',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    const success = notes.removeNote(argv.title);
    if (success) {
      console.log('Note removed successfully!');
    } else {
      console.log('Note not found');
    }
  }
});

yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note title to read',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    const note = notes.readNote(argv.title);
    if (note) {
      console.log('\n=== Note Found ===');
      console.log(`Title: ${note.title}`);
      console.log(`Body: ${note.body}`);
      console.log(`Created: ${new Date(note.createdAt).toLocaleString()}`);
      console.log('==================\n');
    } else {
      console.log('Note not found');
    }
  }
});

yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler: () => {
    const allNotes = notes.listNotes();
    if (allNotes.length === 0) {
      console.log('No notes found');
    } else {
      console.log('\n=== Your Notes ===');
      allNotes.forEach((note, index) => {
        console.log(`${index + 1}. Title: ${note.title}`);
        console.log(`   Body: ${note.body}`);
        console.log(`   Created: ${new Date(note.createdAt).toLocaleString()}`);
        console.log('---');
      });
      console.log('==================\n');
    }
  }
});

yargs.command({
  command: 'help',
  describe: 'Show help information',
  handler: () => {
    console.log('\n=== Notes App Help ===');
    console.log('Available commands:');
    console.log('  add --title="Title" --body="Body"  - Add a new note');
    console.log('  list                               - List all notes');
    console.log('  read --title="Title"               - Read a specific note');
    console.log('  remove --title="Title"             - Remove a specific note');
    console.log('  help                               - Show this help message');
    console.log('\nExamples:');
    console.log('  node app.js add --title="Meeting" --body="Team meeting at 3 PM"');
    console.log('  node app.js list');
    console.log('  node app.js read --title="Meeting"');
    console.log('  node app.js remove --title="Meeting"');
    console.log('=======================\n');
  }
});

yargs.parse();
