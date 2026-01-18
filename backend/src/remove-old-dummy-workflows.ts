import { initDatabase } from './database/db';

async function removeOldDummyWorkflows() {
  console.log('🧹 Removing old dummy workflows (IDs 1-6)...');
  
  try {
    const db = await initDatabase();

    // These are the old dummy workflows that got price set to 0
    const result = await db.run('DELETE FROM workflows WHERE id < 7');
    console.log(`✅ Deleted ${result.changes} old dummy workflows`);

    // Show remaining workflows
    const after = await db.get('SELECT COUNT(*) as count FROM workflows');
    console.log(`✅ Remaining workflows: ${after.count} (all REAL from workflows-library)`);

    // List remaining workflows
    const remaining = await db.all('SELECT id, title, price FROM workflows ORDER BY id');
    console.log('\nRemaining REAL workflows:');
    remaining.forEach(w => {
      console.log(`  ${w.id}. ${w.title} (₪${w.price})`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

removeOldDummyWorkflows();
