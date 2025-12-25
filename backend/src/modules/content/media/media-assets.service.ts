import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service.js';
import { MediaProcessorService } from './media-processor.service.js';
import { MediaInput, ProcessedMedia, MediaStatus } from './media.types.js';

@Injectable()
export class MediaAssetsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mediaProcessor: MediaProcessorService,
  ) {}

  /**
   * Create media asset - process and save to database
   */
  async createMediaAsset(input: MediaInput, userId: number) {
    // Process media through processor
    const processed = await this.mediaProcessor.processMedia(input);

    // Save to media_assets table
    const mediaAsset = await this.prisma.media_assets.create({
      data: {
        owner_type: 'user',
        owner_id: BigInt(userId),
        context: input.context || 'lesson_content',
        file_type: processed.type,
        mime_type: processed.mime_type,
        url: processed.render_url,
        preview_url: processed.preview_url,
        size: processed.file_size ? BigInt(processed.file_size) : null,
        metadata: processed.metadata as any,
        status: MediaStatus.ACTIVE,
        created_by: userId,
        version: 1,
      },
    });

    return {
      id: mediaAsset.id,
      type: processed.type,
      provider: processed.provider,
      render_url: processed.render_url,
      preview_url: processed.preview_url,
      metadata: processed.metadata,
    };
  }

  /**
   * Get media asset by ID
   */
  async getMediaAsset(id: number) {
    const asset = await this.prisma.media_assets.findUnique({
      where: { id },
    });

    if (!asset) {
      return null;
    }

    return {
      id: asset.id,
      type: asset.file_type,
      provider: (asset.metadata as any)?.provider,
      render_url: asset.url,
      preview_url: asset.preview_url,
      metadata: asset.metadata,
      status: asset.status,
      created_at: asset.created_at,
    };
  }

  /**
   * Get media assets by owner
   */
  async getMediaAssetsByOwner(ownerType: string, ownerId: number) {
    const assets = await this.prisma.media_assets.findMany({
      where: {
        owner_type: ownerType,
        owner_id: BigInt(ownerId),
        status: MediaStatus.ACTIVE,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return assets.map(asset => ({
      id: asset.id,
      type: asset.file_type,
      provider: (asset.metadata as any)?.provider,
      render_url: asset.url,
      preview_url: asset.preview_url,
      context: asset.context,
      created_at: asset.created_at,
    }));
  }

  /**
   * Soft delete media asset
   */
  async deleteMediaAsset(id: number) {
    await this.prisma.media_assets.update({
      where: { id },
      data: {
        status: MediaStatus.DELETED,
        deleted_at: new Date(),
      },
    });

    return { success: true };
  }

  /**
   * Update media asset metadata
   */
  async updateMediaAsset(id: number, updates: { metadata?: any; context?: string }) {
    const asset = await this.prisma.media_assets.update({
      where: { id },
      data: {
        metadata: updates.metadata,
        context: updates.context,
        updated_at: new Date(),
      },
    });

    return {
      id: asset.id,
      metadata: asset.metadata,
      context: asset.context,
    };
  }

  /**
   * Get media assets for a specific lesson version
   */
  async getMediaForLessonVersion(lessonVersionId: number) {
    // Get all blocks for this lesson version
    const blocks = await this.prisma.lesson_blocks.findMany({
      where: {
        lesson_version_id: lessonVersionId,
        type: {
          in: ['image', 'video', 'document', 'media'],
        },
      },
      orderBy: [
        { slot_id: 'asc' },
        { order_index: 'asc' },
      ],
    });

    // Extract media data from blocks
    return blocks.map(block => {
      const content = block.content as any;
      return {
        block_id: block.id,
        slot_id: block.slot_id,
        type: block.type,
        media_data: content?.media || content,
      };
    });
  }

  /**
   * Batch create media assets
   */
  async createMediaAssetsBatch(inputs: MediaInput[], userId: number) {
    const results = await Promise.allSettled(
      inputs.map(input => this.createMediaAsset(input, userId))
    );

    return results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return { success: true, data: result.value };
      } else {
        return { success: false, error: result.reason.message, input: inputs[index] };
      }
    });
  }
}
