/**
 * HOOK: useLessonBuilder
 * React hook for lesson builder functionality
 * Provides state management and API integration for lesson editing
 */

import { useState, useEffect, useCallback } from 'react';
import { lessonBuilderAPI } from '../data/apis/lesson-builder.api';
import type { LessonBuilderData } from '../data/repositories/lesson-builder.repository';
import type { LessonVersion, LessonBlock } from '../mock-db';

interface UseLessonBuilderOptions {
    lessonId: number;
    autoLoad?: boolean;
}

interface UseLessonBuilderReturn {
    // Data
    data: LessonBuilderData | null;
    loading: boolean;
    error: string | null;

    // Actions
    loadLesson: () => Promise<void>;
    updateMetadata: (metadata: LessonVersion['metadata']) => Promise<void>;
    updateBlock: (blockId: number, updates: Partial<LessonBlock>) => Promise<void>;
    addBlock: (slotId: string, type: LessonBlock['type'], orderIndex: number) => Promise<number>;
    deleteBlock: (blockId: number) => Promise<void>;
    moveBlock: (blockId: number, targetSlotId: string, targetOrderIndex: number) => Promise<void>;
    updateLayout: (layoutType: string) => Promise<void>;
    publishDraft: () => Promise<void>;
    discardDraft: () => Promise<void>;
    uploadAsset: (file: File, instructorId: number) => Promise<void>;

    // Utils
    refetch: () => Promise<void>;
    isDraft: boolean;
    hasUnsavedChanges: boolean;
    markAsChanged: () => void;
    markAsSaved: () => void;
}

