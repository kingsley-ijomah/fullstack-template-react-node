const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (body, environment) => {
  const { email, password } = body;

  // find user
  const { rows } = await db.query('SELECT * FROM "users" WHERE email = $1', [email], environment);
  if (rows.length === 0) {
    throw new Error('Email or password is incorrect');
  }

  // compare password
  const validPassword = await bcrypt.compare(password, rows[0].password);
  if (!validPassword) {
    throw new Error('Invalid credentials');
  }

  // generate token
  const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, {
    expiresIn: 86400, // 24 hours
  });

  return token;
};

exports.active = async (token, environment) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { rows } = await db.query('SELECT * FROM "users" WHERE id = $1', [decoded.id], environment);
  return rows[0];
};

exports.forgotPassword = async (body, environment) => {
  
  const { email } = body;
  
  // // find user
  const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email], environment);
  if (rows.length === 0) {
    throw new Error('Email does not exist');
  }

  // generate token
  const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, {
    expiresIn: 86400, // 24 hours
  });

  return token;
};

exports.resetPassword = async (token, body, environment) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { password, confirmPassword } = body;

  // check if password is empty
  if (!password || !confirmPassword) {
    throw new Error('Password cannot be empty');
  }

  // check if passwords match
  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const { rows } = await db.query(
    'UPDATE "users" SET password = $1 WHERE id = $2 RETURNING *',
    [hashedPassword, decoded.id], 
    environment
  );
  return rows[0];
};