USE db;

-- Drop the "tickets" table if it exists
DROP TABLE IF EXISTS tickets;

-- Create the "tickets" table with specified columns
CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    description TEXT
);

-- Insert dummy data into the "tickets" table
-- TODO: We can seed test and dev envs with different data
INSERT INTO tickets (name, email, description)
VALUES
    ('John Doe', 'johndoe@example.com', 'This is a test description'),
    ('Jane Smith', 'janesmith@example.com', 'Another test description'),
    ('Bob Johnson', 'bobjohnson@example.com', 'Yet another test description');