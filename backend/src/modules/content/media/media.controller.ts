import { Controller, Post, Get, Put, Delete, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { MediaAssetsService } from './media-assets.service.js';
import { MediaInput } from './media.types.js';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaAssetsService) {}

  /**
   * Process and create media asset
   * POST /media
   */
  @Post()
  async createMedia(@Body() body: { url: string; context?: string; user_id: number }) {
    if (!body.url) {
      throw new BadRequestException('URL is required');
    }

    if (!body.user_id) {
      throw new BadRequestException('User ID is required');
    }

    const input: MediaInput = {
      url: body.url,
      context: body.context,
    };

    return await this.mediaService.createMediaAsset(input, body.user_id);
  }

  /**
   * Batch process media
   * POST /media/batch
   */
  @Post('batch')
  async createMediaBatch(@Body() body: { items: MediaInput[]; user_id: number }) {
    if (!body.items || !Array.isArray(body.items)) {
      throw new BadRequestException('Items array is required');
    }

    if (!body.user_id) {
      throw new BadRequestException('User ID is required');
    }

    return await this.mediaService.createMediaAssetsBatch(body.items, body.user_id);
  }

  /**
   * Get media asset by ID
   * GET /media/:id
   */
  @Get(':id')
  async getMedia(@Param('id') id: string) {
    const mediaId = parseInt(id);
    if (isNaN(mediaId)) {
      throw new BadRequestException('Invalid media ID');
    }

    const media = await this.mediaService.getMediaAsset(mediaId);
    if (!media) {
      throw new BadRequestException('Media not found');
    }

    return media;
  }

  /**
   * Get media by owner
   * GET /media/owner/:ownerType/:ownerId
   */
  @Get('owner/:ownerType/:ownerId')
  async getMediaByOwner(
    @Param('ownerType') ownerType: string,
    @Param('ownerId') ownerId: string,
  ) {
    const id = parseInt(ownerId);
    if (isNaN(id)) {
      throw new BadRequestException('Invalid owner ID');
    }

    return await this.mediaService.getMediaAssetsByOwner(ownerType, id);
  }

  /**
   * Get media for lesson version
   * GET /media/lesson-version/:versionId
   */
  @Get('lesson-version/:versionId')
  async getMediaForLessonVersion(@Param('versionId') versionId: string) {
    const id = parseInt(versionId);
    if (isNaN(id)) {
      throw new BadRequestException('Invalid version ID');
    }

    return await this.mediaService.getMediaForLessonVersion(id);
  }

  /**
   * Update media metadata
   * PUT /media/:id
   */
  @Put(':id')
  async updateMedia(
    @Param('id') id: string,
    @Body() body: { metadata?: any; context?: string },
  ) {
    const mediaId = parseInt(id);
    if (isNaN(mediaId)) {
      throw new BadRequestException('Invalid media ID');
    }

    return await this.mediaService.updateMediaAsset(mediaId, body);
  }

  /**
   * Delete media (soft delete)
   * DELETE /media/:id
   */
  @Delete(':id')
  async deleteMedia(@Param('id') id: string) {
    const mediaId = parseInt(id);
    if (isNaN(mediaId)) {
      throw new BadRequestException('Invalid media ID');
    }

    return await this.mediaService.deleteMediaAsset(mediaId);
  }
}
