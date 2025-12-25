/**
 * Generate certificate images for existing certificates in database
 * This script:
 * 1. Fetches all certificates from DB
 * 2. Generates PNG image for each certificate using canvas
 * 3. Uploads to storage server
 * 4. Updates certificate_url in DB
 * 
 * Run: node backend/scripts/generate-certificates.js
 */

import { PrismaClient } from '@prisma/client';
import FormData from 'form-data';
import { generateCertificateImage } from './certificate-template.js';

const prisma = new PrismaClient();
const STORAGE_SERVER_URL = process.env.STORAGE_SERVER_URL || 'http://localhost:3001';

/**
 * Upload image to storage server
 */
async function uploadToStorage(imageBuffer, filename) {
  const formData = new FormData();
  formData.append('file', imageBuffer, {
    filename: filename,
    contentType: 'image/png'
  });
  formData.append('context', 'certificates');

  const fetch = (await import('node-fetch')).default;
  const response = await fetch(`${STORAGE_SERVER_URL}/upload`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  const result = await response.json();
  return result.file?.url || result.url;
}

/**
 * Main function
 */
async function main() {
  console.log('🎓 Starting certificate generation...\n');

  try {
    // Fetch all certificates
    const certificates = await prisma.certificates.findMany({
      include: {
        accounts: {
          select: {
            full_name: true
          }
        },
        courses: {
          select: {
            title: true,
            accounts: {
              select: {
                full_name: true
              }
            }
          }
        }
      }
    });

    console.log(`Found ${certificates.length} certificates\n`);

    let generated = 0;
    let skipped = 0;
    let errors = 0;

    for (const cert of certificates) {
      try {
        // Skip if already has URL
        if (cert.certificate_url && cert.certificate_url.startsWith('http')) {
          console.log(`⏭️  Skipping ${cert.certificate_code} - already has URL`);
          skipped++;
          continue;
        }

        console.log(`📝 Generating ${cert.certificate_code}...`);

        // Prepare data
        const certificateData = {
          student_name: cert.accounts.full_name,
          course_title: cert.courses.title,
          instructor_name: cert.courses.accounts.full_name,
          issued_at: cert.issued_at,
          certificate_code: cert.certificate_code
        };

        // Generate image
        const imageBuffer = await generateCertificateImage(certificateData);
        
        // Upload to storage
        const filename = `${cert.certificate_code}.png`;
        const url = await uploadToStorage(imageBuffer, filename);

        // Update database
        await prisma.certificates.update({
          where: { id: cert.id },
          data: { 
            certificate_url: url,
            verification_url: `/verify/${cert.certificate_code}`
          }
        });

        console.log(`✅ Generated and uploaded: ${url}\n`);
        generated++;

      } catch (error) {
        console.error(`❌ Error processing ${cert.certificate_code}:`, error.message, '\n');
        errors++;
      }
    }

    console.log('\n📊 Summary:');
    console.log(`   Generated: ${generated}`);
    console.log(`   Skipped: ${skipped}`);
    console.log(`   Errors: ${errors}`);
    console.log(`   Total: ${certificates.length}`);

  } catch (error) {
    console.error('❌ Fatal error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
