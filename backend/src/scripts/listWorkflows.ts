import { initDatabase } from '../database/db';

async function listWorkflows() {
  try {
    const db = await initDatabase();
    const workflows = await db.all('SELECT id, title FROM workflows ORDER BY title');

    console.log('\n=== WORKFLOWS IN DATABASE ===\n');
    workflows.forEach((wf: any) => {
      console.log(`ID: ${wf.id.toString().padStart(2)} | Title: "${wf.title}"`);
    });
    console.log(`\nTotal: ${workflows.length} workflows`);

  } catch (error) {
    console.error('Error:', error);
  }
}

listWorkflows();
