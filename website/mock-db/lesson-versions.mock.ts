/**
 * MOCK DB - lesson_versions
 * Each lesson can have multiple versions (draft + published)
 * Complete data for Course 1 & 2, minimal for others
 */

export interface LessonVersion {
    id: number;
    lesson_id: number;
    version_number: number;
    status: 'draft' | 'published' | 'archived';
    layout_type: 'single' | 'split' | 'sidebar-left' | 'sidebar-right' | 'grid' | 'stacked' | 'focus';
    metadata: {
        objective?: string;
        estimated_time?: number; // minutes
        is_optional?: boolean;
        container_width?: string;
        gap_size?: string;
        background_color?: string;
    };
    created_at: Date;
    updated_at: Date;
    published_at?: Date;
}

export const LESSON_VERSIONS: LessonVersion[] = [
    // =============================================
    // COURSE 1 - ReactJS (Lessons 1-20)
    // =============================================

    // Section 1: Giới thiệu
    {
        id: 1,
        lesson_id: 1,
        version_number: 1,
        status: 'published',
        layout_type: 'single',
        metadata: {
            objective: 'Welcome students and introduce ReactJS course',
            estimated_time: 10,
            is_optional: false,
            container_width: 'max-w-5xl',
            gap_size: 'gap-6',
            background_color: 'bg-slate-100/50'
        },
        created_at: new Date('2024-01-15'),
        updated_at: new Date('2024-01-15'),
        published_at: new Date('2024-01-15')
    },
    {
        id: 2,
        lesson_id: 2,
        version_number: 1,
        status: 'published',
        layout_type: 'split',
        metadata: {
            objective: 'Understand what ReactJS is and why to learn it',
            estimated_time: 15,
            is_optional: false,
            container_width: 'max-w-7xl',
            gap_size: 'gap-6'
        },
        created_at: new Date('2024-01-15'),
        updated_at: new Date('2024-01-15'),
        published_at: new Date('2024-01-15')
    },
    {
        id: 3,
        lesson_id: 3,
        version_number: 1,
        status: 'published',
        layout_type: 'single',
        metadata: {
            objective: 'Install Node.js and VS Code for development',
            estimated_time: 12,
            is_optional: false,
            container_width: 'max-w-5xl',
            gap_size: 'gap-6'
        },
        created_at: new Date('2024-01-15'),
        updated_at: new Date('2024-01-15'),
        published_at: new Date('2024-01-15')
    },
    {
        id: 4,
        lesson_id: 4,
        version_number: 1,
        status: 'published',
        layout_type: 'sidebar-right',
        metadata: {
            objective: 'Create first React project using Create React App',
            estimated_time: 20,
            is_optional: false,
            container_width: 'max-w-7xl',
            gap_size: 'gap-6'
        },
        created_at: new Date('2024-01-15'),
        updated_at: new Date('2024-01-15'),
        published_at: new Date('2024-01-15')
    },

    // Section 2: React Cơ Bản
    {
        id: 5,
        lesson_id: 5,
        version_number: 1,
        status: 'published',
        layout_type: 'single',
        metadata: {
            objective: 'Understand JSX syntax and expressions',
            estimated_time: 15,
            is_optional: false,
            container_width: 'max-w-5xl',
            gap_size: 'gap-6'
        },
        created_at: new Date('2024-01-16'),
        updated_at: new Date('2024-01-16'),
        published_at: new Date('2024-01-16')
    },
    {
        id: 6,
        lesson_id: 6,
        version_number: 1,
        status: 'published',
        layout_type: 'split',
        metadata: {
            objective: 'Learn functional components in React',
            estimated_time: 18,
            is_optional: false,
            container_width: 'max-w-7xl',
            gap_size: 'gap-6'
        },
        created_at: new Date('2024-01-16'),
        updated_at: new Date('2024-01-16'),
        published_at: new Date('2024-01-16')
    },
    {
        id: 7,
        lesson_id: 7,
        version_number: 1,
        status: 'published',
        layout_type: 'single',
        metadata: {
            objective: 'Understand legacy class components',
            estimated_time: 15,
            is_optional: true,
            container_width: 'max-w-5xl',
            gap_size: 'gap-6'
        },
        created_at: new Date('2024-01-16'),
        updated_at: new Date('2024-01-16'),
        published_at: new Date('2024-01-16')
    },
    {
        id: 8,
        lesson_id: 8,
        version_number: 1,
        status: 'published',
        layout_type: 'sidebar-left',
        metadata: {
            objective: 'Practice building React components',
            estimated_time: 30,
            is_optional: false,
            container_width: 'max-w-7xl',
            gap_size: 'gap-6'
        },
        created_at: new Date('2024-01-16'),
        updated_at: new Date('2024-01-16'),
        published_at: new Date('2024-01-16')
    },

    // Section 3: State & Props
    {
        id: 9,
        lesson_id: 9,
        version_number: 1,
        status: 'published',
        layout_type: 'single',
        metadata: {
            objective: 'Understand React state concept',
            estimated_time: 15,
            is_optional: false,
            container_width: 'max-w-5xl',
            gap_size: 'gap-6'
        },
        created_at: new Date('2024-01-17'),
        updated_at: new Date('2024-01-17'),
        published_at: new Date('2024-01-17')
    },
    {
        id: 10,
        lesson_id: 10,
        version_number: 1,
        status: 'published',
        layout_type: 'split',
        metadata: {
            objective: 'Learn props and data flow',
            estimated_time: 18,
            is_optional: false,
            container_width: 'max-w-7xl',
            gap_size: 'gap-6'
        },
        created_at: new Date('2024-01-17'),
        updated_at: new Date('2024-01-17'),
        published_at: new Date('2024-01-17')
    },
    {
        id: 11,
        lesson_id: 11,
        version_number: 1,
        status: 'published',
        layout_type: 'single',
        metadata: {
            objective: 'Lifting state up pattern',
            estimated_time: 20,
            is_optional: false,
            container_width: 'max-w-5xl',
            gap_size: 'gap-6'
        },
        created_at: new Date('2024-01-17'),
        updated_at: new Date('2024-01-17'),
        published_at: new Date('2024-01-17')
    },
    {
        id: 12,
        lesson_id: 12,
        version_number: 1,
        status: 'published',
        layout_type: 'sidebar-right',
        metadata: {
            objective: 'Practice state and props',
            estimated_time: 35,
            is_optional: false,
            container_width: 'max-w-7xl',
            gap_size: 'gap-6'
        },
        created_at: new Date('2024-01-17'),
        updated_at: new Date('2024-01-17'),
        published_at: new Date('2024-01-17')
    },

    // Section 4: React Hooks
    {
        id: 13,
        lesson_id: 13,
        version_number: 1,
        status: 'published',
        layout_type: 'split',
        metadata: {
            objective: 'Master useState hook',
            estimated_time: 20,
            is_optional: false,
            container_width: 'max-w-7xl',
            gap_size: 'gap-6'
        },
        created_at: new Date('2024-01-18'),
        updated_at: new Date('2024-01-18'),
        published_at: new Date('2024-01-18')
    },
    {
        id: 14,
        lesson_id: 14,
        version_number: 1,
        status: 'published',
        layout_type: 'split',
        metadata: {
            objective: 'Master useEffect hook',
            estimated_time: 25,
            is_optional: false,
            container_width: 'max-w-7xl',
            gap_size: 'gap-6'
        },
        created_at: new Date('2024-01-18'),
        updated_at: new Date('2024-01-18'),
        published_at: new Date('2024-01-18')
    },
    {
        id: 15,
        lesson_id: 15,
        version_number: 1,
        status: 'published',
        layout_type: 'single',
        metadata: {
            objective: 'useContext and custom hooks',
            estimated_time: 22,
            is_optional: false,
            container_width: 'max-w-5xl',
            gap_size: 'gap-6'
        },
        created_at: new Date('2024-01-18'),
        updated_at: new Date('2024-01-18'),
        published_at: new Date('2024-01-18')
    },
    {
        id: 16,
        lesson_id: 16,
        version_number: 1,
        status: 'published',
        layout_type: 'sidebar-left',
        metadata: {
            objective: 'Practice React hooks',
            estimated_time: 40,
            is_optional: false,
            container_width: 'max-w-7xl',
            gap_size: 'gap-6'
        },
        created_at: new Date('2024-01-18'),
        updated_at: new Date('2024-01-18'),
        published_at: new Date('2024-01-18')
    },

    // Section 5: React Router & Project
    {
        id: 17,
        lesson_id: 17,
        version_number: 1,
        status: 'published',
        layout_type: 'split',
        metadata: {
            objective: 'React Router basics',
            estimated_time: 18,
            is_optional: false,
            container_width: 'max-w-7xl',
            gap_size: 'gap-6'
        },
        created_at: new Date('2024-01-19'),
        updated_at: new Date('2024-01-19'),
        published_at: new Date('2024-01-19')
    },
    {
        id: 18,
        lesson_id: 18,
        version_number: 1,
        status: 'published',
        layout_type: 'single',
        metadata: {
            objective: 'Navigation and protected routes',
            estimated_time: 20,
            is_optional: false,
            container_width: 'max-w-5xl',
            gap_size: 'gap-6'
        },
        created_at: new Date('2024-01-19'),
        updated_at: new Date('2024-01-19'),
        published_at: new Date('2024-01-19')
    },
    {
        id: 19,
        lesson_id: 19,
        version_number: 1,
        status: 'published',
        layout_type: 'split',
        metadata: {
            objective: 'Final project setup',
            estimated_time: 25,
            is_optional: false,
            container_width: 'max-w-7xl',
            gap_size: 'gap-6'
        },
        created_at: new Date('2024-01-19'),
        updated_at: new Date('2024-01-19'),
        published_at: new Date('2024-01-19')
    },
    {
        id: 20,
        lesson_id: 20,
        version_number: 1,
        status: 'published',
        layout_type: 'single',
        metadata: {
            objective: 'Deploy React app to production',
            estimated_time: 30,
            is_optional: false,
            container_width: 'max-w-5xl',
            gap_size: 'gap-6'
        },
        created_at: new Date('2024-01-19'),
        updated_at: new Date('2024-01-19'),
        published_at: new Date('2024-01-19')
    },

    // =============================================
    // COURSE 2 - Python (Lessons 21-40)
    // =============================================

    // Section 6: Giới thiệu Python
    {
        id: 21,
        lesson_id: 21,
        version_number: 1,
        status: 'published',
        layout_type: 'single',
        metadata: {
            objective: 'Welcome to Python course',
            estimated_time: 10,
            is_optional: false,
            container_width: 'max-w-5xl',
            gap_size: 'gap-6'
        },
        created_at: new Date('2024-02-01'),
        updated_at: new Date('2024-02-01'),
        published_at: new Date('2024-02-01')
    },
    {
        id: 22,
        lesson_id: 22,
        version_number: 1,
        status: 'published',
        layout_type: 'single',
        metadata: {
            objective: 'Install Python and IDE',
            estimated_time: 12,
            is_optional: false,
            container_width: 'max-w-5xl',
            gap_size: 'gap-6'
        },
        created_at: new Date('2024-02-01'),
        updated_at: new Date('2024-02-01'),
        published_at: new Date('2024-02-01')
    },
    {
        id: 23,
        lesson_id: 23,
        version_number: 1,
        status: 'published',
        layout_type: 'split',
        metadata: {
            objective: 'First Hello World program',
            estimated_time: 8,
            is_optional: false,
            container_width: 'max-w-7xl',
            gap_size: 'gap-6'
        },
        created_at: new Date('2024-02-01'),
        updated_at: new Date('2024-02-01'),
        published_at: new Date('2024-02-01')
    },
    {
        id: 24,
        lesson_id: 24,
        version_number: 1,
        status: 'published',
        layout_type: 'single',
        metadata: {
            objective: 'Python basic syntax',
            estimated_time: 15,
            is_optional: false,
            container_width: 'max-w-5xl',
            gap_size: 'gap-6'
        },
        created_at: new Date('2024-02-01'),
        updated_at: new Date('2024-02-01'),
        published_at: new Date('2024-02-01')
    },

    // Continue with lessons 25-40 (similar pattern)...
    {
        id: 25, lesson_id: 25, version_number: 1, status: 'published', layout_type: 'split',
        metadata: { objective: 'Numbers and Strings in Python', estimated_time: 18 },
        created_at: new Date('2024-02-02'), updated_at: new Date('2024-02-02'), published_at: new Date('2024-02-02')
    },
    {
        id: 26, lesson_id: 26, version_number: 1, status: 'published', layout_type: 'split',
        metadata: { objective: 'Lists and Tuples', estimated_time: 20 },
        created_at: new Date('2024-02-02'), updated_at: new Date('2024-02-02'), published_at: new Date('2024-02-02')
    },
    {
        id: 27, lesson_id: 27, version_number: 1, status: 'published', layout_type: 'single',
        metadata: { objective: 'Dictionaries and Sets', estimated_time: 22 },
        created_at: new Date('2024-02-02'), updated_at: new Date('2024-02-02'), published_at: new Date('2024-02-02')
    },
    {
        id: 28, lesson_id: 28, version_number: 1, status: 'published', layout_type: 'sidebar-right',
        metadata: { objective: 'Data Types Practice', estimated_time: 30 },
        created_at: new Date('2024-02-02'), updated_at: new Date('2024-02-02'), published_at: new Date('2024-02-02')
    },
    {
        id: 29, lesson_id: 29, version_number: 1, status: 'published', layout_type: 'split',
        metadata: { objective: 'Defining Functions', estimated_time: 20 },
        created_at: new Date('2024-02-03'), updated_at: new Date('2024-02-03'), published_at: new Date('2024-02-03')
    },
    {
        id: 30, lesson_id: 30, version_number: 1, status: 'published', layout_type: 'split',
        metadata: { objective: 'Classes and Objects', estimated_time: 25 },
        created_at: new Date('2024-02-03'), updated_at: new Date('2024-02-03'), published_at: new Date('2024-02-03')
    },
    {
        id: 31, lesson_id: 31, version_number: 1, status: 'published', layout_type: 'single',
        metadata: { objective: 'Inheritance and Polymorphism', estimated_time: 28 },
        created_at: new Date('2024-02-03'), updated_at: new Date('2024-02-03'), published_at: new Date('2024-02-03')
    },
    {
        id: 32, lesson_id: 32, version_number: 1, status: 'published', layout_type: 'sidebar-left',
        metadata: { objective: 'OOP Practice', estimated_time: 40 },
        created_at: new Date('2024-02-03'), updated_at: new Date('2024-02-03'), published_at: new Date('2024-02-03')
    },
    {
        id: 33, lesson_id: 33, version_number: 1, status: 'published', layout_type: 'single',
        metadata: { objective: 'Pip and Virtual Environments', estimated_time: 15 },
        created_at: new Date('2024-02-04'), updated_at: new Date('2024-02-04'), published_at: new Date('2024-02-04')
    },
    {
        id: 34, lesson_id: 34, version_number: 1, status: 'published', layout_type: 'split',
        metadata: { objective: 'NumPy Basics', estimated_time: 25 },
        created_at: new Date('2024-02-04'), updated_at: new Date('2024-02-04'), published_at: new Date('2024-02-04')
    },
    {
        id: 35, lesson_id: 35, version_number: 1, status: 'published', layout_type: 'split',
        metadata: { objective: 'Pandas for Data Analysis', estimated_time: 30 },
        created_at: new Date('2024-02-04'), updated_at: new Date('2024-02-04'), published_at: new Date('2024-02-04')
    },
    {
        id: 36, lesson_id: 36, version_number: 1, status: 'published', layout_type: 'sidebar-right',
        metadata: { objective: 'Libraries Practice', estimated_time: 35 },
        created_at: new Date('2024-02-04'), updated_at: new Date('2024-02-04'), published_at: new Date('2024-02-04')
    },
    {
        id: 37, lesson_id: 37, version_number: 1, status: 'published', layout_type: 'single',
        metadata: { objective: 'Project Overview', estimated_time: 12 },
        created_at: new Date('2024-02-05'), updated_at: new Date('2024-02-05'), published_at: new Date('2024-02-05')
    },
    {
        id: 38, lesson_id: 38, version_number: 1, status: 'published', layout_type: 'split',
        metadata: { objective: 'Data Collection and Cleaning', estimated_time: 25 },
        created_at: new Date('2024-02-05'), updated_at: new Date('2024-02-05'), published_at: new Date('2024-02-05')
    },
    {
        id: 39, lesson_id: 39, version_number: 1, status: 'published', layout_type: 'split',
        metadata: { objective: 'Analysis and Visualization', estimated_time: 30 },
        created_at: new Date('2024-02-05'), updated_at: new Date('2024-02-05'), published_at: new Date('2024-02-05')
    },
    {
        id: 40, lesson_id: 40, version_number: 1, status: 'published', layout_type: 'single',
        metadata: { objective: 'Final Presentation', estimated_time: 20 },
        created_at: new Date('2024-02-05'), updated_at: new Date('2024-02-05'), published_at: new Date('2024-02-05')
    },

    // =============================================
    // OTHER COURSES - Minimal (1 Version each)
    // =============================================
    {
        id: 41, lesson_id: 41, version_number: 1, status: 'published', layout_type: 'single',
        metadata: { objective: 'NodeJS Introduction', estimated_time: 15 },
        created_at: new Date('2024-03-01'), updated_at: new Date('2024-03-01'), published_at: new Date('2024-03-01')
    },
    {
        id: 42, lesson_id: 42, version_number: 1, status: 'published', layout_type: 'single',
        metadata: { objective: 'ML Introduction', estimated_time: 20 },
        created_at: new Date('2024-03-01'), updated_at: new Date('2024-03-01'), published_at: new Date('2024-03-01')
    },
    {
        id: 43, lesson_id: 43, version_number: 1, status: 'published', layout_type: 'single',
        metadata: { objective: 'Flutter Introduction', estimated_time: 18 },
        created_at: new Date('2024-03-01'), updated_at: new Date('2024-03-01'), published_at: new Date('2024-03-01')
    },
    {
        id: 44, lesson_id: 44, version_number: 1, status: 'published', layout_type: 'single',
        metadata: { objective: 'IELTS Speaking Introduction', estimated_time: 15 },
        created_at: new Date('2024-03-01'), updated_at: new Date('2024-03-01'), published_at: new Date('2024-03-01')
    },
    {
        id: 45, lesson_id: 45, version_number: 1, status: 'published', layout_type: 'single',
        metadata: { objective: 'TOEIC Introduction', estimated_time: 12 },
        created_at: new Date('2024-03-01'), updated_at: new Date('2024-03-01'), published_at: new Date('2024-03-01')
    },
    {
        id: 46, lesson_id: 46, version_number: 1, status: 'published', layout_type: 'single',
        metadata: { objective: 'Business English Introduction', estimated_time: 20 },
        created_at: new Date('2024-03-01'), updated_at: new Date('2024-03-01'), published_at: new Date('2024-03-01')
    },
    {
        id: 47, lesson_id: 47, version_number: 1, status: 'published', layout_type: 'single',
        metadata: { objective: 'UI/UX Introduction', estimated_time: 15 },
        created_at: new Date('2024-03-01'), updated_at: new Date('2024-03-01'), published_at: new Date('2024-03-01')
    },
    {
        id: 48, lesson_id: 48, version_number: 1, status: 'published', layout_type: 'single',
        metadata: { objective: 'Photoshop Introduction', estimated_time: 18 },
        created_at: new Date('2024-03-01'), updated_at: new Date('2024-03-01'), published_at: new Date('2024-03-01')
    },
    {
        id: 49, lesson_id: 49, version_number: 1, status: 'published', layout_type: 'single',
        metadata: { objective: 'Premiere Introduction', estimated_time: 20 },
        created_at: new Date('2024-03-01'), updated_at: new Date('2024-03-01'), published_at: new Date('2024-03-01')
    },
    {
        id: 50, lesson_id: 50, version_number: 1, status: 'published', layout_type: 'single',
        metadata: { objective: 'Digital Marketing Introduction', estimated_time: 15 },
        created_at: new Date('2024-03-01'), updated_at: new Date('2024-03-01'), published_at: new Date('2024-03-01')
    },
    {
        id: 51, lesson_id: 51, version_number: 1, status: 'published', layout_type: 'single',
        metadata: { objective: 'Excel Introduction', estimated_time: 12 },
        created_at: new Date('2024-03-01'), updated_at: new Date('2024-03-01'), published_at: new Date('2024-03-01')
    },
    {
        id: 52, lesson_id: 52, version_number: 1, status: 'published', layout_type: 'single',
        metadata: { objective: 'Presentation Skills Introduction', estimated_time: 18 },
        created_at: new Date('2024-03-01'), updated_at: new Date('2024-03-01'), published_at: new Date('2024-03-01')
    },
    {
        id: 53, lesson_id: 53, version_number: 1, status: 'published', layout_type: 'single',
        metadata: { objective: 'Time Management Introduction', estimated_time: 15 },
        created_at: new Date('2024-03-01'), updated_at: new Date('2024-03-01'), published_at: new Date('2024-03-01')
    },

    // =============================================
    // COURSE 16 - Demo Course (Lessons 54-67)
    // =============================================
    {
        id: 54, lesson_id: 54, version_number: 1, status: 'published', layout_type: 'single',
        metadata: { objective: 'Single Layout Demo', estimated_time: 10, container_width: 'max-w-5xl' },
        created_at: new Date('2024-12-18'), updated_at: new Date('2024-12-18'), published_at: new Date('2024-12-18')
    },
    {
        id: 55, lesson_id: 55, version_number: 1, status: 'published', layout_type: 'split',
        metadata: { objective: 'Split Layout Demo', estimated_time: 12, container_width: 'max-w-7xl' },
        created_at: new Date('2024-12-18'), updated_at: new Date('2024-12-18'), published_at: new Date('2024-12-18')
    },
    {
        id: 56, lesson_id: 56, version_number: 1, status: 'published', layout_type: 'sidebar-left',
        metadata: { objective: 'Sidebar Left Layout Demo', estimated_time: 15, container_width: 'max-w-7xl' },
        created_at: new Date('2024-12-18'), updated_at: new Date('2024-12-18'), published_at: new Date('2024-12-18')
    },
    {
        id: 57, lesson_id: 57, version_number: 1, status: 'published', layout_type: 'sidebar-right',
        metadata: { objective: 'Sidebar Right Layout Demo', estimated_time: 15, container_width: 'max-w-7xl' },
        created_at: new Date('2024-12-18'), updated_at: new Date('2024-12-18'), published_at: new Date('2024-12-18')
    },
    {
        id: 58, lesson_id: 58, version_number: 1, status: 'published', layout_type: 'grid',
        metadata: { objective: 'Grid Layout Demo', estimated_time: 20, container_width: 'max-w-7xl' },
        created_at: new Date('2024-12-18'), updated_at: new Date('2024-12-18'), published_at: new Date('2024-12-18')
    },
    {
        id: 59, lesson_id: 59, version_number: 1, status: 'published', layout_type: 'stacked',
        metadata: { objective: 'Stacked Layout Demo', estimated_time: 18, container_width: 'max-w-6xl' },
        created_at: new Date('2024-12-18'), updated_at: new Date('2024-12-18'), published_at: new Date('2024-12-18')
    },
    {
        id: 60, lesson_id: 60, version_number: 1, status: 'published', layout_type: 'focus',
        metadata: { objective: 'Focus Layout Demo', estimated_time: 10, container_width: 'max-w-3xl' },
        created_at: new Date('2024-12-18'), updated_at: new Date('2024-12-18'), published_at: new Date('2024-12-18')
    },
    {
        id: 61, lesson_id: 61, version_number: 1, status: 'published', layout_type: 'split',
        metadata: { objective: 'Text & Video Blocks Demo', estimated_time: 15 },
        created_at: new Date('2024-12-18'), updated_at: new Date('2024-12-18'), published_at: new Date('2024-12-18')
    },
    {
        id: 62, lesson_id: 62, version_number: 1, status: 'published', layout_type: 'split',
        metadata: { objective: 'Quiz & IDE Blocks Demo', estimated_time: 25 },
        created_at: new Date('2024-12-18'), updated_at: new Date('2024-12-18'), published_at: new Date('2024-12-18')
    },
    {
        id: 63, lesson_id: 63, version_number: 1, status: 'published', layout_type: 'single',
        metadata: { objective: 'Document & Embed Blocks Demo', estimated_time: 20 },
        created_at: new Date('2024-12-18'), updated_at: new Date('2024-12-18'), published_at: new Date('2024-12-18')
    },
    {
        id: 64, lesson_id: 64, version_number: 1, status: 'published', layout_type: 'sidebar-right',
        metadata: { objective: 'Practice & Image Blocks Demo', estimated_time: 30 },
        created_at: new Date('2024-12-18'), updated_at: new Date('2024-12-18'), published_at: new Date('2024-12-18')
    },
    {
        id: 65, lesson_id: 65, version_number: 1, status: 'published', layout_type: 'grid',
        metadata: { objective: 'Mixed Content Demo', estimated_time: 25 },
        created_at: new Date('2024-12-18'), updated_at: new Date('2024-12-18'), published_at: new Date('2024-12-18')
    },
    {
        id: 66, lesson_id: 66, version_number: 1, status: 'published', layout_type: 'stacked',
        metadata: { objective: 'Advanced Features Demo', estimated_time: 20 },
        created_at: new Date('2024-12-18'), updated_at: new Date('2024-12-18'), published_at: new Date('2024-12-18')
    },
    {
        id: 67, lesson_id: 67, version_number: 1, status: 'published', layout_type: 'sidebar-left',
        metadata: { objective: 'Complete Lesson Example', estimated_time: 35 },
        created_at: new Date('2024-12-18'), updated_at: new Date('2024-12-18'), published_at: new Date('2024-12-18')
    },
];
