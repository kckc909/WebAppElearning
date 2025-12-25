/**
 * Migration: Fix all course statistics
 * 
 * Chuẩn hóa tất cả các trường thống kê trong bảng courses:
 * - total_lessons: Số lượng lessons thực tế
 * - total_duration: Tổng thời lượng từ tất cả lessons
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('\n🔧 BẮT ĐẦU CHUẨN HÓA THỐNG KÊ KHÓA HỌC\n');
  console.log('=' .repeat(60));

  // Lấy tất cả courses
  const courses = await prisma.courses.findMany({
    select: {
      id: true,
      title: true,
      total_lessons: true,
      total_duration: true,
    },
  });

  console.log(`\n📊 Tìm thấy ${courses.length} khóa học\n`);

  let updatedCount = 0;

  for (const course of courses) {
    // Lấy tất cả lessons của khóa học
    const lessons = await prisma.course_lessons.findMany({
      where: { course_id: course.id },
      select: { duration: true },
    });

    // Tính toán thống kê thực tế
    const actualLessonCount = lessons.length;
    const actualDuration = lessons.reduce((sum, lesson) => sum + (lesson.duration || 0), 0);

    // Kiểm tra xem có cần cập nhật không
    const needsUpdate = 
      course.total_lessons !== actualLessonCount || 
      course.total_duration !== actualDuration;

    if (needsUpdate) {
      console.log(`\n📝 Khóa học: ${course.title}`);
      console.log(`   ID: ${course.id}`);
      
      if (course.total_lessons !== actualLessonCount) {
        console.log(`   📚 Lessons: ${course.total_lessons} → ${actualLessonCount}`);
      }
      
      if (course.total_duration !== actualDuration) {
        console.log(`   ⏱️  Duration: ${course.total_duration} phút → ${actualDuration} phút (${Math.floor(actualDuration / 60)}h ${actualDuration % 60}m)`);
      }

      // Cập nhật
      await prisma.courses.update({
        where: { id: course.id },
        data: {
          total_lessons: actualLessonCount,
          total_duration: actualDuration,
        },
      });

      updatedCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ HOÀN THÀNH!');
  console.log('=' .repeat(60));
  console.log(`\n📊 Tổng kết:`);
  console.log(`   - Tổng số khóa học: ${courses.length}`);
  console.log(`   - Đã cập nhật: ${updatedCount} khóa học`);
  console.log(`   - Không thay đổi: ${courses.length - updatedCount} khóa học`);
  
  if (updatedCount > 0) {
    console.log(`\n✨ Đã chuẩn hóa thành công ${updatedCount} khóa học!`);
    console.log(`\n💡 Lưu ý: Học viên giờ có thể hoàn thành khóa học chính xác!`);
  } else {
    console.log(`\n✅ Tất cả khóa học đã có thống kê chính xác!`);
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
