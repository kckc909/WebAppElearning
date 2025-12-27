/**
 * SLOT-BASED CANVAS
 * Renders lesson layout with explicit drop slots
 * Maps 1:1 to LESSON_BLOCKS table structure
 */

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { LessonVersion, LessonLayout, LessonBlock } from '../../../../../../mock-db';
import { SortableBlock } from './SortableBlock';
import { Layout, Columns } from 'lucide-react';

interface SlotBasedCanvasProps {
    lessonVersion: LessonVersion;
    layout: LessonLayout | null;
    blocks: LessonBlock[];
    selectedBlockId: number | null;
    onSelectBlock: (id: number) => void;
    onSelectLesson: () => void; // NEW: for lesson settings
    onUpdateBlock: (id: number, updates: Partial<LessonBlock>) => void;
    onDeleteBlock: (id: number) => void;
    isPreviewMode: boolean;
}

export const SlotBasedCanvas: React.FC<SlotBasedCanvasProps> = ({
    lessonVersion,
    layout,
    blocks,
    selectedBlockId,
    onSelectBlock,
    onSelectLesson,
    onUpdateBlock,
    onDeleteBlock,
    isPreviewMode
}) => {
    // Handle case when no lesson is selected or loaded yet
    if (!lessonVersion || !layout) {
        return (
            <div className="h-full flex items-center justify-center text-slate-400">
                <div className="text-center">
                    <Layout size={48} className="mx-auto mb-4 opacity-50" />
                    <p>{!lessonVersion ? 'No lesson selected' : 'No layout configured'}</p>
                </div>
            </div>
        );
    }

    const containerWidth = lessonVersion.metadata?.container_width || 'max-w-7xl';
    const gapSize = lessonVersion.metadata?.gap_size || 'gap-6';
    const bgColor = lessonVersion.metadata?.background_color || 'bg-slate-50';

    return (
        <div className={`min-h-full ${bgColor} py-8 px-6`}>
            <div className={`mx-auto ${containerWidth}`}>

                {/* Layout Renderer */}
                {layout.node_type === 'single' && (
                    <div className={`flex flex-col ${gapSize}`}>
                        {layout.slots.map(slot => (
                            <DropSlot
                                key={slot.id}
                                slotId={slot.id}
                                slotLabel={slot.region}
                                blocks={blocks.filter(b => b.slot_id === slot.id)}
                                selectedBlockId={selectedBlockId}
                                onSelectBlock={onSelectBlock}
                                onUpdateBlock={onUpdateBlock}
                                onDeleteBlock={onDeleteBlock}
                                isPreviewMode={isPreviewMode}
                            />
                        ))}
                    </div>
                )}

                {layout.node_type === 'split' && (
                    <div className={`grid grid-cols-1 lg:grid-cols-2 ${gapSize}`}>
                        {layout.slots.map(slot => (
                            <div key={slot.id} className="min-h-[400px]">
                                <DropSlot
                                    slotId={slot.id}
                                    slotLabel={slot.region}
                                    blocks={blocks.filter(b => b.slot_id === slot.id)}
                                    selectedBlockId={selectedBlockId}
                                    onSelectBlock={onSelectBlock}
                                    onUpdateBlock={onUpdateBlock}
                                    onDeleteBlock={onDeleteBlock}
                                    isPreviewMode={isPreviewMode}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Sidebar Left: narrow left + wide right */}
                {layout.node_type === 'sidebar-left' && (
                    <div className={`grid grid-cols-1 lg:grid-cols-[280px_1fr] ${gapSize}`}>
                        {layout.slots.map(slot => (
                            <div key={slot.id} className="min-h-[400px]">
                                <DropSlot
                                    slotId={slot.id}
                                    slotLabel={slot.region}
                                    blocks={blocks.filter(b => b.slot_id === slot.id)}
                                    selectedBlockId={selectedBlockId}
                                    onSelectBlock={onSelectBlock}
                                    onUpdateBlock={onUpdateBlock}
                                    onDeleteBlock={onDeleteBlock}
                                    isPreviewMode={isPreviewMode}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Sidebar Right: wide left + narrow right */}
                {layout.node_type === 'sidebar-right' && (
                    <div className={`grid grid-cols-1 lg:grid-cols-[1fr_280px] ${gapSize}`}>
                        {layout.slots.map(slot => (
                            <div key={slot.id} className="min-h-[400px]">
                                <DropSlot
                                    slotId={slot.id}
                                    slotLabel={slot.region}
                                    blocks={blocks.filter(b => b.slot_id === slot.id)}
                                    selectedBlockId={selectedBlockId}
                                    onSelectBlock={onSelectBlock}
                                    onUpdateBlock={onUpdateBlock}
                                    onDeleteBlock={onDeleteBlock}
                                    isPreviewMode={isPreviewMode}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Grid 2x2 */}
                {layout.node_type === 'grid' && (
                    <div className={`grid grid-cols-1 md:grid-cols-2 ${gapSize}`}>
                        {layout.slots.map(slot => (
                            <div key={slot.id} className="min-h-[300px]">
                                <DropSlot
                                    slotId={slot.id}
                                    slotLabel={slot.region}
                                    blocks={blocks.filter(b => b.slot_id === slot.id)}
                                    selectedBlockId={selectedBlockId}
                                    onSelectBlock={onSelectBlock}
                                    onUpdateBlock={onUpdateBlock}
                                    onDeleteBlock={onDeleteBlock}
                                    isPreviewMode={isPreviewMode}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Stacked - Hero on top, content below */}
                {layout.node_type === 'stacked' && (
                    <div className={`flex flex-col ${gapSize}`}>
                        {layout.slots.map((slot, index) => (
                            <div key={slot.id} className={index === 0 ? "min-h-[300px]" : "min-h-[400px]"}>
                                <DropSlot
                                    slotId={slot.id}
                                    slotLabel={slot.region}
                                    blocks={blocks.filter(b => b.slot_id === slot.id)}
                                    selectedBlockId={selectedBlockId}
                                    onSelectBlock={onSelectBlock}
                                    onUpdateBlock={onUpdateBlock}
                                    onDeleteBlock={onDeleteBlock}
                                    isPreviewMode={isPreviewMode}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Focus Mode - Centered with max-width */}
                {layout.node_type === 'focus' && (
                    <div className="max-w-3xl mx-auto">
                        <div className={`flex flex-col ${gapSize}`}>
                            {layout.slots.map(slot => (
                                <DropSlot
                                    key={slot.id}
                                    slotId={slot.id}
                                    slotLabel={slot.region}
                                    blocks={blocks.filter(b => b.slot_id === slot.id)}
                                    selectedBlockId={selectedBlockId}
                                    onSelectBlock={onSelectBlock}
                                    onUpdateBlock={onUpdateBlock}
                                    onDeleteBlock={onDeleteBlock}
                                    isPreviewMode={isPreviewMode}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Droppable Slot Component
interface DropSlotProps {
    slotId: string;
    slotLabel: string;
    blocks: LessonBlock[];
    selectedBlockId: number | null;
    onSelectBlock: (id: number) => void;
    onUpdateBlock: (id: number, updates: Partial<LessonBlock>) => void;
    onDeleteBlock: (id: number) => void;
    isPreviewMode: boolean;
}

const DropSlot: React.FC<DropSlotProps> = ({
    slotId,
    slotLabel,
    blocks,
    selectedBlockId,
    onSelectBlock,
    onUpdateBlock,
    onDeleteBlock,
    isPreviewMode
}) => {
    const { setNodeRef, isOver } = useDroppable({ id: slotId });

    // Sort blocks by order_index
    const sortedBlocks = [...blocks].sort((a, b) => a.order_index - b.order_index);

    return (
        <div
            ref={setNodeRef}
            className={`min-h-[200px] rounded-xl transition-all p-2 ${isOver
                ? 'ring-2 ring-blue-500 bg-blue-50/50'
                : !isPreviewMode
                    ? 'border-2 border-dashed border-slate-200 hover:border-slate-300'
                    : ''
                }`}
        >
            {/* Empty Slot Placeholder */}
            {!isPreviewMode && blocks.length === 0 && (
                <div className="h-full min-h-[180px] flex flex-col items-center justify-center text-slate-400">
                    <Columns size={32} className="mb-2 opacity-50" />
                    <p className="text-sm font-medium capitalize">{slotLabel} Slot</p>
                    <p className="text-xs">Drop blocks here</p>
                </div>
            )}

            {/* Blocks in Slot */}
            <SortableContext
                id={slotId}
                items={sortedBlocks.map(b => b.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-4">
                    {sortedBlocks.map(block => (
                        <SortableBlock
                            key={block.id}
                            block={block}
                            isSelected={block.id === selectedBlockId}
                            isPreviewMode={isPreviewMode}
                            onSelect={onSelectBlock}
                            onUpdate={onUpdateBlock}
                            onDelete={onDeleteBlock}
                        />
                    ))}
                </div>
            </SortableContext>

            {/* Always show drop zone at bottom when there are blocks */}
            {!isPreviewMode && blocks.length > 0 && (
                <div className={`mt-4 py-4 border-2 border-dashed rounded-lg text-center transition-all ${isOver
                    ? 'border-blue-400 bg-blue-50 text-blue-600'
                    : 'border-slate-200 text-slate-400 hover:border-slate-300'
                    }`}>
                    <p className="text-xs">Drop more blocks here</p>
                </div>
            )}
        </div>
    );
};
