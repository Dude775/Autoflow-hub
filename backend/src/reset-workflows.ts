import { initDatabase } from './database/db';

async function resetWorkflows() {
  console.log('🧹 Deleting ALL workflows from database...');
  
  try {
    const db = await initDatabase();

    // Delete ALL workflows
    const result = await db.run('DELETE FROM workflows');
    console.log(`✅ Deleted ${result.changes} workflows`);

    // Verify empty
    const count = await db.get('SELECT COUNT(*) as count FROM workflows');
    console.log(`✅ Database now has ${count.count} workflows (should be 0)`);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

resetWorkflows();
