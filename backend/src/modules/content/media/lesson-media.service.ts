import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service.js';
import { MediaProcessorService } from './media-processor.service.js';
import { MediaBlockData } from './media.types.js';

@Injectable()
export class LessonMediaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mediaProcessor: MediaProcessorService,
  ) {}

  /**
   * Create media block in lesson version
   */
  async createMediaBlock(data: {
    lesson_version_id: number;
    slot_id: string;
    order_index: number;
    media_url: string;
    caption?: string;
    alt_text?: string;
  }) {
    // Process media URL
    const processed = await this.mediaProcessor.processMedia({
      url: data.media_url,
      context: 'lesson_block',
    });

    // Create media block data
    const mediaBlockData: MediaBlockData = {
      type: processed.type,
      provider: processed.provider,
      render_url: processed.render_url,
      preview_url: processed.preview_url,
      caption: data.caption,
      alt_text: data.alt_text,
      metadata: processed.metadata,
    };

    // Determine block type based on media type
    const blockType = this.getBlockTypeFromMediaType(processed.type);

    // Create lesson block
    const block = await this.prisma.lesson_blocks.create({
      data: {
        lesson_version_id: data.lesson_version_id,
        slot_id: data.slot_id,
        type: blockType,
        order_index: data.order_index,
        content: mediaBlockData as any,
        settings: {
          autoplay: false,
          controls: true,
          loop: false,
        },
      },
    });

    return {
      block_id: block.id,
      media_data: mediaBlockData,
    };
  }

  /**
   * Update media block
   */
  async updateMediaBlock(blockId: number, updates: {
    media_url?: string;
    caption?: string;
    alt_text?: string;
    settings?: any;
  }) {
    const block = await this.prisma.lesson_blocks.findUnique({
      where: { id: blockId },
    });

    if (!block) {
      throw new BadRequestException('Block not found');
    }

    const currentContent = block.content as any;
    let updatedContent = { ...currentContent };

    // If new media URL provided, reprocess
    if (updates.media_url) {
      const processed = await this.mediaProcessor.processMedia({
        url: updates.media_url,
        context: 'lesson_block',
      });

      updatedContent = {
        type: processed.type,
        provider: processed.provider,
        render_url: processed.render_url,
        preview_url: processed.preview_url,
        caption: updates.caption || currentContent.caption,
        alt_text: updates.alt_text || currentContent.alt_text,
        metadata: processed.metadata,
      };
    } else {
      // Just update caption/alt_text
      if (updates.caption !== undefined) updatedContent.caption = updates.caption;
      if (updates.alt_text !== undefined) updatedContent.alt_text = updates.alt_text;
    }

    const updated = await this.prisma.lesson_blocks.update({
      where: { id: blockId },
      data: {
        content: updatedContent,
        settings: updates.settings || block.settings,
        updated_at: new Date(),
      },
    });

    return {
      block_id: updated.id,
      media_data: updatedContent,
    };
  }

  /**
   * Delete media block (hard delete)
   */
  async deleteMediaBlock(blockId: number) {
    await this.prisma.lesson_blocks.delete({
      where: { id: blockId },
    });

    return { success: true };
  }

  /**
   * Get all media blocks for a lesson version
   */
  async getMediaBlocksForVersion(lessonVersionId: number) {
    const blocks = await this.prisma.lesson_blocks.findMany({
      where: {
        lesson_version_id: lessonVersionId,
        type: {
          in: ['image', 'video', 'document', 'audio', 'media'],
        },
      },
      orderBy: [
        { slot_id: 'asc' },
        { order_index: 'asc' },
      ],
    });

    return blocks.map(block => ({
      block_id: block.id,
      slot_id: block.slot_id,
      type: block.type,
      order_index: block.order_index,
      media_data: block.content,
      settings: block.settings,
      created_at: block.created_at,
      updated_at: block.updated_at,
    }));
  }

  /**
   * Batch create media blocks
   */
  async createMediaBlocksBatch(items: Array<{
    lesson_version_id: number;
    slot_id: string;
    order_index: number;
    media_url: string;
    caption?: string;
    alt_text?: string;
  }>) {
    const results = await Promise.allSettled(
      items.map(item => this.createMediaBlock(item))
    );

    return results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return { success: true, data: result.value };
      } else {
        return { success: false, error: result.reason.message, input: items[index] };
      }
    });
  }

  /**
   * Clone media blocks to new version
   */
  async cloneMediaBlocksToNewVersion(
    sourceVersionId: number,
    targetVersionId: number,
  ) {
    const sourceBlocks = await this.prisma.lesson_blocks.findMany({
      where: {
        lesson_version_id: sourceVersionId,
        type: {
          in: ['image', 'video', 'document', 'audio', 'media'],
        },
      },
    });

    const clonedBlocks = await Promise.all(
      sourceBlocks.map(block =>
        this.prisma.lesson_blocks.create({
          data: {
            lesson_version_id: targetVersionId,
            slot_id: block.slot_id,
            type: block.type,
            order_index: block.order_index,
            content: block.content as any,
            settings: block.settings as any,
          },
        })
      )
    );

    return {
      cloned_count: clonedBlocks.length,
      blocks: clonedBlocks.map(b => b.id),
    };
  }

  /**
   * Helper: Get block type from media type
   */
  private getBlockTypeFromMediaType(mediaType: string): string {
    const typeMap: Record<string, string> = {
      'image': 'image',
      'video': 'video',
      'document': 'document',
      'audio': 'audio',
      'external': 'media',
      'unknown': 'media',
    };

    return typeMap[mediaType] || 'media';
  }

  /**
   * Validate media blocks before publishing version
   */
  async validateMediaBlocks(lessonVersionId: number) {
    const blocks = await this.getMediaBlocksForVersion(lessonVersionId);
    
    const issues: Array<{ block_id: number; issue: string }> = [];

    for (const block of blocks) {
      const mediaData = block.media_data as any;
      
      // Check if render_url exists
      if (!mediaData?.render_url) {
        issues.push({
          block_id: block.block_id,
          issue: 'Missing render_url',
        });
      }

      // Check if metadata is valid
      if (!mediaData?.metadata?.is_safe) {
        issues.push({
          block_id: block.block_id,
          issue: 'Media not marked as safe',
        });
      }
    }

    return {
      is_valid: issues.length === 0,
      total_blocks: blocks.length,
      issues,
    };
  }
}
