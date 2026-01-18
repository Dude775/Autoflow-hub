import { initDatabase } from './database/db';

async function updateSchema() {
  console.log('🔄 Starting schema update...');
  
  try {
    const db = await initDatabase();

    console.log('📝 Adding workflow_json column...');
    await db.exec(`
      ALTER TABLE workflows 
      ADD COLUMN workflow_json TEXT;
    `);

    console.log('💰 Setting all workflows to free (price = 0)...');
    await db.run('UPDATE workflows SET price = 0');

    console.log('✅ Schema update completed successfully!');
    
  } catch (error) {
    console.error('❌ Schema update failed:', error);
    process.exit(1);
  }
}

updateSchema();
