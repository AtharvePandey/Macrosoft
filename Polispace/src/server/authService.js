require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

// Database setup with URI
const pool = new Pool({
  connectionString: process.env.DB_URI || 'postgres://postgres:password@localhost:5432/polispace'
});

// Express app
const app = express();
app.use(express.json());

/**
 * Authenticates a user by username and password
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<{userId: string, username: string} | null>} 
 */
const authenticateUser = async (username, password) => {
  // 1. Find user by username only
  const result = await pool.query(
    `SELECT userId, username, passwordHash 
     FROM users 
     WHERE username = $1`, 
    [username]
  );

  // 2. Verify user exists and password matches
  if (result.rows.length === 0) return null;
  
  const user = result.rows[0];
  const isValid = await bcrypt.compare(password, user.passwordHash);
  return isValid ? { userId: user.userId, username: user.username } : null;
};

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // Authentication
    const user = await authenticateUser(username, password);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Successful response
    res.json({ 
      authenticated: true,
      userId: user.userId,
      username: user.username
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
  console.log('🔍 Only checking username/passwordHash');
});
