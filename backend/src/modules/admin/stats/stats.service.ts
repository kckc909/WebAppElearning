import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service.js';

@Injectable()
export class Stats_Service {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Lấy thống kê tổng quan của học viên
   */
  async getOverview(studentId: number) {
    try {
      // Lấy tất cả enrollments
      const enrollments = await this.prisma.course_enrollments.findMany({
        where: { student_id: studentId },
        include: {
          courses: {
            select: {
              id: true,
              title: true,
              total_duration: true,
              category_id: true,
              course_categories: {
                select: { name: true }
              }
            }
          },
          lesson_progress: {
            select: {
              time_spent: true,
              is_completed: true,
              completed_at: true,
              last_accessed_at: true
            }
          }
        }
      });

      // Tính tổng giờ học (từ time_spent thực tế)
      const totalMinutes = enrollments.reduce((sum, enrollment) => {
        const lessonMinutes = enrollment.lesson_progress.reduce(
          (lessonSum, progress) => lessonSum + (progress.time_spent || 0),
          0
        );
        return sum + lessonMinutes;
      }, 0);

      // Đếm khóa học hoàn thành
      const completedCourses = enrollments.filter(e => e.progress >= 100).length;

      // Đếm chứng chỉ
      const certificates = await this.prisma.certificates.count({
        where: { student_id: studentId }
      });

      return {
        total_hours: Math.round(totalMinutes / 60 * 10) / 10, // Làm tròn 1 chữ số
        total_courses: enrollments.length,
        completed_courses: completedCourses,
        certificates: certificates,
        completion_rate: enrollments.length > 0 
          ? Math.round((completedCourses / enrollments.length) * 100) 
          : 0
      };
    } catch (error) {
      console.error('Error in getOverview:', error);
      return {
        total_hours: 0,
        total_courses: 0,
        completed_courses: 0,
        certificates: 0,
        completion_rate: 0
      };
    }
  }

  /**
   * Lấy streak (chuỗi ngày học liên tiếp)
   * Dựa trên last_accessed_at của lesson_progress
   */
  async getStreak(studentId: number) {
    try {
      // Lấy tất cả ngày học (distinct dates từ last_accessed_at)
      const progressRecords = await this.prisma.lesson_progress.findMany({
        where: {
          course_enrollments: {
            student_id: studentId
          },
          last_accessed_at: {
            not: null
          }
        },
        select: {
          last_accessed_at: true
        },
        orderBy: {
          last_accessed_at: 'desc'
        }
      });

      if (progressRecords.length === 0) {
        return { current_streak: 0, longest_streak: 0 };
      }

      // Chuyển thành array các ngày (YYYY-MM-DD)
      const uniqueDates = [...new Set(
        progressRecords
          .map(p => p.last_accessed_at?.toISOString().split('T')[0])
          .filter(Boolean)
      )].sort().reverse();

      // Tính current streak
      let currentStreak = 0;
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

      // Kiểm tra nếu học hôm nay hoặc hôm qua
      if (uniqueDates[0] === today || uniqueDates[0] === yesterday) {
        currentStreak = 1;
        let checkDate = new Date(uniqueDates[0]);
        
        for (let i = 1; i < uniqueDates.length; i++) {
          checkDate.setDate(checkDate.getDate() - 1);
          const expectedDate = checkDate.toISOString().split('T')[0];
          
          if (uniqueDates[i] === expectedDate) {
            currentStreak++;
          } else {
            break;
          }
        }
      }

      // Tính longest streak
      let longestStreak = 0;
      let tempStreak = 1;

      for (let i = 1; i < uniqueDates.length; i++) {
        const prevDateStr = uniqueDates[i - 1];
        const currDateStr = uniqueDates[i];
        
        if (!prevDateStr || !currDateStr) continue;
        
        const prevDate = new Date(prevDateStr);
        const currDate = new Date(currDateStr);
        const diffDays = Math.round((prevDate.getTime() - currDate.getTime()) / 86400000);

        if (diffDays === 1) {
          tempStreak++;
          longestStreak = Math.max(longestStreak, tempStreak);
        } else {
          tempStreak = 1;
        }
      }

      longestStreak = Math.max(longestStreak, currentStreak);

      return {
        current_streak: currentStreak,
        longest_streak: longestStreak
      };
    } catch (error) {
      console.error('Error in getStreak:', error);
      return { current_streak: 0, longest_streak: 0 };
    }
  }

  /**
   * Lấy hoạt động học tập theo thời gian
   * Dựa trên last_accessed_at và time_spent
   */
  async getActivity(studentId: number, period: 'week' | 'month' | 'year' = 'month') {
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'year':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
    }

