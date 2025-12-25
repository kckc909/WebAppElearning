# Certificate Scripts

Scripts for certificate generation and management.

## Files

### `certificate-template.js`
Template for generating certificate images using Canvas.

**Features:**
- White background with green corner borders
- Blue "M" logo
- Student name, course title, completion date
- Certificate code
- Instructor signature

**Usage:**
```javascript
import { generateCertificateImage } from './certificate-template.js';

const imageBuffer = await generateCertificateImage({
  studentName: 'Nguyễn Văn A',
  courseTitle: 'React Fundamentals',
  completionDate: new Date(),
  certificateCode: 'CERT-20251225-12345',
  instructorName: 'John Doe'
});
```

### `generate-certificates.js`
Batch script to generate certificates for all completed enrollments.

**Usage:**
```bash
node src/modules/certificates/scripts/generate-certificates.js
```

**What it does:**
1. Find all enrollments with 100% progress
2. Check if certificate already exists
3. Generate certificate image
4. Upload to storage server
5. Save certificate record to database

### `certificate-preview.png`
Preview image of certificate template design.

## Certificate Generation Flow

1. Student completes course (100% progress)
2. System auto-generates certificate
3. Certificate image created using template
4. Image uploaded to storage server
5. Certificate URL saved to database
6. Student can view/download certificate

## Configuration

Certificate settings in `certificates.service.ts`:
- Image size: 1200x850px
- Format: PNG
- Storage: Storage server
- Threshold: Configurable per course (default 100%)
