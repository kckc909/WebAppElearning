/**
 * Migration: Fix course duration
 * 
 * Chuẩn hóa trường total_duration trong bảng courses
 * để khớp với tổng duration của tất cả lessons
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('\n⏱️  BẮT ĐẦU CHUẨN HÓA THỜI LƯỢNG KHÓA HỌC\n');
  console.log('=' .repeat(60));

  // Lấy tất cả courses
  const courses = await prisma.courses.findMany({
    select: {
      id: true,
      title: true,
      total_duration: true,
    },
  });

  console.log(`\n📊 Tìm thấy ${courses.length} khóa học\n`);

  let updatedCount = 0;
  let unchangedCount = 0;

  for (const course of courses) {
    // Tính tổng duration thực tế từ tất cả lessons
    const lessons = await prisma.course_lessons.findMany({
      where: { course_id: course.id },
      select: { duration: true },
    });

    const actualDuration = lessons.reduce((sum, lesson) => sum + (lesson.duration || 0), 0);

    // So sánh với giá trị hiện tại
    if (course.total_duration !== actualDuration) {
      console.log(`\n📝 Khóa học: ${course.title}`);
      console.log(`   ID: ${course.id}`);
      console.log(`   Thời lượng trong DB: ${course.total_duration} phút`);
      console.log(`   Thời lượng thực tế: ${actualDuration} phút`);
      console.log(`   ➜ Cập nhật: ${course.total_duration} → ${actualDuration}`);

      // Cập nhật
      await prisma.courses.update({
        where: { id: course.id },
        data: { total_duration: actualDuration },
      });

      updatedCount++;
    } else {
      unchangedCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ HOÀN THÀNH!');
  console.log('=' .repeat(60));
  console.log(`\n📊 Tổng kết:`);
  console.log(`   - Tổng số khóa học: ${courses.length}`);
  console.log(`   - Đã cập nhật: ${updatedCount} khóa học`);
  console.log(`   - Không thay đổi: ${unchangedCount} khóa học`);
  
  if (updatedCount > 0) {
    console.log(`\n✨ Đã chuẩn hóa thành công ${updatedCount} khóa học!`);
  } else {
    console.log(`\n✅ Tất cả khóa học đã có thời lượng chính xác!`);
  }
}

main()
  .catch((e) => {
    console.error('\n❌ LỖI:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
