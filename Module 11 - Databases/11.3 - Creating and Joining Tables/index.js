import { PGlite } from '@electric-sql/pglite';
import fs from 'fs';

(async () => {
  const db = new PGlite();

  // Set up the DB files
  const createTables = fs.readFileSync('sql/create-tables.sql', 'utf8');
  const insertCarsData = fs.readFileSync('sql/insert-cars-data.sql', 'utf8');
  await db.exec(createTables);
  await db.exec(insertCarsData);

  // Run the changes made in DM section
  const crudOperations = fs.readFileSync('sql/crud-operations.sql', 'utf8');
  await db.exec(crudOperations);



  // Populate our new tables
  const populateTables = fs.readFileSync('sql/populate-tables.sql', 'utf8');
  await db.exec(populateTables);
  

  // Alter the existing cars table
  const alterTable = fs.readFileSync('sql/alter-table.sql', 'utf8');
  await db.exec(alterTable);

  // Load the SQL query file
  const query = fs.readFileSync('sql/query.sql', 'utf8');


  // Run the query from the query file
  const response = await db.query(query);

  console.clear();
  console.table(response.rows);
})();
