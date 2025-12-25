/**
 * Migration script: Rename transactions to invoice_details
 * and restructure invoice relationships
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

async function runMigration() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'website_milearn'
  });

  try {
    console.log('🔄 Starting migration: Rename transactions to invoice_details...\n');

    // Step 1: Check if transactions table exists
    const [tables] = await connection.query("SHOW TABLES LIKE 'transactions'");
    if (tables.length === 0) {
      console.log('❌ transactions table does not exist. Aborting.');
      return;
    }

    // Step 2: Check if invoices table exists
    const [invoicesTables] = await connection.query("SHOW TABLES LIKE 'invoices'");
    if (invoicesTables.length === 0) {
      console.log('❌ invoices table does not exist. Aborting.');
      return;
    }

    console.log('✅ Both tables exist. Proceeding with migration...\n');

    // Step 3: Start transaction
    await connection.beginTransaction();

    // Step 4: Rename transactions to invoice_details
    console.log('📝 Step 1: Renaming transactions table to invoice_details...');
    await connection.query('RENAME TABLE transactions TO invoice_details');
    console.log('✅ Table renamed successfully\n');

    // Step 5: Add invoice_id column to invoice_details (temporarily nullable)
    console.log('📝 Step 2: Adding invoice_id column to invoice_details...');
    await connection.query(`
      ALTER TABLE invoice_details 
      ADD COLUMN invoice_id INT NULL AFTER id
    `);
    console.log('✅ Column added successfully\n');

    // Step 6: Create a default invoice for existing invoice_details
    console.log('📝 Step 3: Creating default invoice for existing records...');
    const [existingDetails] = await connection.query('SELECT COUNT(*) as count FROM invoice_details');
    
    if (existingDetails[0].count > 0) {
      // Get first user_id from invoice_details
      const [firstDetail] = await connection.query('SELECT user_id FROM invoice_details LIMIT 1');
      const userId = firstDetail[0]?.user_id || 1;

      // Create a default invoice
      const [invoiceResult] = await connection.query(`
        INSERT INTO invoices (invoice_number, user_id, total_amount, subtotal, discount, tax, payment_method, status, issued_at, paid_at)
        VALUES ('INV-MIGRATION-00001', ?, 0, 0, 0, 0, 'bank_transfer', 'paid', NOW(), NOW())
      `, [userId]);

      const defaultInvoiceId = invoiceResult.insertId;
      console.log(`✅ Created default invoice with ID: ${defaultInvoiceId}\n`);

      // Update all invoice_details to point to this invoice
      console.log('📝 Step 4: Linking existing invoice_details to default invoice...');
      await connection.query(`
        UPDATE invoice_details 
        SET invoice_id = ?
        WHERE invoice_id IS NULL
      `, [defaultInvoiceId]);
      console.log('✅ All invoice_details linked successfully\n');
    }

    // Step 7: Make invoice_id NOT NULL
    console.log('📝 Step 5: Making invoice_id NOT NULL...');
    await connection.query(`
      ALTER TABLE invoice_details 
      MODIFY COLUMN invoice_id INT NOT NULL
    `);
    console.log('✅ Column constraint updated\n');

    // Step 8: Add foreign key constraint
    console.log('📝 Step 6: Adding foreign key constraint...');
    await connection.query(`
      ALTER TABLE invoice_details 
      ADD CONSTRAINT invoice_details_invoice_id_fkey 
      FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE
    `);
    console.log('✅ Foreign key added successfully\n');

    // Step 9: Add index
    console.log('📝 Step 7: Adding index on invoice_id...');
    await connection.query(`
      ALTER TABLE invoice_details 
      ADD INDEX invoice_details_invoice_id_idx (invoice_id)
    `);
    console.log('✅ Index added successfully\n');

    // Step 10: Drop old columns from invoices table
    console.log('📝 Step 8: Removing old columns from invoices table...');
    
    // Check if transaction_id exists
    const [columns] = await connection.query(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = 'website_milearn' 
      AND TABLE_NAME = 'invoices' 
      AND COLUMN_NAME = 'transaction_id'
    `);

    if (columns.length > 0) {
      // Drop foreign key first
      const [fks] = await connection.query(`
        SELECT CONSTRAINT_NAME 
        FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
        WHERE TABLE_SCHEMA = 'website_milearn' 
        AND TABLE_NAME = 'invoices' 
        AND COLUMN_NAME = 'transaction_id'
        AND REFERENCED_TABLE_NAME IS NOT NULL
      `);

      if (fks.length > 0) {
        await connection.query(`ALTER TABLE invoices DROP FOREIGN KEY ${fks[0].CONSTRAINT_NAME}`);
        console.log('  ✅ Dropped foreign key constraint');
      }

      await connection.query('ALTER TABLE invoices DROP COLUMN transaction_id');
      console.log('  ✅ Dropped transaction_id column');
    }

    // Check if invoice_items exists
    const [itemsColumns] = await connection.query(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = 'website_milearn' 
      AND TABLE_NAME = 'invoices' 
      AND COLUMN_NAME = 'invoice_items'
    `);

    if (itemsColumns.length > 0) {
      await connection.query('ALTER TABLE invoices DROP COLUMN invoice_items');
      console.log('  ✅ Dropped invoice_items column');
    }

    console.log('✅ Old columns removed successfully\n');

    // Commit transaction
    await connection.commit();
    console.log('✅ Migration completed successfully!\n');

    // Show summary
    const [detailsCount] = await connection.query('SELECT COUNT(*) as count FROM invoice_details');
    const [invoicesCount] = await connection.query('SELECT COUNT(*) as count FROM invoices');
    
    console.log('📊 Summary:');
    console.log(`   - invoice_details records: ${detailsCount[0].count}`);
    console.log(`   - invoices records: ${invoicesCount[0].count}`);

  } catch (error) {
    await connection.rollback();
    console.error('❌ Migration failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

runMigration();
