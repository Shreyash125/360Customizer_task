SELECT orders.user_id, users.name, SUM(orders.amount) AS total
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.order_date >= NOW() - INTERVAL '1 month'
GROUP BY orders.user_id, users.name
ORDER BY total DESC 
LIMIT 5;



-- To optimize the SQL query for retrieving the top 5 users with the highest total order 
-- amount in the last month, we can create specific indexes on relevant 
-- columns in both the orders and users tables. 


-- Index on user_id in the orders table:
-- table will significantly improve the speed of the join operation between the users and orders tables
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- Index on id in the users table:
-- Ensuring that the id column in the users table has an index will help make lookups faster during the join since it usually serves as the primary key.
CREATE INDEX idx_users_id ON users(id);

-- Index on order_date in the orders table:
-- Creating an index on the order_date column will enhance the speed of filtering records according to the specified date range.
CREATE INDEX idx_orders_order_date ON orders(order_date);
