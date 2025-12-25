const mysql = require('mysql2/promise');

async function checkDatabase() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'website_milearn'
  });

  try {
    console.log('📊 Checking database structure...\n');

    // Show all tables
    const [tables] = await connection.query('SHOW TABLES');
    console.log('Tables in database:');
    tables.forEach(row => {
      const tableName = Object.values(row)[0];
      console.log(`  - ${tableName}`);
    });

    console.log('\n');

    // Check if transactions exists
    const [transactionsTables] = await connection.query("SHOW TABLES LIKE 'transactions'");
    console.log(`transactions table exists: ${transactionsTables.length > 0 ? 'YES' : 'NO'}`);

    // Check if invoice_details exists
    const [invoiceDetailsTables] = await connection.query("SHOW TABLES LIKE 'invoice_details'");
    console.log(`invoice_details table exists: ${invoiceDetailsTables.length > 0 ? 'YES' : 'NO'}`);

    // Check if invoices exists
    const [invoicesTables] = await connection.query("SHOW TABLES LIKE 'invoices'");
    console.log(`invoices table exists: ${invoicesTables.length > 0 ? 'YES' : 'NO'}`);

    if (invoicesTables.length > 0) {
      console.log('\n📋 Invoices table structure:');
      const [columns] = await connection.query("DESCRIBE invoices");
      columns.forEach(col => {
        console.log(`  - ${col.Field} (${col.Type}) ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'}`);
      });
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await connection.end();
  }
}

checkDatabase();
