import { initDatabase } from '../database/db';

async function addImageColumn() {
  try {
    const db = await initDatabase();

    // בדיקה אם העמודה כבר קיימת
    const tableInfo = await db.all("PRAGMA table_info(workflows)");
    const hasImageUrl = tableInfo.some((col: any) => col.name === 'image_url');

    if (hasImageUrl) {
      console.log('✅ Column image_url already exists');
      return;
    }

    // הוספת העמודה
    await db.exec('ALTER TABLE workflows ADD COLUMN image_url TEXT');

    console.log('✅ Successfully added image_url column to workflows table');

  } catch (error) {
    console.error('❌ Error adding image_url column:', error);
    throw error;
  }
}

// הרצת הסקריפט
addImageColumn()
  .then(() => {
    console.log('✅ Migration completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  });
