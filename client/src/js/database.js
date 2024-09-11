import { openDB } from 'idb';

// Initialize the IndexedDB database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      // Check if the database already exists
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create an object store with 'id' as the keyPath and autoIncrement true
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Function to save content to the IndexedDB
export const putDb = async (content) => {
  console.log('Saving content to IndexedDB');
  const db = await openDB('jate', 1);
  await db.put('jate', { id: 1, content });
};

// Function to fetch content from the IndexedDB
export const getDb = async () => {
  console.log('Fetching content from IndexedDB');
  const db = await openDB('jate', 1);
  const data = await db.get('jate', 1);
  return data ? data.content : '';
};

// Initialize the database when the module is loaded
initdb();