const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// In-memory fake user DB
const users = [
  {
    email: 'admin@example.com',
    // bcrypt hash of 'securepassword'
    passwordHash: '$2b$10$w/4gLd8JzF2/6BWT6DGUCe/jArUezQnJ5hYwnuwYt5aHXzokjBQuK'
  }
];

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (user) {
    const match = await bcrypt.compare(password, user.passwordHash);
    if (match) {
      res.send('✅ Login successful');
    } else {
      res.send('❌ Invalid password');
    }
  } else {
    res.send('❌ User not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
