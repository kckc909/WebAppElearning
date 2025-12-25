/**
 * Migration: Fix course lesson count
 * 
 * Chuẩn hóa trường total_lessons trong bảng courses
 * để khớp với số lượng lessons thực tế
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('\n🔧 BẮT ĐẦU CHUẨN HÓA SỐ LƯỢNG LESSONS\n');
  console.log('=' .repeat(60));

  // Lấy tất cả courses
  const courses = await prisma.courses.findMany({
    select: {
      id: true,
      title: true,
      total_lessons: true,
    },
  });

  console.log(`\n📊 Tìm thấy ${courses.length} khóa học\n`);

  let updatedCount = 0;
  let unchangedCount = 0;

  for (const course of courses) {
    // Đếm số lượng lessons thực tế
    const actualLessonCount = await prisma.course_lessons.count({
      where: { course_id: course.id },
    });

    // So sánh với giá trị hiện tại
    if (course.total_lessons !== actualLessonCount) {
      console.log(`\n📝 Khóa học: ${course.title}`);
      console.log(`   ID: ${course.id}`);
      console.log(`   Số lessons trong DB: ${course.total_lessons}`);
      console.log(`   Số lessons thực tế: ${actualLessonCount}`);
      console.log(`   ➜ Cập nhật: ${course.total_lessons} → ${actualLessonCount}`);

      // Cập nhật
      await prisma.courses.update({
        where: { id: course.id },
        data: { total_lessons: actualLessonCount },
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
    console.log(`\n✅ Tất cả khóa học đã có số lượng lessons chính xác!`);
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
