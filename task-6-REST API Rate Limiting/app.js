const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
});

app.use(limiter);

app.get('/api/data', (req, res) => {
  res.json({ message: 'API response with rate limiting' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));