import { initDatabase } from '../database/db';

// UNIQUE 1:1 mapping - each workflow gets its own image (no duplicates!)
// 20 unique images available, 22 workflows = 2 get null (gradient fallback)
const imageByWorkflowId: { [key: number]: string | null } = {
  // Email workflows (4 unique images)
  62: 'Advanced-AI-Email-Management-System-3.png',
  69: 'Advanced AI Email Management System - East_mood.jpg',

  // Property workflows (1 image + 2 fallbacks)
  63: 'AI-Powered Property Recommendations.jpg',
  74: 'Advanced AI Email Management System.jpg',      // repurposed
  75: 'Advanced AI Email Management System_high.jpg', // repurposed

  // B2B/Recruiter (3 unique images + 1 null)
  64: 'B2B-Email-Outreach.jpg',
  65: 'Recruiter-Email-Outreach.jpg',
  81: 'Recruiter-Email-Outreach-Advanced.jpg',
  84: null, // gradient fallback

  // Video (1 image + 1 null)
  66: 'AI_Video_Gen.jpg',
  79: null, // gradient fallback

  // Browser Agent (2 unique images)
  67: 'BrowserAgentfactory.jpg',
  68: 'BrowserAgentfactoryBulk Property Research by Zip Code Workflow.jpg',

  // LinkedIn/Job workflows (5 unique images)
  70: 'LinkedIn-Job-Search_Auto-Match-Resume-with-AI-Cover-Letter-Telegram-Alerts-20.png',
  71: 'LinkedIn Job Automation - Daily Scanner.jpg',
  80: 'LinkedIn Job Automation - MCP Enhanced.jpg',
  82: 'Smart LinkedIn Job Hunter.jpg',
  83: 'Apply to Jobs from Excel and Track Application Status.jpg',
  85: 'Whatsapp AI Agent.jpg', // repurposed for variety

  // WhatsApp workflows (3 unique images)
  76: 'Whatsapp-AI-Agent-2.0-19N.png',
  77: 'Whatsapp AI Agent 2.0.jpg',
  78: 'Whatsapp AI Agent + Long Term Memory.jpg'
};

async function updateWorkflowImages() {
  try {
    const db = await initDatabase();

    const workflows = await db.all('SELECT id, title FROM workflows');
    console.log(`Found ${workflows.length} workflows in database\n`);

    let updatedCount = 0;
    let nullCount = 0;

    for (const workflow of workflows) {
      const imageFileName = imageByWorkflowId[workflow.id];

      if (imageFileName === undefined) {
        console.log(`⚠️  ID ${workflow.id} not in mapping: "${workflow.title}"`);
        continue;
      }

      if (imageFileName === null) {
        // Set to NULL for gradient fallback
        await db.run('UPDATE workflows SET image_url = NULL WHERE id = ?', workflow.id);
        console.log(`🎨 ID ${workflow.id} → gradient fallback`);
        nullCount++;
      } else {
        const imageUrl = `/workflow-images/${imageFileName}`;
        await db.run('UPDATE workflows SET image_url = ? WHERE id = ?', imageUrl, workflow.id);
        console.log(`✅ ID ${workflow.id} → ${imageFileName}`);
        updatedCount++;
      }
    }

    console.log(`\n✅ Updated: ${updatedCount} with images, ${nullCount} with gradient fallback`);

    // Verify no duplicates
    const duplicates = await db.all(`
      SELECT image_url, COUNT(*) as cnt
      FROM workflows
      WHERE image_url IS NOT NULL
      GROUP BY image_url
      HAVING cnt > 1
    `);

    if (duplicates.length > 0) {
      console.log('\n❌ WARNING: Duplicate image_url found:');
      duplicates.forEach((d: any) => console.log(`   ${d.image_url} (${d.cnt}x)`));
    } else {
      console.log('\n✅ No duplicate image mappings!');
    }

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

// הרצת הסקריפט
updateWorkflowImages()
  .then(() => {
    console.log('✅ Image update completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Image update failed:', error);
    process.exit(1);
  });
