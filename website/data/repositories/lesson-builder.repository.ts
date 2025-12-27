/**
 * REPOSITORY: Lesson Builder
 * Business logic for lesson editing with version control
 * NO direct datasource usage in UI - always go through this layer
 */

import { mockDataSource } from '../datasources/mock.datasource';
import type {
    LessonVersion,
    LessonLayout,
    LessonBlock,
    LessonAsset
} from '../../mock-db';

export interface LessonBuilderData {
    lesson_id: number;
    lesson_title: string;
    section_id: number;
    version: LessonVersion;
    layout: LessonLayout | null;
    blocks: LessonBlock[];
    assets: LessonAsset[];
}

export class LessonBuilderRepository {
    private ds = mockDataSource;
    private API_BASE_URL = import.meta.env.VITE_BACK_END_API_PATH || 'http://localhost:4000';

    /**
     * Get current editing version (draft if exists, otherwise published)
     * This is the primary method for loading lesson builder
     */
    async getLessonForEditing(lessonId: number): Promise<LessonBuilderData | null> {
        try {
            // Try to fetch from real API first
            const response = await fetch(`${this.API_BASE_URL}/lessons/${lessonId}`);
            if (response.ok) {
                const result = await response.json();
                const lesson = result.data;
                
                if (lesson && lesson.lesson_versions && lesson.lesson_versions.length > 0) {
                    // Use the first version (should be draft version 1)
                    const version = lesson.lesson_versions[0];
                    
                    return {
                        lesson_id: lesson.id,
                        lesson_title: lesson.title,
                        section_id: lesson.section_id,
                        version: {
                            id: version.id,
                            lesson_id: version.lesson_id,
                            version: version.version,
                            layout_type: version.layout_type || 'single',
                            layout_config: version.layout_config || null,
                            metadata: version.metadata || {},
                            status: version.status,
                            created_by: version.created_by,
                            created_at: new Date(version.created_at),
                            published_at: version.published_at ? new Date(version.published_at) : null,
                            updated_at: new Date()
                        },
                        layout: null, // Will be created on first edit
                        blocks: version.lesson_blocks || [],
                        assets: version.lesson_assets || []
                    };
                }
            }
        } catch (error) {
            console.warn('Failed to fetch from API, falling back to mock data:', error);
        }

        // Fallback to mock data
        const allLessons = this.ds.getAllCourseLessons();
        const lesson = allLessons.find(l => l.id === lessonId);

        if (!lesson) return null;

        // Try to get draft version first
        let version = this.ds.getDraftLessonVersion(lessonId);

        // If no draft, get published version
        if (!version) {
            version = this.ds.getPublishedLessonVersion(lessonId);
        }

        if (!version) return null;

        // Get related data
        const layout = this.ds.getLayoutByVersionId(version.id) || null;
        const blocks = this.ds.getBlocksByVersionId(version.id);
        const assets = this.ds.getAssetsByVersion(version.id);

        return {
            lesson_id: lesson.id,
            lesson_title: lesson.title,
            section_id: lesson.section_id,
            version,
            layout,
            blocks,
            assets
        };
    }

    /**
     * Get published version only (for student view)
     */
    async getPublishedLesson(lessonId: number): Promise<LessonBuilderData | null> {
        const allLessons = this.ds.getAllCourseLessons();
        const lesson = allLessons.find(l => l.id === lessonId);

        if (!lesson) return null;

        const version = this.ds.getPublishedLessonVersion(lessonId);
        if (!version) return null;

        const layout = this.ds.getLayoutByVersionId(version.id) || null;
        const blocks = this.ds.getBlocksByVersionId(version.id);
        const assets = this.ds.getAssetsByVersion(version.id);

        return {
            lesson_id: lesson.id,
            lesson_title: lesson.title,
            section_id: lesson.section_id,
            version,
            layout,
            blocks,
            assets
        };
    }

    /**
     * Get blocks organized by slot
     */
    getBlocksBySlots(versionId: number, layout: LessonLayout | null) {
        if (!layout) return {};

        const blocksBySlot: Record<string, LessonBlock[]> = {};

        layout.slots.forEach(slot => {
            blocksBySlot[slot.id] = this.ds.getBlocksBySlot(versionId, slot.id);
        });

        return blocksBySlot;
    }

    /**
     * Get all versions for a lesson (for version history)
     */
    getLessonVersionHistory(lessonId: number): LessonVersion[] {
        return this.ds.getLessonVersionsByLesson(lessonId);
    }

