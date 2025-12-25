/**
 * Certificate Template Generator
 * Modern, clean design with corner borders
 */

import { createCanvas } from 'canvas';

/**
 * Generate certificate image
 * 
 * @param {Object} data - Certificate data
 * @param {string} data.student_name - Student full name
 * @param {string} data.course_title - Course title
 * @param {string} data.instructor_name - Instructor full name
 * @param {Date} data.issued_at - Issue date
 * @param {string} data.certificate_code - Certificate code (CERT-YYYYMMDD-XXXXX)
 * @returns {Buffer} PNG image buffer
 */
export async function generateCertificateImage(data) {
  const { student_name, course_title, instructor_name, issued_at, certificate_code } = data;
  
  // ============================================
  // CONFIGURATION
  // ============================================
  
  const CONFIG = {
    // Canvas size
    width: 1200,
    height: 850,
    
    // Colors
    colors: {
      background: '#ffffff',
      primary: '#10b981',      // Green for borders
      secondary: '#3b82f6',    // Blue for logo and student name
      textDark: '#1f2937',     // Dark gray for main text
      textLight: '#9ca3af',    // Light gray for labels
      
      logoBackground: '#3b82f6',
      logoText: '#ffffff',
    },
    
    // Border
    border: {
      color: '#10b981',
      width: 8,
      cornerLength: 100,
      margin: 30,
    },
  };
  
  const { width, height, colors, border } = CONFIG;
  
  // ============================================
  // CREATE CANVAS
  // ============================================
  
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // ============================================
  // 1. BACKGROUND
  // ============================================
  
  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, width, height);

  // ============================================
  // 2. CORNER BORDERS
  // ============================================
  
  ctx.strokeStyle = colors.primary;
  ctx.lineWidth = border.width;
  ctx.lineCap = 'round';
  
  const m = border.margin;
  const len = border.cornerLength;
  
  // Top-left corner
  ctx.beginPath();
  ctx.moveTo(m + len, m);
  ctx.lineTo(m, m);
  ctx.lineTo(m, m + len);
  ctx.stroke();
  
  // Top-right corner
  ctx.beginPath();
  ctx.moveTo(width - m - len, m);
  ctx.lineTo(width - m, m);
  ctx.lineTo(width - m, m + len);
  ctx.stroke();
  
  // Bottom-left corner
  ctx.beginPath();
  ctx.moveTo(m, height - m - len);
  ctx.lineTo(m, height - m);
  ctx.lineTo(m + len, height - m);
  ctx.stroke();
  
  // Bottom-right corner
  ctx.beginPath();
  ctx.moveTo(width - m - len, height - m);
  ctx.lineTo(width - m, height - m);
  ctx.lineTo(width - m, height - m - len);
  ctx.stroke();

  // ============================================
  // 3. LOGO "M"
  // ============================================
  
  const logoSize = 100;
  const logoX = width / 2;
  const logoY = 120;
  
  // Circle background
  ctx.fillStyle = colors.logoBackground;
  ctx.beginPath();
  ctx.arc(logoX, logoY, logoSize / 2, 0, Math.PI * 2);
  ctx.fill();
  
  // Letter "M"
  ctx.fillStyle = colors.logoText;
  ctx.font = 'bold 60px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('M', logoX, logoY);

  // ============================================
  // 4. TITLE
  // ============================================
  
  ctx.fillStyle = colors.textDark;
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('CHỨNG CHỈ HOÀN THÀNH', width / 2, 230);
  
  // Subtitle
  ctx.fillStyle = colors.textLight;
  ctx.font = '20px Arial';
  ctx.fillText('CERTIFICATE OF COMPLETION', width / 2, 265);

  // ============================================
  // 5. STUDENT SECTION
  // ============================================
  
  // Label
  ctx.fillStyle = colors.textLight;
  ctx.font = '18px Arial';
  ctx.fillText('Chứng nhận rằng', width / 2, 340);
  
  // Student name (blue)
  ctx.fillStyle = colors.secondary;
  ctx.font = 'bold 42px Arial';
  ctx.fillText(student_name, width / 2, 395);
  
  // Underline
  ctx.strokeStyle = colors.secondary;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 180, 410);
  ctx.lineTo(width / 2 + 180, 410);
  ctx.stroke();

  // ============================================
  // 6. COURSE SECTION
  // ============================================
  
  // Label
  ctx.fillStyle = colors.textLight;
  ctx.font = '18px Arial';
  ctx.fillText('Đã hoàn thành xuất sắc khóa học', width / 2, 470);
  
  // Course title (dark, bold)
  ctx.fillStyle = colors.textDark;
  ctx.font = 'bold 32px Arial';
  
  // Wrap text if too long
  const maxWidth = width - 200;
  const words = course_title.split(' ');
  let line = '';
  let y = 520;
  
  for (let word of words) {
    const testLine = line + word + ' ';
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && line !== '') {
      ctx.fillText(line.trim(), width / 2, y);
      line = word + ' ';
      y += 40;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), width / 2, y);

  // ============================================
  // 7. INSTRUCTOR AND DATE
  // ============================================
  
  const infoY = 630;
  
  // Instructor (left)
  ctx.fillStyle = colors.textDark;
  ctx.font = 'bold 18px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Giảng viên', width / 2 - 200, infoY);
  
  ctx.fillStyle = colors.textLight;
  ctx.font = '16px Arial';
  ctx.fillText(instructor_name, width / 2 - 200, infoY + 25);
  
  // Date (right)
  const date = new Date(issued_at);
  const formattedDate = date.toLocaleDateString('vi-VN', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  });
  
  ctx.fillStyle = colors.textDark;
  ctx.font = 'bold 18px Arial';
  ctx.fillText('Ngày cấp', width / 2 + 200, infoY);
  
  ctx.fillStyle = colors.textLight;
  ctx.font = '16px Arial';
  ctx.fillText(formattedDate, width / 2 + 200, infoY + 25);

  // ============================================
  // 8. FOOTER SECTION
  // ============================================
  
  const footerY = 750;
  
  // Award icon (center)
  ctx.fillStyle = colors.primary;
  ctx.beginPath();
  ctx.arc(width / 2, footerY, 25, 0, Math.PI * 2);
  ctx.fill();
  
  // Ribbon
  ctx.fillRect(width / 2 - 3, footerY + 15, 6, 20);
  ctx.fillRect(width / 2 - 10, footerY + 30, 6, 15);
  ctx.fillRect(width / 2 + 4, footerY + 30, 6, 15);
  
  // Instructor signature (left)
  ctx.fillStyle = colors.textDark;
  ctx.font = 'bold 18px Arial';
  ctx.textAlign = 'left';
  ctx.fillText(instructor_name, 150, footerY);
  
  ctx.fillStyle = colors.textLight;
  ctx.font = '14px Arial';
  ctx.fillText('Giảng viên', 150, footerY + 20);
  
  // MiLearn Certified (center)
  ctx.fillStyle = colors.textLight;
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('MiLearn Certified', width / 2, footerY + 60);
  
  // MiLearn (right)
  ctx.fillStyle = colors.textDark;
  ctx.font = 'bold 18px Arial';
  ctx.textAlign = 'right';
  ctx.fillText('MiLearn', width - 150, footerY);
  
  ctx.fillStyle = colors.textLight;
  ctx.font = '14px Arial';
  ctx.fillText('Ban giám đốc', width - 150, footerY + 20);

  // ============================================
  // 9. CERTIFICATE CODE (very small, bottom)
  // ============================================
  
  ctx.fillStyle = colors.textLight;
  ctx.font = '10px monospace';
  ctx.textAlign = 'center';
  ctx.globalAlpha = 0.5;
  ctx.fillText(certificate_code, width / 2, height - 15);
  ctx.globalAlpha = 1;

  // ============================================
  // EXPORT
  // ============================================
  
  return canvas.toBuffer('image/png');
}

// ============================================
// PREVIEW FUNCTION (for testing)
// ============================================

/**
 * Generate a preview certificate for testing
 * Run: node backend/scripts/certificate-template.js
 */
export async function generatePreview() {
  const sampleData = {
    student_name: 'Nguyễn Văn A',
    course_title: 'ReactJS cho Người Mới Bắt Đầu - Xây Dựng Web App 2024',
    instructor_name: 'Trần Thị B',
    issued_at: new Date(),
    certificate_code: 'CERT-20251225-ABCDE'
  };

  const buffer = await generateCertificateImage(sampleData);
  
  // Save to file
  const fs = await import('fs');
  fs.writeFileSync('certificate-preview.png', buffer);
  
  console.log('✅ Preview saved to: certificate-preview.png');
}

// Run preview if executed directly
if (import.meta.url.endsWith('certificate-template.js')) {
  generatePreview().catch(console.error);
}