    const progressRecords = await this.prisma.lesson_progress.findMany({
      where: {
        course_enrollments: {
          student_id: studentId
        },
        last_accessed_at: {
          gte: startDate
        }
      },
      select: {
        last_accessed_at: true,
        time_spent: true
      }
    });

    // Group by date
    const activityMap = new Map<string, number>();

    progressRecords.forEach(record => {
      if (record.last_accessed_at) {
        const date = record.last_accessed_at.toISOString().split('T')[0];
        const current = activityMap.get(date) || 0;
        activityMap.set(date, current + (record.time_spent || 0));
      }
    });

    // Convert to array
    const activity = Array.from(activityMap.entries())
      .map(([date, minutes]) => ({
        date,
        minutes,
        hours: Math.round(minutes / 60 * 10) / 10
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return activity;
  }

  /**
   * Lấy phân bố theo chủ đề (category)
   */
  async getCategoryDistribution(studentId: number) {
    const enrollments = await this.prisma.course_enrollments.findMany({
      where: { student_id: studentId },
      include: {
        courses: {
          select: {
            category_id: true,
            course_categories: {
              select: { name: true }
            }
          }
        },
        lesson_progress: {
          select: {
            time_spent: true
          }
        }
      }
    });

    // Group by category
    const categoryMap = new Map<string, { count: number; minutes: number }>();

    enrollments.forEach(enrollment => {
      const categoryName = enrollment.courses.course_categories?.name || 'Khác';
      const totalMinutes = enrollment.lesson_progress.reduce(
        (sum, p) => sum + (p.time_spent || 0),
        0
      );

      const current = categoryMap.get(categoryName) || { count: 0, minutes: 0 };
      categoryMap.set(categoryName, {
        count: current.count + 1,
        minutes: current.minutes + totalMinutes
      });
    });

    // Convert to array
    const distribution = Array.from(categoryMap.entries()).map(([name, data]) => ({
      category: name,
      courses: data.count,
      hours: Math.round(data.minutes / 60 * 10) / 10,
      percentage: 0 // Will calculate below
    }));

    // Calculate percentage
    const totalCourses = distribution.reduce((sum, d) => sum + d.courses, 0);
    distribution.forEach(d => {
      d.percentage = totalCourses > 0 
        ? Math.round((d.courses / totalCourses) * 100) 
        : 0;
    });

    return distribution;
  }

  /**
   * Lấy hoạt động trong tuần (theo ngày trong tuần)
   */
  async getWeeklyActivity(studentId: number) {
    const now = new Date();
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const progressRecords = await this.prisma.lesson_progress.findMany({
      where: {
        course_enrollments: {
          student_id: studentId
        },
        last_accessed_at: {
          gte: last30Days
        }
      },
      select: {
        last_accessed_at: true,
        time_spent: true
      }
    });

    // Group by day of week (0 = Sunday, 6 = Saturday)
    const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const weekActivity = weekDays.map((day, index) => ({
      day,
      minutes: 0,
      hours: 0
    }));

    progressRecords.forEach(record => {
      if (record.last_accessed_at) {
        const dayOfWeek = record.last_accessed_at.getDay();
        weekActivity[dayOfWeek].minutes += record.time_spent || 0;
      }
    });

    // Calculate hours
    weekActivity.forEach(day => {
      day.hours = Math.round(day.minutes / 60 * 10) / 10;
    });

    return weekActivity;
  }

  /**
   * Lấy tiến độ các khóa học
   */
  async getCourseProgress(studentId: number) {
    try {
      const enrollments = await this.prisma.course_enrollments.findMany({
        where: { student_id: studentId },
        include: {
          courses: {
            select: {
              id: true,
              title: true,
              thumbnail_url: true,
              total_lessons: true
            }
          },
          lesson_progress: true // Get all lesson progress, not just completed
        },
        orderBy: {
          enrolled_at: 'desc'
        }
      });

      return enrollments.map(enrollment => {
        // Count completed lessons from lesson_progress
        const completedLessons = enrollment.lesson_progress.filter(
          lp => lp.is_completed === true
        ).length;

        return {
          course_id: enrollment.courses.id,
          title: enrollment.courses.title,
          thumbnail: enrollment.courses.thumbnail_url,
          progress: enrollment.progress, // Use progress from enrollment
          completed_lessons: completedLessons,
          total_lessons: enrollment.courses.total_lessons,
          status: enrollment.status,
          last_accessed: enrollment.last_accessed_at
        };
      });
    } catch (error) {
      console.error('Error in getCourseProgress:', error);
      return [];
    }
  }
}
