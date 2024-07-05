CREATE TABLE action_url (
    path CHAR(6) PRIMARY KEY,  -- url path
    creator: VARCHAR(50) NOT NULL,
    commission: DECIMAL(10, 2) NOT NULL,
    metadata: JSON,  -- title, description, image, content ...
    component: JSON,
    action_id: VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE action_url_preview (
    path CHAR(6) PRIMARY KEY,  -- url path
    creator: VARCHAR(50) NOT NULL,
    commission: DECIMAL(10, 2) NOT NULL,
    metadata: JSON,  -- title, description, image, content ...
    component: JSON,
    action_id: VARCHAR(50) NOT NULL,
    expired_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
