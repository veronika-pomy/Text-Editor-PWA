import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.log('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.log('getDb not implemented');

// export const putDb = async (content) => {
//   console.log('PUT to the database');

//   // Connect to the db
//   const contactDb = await openDB('jate', 1);

//   // New transaction with specified privilages
//   const tx = contactDb.transaction('jate', 'readwrite');

//   // Open obj store
//   const store = tx.objectStore('jate');

//   // Add and store content
//   const request = store.add({ content: content });

//   // Confirm request
//   const result = await request;
//   console.log('Saved to DB.', result);

// };

// export const getDb = async () => {
//   console.log('GET from the database');

//   // Connect to the db
//   const contactDb = await openDB('jate', 1);

//   // New transaction with specified privilages
//   const tx = contactDb.transaction('jate', 'readonly');

//   // Open obj store
//   const store = tx.objectStore('jate');

//   // Get all data in the db
//   const request = store.getAll();

//   // Confirm request
//   const result = await request;
//   console.log('result.value', result);
//   return result;
// };

initdb();
