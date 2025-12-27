// Helper function to generate layout object from layout type
export function getLayoutFromType(layoutType: string) {
    const layouts: Record<string, any> = {
        'single': {
            node_type: 'single',
            slots: [{ id: 'main', region: 'main', order_index: 0 }]
        },
        'split': {
            node_type: 'split',
            slots: [
                { id: 'left', region: 'left', order_index: 0 },
                { id: 'right', region: 'right', order_index: 1 }
            ]
        },
        'sidebar-left': {
            node_type: 'sidebar-left',
            slots: [
                { id: 'nav', region: 'sidebar', order_index: 0 },
                { id: 'main', region: 'main', order_index: 1 }
            ]
        },
        'sidebar-right': {
            node_type: 'sidebar-right',
            slots: [
                { id: 'main', region: 'main', order_index: 0 },
                { id: 'sidebar', region: 'sidebar', order_index: 1 }
            ]
        },
        'grid': {
            node_type: 'grid',
            slots: [
                { id: 'grid-1', region: 'grid-1', order_index: 0 },
                { id: 'grid-2', region: 'grid-2', order_index: 1 },
                { id: 'grid-3', region: 'grid-3', order_index: 2 },
                { id: 'grid-4', region: 'grid-4', order_index: 3 }
            ]
        },
        'stacked': {
            node_type: 'stacked',
            slots: [
                { id: 'hero', region: 'hero', order_index: 0 },
                { id: 'content', region: 'content', order_index: 1 }
            ]
        },
        'focus': {
            node_type: 'focus',
            slots: [{ id: 'center', region: 'center', order_index: 0 }]
        }
    };

    return layouts[layoutType] || layouts['single'];
}

// Default templates
export const getDefaultTemplates = () => ({
    'basic-video': {
        title: 'Video Lesson',
        layout: 'single',
        content: { main: [{ type: 'video' }, { type: 'text' }] }
    },
    'quiz-practice': {
        title: 'Quiz + Practice',
        layout: 'split',
        content: { left: [{ type: 'text' }], right: [{ type: 'quiz' }, { type: 'practice' }] }
    }
});
