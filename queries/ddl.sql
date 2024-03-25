CREATE DATABASE api_exercise;

-- \c api_exercise

CREATE TABLE tasks (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  description TEXT,
  due_date DATE NOT NULL,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE
);
