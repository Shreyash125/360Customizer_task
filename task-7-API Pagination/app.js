const express = require('express');
const app = express();

const products = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
}));

app.get('/api/products', (req, res) => {
  const limit = parseInt(req.query.limit) || 10; 
  const offset = parseInt(req.query.offset) || 0; 

  const paginatedProducts = products.slice(offset, offset + limit);

  const total = products.length;
  const remaining = total - (offset + limit) > 0 ? total - (offset + limit) : 0;

  res.json({
    total: total,
    limit: limit,
    offset: offset,
    remaining: remaining,
    data: paginatedProducts,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));