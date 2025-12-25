/**
 * Prisma Middleware: Auto-update course statistics
 * 
 * Tự động cập nhật total_lessons và total_duration khi:
 * - Tạo lesson mới
 * - Cập nhật lesson (duration)
 * - Xóa lesson
 */

import { Prisma } from '@prisma/client';

export function createUpdateCourseStatsMiddleware() {
  return async (
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<any>
  ) => {
    // Chỉ xử lý với model course_lessons
    if (params.model !== 'course_lessons') {
      return next(params);
    }

    // Lấy course_id từ data hoặc where
    let courseId: number | undefined;

    if (params.action === 'create' && params.args.data) {
      courseId = params.args.data.course_id;
    } else if (
      (params.action === 'update' || params.action === 'delete') &&
      params.args.where
    ) {
      // Cần fetch lesson để lấy course_id
      const lesson = await (params as any).runInTransaction
        ? (params as any).runInTransaction.course_lessons.findUnique({
            where: params.args.where,
            select: { course_id: true },
          })
        : null;
      courseId = lesson?.course_id;
    }

    // Thực hiện action gốc
    const result = await next(params);

    // Cập nhật course stats nếu có courseId
    if (courseId) {
      await updateCourseStats(params, courseId);
    }

    return result;
  };
}

async function updateCourseStats(
  params: Prisma.MiddlewareParams,
  courseId: number
) {
  try {
    // Lấy prisma client từ params
    const prisma = (params as any).runInTransaction || (params as any).prisma;
    
    if (!prisma) return;

    // Đếm lessons và tính tổng duration
    const lessons = await prisma.course_lessons.findMany({
      where: { course_id: courseId },
      select: { duration: true },
    });

    const totalLessons = lessons.length;
    const totalDuration = lessons.reduce(
      (sum: number, lesson: any) => sum + (lesson.duration || 0),
      0
    );

    // Cập nhật course
    await prisma.courses.update({
      where: { id: courseId },
      data: {
        total_lessons: totalLessons,
        total_duration: totalDuration,
      },
    });

    console.log(
      `✅ Updated course ${courseId}: ${totalLessons} lessons, ${totalDuration} minutes`
    );
  } catch (error) {
    console.error('Error updating course stats:', error);
  }
}
