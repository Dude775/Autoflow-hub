import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import fs from 'fs';
import { Workflow, CreateWorkflowRequest, Purchase, PurchaseRequest } from '../types';

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

// יצירת חיבור לדאטהבייס
export async function initDatabase(): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
  if (db) return db;

  const dbPath = path.join(__dirname, 'autoflow.db');
  
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // הרצת schema.sql אוטומטית
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf-8');
  await db.exec(schema);

  console.log('✅ Database initialized successfully');
  return db;
}

// קבלת כל ה-workflows
export async function getAllWorkflows(): Promise<Workflow[]> {
  const database = await initDatabase();
  return database.all<Workflow[]>('SELECT * FROM workflows ORDER BY created_at DESC');
}

// קבלת workflow ספציפי לפי ID
export async function getWorkflowById(id: number): Promise<Workflow | undefined> {
  const database = await initDatabase();
  return database.get<Workflow>('SELECT * FROM workflows WHERE id = ?', id);
}

// הוספת workflow חדש
export async function insertWorkflow(workflow: CreateWorkflowRequest): Promise<number> {
  const database = await initDatabase();
  
  const tagsJson = workflow.tags ? JSON.stringify(workflow.tags) : '[]';
  
  const result = await database.run(
    `INSERT INTO workflows (title, description, category, price, demo_url, download_url, tags)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    workflow.title,
    workflow.description,
    workflow.category,
    workflow.price,
    workflow.demo_url || null,
    workflow.download_url || null,
    tagsJson
  );

  return result.lastID!;
}

// רישום רכישה
export async function recordPurchase(purchase: PurchaseRequest): Promise<number> {
  const database = await initDatabase();
  
  const result = await database.run(
    `INSERT INTO purchases (workflow_id, email) VALUES (?, ?)`,
    purchase.workflow_id,
    purchase.email
  );

  // עדכון מספר ההורדות
  await database.run(
    `UPDATE workflows SET downloads = downloads + 1 WHERE id = ?`,
    purchase.workflow_id
  );

  return result.lastID!;
}

// חיפוש workflows לפי קטגוריה
export async function getWorkflowsByCategory(category: string): Promise<Workflow[]> {
  const database = await initDatabase();
  return database.all<Workflow[]>(
    'SELECT * FROM workflows WHERE category = ? ORDER BY created_at DESC',
    category
  );
}