import { initDatabase } from './database/db';

async function verifyWorkflows() {
  console.log('✅ Verifying workflows in database...\n');
  
  try {
    const db = await initDatabase();

    const count = await db.get('SELECT COUNT(*) as count FROM workflows');
    console.log(`Total workflows: ${count.count}`);

    const paid = await db.get('SELECT COUNT(*) as count FROM workflows WHERE price > 0');
    console.log(`Paid workflows: ${paid.count}`);
    
    const free = await db.get('SELECT COUNT(*) as count FROM workflows WHERE price = 0');
    console.log(`Free workflows: ${free.count}\n`);

    if (paid.count > 0) {
      console.log('❌ ERROR: Found paid workflows!');
      const paidList = await db.all('SELECT id, title, price FROM workflows WHERE price > 0');
      paidList.forEach(w => console.log(`  - ${w.title}: ₪${w.price}`));
    } else {
      console.log('✅ SUCCESS: All workflows are FREE!');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

verifyWorkflows();
