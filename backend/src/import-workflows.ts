import fs from 'fs';
import path from 'path';
import { initDatabase } from './database/db';
import {
  extractTitle,
  extractDescription,
  detectCategory,
  extractTags,
  validateWorkflowJson,
  getWorkflowStats
} from './utils/workflow-parser';

const WORKFLOWS_DIR = path.join(__dirname, '../workflows-library');

interface ImportResult {
  success: number;
  failed: number;
  updated: number;
  created: number;
  errors: { file: string; error: string }[];
}

async function importWorkflows(): Promise<ImportResult> {
  console.log('🚀 AutoFlow Hub - Workflow Import System');
  console.log('=========================================');
  console.log('');

  const result: ImportResult = {
    success: 0,
    failed: 0,
    updated: 0,
    created: 0,
    errors: []
  };

  try {
    if (!fs.existsSync(WORKFLOWS_DIR)) {
      console.log('📁 Creating workflows-library directory...');
      fs.mkdirSync(WORKFLOWS_DIR, { recursive: true });
      console.log('');
      console.log('ℹ️  No workflow files found.');
      console.log('');
      console.log('📋 Next steps:');
      console.log('   1. Add your N8N workflow .json files to: backend/workflows-library/');
      console.log('   2. Run: npm run import-workflows');
      console.log('');
      return result;
    }

    const files = fs.readdirSync(WORKFLOWS_DIR)
      .filter(file => file.endsWith('.json'));

    if (files.length === 0) {
      console.log('ℹ️  No .json files found in workflows-library/');
      console.log('');
      console.log('📋 Next steps:');
      console.log('   1. Add your N8N workflow .json files to: backend/workflows-library/');
      console.log('   2. Run: npm run import-workflows');
      console.log('');
      return result;
    }

    console.log(`📂 Found ${files.length} workflow file(s)`);
    console.log('');

    const db = await initDatabase();

    for (let i = 0; i < files.length; i++) {
      const filename = files[i];
      const fileNumber = `[${i + 1}/${files.length}]`;
      
      console.log(`${fileNumber} Processing: ${filename}`);

      try {
        const filePath = path.join(WORKFLOWS_DIR, filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        
        let workflowJson;
        try {
          workflowJson = JSON.parse(fileContent);
        } catch (parseError) {
          throw new Error('Invalid JSON format');
        }

        if (!validateWorkflowJson(workflowJson)) {
          throw new Error('Invalid N8N workflow structure');
        }

        const title = extractTitle(filename);
        const description = extractDescription(workflowJson);
        const category = detectCategory(workflowJson);
        const tags = extractTags(workflowJson);
        const stats = getWorkflowStats(workflowJson);

        console.log(`   ├─ Title: ${title}`);
        console.log(`   ├─ Category: ${category}`);
        console.log(`   ├─ Nodes: ${stats.nodeCount} (${stats.complexity})`);
        console.log(`   ├─ Tags: ${tags.join(', ')}`);

        const existing = await db.get(
          'SELECT id FROM workflows WHERE title = ?',
          title
        );

        const workflowJsonString = JSON.stringify(workflowJson);
        const tagsJsonString = JSON.stringify(tags);

        if (existing) {
          await db.run(
            `UPDATE workflows 
             SET description = ?, category = ?, tags = ?, workflow_json = ?
             WHERE title = ?`,
            description,
            category,
            tagsJsonString,
            workflowJsonString,
            title
          );
          
          console.log(`   └─ ✅ Updated (ID: ${existing.id})`);
          result.updated++;
        } else {
          const insertResult = await db.run(
            `INSERT INTO workflows (title, description, category, price, tags, workflow_json, demo_url, download_url)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            title,
            description,
            category,
            0,
            tagsJsonString,
            workflowJsonString,
            `https://demo.autoflowhub.com/${filename.replace('.json', '')}`,
            `https://download.autoflowhub.com/workflows/${filename}`
          );
          
          console.log(`   └─ ✅ Created (ID: ${insertResult.lastID})`);
          result.created++;
        }

        result.success++;
        console.log('');

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.log(`   └─ ❌ Failed: ${errorMessage}`);
        console.log('');
        
        result.failed++;
        result.errors.push({
          file: filename,
          error: errorMessage
        });
      }
    }

    console.log('=========================================');
    console.log('📊 Import Summary:');
    console.log('=========================================');
    console.log(`✅ Success: ${result.success}/${files.length}`);
    console.log(`   ├─ Created: ${result.created}`);
    console.log(`   └─ Updated: ${result.updated}`);
    
    if (result.failed > 0) {
      console.log(`❌ Failed: ${result.failed}`);
      console.log('');
      console.log('Errors:');
      result.errors.forEach(err => {
        console.log(`   • ${err.file}: ${err.error}`);
      });
    }
    
    console.log('');
    console.log('🎉 Import process completed!');
    console.log('');

  } catch (error) {
    console.error('❌ Fatal error during import:', error);
    throw error;
  }

  return result;
}

importWorkflows()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Import failed:', error);
    process.exit(1);
  });