    /**
     * Create new draft version from published
     * (Called when instructor starts editing a published lesson)
     */
    async createDraftFromPublished(lessonId: number): Promise<number> {
        // In real app, this would be a POST to API
        // For mock, we simulate by returning the draft version ID
        const draft = this.ds.getDraftLessonVersion(lessonId);
        if (draft) {
            return draft.id; // Draft already exists
        }

        // In production, this would create a new version in DB
        throw new Error('Draft creation not implemented in mock mode - use existing draft');
    }

    /**
     * Publish draft version
     * (Archives current published, promotes draft to published)
     */
    async publishDraft(lessonId: number): Promise<void> {
        // In real app, this would be a POST to API
        // For mock, we just simulate
        console.log(`Publishing draft for lesson ${lessonId}`);
    }

    /**
     * Delete draft version
     */
    async discardDraft(lessonId: number): Promise<void> {
        // In real app, this would be a DELETE to API
        console.log(`Discarding draft for lesson ${lessonId}`);
    }

    /**
     * Update lesson version metadata
     */
    async updateVersionMetadata(
        versionId: number,
        metadata: LessonVersion['metadata']
    ): Promise<void> {
        const success = this.ds.updateLessonVersionMetadata(versionId, metadata);
        if (!success) {
            throw new Error('Failed to update version metadata');
        }
    }

    /**
     * Update layout type for lesson - REAL API
     */
    async updateLayout(lessonId: number, layoutType: string): Promise<void> {
        const response = await fetch(`${this.API_BASE_URL}/lessons/${lessonId}/layout`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ layout_type: layoutType })
        });

        if (!response.ok) {
            throw new Error('Failed to update layout');
        }
    }

    /**
     * Update block content - REAL API
     */
    async updateBlock(blockId: number, updates: Partial<LessonBlock>): Promise<void> {
        const response = await fetch(`${this.API_BASE_URL}/lesson-contents`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: blockId,
                ...updates
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update block');
        }
    }

    /**
     * Add new block to slot - REAL API
     */
    async addBlock(
        versionId: number,
        slotId: string,
        type: LessonBlock['type'],
        orderIndex: number
    ): Promise<number> {
        const response = await fetch(`${this.API_BASE_URL}/lesson-contents`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lesson_version_id: versionId,
                slot_id: slotId,
                type: type,
                order_index: orderIndex,
                content: {},
                settings: {}
            })
        });

        if (!response.ok) {
            throw new Error('Failed to add block');
        }

        const newBlock = await response.json();
        return newBlock.id;
    }

    /**
     * Delete block - REAL API
     */
    async deleteBlock(blockId: number): Promise<void> {
        const response = await fetch(`${this.API_BASE_URL}/lesson-contents/${blockId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete block');
        }
    }

    /**
     * Reorder blocks within a slot - uses updateBlock for each
     */
    async reorderBlocks(
        versionId: number,
        slotId: string,
        blockIds: number[]
    ): Promise<void> {
        // Update each block's order_index
        for (let i = 0; i < blockIds.length; i++) {
            await this.updateBlock(blockIds[i], { order_index: i });
        }
    }

    /**
     * Move block to different slot - REAL API
     */
    async moveBlock(
        blockId: number,
        targetSlotId: string,
        targetOrderIndex: number
    ): Promise<void> {
        const response = await fetch(`${this.API_BASE_URL}/lesson-contents`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: blockId,
                slot_id: targetSlotId,
                order_index: targetOrderIndex
            })
        });

        if (!response.ok) {
            throw new Error('Failed to move block');
        }
    }

    /**
     * Upload asset
     */
    async uploadAsset(
        lessonId: number,
        versionId: number,
        file: File,
        instructorId: number
    ): Promise<LessonAsset> {
        // In real app, this would upload to cloud storage
        console.log(`Uploading ${file.name} for lesson ${lessonId}`);

        // Mock return
        return {
            id: Math.random() * 1000,
            lesson_id: lessonId,
            lesson_version_id: versionId,
            type: file.type.startsWith('image/') ? 'image' :
                file.type.startsWith('video/') ? 'video' : 'document',
            filename: file.name,
            url: URL.createObjectURL(file),
            file_size: file.size,
            mime_type: file.type,
            uploaded_by: instructorId,
            uploaded_at: new Date()
        };
    }

    /**
     * Delete asset
     */
    async deleteAsset(assetId: number): Promise<void> {
        // In real app, this would delete from cloud storage
        console.log(`Deleting asset ${assetId}`);
    }
}

// Singleton instance
export const lessonBuilderRepository = new LessonBuilderRepository();
