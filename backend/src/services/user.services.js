const db = require('../config/database');
const bcrypt = require('bcrypt');

// create user
exports.createUser = async (body) => {
  
  const { first_name, last_name, email, password, confirm_password } = body;

  // check if email exists
  const checkEmail = await db.query('SELECT * FROM users WHERE email = $1', [email]);

  if (checkEmail.rows.length > 0) {
    throw new Error('Email already exists');
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const { rows } = await db.query(
    'INSERT INTO "users" (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
    [first_name, last_name, email, hashedPassword]
  );

  return rows;
};

// fetch all users
exports.fetchAllUsers = async () => {
  const { rows } = await db.query('SELECT * FROM users');
  return rows;
};

// delete user
exports.deleteUser = async (id) => {
  const { rows } = await db.query('DELETE FROM users WHERE id = $1', [id]);
  return rows;
};