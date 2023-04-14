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

// Accept input and add content to the database
export const putDb = async (content) => {
  

};

// Get all the content from the database
export const getDb = async () => {

  console.log('GET from database');

  const jateDb = await openDB('jate', 1); // connect 
  const tx = jateDb.transaction('jate', 'readonly'); // new transaction and privileges
  const store = tx.objectStore('jate'); // obj to store
  const request = store.getAll(); // get all data
  const result = await request; // await req
  
  console.log('result.value', result); // confirm 

  return result; 
};

initdb();
