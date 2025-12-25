import { Controller, Get, Query } from '@nestjs/common';
import { Stats_Service } from './stats.service.js';

@Controller('api/stats')
export class Stats_Controller {
  constructor(private readonly statsService: Stats_Service) {}

  /**
   * GET /api/stats/overview
   * Lấy thống kê tổng quan
   */
  @Get('overview')
  async getOverview(@Query('userId') userId?: string) {
    const studentId = userId ? parseInt(userId, 10) : 1;
    return this.statsService.getOverview(studentId);
  }

  /**
   * GET /api/stats/streak
   * Lấy chuỗi ngày học liên tiếp
   */
  @Get('streak')
  async getStreak(@Query('userId') userId?: string) {
    const studentId = userId ? parseInt(userId, 10) : 1;
    return this.statsService.getStreak(studentId);
  }

  /**
   * GET /api/stats/activity
   * Lấy hoạt động học tập theo thời gian
   * Query params: period (week|month|year), userId
   */
  @Get('activity')
  async getActivity(
    @Query('period') period?: 'week' | 'month' | 'year',
    @Query('userId') userId?: string
  ) {
    const studentId = userId ? parseInt(userId, 10) : 1;
    return this.statsService.getActivity(studentId, period || 'month');
  }

  /**
   * GET /api/stats/category-distribution
   * Lấy phân bố theo chủ đề
   */
  @Get('category-distribution')
  async getCategoryDistribution(@Query('userId') userId?: string) {
    const studentId = userId ? parseInt(userId, 10) : 1;
    return this.statsService.getCategoryDistribution(studentId);
  }

  /**
   * GET /api/stats/weekly-activity
   * Lấy hoạt động trong tuần
   */
  @Get('weekly-activity')
  async getWeeklyActivity(@Query('userId') userId?: string) {
    const studentId = userId ? parseInt(userId, 10) : 1;
    return this.statsService.getWeeklyActivity(studentId);
  }

  /**
   * GET /api/stats/course-progress
   * Lấy tiến độ các khóa học
   */
  @Get('course-progress')
  async getCourseProgress(@Query('userId') userId?: string) {
    const studentId = userId ? parseInt(userId, 10) : 1;
    return this.statsService.getCourseProgress(studentId);
  }
}
