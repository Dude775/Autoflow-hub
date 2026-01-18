import { initDatabase } from './database/db';

// דוגמת N8N workflow JSON
const createWorkflowJson = (workflowName: string, nodes: any[]) => {
  return JSON.stringify({
    name: workflowName,
    nodes: nodes,
    connections: {},
    active: false,
    settings: {},
    versionId: "1.0"
  }, null, 2);
};

const workflows = [
  {
    title: 'LinkedIn Lead Generation Automation',
    description: `אוטומציה מתקדמת לייצור לידים מ-LinkedIn בצורה אוטומטית. המערכת סורקת פרופילים רלוונטיים לפי קריטריונים שהגדרת, שולחת הזמנות חיבור מותאמות אישית, ועוקבת אחרי תגובות. כל ליד חדש נשמר אוטומטית ב-CRM שלך עם כל הפרטים הרלוונטיים. המערכת כוללת AI לניתוח פרופילים וקביעת עדיפויות, שליחת הודעות follow-up אוטומטיות, ומעקב אחרי שיחות. מושלם לצוותי מכירות ו-B2B marketers שרוצים להגדיל את pipeline המכירות ללא מאמץ ידני.`,
    category: 'Marketing',
    price: 0,
    demo_url: 'https://demo.autoflowhub.com/linkedin-leads',
    download_url: 'https://download.autoflowhub.com/workflows/linkedin-leads.json',
    tags: JSON.stringify(['LinkedIn', 'Lead Generation', 'Sales', 'AI', 'CRM']),
    workflow_json: createWorkflowJson('LinkedIn Lead Generation', [
      {
        "id": "linkedin-trigger",
        "type": "n8n-nodes-base.schedule",
        "name": "Daily Scan",
        "position": [250, 300]
      },
      {
        "id": "linkedin-search",
        "type": "n8n-nodes-base.httpRequest",
        "name": "Search LinkedIn Profiles",
        "position": [450, 300]
      },
      {
        "id": "ai-filter",
        "type": "n8n-nodes-base.openAi",
        "name": "AI Profile Analysis",
        "position": [650, 300]
      },
      {
        "id": "send-connection",
        "type": "n8n-nodes-base.httpRequest",
        "name": "Send Connection Request",
        "position": [850, 300]
      },
      {
        "id": "save-to-crm",
        "type": "n8n-nodes-base.hubspot",
        "name": "Save to CRM",
        "position": [1050, 300]
      }
    ])
  },
  {
    title: 'Email to CRM Integration',
    description: `סנכרון אוטומטי בין תיבת המייל שלך ל-CRM. המערכת קוראת מיילים חדשים, מזהה לידים חדשים או עדכונים ללקוחות קיימים, ומעדכנת אוטומטית את ה-CRM. כוללת זיהוי חכם של סוג המייל (פנייה חדשה, תשובה, הזמנת פגישה), חילוץ פרטי התקשרות, ותיוג אוטומטי לפי נושא. המערכת יודעת למנוע כפילויות, לעדכן רשומות קיימות, וליצור משימות follow-up אוטומטיות לצוות המכירות. תומכת ב-Gmail, Outlook, והמוני CRM כמו Salesforce, HubSpot, ו-Pipedrive.`,
    category: 'CRM',
    price: 0,
    demo_url: 'https://demo.autoflowhub.com/email-crm',
    download_url: 'https://download.autoflowhub.com/workflows/email-crm.json',
    tags: JSON.stringify(['Email', 'CRM', 'Salesforce', 'HubSpot', 'Automation']),
    workflow_json: createWorkflowJson('Email to CRM', [
      {
        "id": "email-trigger",
        "type": "n8n-nodes-base.emailReadImap",
        "name": "Read New Emails",
        "position": [250, 300]
      },
      {
        "id": "parse-email",
        "type": "n8n-nodes-base.code",
        "name": "Parse Email Content",
        "position": [450, 300]
      },
      {
        "id": "check-duplicate",
        "type": "n8n-nodes-base.hubspot",
        "name": "Check for Duplicates",
        "position": [650, 300]
      },
      {
        "id": "create-update-contact",
        "type": "n8n-nodes-base.hubspot",
        "name": "Create/Update Contact",
        "position": [850, 300]
      },
      {
        "id": "create-task",
        "type": "n8n-nodes-base.hubspot",
        "name": "Create Follow-up Task",
        "position": [1050, 300]
      }
    ])
  },
  {
    title: 'Social Media Scheduler Pro',
    description: `תזמון ופרסום תוכן אוטומטי לכל הרשתות החברתיות מנקודה אחת. המערכת מאפשרת לך ליצור תוכן פעם אחת ולפרסם אוטומטית ב-Facebook, Instagram, Twitter, LinkedIn ו-TikTok בזמנים אופטימליים. כוללת AI לייצור וריאציות של התוכן לכל פלטפורמה, התאמת גודל תמונות, הצעות להאשטאגים פופולריים, ואנליטיקס מפורט על ביצועים. המערכת יודעת לעבוד עם Google Sheets או Airtable כמקור תוכן, תומכת בתזמון מראש לשבועות קדימה, ושולחת התראות על פרסומים מוצלחים או בעייתיים.`,
    category: 'Social Media',
    price: 0,
    demo_url: 'https://demo.autoflowhub.com/social-scheduler',
    download_url: 'https://download.autoflowhub.com/workflows/social-scheduler.json',
    tags: JSON.stringify(['Social Media', 'Scheduling', 'Instagram', 'Facebook', 'Content']),
    workflow_json: createWorkflowJson('Social Media Scheduler', [
      {
        "id": "schedule-trigger",
        "type": "n8n-nodes-base.schedule",
        "name": "Check Schedule",
        "position": [250, 300]
      },
      {
        "id": "get-content",
        "type": "n8n-nodes-base.googleSheets",
        "name": "Get Content from Sheets",
        "position": [450, 300]
      },
      {
        "id": "ai-optimize",
        "type": "n8n-nodes-base.openAi",
        "name": "AI Content Optimization",
        "position": [650, 300]
      },
      {
        "id": "post-facebook",
        "type": "n8n-nodes-base.facebookGraph",
        "name": "Post to Facebook",
        "position": [850, 250]
      },
      {
        "id": "post-twitter",
        "type": "n8n-nodes-base.twitter",
        "name": "Post to Twitter",
        "position": [850, 350]
      },
      {
        "id": "post-linkedin",
        "type": "n8n-nodes-base.linkedIn",
        "name": "Post to LinkedIn",
        "position": [850, 450]
      }
    ])
  },
  {
    title: 'Automated Invoice Processing',
    description: `עיבוד חשבוניות אוטומטי מקצה לקצה. המערכת קוראת חשבוניות שמגיעות במייל או מתיקייה משותפת, מחלצת אוטומטית את כל הפרטים החשובים (ספק, סכום, תאריך, פריטים), בודקת התאמה להזמנות רכש, ושולחת לאישור מנהלים רלוונטיים. לאחר אישור, החשבונית נרשמת במערכת הנהלת החשבונות ומתוזמן תשלום. המערכת כוללת OCR מתקדם לקריאת חשבוניות סרוקות, זיהוי אוטומטי של חריגות או טעויות, ודוחות חודשיים על הוצאות לפי קטגוריות. חוסכת שעות עבודה ידנית ומפחיתה טעויות אנוש.`,
    category: 'Finance',
    price: 0,
    demo_url: 'https://demo.autoflowhub.com/invoice-processing',
    download_url: 'https://download.autoflowhub.com/workflows/invoice-processing.json',
    tags: JSON.stringify(['Finance', 'Invoices', 'OCR', 'Accounting', 'Automation']),
    workflow_json: createWorkflowJson('Invoice Processing', [
      {
        "id": "email-trigger",
        "type": "n8n-nodes-base.emailReadImap",
        "name": "Monitor Invoice Emails",
        "position": [250, 300]
      },
      {
        "id": "extract-pdf",
        "type": "n8n-nodes-base.extractFromFile",
        "name": "Extract PDF Data",
        "position": [450, 300]
      },
      {
        "id": "ocr-processing",
        "type": "n8n-nodes-base.httpRequest",
        "name": "OCR Text Extraction",
        "position": [650, 300]
      },
      {
        "id": "ai-parse",
        "type": "n8n-nodes-base.openAi",
        "name": "AI Invoice Parser",
        "position": [850, 300]
      },
      {
        "id": "check-po",
        "type": "n8n-nodes-base.postgres",
        "name": "Check Purchase Order",
        "position": [1050, 300]
      },
      {
        "id": "send-approval",
        "type": "n8n-nodes-base.slack",
        "name": "Send for Approval",
        "position": [1250, 300]
      }
    ])
  },
  {
    title: 'Multi-Cloud Data Backup System',
    description: `גיבוי אוטומטי של כל הנתונים החשובים שלך למספר ענני אחסון. המערכת מגבה יומית קבצים מ-Google Drive, Dropbox, OneDrive, ומשרתים מקומיים לשלושה מיקומי גיבוי שונים (AWS S3, Google Cloud Storage, Backblaze). כוללת דחיסה אוטומטית לחיסכון במקום, הצפנה לאבטחה מרבית, וגרסאות היסטוריות של קבצים. המערכת שולחת דוח יומי על הצלחת הגיבוי, מזהה קבצים שהשתנו ומגבה רק שינויים (incremental backup), ומתריעה על בעיות. תומכת בגיבוי בסיסי נתונים, ניהול retention policies, ובדיקות שלמות אוטומטיות.`,
    category: 'Productivity',
    price: 0,
    demo_url: 'https://demo.autoflowhub.com/data-backup',
    download_url: 'https://download.autoflowhub.com/workflows/data-backup.json',
    tags: JSON.stringify(['Backup', 'Cloud Storage', 'Data Security', 'AWS', 'Automation']),
    workflow_json: createWorkflowJson('Data Backup System', [
      {
        "id": "daily-trigger",
        "type": "n8n-nodes-base.schedule",
        "name": "Daily Backup Schedule",
        "position": [250, 300]
      },
      {
        "id": "scan-sources",
        "type": "n8n-nodes-base.googleDrive",
        "name": "Scan Data Sources",
        "position": [450, 300]
      },
      {
        "id": "compress-files",
        "type": "n8n-nodes-base.code",
        "name": "Compress & Encrypt",
        "position": [650, 300]
      },
      {
        "id": "upload-aws",
        "type": "n8n-nodes-base.awsS3",
        "name": "Upload to AWS S3",
        "position": [850, 250]
      },
      {
        "id": "upload-gcs",
        "type": "n8n-nodes-base.googleCloudStorage",
        "name": "Upload to Google Cloud",
        "position": [850, 350]
      },
      {
        "id": "verify-backup",
        "type": "n8n-nodes-base.code",
        "name": "Verify Backup Integrity",
        "position": [1050, 300]
      },
      {
        "id": "send-report",
        "type": "n8n-nodes-base.emailSend",
        "name": "Send Backup Report",
        "position": [1250, 300]
      }
    ])
  }
];

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');
  console.log('');

  try {
    const db = await initDatabase();

    // ניקוי טבלה קיימת
    console.log('🧹 Clearing existing workflows...');
    await db.run('DELETE FROM workflows');
    await db.run('DELETE FROM purchases');
    console.log('✅ Tables cleared');
    console.log('');

    // הכנסת workflows חדשים
    console.log('📝 Inserting new workflows...');
    
    for (const workflow of workflows) {
      const result = await db.run(
        `INSERT INTO workflows (title, description, category, price, demo_url, download_url, tags, workflow_json)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        workflow.title,
        workflow.description,
        workflow.category,
        workflow.price,
        workflow.demo_url,
        workflow.download_url,
        workflow.tags,
        workflow.workflow_json
      );

      console.log(`  ✓ Inserted: ${workflow.title} (ID: ${result.lastID})`);
    }

    console.log('');
    console.log('✅ Database seeding completed successfully!');
    console.log('');
    console.log(`📊 Summary:`);
    console.log(`  - ${workflows.length} workflows added`);
    console.log(`  - All workflows are FREE (price = 0)`);
    console.log(`  - Categories: Marketing, CRM, Social Media, Finance, Productivity`);
    console.log('');
    console.log('🚀 Your AutoFlow Hub library is ready!');
    console.log('   Start the backend: npm run dev');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();