import { initDatabase } from '../database/db';

// Delete workflows that don't have proper images
const workflowsToDelete = [
  '%N8n Intro Workflow Template%',
  '%Mcp N8n Local Setup%',
  '%Ai Video Gen%'
];

async function deleteOrphanWorkflows() {
  try {
    const db = await initDatabase();

    console.log('Current workflows:');
    const before = await db.all('SELECT id, title, image_url FROM workflows ORDER BY id');
    before.forEach((w: any) => console.log(`  ${w.id}: ${w.title} → ${w.image_url || 'NULL'}`));

    console.log(`\nDeleting ${workflowsToDelete.length} orphan workflows...\n`);

    for (const pattern of workflowsToDelete) {
      const result = await db.run(
        'DELETE FROM workflows WHERE title LIKE ?',
        pattern
      );
      console.log(`Deleted pattern "${pattern}": ${result.changes} row(s)`);
    }

    // Also delete workflows with NULL image_url (gradient fallback not wanted)
    const nullResult = await db.run('DELETE FROM workflows WHERE image_url IS NULL');
    console.log(`Deleted NULL image_url: ${nullResult.changes} row(s)`);

    console.log('\nRemaining workflows:');
    const after = await db.all('SELECT id, title, image_url FROM workflows ORDER BY id');
    after.forEach((w: any) => console.log(`  ${w.id}: ${w.title}`));
    console.log(`\nTotal: ${after.length} workflows`);

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

deleteOrphanWorkflows()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
