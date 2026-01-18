-- טבלת workflows - אחסון כל התבניות
CREATE TABLE IF NOT EXISTS workflows (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL,
    demo_url TEXT,
    download_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    tags TEXT, -- JSON array של tags
    downloads INTEGER DEFAULT 0,
    rating REAL DEFAULT 0,
    workflow_json TEXT, -- Full N8N workflow JSON
    image_url TEXT -- Path to workflow preview image
);

-- טבלת purchases - מעקב אחרי רכישות
CREATE TABLE IF NOT EXISTS purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workflow_id INTEGER NOT NULL,
    email TEXT NOT NULL,
    purchased_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (workflow_id) REFERENCES workflows(id)
);