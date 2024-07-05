CREATE TABLE action_url (
    id CHAR(6) PRIMARY KEY,  -- url
    creator: VARCHAR(50) NOT NULL,
    metadata: JSON,  -- title, description, image, content, commission ...
    component: JSON,
    action_id: VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
