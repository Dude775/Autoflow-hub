import { initDatabase } from './database/db';

async function removePaidWorkflows() {
  console.log('🧹 Removing dummy workflows with price > 0...');
  
  try {
    const db = await initDatabase();

    // Get count before deletion
    const before = await db.get('SELECT COUNT(*) as count FROM workflows WHERE price > 0');
    console.log(`Found ${before.count} paid workflows to delete`);

    // Delete all workflows with price > 0
    const result = await db.run('DELETE FROM workflows WHERE price > 0');
    console.log(`✅ Deleted ${result.changes} dummy workflows`);

    // Show remaining workflows
    const after = await db.get('SELECT COUNT(*) as count FROM workflows');
    console.log(`✅ Remaining workflows: ${after.count} (all FREE)`);

    // List remaining workflows
    const remaining = await db.all('SELECT id, title, price FROM workflows ORDER BY id');
    console.log('\nRemaining workflows:');
    remaining.forEach(w => {
      console.log(`  ${w.id}. ${w.title} (₪${w.price})`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

removePaidWorkflows();
