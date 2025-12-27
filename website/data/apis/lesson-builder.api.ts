/**
 * API: Lesson Builder
 * Frontend-facing API for lesson editing
 * Maps repository methods to REST-like interface
 */

import { lessonBuilderRepository, type LessonBuilderData } from '../repositories/lesson-builder.repository';
import type { LessonVersion, LessonBlock, LessonAsset } from '../../mock-db';

export const lessonBuilderAPI = {
    /**
     * GET /api/lessons/:id/edit
     * Load lesson for editing (draft or published)
     */
    async getLessonForEditing(lessonId: number): Promise<LessonBuilderData | null> {
        try {
            return await lessonBuilderRepository.getLessonForEditing(lessonId);
        } catch (error) {
            console.error('Error loading lesson for editing:', error);
            throw error;
        }
    },

    /**
     * GET /api/lessons/:id/published
     * Get published version only (student view)
     */
    async getPublishedLesson(lessonId: number): Promise<LessonBuilderData | null> {
        try {
            return await lessonBuilderRepository.getPublishedLesson(lessonId);
        } catch (error) {
            console.error('Error loading published lesson:', error);
            throw error;
        }
    },

    /**
     * GET /api/lessons/:id/versions
     * Get version history
     */
    async getVersionHistory(lessonId: number): Promise<LessonVersion[]> {
        try {
            return lessonBuilderRepository.getLessonVersionHistory(lessonId);
        } catch (error) {
            console.error('Error loading version history:', error);
            throw error;
        }
    },

    /**
     * POST /api/lessons/:id/versions/draft
     * Create new draft from published
     */
    async createDraft(lessonId: number): Promise<number> {
        try {
            return await lessonBuilderRepository.createDraftFromPublished(lessonId);
        } catch (error) {
            console.error('Error creating draft:', error);
            throw error;
        }
    },

    /**
     * POST /api/lessons/:id/publish
     * Publish current draft
     */
    async publishDraft(lessonId: number): Promise<void> {
        try {
            await lessonBuilderRepository.publishDraft(lessonId);
        } catch (error) {
            console.error('Error publishing draft:', error);
            throw error;
        }
    },

    /**
     * DELETE /api/lessons/:id/versions/draft
     * Discard draft
     */
    async discardDraft(lessonId: number): Promise<void> {
        try {
            await lessonBuilderRepository.discardDraft(lessonId);
        } catch (error) {
            console.error('Error discarding draft:', error);
            throw error;
        }
    },

    /**
     * PATCH /api/lesson-versions/:versionId/metadata
     * Update lesson metadata
     */
    async updateMetadata(
        versionId: number,
        metadata: LessonVersion['metadata']
    ): Promise<void> {
        try {
            await lessonBuilderRepository.updateVersionMetadata(versionId, metadata);
        } catch (error) {
            console.error('Error updating metadata:', error);
            throw error;
        }
    },

    /**
     * PUT /api/lessons/:lessonId/layout
     * Update lesson layout type
     */
    async updateLayout(lessonId: number, layoutType: string): Promise<void> {
        try {
            await lessonBuilderRepository.updateLayout(lessonId, layoutType);
        } catch (error) {
            console.error('Error updating layout:', error);
            throw error;
        }
    },

    /**
     * PATCH /api/blocks/:blockId
     * Update block
     */
    async updateBlock(blockId: number, updates: Partial<LessonBlock>): Promise<void> {
        try {
            await lessonBuilderRepository.updateBlock(blockId, updates);
        } catch (error) {
            console.error('Error updating block:', error);
            throw error;
        }
    },

    /**
     * POST /api/lesson-versions/:versionId/blocks
     * Add new block
     */
    async addBlock(
        versionId: number,
        slotId: string,
        type: LessonBlock['type'],
        orderIndex: number
    ): Promise<number> {
        try {
            return await lessonBuilderRepository.addBlock(versionId, slotId, type, orderIndex);
        } catch (error) {
            console.error('Error adding block:', error);
            throw error;
        }
    },

    /**
     * DELETE /api/blocks/:blockId
     * Delete block
     */
    async deleteBlock(blockId: number): Promise<void> {
        try {
            await lessonBuilderRepository.deleteBlock(blockId);
        } catch (error) {
            console.error('Error deleting block:', error);
            throw error;
        }
    },

    /**
     * PATCH /api/lesson-versions/:versionId/slots/:slotId/reorder
     * Reorder blocks within slot
     */
    async reorderBlocks(
        versionId: number,
        slotId: string,
        blockIds: number[]
    ): Promise<void> {
        try {
            await lessonBuilderRepository.reorderBlocks(versionId, slotId, blockIds);
        } catch (error) {
            console.error('Error reordering blocks:', error);
            throw error;
        }
    },

    /**
     * PATCH /api/blocks/:blockId/move
     * Move block to different slot
     */
    async moveBlock(
        blockId: number,
        targetSlotId: string,
        targetOrderIndex: number
    ): Promise<void> {
        try {
            await lessonBuilderRepository.moveBlock(blockId, targetSlotId, targetOrderIndex);
        } catch (error) {
            console.error('Error moving block:', error);
            throw error;
        }
    },

    /**
     * POST /api/lessons/:lessonId/assets
     * Upload asset file
     */
    async uploadAsset(
        lessonId: number,
        versionId: number,
        file: File,
        instructorId: number
    ): Promise<LessonAsset> {
        try {
            return await lessonBuilderRepository.uploadAsset(lessonId, versionId, file, instructorId);
        } catch (error) {
            console.error('Error uploading asset:', error);
            throw error;
        }
    },

    /**
     * DELETE /api/assets/:assetId
     * Delete asset
     */
    async deleteAsset(assetId: number): Promise<void> {
        try {
            await lessonBuilderRepository.deleteAsset(assetId);
        } catch (error) {
            console.error('Error deleting asset:', error);
            throw error;
        }
    }
};
