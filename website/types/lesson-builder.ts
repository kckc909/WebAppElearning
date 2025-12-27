
export type BlockType =
    | 'text'
    | 'video'
    | 'image'
    | 'document'
    | 'ide'
    | 'quiz'
    | 'practice'
    | 'embed'
    | 'question-slot'
    | 'smart-file';

export type LessonLayout =
    | 'single'         // Full-width single column
    | 'split'          // Two equal columns (50-50)
    | 'sidebar-left'   // Narrow left sidebar + main content
    | 'sidebar-right'  // Main content + narrow right sidebar
    | 'grid'           // 2x2 grid layout
    | 'stacked'        // Hero area on top + content below
    | 'focus';         // Centered content with max-width

export interface BlockSettings {
    // Visual Styles
    padding?: string;        // e.g., 'p-2', 'p-6'
    backgroundColor?: string; // e.g., 'bg-white', 'bg-slate-50'
    borderRadius?: string;    // e.g., 'rounded-none', 'rounded-xl'
    textAlign?: 'left' | 'center' | 'right';
    flexGrow?: boolean;       // If true, block expands to fill available space
    isSticky?: boolean;       // If true, block sticks to top while scrolling

    // Type-specific settings
    autoplay?: boolean;      // Video
    showControls?: boolean;  // Video
    language?: string;       // IDE
    readOnly?: boolean;      // IDE
    height?: string;         // Embed/Doc e.g., 'h-64', 'h-96'
    points?: number;         // Quiz/Practice
    altText?: string;        // Image
}

export interface QuizContent {
    question: string;
    imageUrl?: string;
    questionType: 'multiple-choice' | 'text-input' | 'file-upload' | 'mixed';
    options?: string[]; // Only for multiple-choice
    correctAnswer?: number | string; // Index for choice, regex/string for text
}

export interface ContentBlock {
    id: string;
    type: BlockType;
    title?: string;
    content: any | QuizContent; // Dynamic content structure based on type
    settings: BlockSettings;
}

export interface LessonMetadata {
    objective: string;
    estimatedTime: number; // minutes
    isOptional: boolean;

    // Layout Visuals
    gapSize?: string;      // e.g., 'gap-4', 'gap-8'
    containerWidth?: string; // e.g., 'max-w-3xl', 'max-w-full'
    backgroundColor?: string;
}

export interface Lesson {
    id: string;
    title: string;
    status: 'draft' | 'published' | 'hidden';
    layout: LessonLayout;
    metadata: LessonMetadata;
    content: {
        [regionId: string]: ContentBlock[];
    };
}

export interface Section {
    id: string;
    title: string;
    lessons: Lesson[];
}

export interface CourseData {
    title: string;
    description: string;
    category: string;
    status: 'draft' | 'published' | 'archived';
    lastSaved: Date;
    sections: Section[];
}
