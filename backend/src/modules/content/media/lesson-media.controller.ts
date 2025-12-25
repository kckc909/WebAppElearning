import { Controller, Post, Put, Delete, Get, Body, Param, BadRequestException } from '@nestjs/common';
import { LessonMediaService } from './lesson-media.service.js';

@Controller('lesson-media')
export class LessonMediaController {
  constructor(private readonly lessonMediaService: LessonMediaService) {}

  /**
   * Create media block in lesson
   * POST /lesson-media/block
   */
  @Post('block')
  async createMediaBlock(@Body() body: {
    lesson_version_id: number;
    slot_id: string;
    order_index: number;
    media_url: string;
    caption?: string;
    alt_text?: string;
  }) {
    if (!body.lesson_version_id || !body.slot_id || body.order_index === undefined || !body.media_url) {
      throw new BadRequestException('Missing required fields');
    }

    return await this.lessonMediaService.createMediaBlock(body);
  }

  /**
   * Batch create media blocks
   * POST /lesson-media/block/batch
   */
  @Post('block/batch')
  async createMediaBlocksBatch(@Body() body: {
    items: Array<{
      lesson_version_id: number;
      slot_id: string;
      order_index: number;
      media_url: string;
      caption?: string;
      alt_text?: string;
    }>;
  }) {
    if (!body.items || !Array.isArray(body.items)) {
      throw new BadRequestException('Items array is required');
    }

    return await this.lessonMediaService.createMediaBlocksBatch(body.items);
  }

  /**
   * Update media block
   * PUT /lesson-media/block/:blockId
   */
  @Put('block/:blockId')
  async updateMediaBlock(
    @Param('blockId') blockId: string,
    @Body() body: {
      media_url?: string;
      caption?: string;
      alt_text?: string;
      settings?: any;
    }
  ) {
    const id = parseInt(blockId);
    if (isNaN(id)) {
      throw new BadRequestException('Invalid block ID');
    }

    return await this.lessonMediaService.updateMediaBlock(id, body);
  }

  /**
   * Delete media block
   * DELETE /lesson-media/block/:blockId
   */
  @Delete('block/:blockId')
  async deleteMediaBlock(@Param('blockId') blockId: string) {
    const id = parseInt(blockId);
    if (isNaN(id)) {
      throw new BadRequestException('Invalid block ID');
    }

    return await this.lessonMediaService.deleteMediaBlock(id);
  }

  /**
   * Get media blocks for lesson version
   * GET /lesson-media/version/:versionId
   */
  @Get('version/:versionId')
  async getMediaBlocksForVersion(@Param('versionId') versionId: string) {
    const id = parseInt(versionId);
    if (isNaN(id)) {
      throw new BadRequestException('Invalid version ID');
    }

    return await this.lessonMediaService.getMediaBlocksForVersion(id);
  }

  /**
   * Clone media blocks to new version
   * POST /lesson-media/clone
   */
  @Post('clone')
  async cloneMediaBlocks(@Body() body: {
    source_version_id: number;
    target_version_id: number;
  }) {
    if (!body.source_version_id || !body.target_version_id) {
      throw new BadRequestException('Source and target version IDs are required');
    }

    return await this.lessonMediaService.cloneMediaBlocksToNewVersion(
      body.source_version_id,
      body.target_version_id,
    );
  }

  /**
   * Validate media blocks before publishing
   * GET /lesson-media/validate/:versionId
   */
  @Get('validate/:versionId')
  async validateMediaBlocks(@Param('versionId') versionId: string) {
    const id = parseInt(versionId);
    if (isNaN(id)) {
      throw new BadRequestException('Invalid version ID');
    }

    return await this.lessonMediaService.validateMediaBlocks(id);
  }
}
