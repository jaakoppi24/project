import { sql } from "../database/database.js";

const create = async (name) => {
  await sql`INSERT INTO shopping_lists (name) VALUES (${name})`;
};

const findAllActive = async () => {
  return await sql`SELECT * FROM shopping_lists WHERE active=true`;
};

const findById = async (id) => {
  const rows = await sql`SELECT * FROM shopping_lists WHERE id = ${id}`;

  if (rows && rows.length > 0) {
    return rows[0];
  }

  return { id: 0, name: "Unknown" };
};

const deactivate = async (id) => {
  await sql`UPDATE shopping_lists SET active = false WHERE id = ${id}`;
};

const countLists = async () => {
  const rows = await sql`SELECT COUNT (*) AS count FROM shopping_lists`;
  return rows[0].count;
};

export { countLists, create, deactivate, findAllActive, findById };
