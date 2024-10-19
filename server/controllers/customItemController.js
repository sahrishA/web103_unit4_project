import express from 'express'
import pg from 'pg'
const config={
    // user: process.env.PGUSER,
    // password:process.env.PGPASSWORD,
    // host: process.env.PGHOST,
    // port: process.env.PGPORT,
    // database: process.env.PGDATABASE,
    //connectionString: process.env.DATABASE_URL,
    connectionString:'postgresql://postgres:vmDJSvuCZcXYgEyrOlNHWroIlMKdTVPb@junction.proxy.rlwy.net:36870/railway'
}
const pool = new pg.Pool(config);

// Get all custom items
export const getCustomItems = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM custom_items');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single custom item by ID
export const getCustomItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM custom_items WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new custom item
export const createCustomItem = async (req, res) => {
  const { exterior, roof, wheels, interior } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO custom_items (exterior, roof, wheels, interior) VALUES ($1, $2, $3, $4) RETURNING *',
      [exterior, roof, wheels, interior]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a custom item
export const updateCustomItem = async (req, res) => {
  const { id } = req.params;
  const { exterior, roof, wheels, interior } = req.body;
  try {
    const result = await pool.query(
      'UPDATE custom_items SET exterior = $1, roof = $2, wheels = $3, interior = $4 WHERE id = $5 RETURNING *',
      [exterior, roof, wheels, interior, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a custom item
export const deleteCustomItem = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM custom_items WHERE id = $1', [id]);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
