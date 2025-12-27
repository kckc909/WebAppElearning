/**
 * MOCK DB - lesson_layouts
 * Defines the layout structure (nodes and slots) for each lesson version
 * IMPORTANT: slot.id MUST match the slot_id used in LESSON_BLOCKS
 */

export interface LayoutSlot {
    id: string;
    region: string; // 'main', 'left', 'right', 'sidebar', 'nav', 'grid-1', 'grid-2', etc.
    order_index: number;
}

export interface LessonLayout {
    id: number;
    lesson_version_id: number;
    node_type: 'single' | 'split' | 'sidebar-left' | 'sidebar-right' | 'grid' | 'stacked' | 'focus';
    slots: LayoutSlot[];
    config?: any; // Additional layout config (grid columns, etc.)
}

export const LESSON_LAYOUTS: LessonLayout[] = [
    // =============================================
    // COURSE 1 - ReactJS (version IDs match lesson IDs 1-20)
    // =============================================

    // Lesson 1 - Welcome (Single column)
    {
        id: 1,
        lesson_version_id: 1,
        node_type: 'single',
        slots: [{ id: 'main', region: 'main', order_index: 0 }]
    },
    // Lesson 2 - What is React (Split view)
    {
        id: 2,
        lesson_version_id: 2,
        node_type: 'split',
        slots: [
            { id: 'left', region: 'left', order_index: 0 },
            { id: 'right', region: 'right', order_index: 1 }
        ]
    },
    // Lesson 3 - Install Tools (Single)
    {
        id: 3,
        lesson_version_id: 3,
        node_type: 'single',
        slots: [{ id: 'main', region: 'main', order_index: 0 }]
    },
    // Lesson 4 - First Project (Sidebar Right)
    {
        id: 4,
        lesson_version_id: 4,
        node_type: 'sidebar-right',
        slots: [
            { id: 'main', region: 'main', order_index: 0 },
            { id: 'sidebar', region: 'sidebar', order_index: 1 }
        ]
    },
    // Lesson 5 - JSX (Single)
    {
        id: 5,
        lesson_version_id: 5,
        node_type: 'single',
        slots: [{ id: 'main', region: 'main', order_index: 0 }]
    },
    // Lesson 6 - Functional Components (Split)
    {
        id: 6,
        lesson_version_id: 6,
        node_type: 'split',
        slots: [
            { id: 'left', region: 'left', order_index: 0 },
            { id: 'right', region: 'right', order_index: 1 }
        ]
    },
    // Lesson 7 - Class Components (Single)
    {
        id: 7,
        lesson_version_id: 7,
        node_type: 'single',
        slots: [{ id: 'main', region: 'main', order_index: 0 }]
    },
    // Lesson 8 - Practice Components (Sidebar Left)
    {
        id: 8,
        lesson_version_id: 8,
        node_type: 'sidebar-left',
        slots: [
            { id: 'nav', region: 'sidebar', order_index: 0 },
            { id: 'main', region: 'main', order_index: 1 }
        ]
    },
    // Lesson 9 - State (Single)
    {
        id: 9,
        lesson_version_id: 9,
        node_type: 'single',
        slots: [{ id: 'main', region: 'main', order_index: 0 }]
    },
    // Lesson 10 - Props (Split)
    {
        id: 10,
        lesson_version_id: 10,
        node_type: 'split',
        slots: [
            { id: 'left', region: 'left', order_index: 0 },
            { id: 'right', region: 'right', order_index: 1 }
        ]
    },
    // Lesson 11-20 - Single layouts
    {
        id: 11,
        lesson_version_id: 11,
        node_type: 'single',
        slots: [{ id: 'main', region: 'main', order_index: 0 }]
    },
    {
        id: 12,
        lesson_version_id: 12,
        node_type: 'single',
        slots: [{ id: 'main', region: 'main', order_index: 0 }]
    },
    // Lesson 13 - Hooks (Split)
    {
        id: 13,
        lesson_version_id: 13,
        node_type: 'split',
        slots: [
            { id: 'left', region: 'left', order_index: 0 },
            { id: 'right', region: 'right', order_index: 1 }
        ]
    },
    {
        id: 14,
        lesson_version_id: 14,
        node_type: 'single',
        slots: [{ id: 'main', region: 'main', order_index: 0 }]
    },
    {
        id: 15,
        lesson_version_id: 15,
        node_type: 'single',
        slots: [{ id: 'main', region: 'main', order_index: 0 }]
    },
    {
        id: 16,
        lesson_version_id: 16,
        node_type: 'single',
        slots: [{ id: 'main', region: 'main', order_index: 0 }]
    },
    {
        id: 17,
        lesson_version_id: 17,
        node_type: 'single',
        slots: [{ id: 'main', region: 'main', order_index: 0 }]
    },
    {
        id: 18,
        lesson_version_id: 18,
        node_type: 'single',
        slots: [{ id: 'main', region: 'main', order_index: 0 }]
    },
    {
        id: 19,
        lesson_version_id: 19,
        node_type: 'single',
        slots: [{ id: 'main', region: 'main', order_index: 0 }]
    },
    {
        id: 20,
        lesson_version_id: 20,
        node_type: 'single',
        slots: [{ id: 'main', region: 'main', order_index: 0 }]
    },

    // =============================================
    // COURSE 2 - Python (version IDs 21-40)
    // =============================================
    {
        id: 21,
        lesson_version_id: 21,
        node_type: 'single',
        slots: [{ id: 'main', region: 'main', order_index: 0 }]
    },
    {
        id: 22,
        lesson_version_id: 22,
        node_type: 'split',
        slots: [
            { id: 'left', region: 'left', order_index: 0 },
            { id: 'right', region: 'right', order_index: 1 }
        ]
    },
    {
        id: 23,
        lesson_version_id: 23,
        node_type: 'single',
        slots: [{ id: 'main', region: 'main', order_index: 0 }]
    },
    {
        id: 24,
        lesson_version_id: 24,
        node_type: 'single',
        slots: [{ id: 'main', region: 'main', order_index: 0 }]
    },
    {
        id: 25,
        lesson_version_id: 25,
        node_type: 'single',
        slots: [{ id: 'main', region: 'main', order_index: 0 }]
    },
    // Python lessons 26-40 (single layouts for simplicity)
    ...[26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40].map(id => ({
        id,
        lesson_version_id: id,
        node_type: 'single' as const,
        slots: [{ id: 'main', region: 'main', order_index: 0 }]
    })),

    // =============================================
    // OTHER COURSES (version IDs 41-55 - one lesson each)
    // =============================================
    ...[41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55].map(id => ({
        id,
        lesson_version_id: id,
        node_type: 'single' as const,
        slots: [{ id: 'main', region: 'main', order_index: 0 }]
    })),

    // =============================================
    // DEMO COURSE (version IDs 56-69 - All layout types)
    // =============================================
    // Demo 1 - Single Layout
    {
        id: 56,
        lesson_version_id: 56,
        node_type: 'single',
        slots: [{ id: 'main', region: 'main', order_index: 0 }]
    },
    // Demo 2 - Split Layout
    {
        id: 57,
        lesson_version_id: 57,
        node_type: 'split',
        slots: [
            { id: 'left', region: 'left', order_index: 0 },
            { id: 'right', region: 'right', order_index: 1 }
        ]
    },
    // Demo 3 - Sidebar Left
    {
        id: 58,
        lesson_version_id: 58,
        node_type: 'sidebar-left',
        slots: [
            { id: 'nav', region: 'sidebar', order_index: 0 },
            { id: 'main', region: 'main', order_index: 1 }
        ]
    },
    // Demo 4 - Sidebar Right
    {
        id: 59,
        lesson_version_id: 59,
        node_type: 'sidebar-right',
        slots: [
            { id: 'main', region: 'main', order_index: 0 },
            { id: 'sidebar', region: 'sidebar', order_index: 1 }
        ]
    },
    // Demo 5 - Grid Layout
    {
        id: 60,
        lesson_version_id: 60,
        node_type: 'grid',
        slots: [
            { id: 'grid-1', region: 'grid-1', order_index: 0 },
            { id: 'grid-2', region: 'grid-2', order_index: 1 },
            { id: 'grid-3', region: 'grid-3', order_index: 2 },
            { id: 'grid-4', region: 'grid-4', order_index: 3 }
        ],
        config: { columns: 2, rows: 2 }
    },
    // Demo 6 - Stacked Layout
    {
        id: 61,
        lesson_version_id: 61,
        node_type: 'stacked',
        slots: [
            { id: 'hero', region: 'hero', order_index: 0 },
            { id: 'content', region: 'content', order_index: 1 }
        ]
    },
    // Demo 7 - Focus Layout
    {
        id: 62,
        lesson_version_id: 62,
        node_type: 'focus',
        slots: [{ id: 'center', region: 'center', order_index: 0 }],
        config: { max_width: '800px' }
    },
    // Demo 8-14: Additional demo lessons with single layout
    ...[63, 64, 65, 66, 67, 68, 69].map(id => ({
        id,
        lesson_version_id: id,
        node_type: 'single' as const,
        slots: [{ id: 'main', region: 'main', order_index: 0 }]
    }))
];