export function useLessonBuilder({
    lessonId,
    autoLoad = true
}: UseLessonBuilderOptions): UseLessonBuilderReturn {
    const [data, setData] = useState<LessonBuilderData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const loadLesson = useCallback(async () => {
        if (!lessonId) return;

        setLoading(true);
        setError(null);

        try {
            const lessonData = await lessonBuilderAPI.getLessonForEditing(lessonId);
            if (lessonData) {
                setData(lessonData);
                setHasUnsavedChanges(false);
            } else {
                setError('Lesson not found');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load lesson');
        } finally {
            setLoading(false);
        }
    }, [lessonId]);

    useEffect(() => {
        if (autoLoad) {
            loadLesson();
        }
    }, [autoLoad, loadLesson]);

    const updateMetadata = useCallback(async (metadata: LessonVersion['metadata']) => {
        if (!data) return;

        try {
            await lessonBuilderAPI.updateMetadata(data.version.id, metadata);

            // Optimistically update local state
            setData(prev => prev ? {
                ...prev,
                version: {
                    ...prev.version,
                    metadata: { ...prev.version.metadata, ...metadata },
                    updated_at: new Date()
                }
            } : null);

            setHasUnsavedChanges(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update metadata');
            throw err;
        }
    }, [data]);

    const updateBlock = useCallback(async (blockId: number, updates: Partial<LessonBlock>) => {
        if (!data) return;

        try {
            await lessonBuilderAPI.updateBlock(blockId, updates);

            // Optimistically update local state
            setData(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    blocks: prev.blocks.map(b =>
                        b.id === blockId ? { ...b, ...updates, updated_at: new Date() } : b
                    )
                };
            });

            setHasUnsavedChanges(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update block');
            throw err;
        }
    }, [data]);

    const addBlock = useCallback(async (
        slotId: string,
        type: LessonBlock['type'],
        orderIndex: number
    ): Promise<number> => {
        if (!data) throw new Error('No lesson data');

        try {
            const newBlockId = await lessonBuilderAPI.addBlock(
                data.version.id,
                slotId,
                type,
                orderIndex
            );

            // Optimistically add to local state
            const newBlock: LessonBlock = {
                id: newBlockId,
                lesson_version_id: data.version.id,
                slot_id: slotId,
                type,
                order_index: orderIndex,
                content: {},
                settings: {},
                created_at: new Date(),
                updated_at: new Date()
            };

            setData(prev => prev ? {
                ...prev,
                blocks: [...prev.blocks, newBlock]
            } : null);

            setHasUnsavedChanges(true);
            return newBlockId;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add block');
            throw err;
        }
    }, [data]);

    const deleteBlock = useCallback(async (blockId: number) => {
        if (!data) return;

        try {
            await lessonBuilderAPI.deleteBlock(blockId);

            // Optimistically remove from local state
            setData(prev => prev ? {
                ...prev,
                blocks: prev.blocks.filter(b => b.id !== blockId)
            } : null);

            setHasUnsavedChanges(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete block');
            throw err;
        }
    }, [data]);

    const moveBlock = useCallback(async (
        blockId: number,
        targetSlotId: string,
        targetOrderIndex: number
    ) => {
        if (!data) return;

        try {
            await lessonBuilderAPI.moveBlock(blockId, targetSlotId, targetOrderIndex);

            // Optimistically update local state
            setData(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    blocks: prev.blocks.map(b =>
                        b.id === blockId
                            ? { ...b, slot_id: targetSlotId, order_index: targetOrderIndex, updated_at: new Date() }
                            : b
                    )
                };
            });

            setHasUnsavedChanges(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to move block');
            throw err;
        }
    }, [data]);

    const updateLayout = useCallback(async (layoutType: string) => {
        if (!data) return;

        // Store previous state for rollback
        const previousData = { ...data };

        try {
            // 1. Create slots based on layout type
            let newSlots: Array<{ id: string; region: string; order_index: number }> = [];

            switch (layoutType) {
                case 'single':
                    newSlots = [{ id: 'main', region: 'main', order_index: 0 }];
                    break;
                case 'focus':
                    newSlots = [{ id: 'center', region: 'center', order_index: 0 }];
                    break;
                case 'split':
                    newSlots = [
                        { id: 'left', region: 'left', order_index: 0 },
                        { id: 'right', region: 'right', order_index: 1 }
                    ];
                    break;
                case 'sidebar-left':
                    newSlots = [
                        { id: 'nav', region: 'sidebar', order_index: 0 },
                        { id: 'main', region: 'main', order_index: 1 }
                    ];
                    break;
                case 'sidebar-right':
                    newSlots = [
                        { id: 'main', region: 'main', order_index: 0 },
                        { id: 'sidebar', region: 'sidebar', order_index: 1 }
                    ];
                    break;
                case 'grid':
                    newSlots = [
                        { id: 'grid-1', region: 'grid-1', order_index: 0 },
                        { id: 'grid-2', region: 'grid-2', order_index: 1 },
                        { id: 'grid-3', region: 'grid-3', order_index: 2 },
                        { id: 'grid-4', region: 'grid-4', order_index: 3 }
                    ];
                    break;
                case 'stacked':
                    newSlots = [
                        { id: 'hero', region: 'hero', order_index: 0 },
                        { id: 'content', region: 'content', order_index: 1 }
                    ];
                    break;
                default:
                    newSlots = [{ id: 'main', region: 'main', order_index: 0 }];
            }

            // 2. Smart migration of blocks to new layout slots
            // Strategy:
            // - If 1 slot → 1 slot: Keep all blocks in the single slot
            // - If fewer slots → more slots: Distribute blocks evenly across new slots
            // - If more slots → fewer slots: Concatenate blocks from all old slots into new slots in order

            // Get all existing blocks sorted by slot then order
            const allBlocks = [...data.blocks].sort((a, b) => {
                if (a.slot_id === b.slot_id) {
                    return a.order_index - b.order_index;
                }
                return a.slot_id.localeCompare(b.slot_id);
            });

            // Get unique current slots
            const currentSlotIds = [...new Set(data.blocks.map(b => b.slot_id))];
            const oldSlotCount = currentSlotIds.length || 1;
            const newSlotCount = newSlots.length;

            let updatedBlocks: typeof data.blocks;

            if (newSlotCount === 1) {
                // Many slots → 1 slot: Concatenate all blocks into the single new slot
                const targetSlotId = newSlots[0].id;
                updatedBlocks = allBlocks.map((block, index) => ({
                    ...block,
                    slot_id: targetSlotId,
                    order_index: index
                }));
            } else if (oldSlotCount === 1 || allBlocks.length <= newSlotCount) {
                // 1 slot → many slots OR fewer blocks than slots: Distribute blocks evenly
                updatedBlocks = allBlocks.map((block, index) => {
                    const slotIndex = Math.min(index, newSlotCount - 1);
                    const blocksInSameSlot = allBlocks.filter((b, i) =>
                        Math.min(i, newSlotCount - 1) === slotIndex && i < index
                    ).length;
                    return {
                        ...block,
                        slot_id: newSlots[slotIndex].id,
                        order_index: blocksInSameSlot
                    };
                });
            } else {
                // Many slots → different number of slots: Group by old slot, then distribute
                // Group blocks by their current slot
                const blocksBySlot: Record<string, typeof data.blocks> = {};
                for (const block of allBlocks) {
                    if (!blocksBySlot[block.slot_id]) {
                        blocksBySlot[block.slot_id] = [];
                    }
                    blocksBySlot[block.slot_id].push(block);
                }

                const slotGroups = Object.values(blocksBySlot);
                updatedBlocks = [];

                if (newSlotCount >= slotGroups.length) {
                    // More new slots than old groups: Map each group to a slot
                    slotGroups.forEach((groupBlocks, groupIndex) => {
                        const targetSlotId = newSlots[Math.min(groupIndex, newSlotCount - 1)].id;
                        groupBlocks.forEach((block, blockIndex) => {
                            updatedBlocks.push({
                                ...block,
                                slot_id: targetSlotId,
                                order_index: blockIndex
                            });
                        });
                    });
                } else {
                    // Fewer new slots than old groups: Merge groups into available slots
                    const slotsPerGroup = Math.ceil(slotGroups.length / newSlotCount);
                    slotGroups.forEach((groupBlocks, groupIndex) => {
                        const targetSlotIndex = Math.floor(groupIndex / slotsPerGroup);
                        const targetSlotId = newSlots[Math.min(targetSlotIndex, newSlotCount - 1)].id;
                        const existingBlocksInSlot = updatedBlocks.filter(b => b.slot_id === targetSlotId).length;
                        groupBlocks.forEach((block, blockIndex) => {
                            updatedBlocks.push({
                                ...block,
                                slot_id: targetSlotId,
                                order_index: existingBlocksInSlot + blockIndex
                            });
                        });
                    });
                }
            }

            // 3. Optimistic update local state first
            setData(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    layout: prev.layout ? {
                        ...prev.layout,
                        node_type: layoutType as any,
                        slots: newSlots
                    } : null,
                    version: {
                        ...prev.version,
                        layout_type: layoutType as LessonVersion['layout_type'],
                        updated_at: new Date()
                    },
                    blocks: updatedBlocks
                };
            });

            // 4. Call API to persist layout change
            await lessonBuilderAPI.updateLayout(data.lesson_id, layoutType);

            // 5. Update blocks in database (migrate to new slot)
            for (const block of updatedBlocks) {
                if (block.slot_id !== data.blocks.find(b => b.id === block.id)?.slot_id) {
                    await lessonBuilderAPI.moveBlock(block.id, block.slot_id, block.order_index);
                }
            }

            setHasUnsavedChanges(true);
        } catch (err) {
            // Rollback on error
            setData(previousData);
            setError(err instanceof Error ? err.message : 'Failed to update layout');
            throw err;
        }
    }, [data]);

    const publishDraft = useCallback(async () => {
        if (!data) return;

        try {
            await lessonBuilderAPI.publishDraft(lessonId);

            // Reload to get published version
            await loadLesson();
            setHasUnsavedChanges(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to publish draft');
            throw err;
        }
    }, [data, lessonId, loadLesson]);

    const discardDraft = useCallback(async () => {
        if (!data) return;

        try {
            await lessonBuilderAPI.discardDraft(lessonId);

            // Reload to get published version
            await loadLesson();
            setHasUnsavedChanges(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to discard draft');
            throw err;
        }
    }, [data, lessonId, loadLesson]);

    const uploadAsset = useCallback(async (file: File, instructorId: number) => {
        if (!data) return;

        try {
            const asset = await lessonBuilderAPI.uploadAsset(
                lessonId,
                data.version.id,
                file,
                instructorId
            );

            // Add to local state
            setData(prev => prev ? {
                ...prev,
                assets: [...prev.assets, asset]
            } : null);

            setHasUnsavedChanges(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to upload asset');
            throw err;
        }
    }, [data, lessonId]);

    const markAsChanged = useCallback(() => {
        setHasUnsavedChanges(true);
    }, []);

    const markAsSaved = useCallback(() => {
        setHasUnsavedChanges(false);
    }, []);

    return {
        data,
        loading,
        error,
        loadLesson,
        updateMetadata,
        updateBlock,
        addBlock,
        deleteBlock,
        moveBlock,
        updateLayout,
        publishDraft,
        discardDraft,
        uploadAsset,
        refetch: loadLesson,
        isDraft: data?.version.status === 'draft',
        hasUnsavedChanges,
        markAsChanged,
        markAsSaved
    };
}
