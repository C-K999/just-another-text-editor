import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, value) => {
  console.log("PUT request to update the jateDB");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const objStore = tx.objectStore("jate");
  const req = objStore.put({ id: id, value: value });
  const res = await req;
  console.log("data saved to the jateDB", res);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from the database");

  // Create connection
  const jateDb = await openDB("jate", 1);

  // Create new text
  const tx = jateDb.transaction("jate", "readonly");

  // Open up desired object store
  const store = tx.objectStore("jate");

  // Get all data
  const request = store.getAll();

  // Confirmation
  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();
