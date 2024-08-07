-- Drop the "issue" table if it exists
DROP TABLE IF EXISTS issue;

-- Create the "issue" table with specified columns
CREATE TABLE issue (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    description TEXT
);

-- Insert dummy data into the "issue" table
INSERT INTO issue (name, email, description)
VALUES
    ('John Doe', 'johndoe@example.com', 'This is a test issue'),
    ('Jane Smith', 'janesmith@example.com', 'Another test issue'),
    ('Bob Johnson', 'bobjohnson@example.com', 'Yet another test issue');