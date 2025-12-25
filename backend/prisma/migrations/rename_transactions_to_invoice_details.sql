-- Rename transactions table to invoice_details
RENAME TABLE transactions TO invoice_details;

-- Drop old invoices table columns and add new structure
ALTER TABLE invoices 
  DROP FOREIGN KEY invoices_transaction_id_fkey,
  DROP INDEX invoices_transaction_id_idx,
  DROP COLUMN transaction_id,
  DROP COLUMN invoice_items;

-- Add invoice_id to invoice_details
ALTER TABLE invoice_details 
  ADD COLUMN invoice_id INT NOT NULL AFTER id,
  ADD INDEX invoice_details_invoice_id_idx (invoice_id),
  ADD CONSTRAINT invoice_details_invoice_id_fkey 
    FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE;
