const express = require('express');
const redis = require('redis');
const { Client } = require('pg'); 
const app = express();
const redisClient = redis.createClient(); 
app.use(express.json());

function findUser(userId) {
  return { id: userId }; 
}

app.post('/book-event', async (req, res) => {
  const { eventId, userId } = req.body;

  const lockKey = `lock:event:${eventId}`;
  
  const lockAcquired = await redisClient.setnx(lockKey, 'locked');

  if (lockAcquired) {
    try {
    
      const bookingCheck = await checkEventBooking(eventId, userId);
      if (bookingCheck) {
        return res.status(409).json({ error: 'Event already booked' });
      }
      
      await bookEvent(eventId, userId);
      
      res.status(201).json({ success: true, message: 'Event booked successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to book event' });
    } finally {
   
      await redisClient.del(lockKey);
    }
  } else {
    res.status(429).json({ error: 'Event is currently being booked by another user' });
  }
});

async function checkEventBooking(eventId, userId) {

  const res = await client.query('SELECT * FROM bookings WHERE event_id = $1 AND user_id = $2', [eventId, userId]);
  return res.rowCount > 0; 
}

async function bookEvent(eventId, userId) {
 
  await client.query('INSERT INTO bookings (event_id, user_id) VALUES ($1, $2)', [eventId, userId]);
}
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));