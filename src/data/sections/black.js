export const blackBeltContent = {
  // Belt configuration
  belt: "black",
  beltDisplayName: "noire",
  beltBadge: "⚫",
  description: "Expert - Maîtrisez les concepts avancés",
  topics: ["Transactions", "Sécurité", "Procédures", "Triggers"],
  colors: {
    bg: "bg-gray-800",
    text: "text-gray-100",
    border: "border-gray-600",
    accent: "bg-gray-700",
    headerBorder: "border-gray-500",
    tagBg: "bg-gray-700",
    tagText: "text-gray-100",
    hover: "hover:bg-gray-900",
  },

  // Content sections
  header: {
    title: "Optimisation et Sécurité",
    description:
      "Maîtrisez l'optimisation des performances, les index et la sécurité",
    tag: "Ceinture Noire",
  },
  pageDescription: {
    title: "Maîtrisez l'Optimisation et la Sécurité des Bases de Données",
    content:
      "La ceinture noire représente le plus haut niveau de maîtrise SQL. Apprenez les techniques avancées d'optimisation des performances de base de données, les stratégies d'indexation, les meilleures pratiques de sécurité et l'administration de base de données. Ce niveau se concentre non seulement sur l'écriture de requêtes, mais sur l'optimisation et la sécurisation de systèmes de base de données entiers.",
  },
  accordions: [
    {
      title: "Database Indexes",
      content: "Create and manage indexes for optimal query performance.",
      sqlCode: `-- Create a simple index
CREATE INDEX idx_user_email ON users(email);

-- Composite index for multi-column queries
CREATE INDEX idx_order_date_status ON orders(order_date, status);

-- Unique index to enforce uniqueness
CREATE UNIQUE INDEX idx_product_sku ON products(sku);

-- Partial index with condition
CREATE INDEX idx_active_users ON users(last_login) 
WHERE active = true;

-- Drop an index
DROP INDEX idx_user_email;`,
      explanation:
        "Indexes are data structures that improve query performance by creating shortcuts to data. They speed up SELECT operations but slow down INSERT/UPDATE/DELETE. Choose indexes based on your query patterns and measure their impact.",
    },
    {
      title: "Query Optimization",
      content: "Analyze and optimize query performance using execution plans.",
      sqlCode: `-- Analyze query execution plan
EXPLAIN ANALYZE SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id, u.name;

-- Optimized query with proper indexing
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.active = true 
  AND u.created_at > '2024-01-01'
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 0;`,
      explanation:
        "Use EXPLAIN ANALYZE to understand query execution plans. Look for table scans, join algorithms, and cost estimates. Optimize by adding proper indexes, rewriting queries, and using efficient WHERE clauses.",
    },
    {
      title: "Stored Procedures",
      content: "Create reusable stored procedures for complex business logic.",
      sqlCode: `-- Create a stored procedure
DELIMITER //
CREATE PROCEDURE GetUserOrderSummary(
    IN user_id INT,
    IN start_date DATE,
    OUT total_orders INT,
    OUT total_amount DECIMAL(10,2)
)
BEGIN
    SELECT COUNT(*), COALESCE(SUM(total), 0)
    INTO total_orders, total_amount
    FROM orders 
    WHERE user_id = user_id 
      AND order_date >= start_date;
END //
DELIMITER ;

-- Call the procedure
CALL GetUserOrderSummary(123, '2024-01-01', @orders, @amount);
SELECT @orders, @amount;`,
      explanation:
        "Stored procedures encapsulate complex business logic in the database. They improve performance by reducing network traffic and enable code reuse across applications.",
    },
    {
      title: "Database Security",
      content: "Implement security best practices and user access control.",
      sqlCode: `-- Create users with specific roles
CREATE USER 'app_read'@'%' IDENTIFIED BY 'secure_password_123!';
CREATE USER 'app_write'@'%' IDENTIFIED BY 'another_secure_pass_456!';

-- Grant minimal necessary permissions
GRANT SELECT ON myapp.users TO 'app_read'@'%';
GRANT SELECT ON myapp.products TO 'app_read'@'%';

GRANT SELECT, INSERT, UPDATE ON myapp.orders TO 'app_write'@'%';
GRANT SELECT ON myapp.users TO 'app_write'@'%';

-- Revoke permissions
REVOKE DELETE ON myapp.* FROM 'app_write'@'%';

-- View user permissions
SHOW GRANTS FOR 'app_read'@'%';`,
      explanation:
        "Follow the principle of least privilege. Create specific users for different application components and grant only the minimum permissions needed. Regularly audit and review user permissions.",
    },
    {
      title: "Database Triggers",
      content: "Automate actions with database triggers for data integrity.",
      sqlCode: `-- Audit trigger for tracking changes
CREATE TRIGGER user_audit_trigger
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    INSERT INTO user_audit_log (
        user_id, 
        old_email, 
        new_email, 
        changed_by, 
        changed_at
    ) VALUES (
        NEW.id, 
        OLD.email, 
        NEW.email, 
        USER(), 
        NOW()
    );
END;

-- Before insert trigger for validation
CREATE TRIGGER validate_user_email
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    IF NEW.email NOT REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid email format';
    END IF;
END;`,
      explanation:
        "Triggers automatically execute code in response to database events. Use them for auditing, validation, and maintaining data integrity. Be careful not to create complex trigger chains that are hard to debug.",
    },
    {
      title: "Performance Monitoring",
      content: "Monitor and analyze database performance metrics.",
      sqlCode: `-- Find slow queries
SELECT 
    query_time,
    lock_time,
    rows_sent,
    rows_examined,
    sql_text
FROM mysql.slow_log 
WHERE query_time > 1.0
ORDER BY query_time DESC;

-- Check index usage
SELECT 
    table_name,
    index_name,
    cardinality,
    index_type
FROM information_schema.statistics 
WHERE table_schema = 'myapp'
ORDER BY table_name, seq_in_index;

-- Monitor connection and query statistics
SHOW GLOBAL STATUS LIKE 'Connections';
SHOW GLOBAL STATUS LIKE 'Questions';
SHOW GLOBAL STATUS LIKE 'Slow_queries';`,
      explanation:
        "Regular performance monitoring helps identify bottlenecks before they become critical. Monitor slow queries, index usage, and database statistics to maintain optimal performance.",
    },
  ],
};

export default blackBeltContent;
