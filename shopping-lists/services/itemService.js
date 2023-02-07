import { sql } from "../database/database.js";

const create = async (name, shop_list_id) => {
  await sql`INSERT INTO shopping_list_items (name, shopping_list_id) VALUES (${name}, ${shop_list_id})`;
};

const findAllNonCollected = async (id) => {
  return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${id} AND collected = false`;
};

const findAllCollected = async (id) => {
  return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${id} AND collected = true`;
};

const collect = async (id) => {
  await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${id}`;
};

const countItems = async () => {
  const rows = await sql`SELECT COUNT (*) AS count FROM shopping_list_items`;
  return rows[0].count;
};

export { collect, countItems, create, findAllCollected, findAllNonCollected };
