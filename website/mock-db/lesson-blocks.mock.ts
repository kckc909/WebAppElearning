/**
 * MOCK DB - lesson_blocks
 * Complete content blocks for Course 1, 2 and Demo course
 */

export type BlockType = 'text' | 'video' | 'image' | 'document' | 'ide' | 'quiz' | 'practice' | 'embed' | 'question-slot' | 'smart-file';

export interface LessonBlock {
    id: number;
    lesson_version_id: number;
    slot_id: string;
    type: BlockType;
    order_index: number;
    content: any;
    settings: {
        padding?: string;
        background_color?: string;
        border_radius?: string;
        text_align?: 'left' | 'center' | 'right';
        flex_grow?: boolean;
        is_sticky?: boolean;
        autoplay?: boolean;
        show_controls?: boolean;
        language?: string;
        read_only?: boolean;
        height?: string;
        points?: number;
        alt_text?: string;
    };
    created_at: Date;
    updated_at: Date;
}

const now = new Date('2024-12-18');

// Helper to create blocks quickly
const block = (id: number, versionId: number, slotId: string, type: BlockType, order: number, content: any, settings: any = {}): LessonBlock => ({
    id, lesson_version_id: versionId, slot_id: slotId, type, order_index: order, content,
    settings: { padding: 'p-6', background_color: 'bg-white', border_radius: 'rounded-xl', ...settings },
    created_at: now, updated_at: now
});

export const LESSON_BLOCKS: LessonBlock[] = [
    // =============================================
    // COURSE 1 - ReactJS (20 Lessons, version IDs 1-20)
    // =============================================

    // Lesson 1 - Welcome (single layout)
    block(1, 1, 'main', 'text', 0, { html: '<h1>Chào mừng đến với ReactJS!</h1><p>React là thư viện JavaScript phổ biến nhất để xây dựng giao diện người dùng. Trong khóa học này, bạn sẽ học từ cơ bản đến nâng cao.</p>' }),
    block(2, 1, 'main', 'video', 1, { url: 'https://www.youtube.com/watch?v=SqcY0GlETPk', title: 'React Introduction' }, { show_controls: true }),
    block(3, 1, 'main', 'quiz', 2, { question: 'React được tạo bởi công ty nào?', question_type: 'multiple-choice', options: ['Google', 'Facebook/Meta', 'Microsoft', 'Apple'], correct_answer: 1 }, { points: 10 }),

    // Lesson 2 - What is React (split layout)
    block(4, 2, 'left', 'video', 0, { url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8', title: 'What is ReactJS' }, { is_sticky: true, show_controls: true }),
    block(5, 2, 'right', 'text', 0, { html: '<h2>ReactJS là gì?</h2><ul><li>Thư viện JavaScript cho UI</li><li>Component-based architecture</li><li>Virtual DOM</li><li>Declarative programming</li></ul>' }, { background_color: 'bg-blue-50' }),
    block(6, 2, 'right', 'ide', 1, { code: '// React Component\nfunction Hello() {\n  return <h1>Hello World!</h1>;\n}' }, { language: 'javascript', height: 'h-48', background_color: 'bg-slate-900' }),

    // Lesson 3 - Install Tools (single)
    block(7, 3, 'main', 'text', 0, { html: '<h1>Cài đặt môi trường</h1><p>Bạn cần cài đặt Node.js và Visual Studio Code để bắt đầu.</p>' }),
    block(8, 3, 'main', 'document', 1, { url: '/docs/nodejs-install.pdf', title: 'Hướng dẫn cài đặt Node.js', pages: 5 }, { height: 'h-96' }),
    block(9, 3, 'main', 'embed', 2, { url: 'https://nodejs.org', title: 'NodeJS Official Website' }, { height: 'h-80' }),

    // Lesson 4 - First Project (sidebar-right)
    block(10, 4, 'main', 'text', 0, { html: '<h1>Tạo dự án React đầu tiên</h1><p>Sử dụng Create React App hoặc Vite để khởi tạo dự án.</p>' }),
    block(11, 4, 'main', 'ide', 1, { code: '# Tạo project mới\nnpx create-react-app my-app\ncd my-app\nnpm start' }, { language: 'bash', height: 'h-32' }),
    block(12, 4, 'sidebar', 'image', 0, { url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400', caption: 'React Logo' }, { alt_text: 'React' }),
    block(13, 4, 'sidebar', 'text', 1, { html: '<h3>Tips</h3><ul><li>Sử dụng npm hoặc yarn</li><li>VS Code extensions</li></ul>' }, { background_color: 'bg-yellow-50' }),

    // Lesson 5 - JSX (single)
    block(14, 5, 'main', 'text', 0, { html: '<h1>JSX là gì?</h1><p>JSX = JavaScript XML. Cho phép viết HTML trong JavaScript.</p>' }),
    block(15, 5, 'main', 'ide', 1, { code: 'const element = <h1>Hello, {name}!</h1>;\n\n// Compiles to:\nconst element = React.createElement("h1", null, "Hello, ", name, "!");' }, { language: 'jsx', height: 'h-40' }),
    block(16, 5, 'main', 'quiz', 2, { question: 'JSX là viết tắt của gì?', question_type: 'multiple-choice', options: ['JavaScript XML', 'Java Syntax Extension', 'JavaScript Extension', 'Java XML'], correct_answer: 0 }, { points: 10 }),

    // Lesson 6 - Functional Components (split)
    block(17, 6, 'left', 'text', 0, { html: '<h2>Functional Components</h2><p>Cách hiện đại nhất để viết React components.</p>' }),
    block(18, 6, 'left', 'video', 1, { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', title: 'Components Tutorial' }, { show_controls: true }),
    block(19, 6, 'right', 'ide', 0, { code: 'function Welcome(props) {\n  return <h1>Hello, {props.name}</h1>;\n}\n\n// Arrow function\nconst Welcome = ({ name }) => {\n  return <h1>Hello, {name}</h1>;\n};' }, { language: 'jsx', height: 'h-64' }),

    // Lesson 7 - Class Components (single)
    block(20, 7, 'main', 'text', 0, { html: '<h1>Class Components (Legacy)</h1><p>Cách cũ để viết components. Vẫn cần biết để maintain code cũ.</p>' }),
    block(21, 7, 'main', 'ide', 1, { code: 'class Welcome extends React.Component {\n  render() {\n    return <h1>Hello, {this.props.name}</h1>;\n  }\n}' }, { language: 'jsx', height: 'h-40' }),

    // Lesson 8 - Practice Components (sidebar-left)
    block(22, 8, 'nav', 'text', 0, { html: '<h3>Bài tập</h3><ol><li>Button</li><li>Card</li><li>Form</li></ol>' }, { is_sticky: true, background_color: 'bg-slate-100' }),
    block(23, 8, 'main', 'practice', 0, { title: 'Tạo Button Component', description: 'Xây dựng button có các variants', requirements: ['Primary button', 'Secondary button', 'Disabled state'], starter_code: 'function Button({ variant, children }) {\n  // Your code\n}', points: 50 }),
    block(24, 8, 'main', 'ide', 1, { code: '// Viết code ở đây' }, { language: 'jsx', height: 'h-64', read_only: false }),

    // Lessons 9-20: Simplified blocks for remaining ReactJS lessons
    block(25, 9, 'main', 'text', 0, { html: '<h1>State là gì?</h1><p>State là dữ liệu nội bộ của component, có thể thay đổi theo thời gian.</p>' }),
    block(26, 9, 'main', 'ide', 1, { code: 'const [count, setCount] = useState(0);' }, { language: 'jsx', height: 'h-32' }),

    block(27, 10, 'left', 'text', 0, { html: '<h2>Props & Data Flow</h2><p>Props truyền dữ liệu từ parent xuống child.</p>' }),
    block(28, 10, 'right', 'ide', 0, { code: '<ChildComponent name="React" />' }, { language: 'jsx', height: 'h-32' }),

    block(29, 11, 'main', 'text', 0, { html: '<h1>Lifting State Up</h1><p>Di chuyển state lên component cha chung.</p>' }),
    block(30, 12, 'main', 'practice', 0, { title: 'State Practice', description: 'Build a counter', points: 30 }),

    block(31, 13, 'left', 'text', 0, { html: '<h2>useState Hook</h2>' }),
    block(32, 13, 'right', 'ide', 0, { code: 'const [value, setValue] = useState(initial);' }, { language: 'jsx' }),

    block(33, 14, 'left', 'text', 0, { html: '<h2>useEffect Hook</h2>' }),
    block(34, 14, 'right', 'ide', 0, { code: 'useEffect(() => {\n  // Side effect\n}, [deps]);' }, { language: 'jsx' }),

    block(35, 15, 'main', 'text', 0, { html: '<h1>useContext & Custom Hooks</h1>' }),
    block(36, 16, 'main', 'practice', 0, { title: 'Hooks Practice', points: 50 }),

    block(37, 17, 'left', 'text', 0, { html: '<h2>React Router</h2>' }),
    block(38, 17, 'right', 'ide', 0, { code: '<Route path="/" element={<Home />} />' }, { language: 'jsx' }),

    block(39, 18, 'main', 'text', 0, { html: '<h1>Protected Routes</h1>' }),
    block(40, 19, 'left', 'text', 0, { html: '<h2>Final Project Setup</h2>' }),
    block(41, 20, 'main', 'text', 0, { html: '<h1>Deployment</h1><p>Deploy React app to Vercel or Netlify.</p>' }),

    // =============================================
    // COURSE 2 - Python (20 Lessons, version IDs 21-40)
    // =============================================

    block(42, 21, 'main', 'text', 0, { html: '<h1>Chào mừng đến với Python!</h1><p>Python là ngôn ngữ lập trình phổ biến, dễ học.</p>' }),
    block(43, 21, 'main', 'video', 1, { url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc' }, { show_controls: true }),

    block(44, 22, 'main', 'text', 0, { html: '<h1>Cài đặt Python</h1>' }),
    block(45, 22, 'main', 'document', 1, { url: '/docs/python-install.pdf', title: 'Install Guide' }),

    block(46, 23, 'left', 'text', 0, { html: '<h2>Hello World</h2>' }),
    block(47, 23, 'right', 'ide', 0, { code: 'print("Hello, World!")' }, { language: 'python' }),

    block(48, 24, 'main', 'text', 0, { html: '<h1>Cú pháp Python</h1>' }),
    block(49, 24, 'main', 'ide', 1, { code: '# Variables\nname = "Python"\nage = 30\nis_fun = True' }, { language: 'python' }),

    block(50, 25, 'left', 'text', 0, { html: '<h2>Numbers & Strings</h2>' }),
    block(51, 25, 'right', 'ide', 0, { code: 'x = 10\ny = 3.14\ntext = "Hello"' }, { language: 'python' }),

    block(52, 26, 'left', 'text', 0, { html: '<h2>Lists & Tuples</h2>' }),
    block(53, 26, 'right', 'ide', 0, { code: 'my_list = [1, 2, 3]\nmy_tuple = (1, 2, 3)' }, { language: 'python' }),

    block(54, 27, 'main', 'text', 0, { html: '<h1>Dictionaries</h1>' }),
    block(55, 27, 'main', 'ide', 1, { code: 'person = {"name": "John", "age": 30}' }, { language: 'python' }),

    block(56, 28, 'main', 'practice', 0, { title: 'Data Types Practice', points: 40 }),

    block(57, 29, 'left', 'text', 0, { html: '<h2>Functions</h2>' }),
    block(58, 29, 'right', 'ide', 0, { code: 'def greet(name):\n    return f"Hello, {name}!"' }, { language: 'python' }),

    block(59, 30, 'left', 'text', 0, { html: '<h2>Classes</h2>' }),
    block(60, 30, 'right', 'ide', 0, { code: 'class Person:\n    def __init__(self, name):\n        self.name = name' }, { language: 'python' }),

    block(61, 31, 'main', 'text', 0, { html: '<h1>Inheritance</h1>' }),
    block(62, 32, 'main', 'practice', 0, { title: 'OOP Practice', points: 50 }),

    block(63, 33, 'main', 'text', 0, { html: '<h1>Pip & Virtual Environments</h1>' }),
    block(64, 33, 'main', 'ide', 1, { code: 'pip install numpy\npython -m venv env' }, { language: 'bash' }),

    block(65, 34, 'left', 'text', 0, { html: '<h2>NumPy</h2>' }),
    block(66, 34, 'right', 'ide', 0, { code: 'import numpy as np\narr = np.array([1, 2, 3])' }, { language: 'python' }),

    block(67, 35, 'left', 'text', 0, { html: '<h2>Pandas</h2>' }),
    block(68, 35, 'right', 'ide', 0, { code: 'import pandas as pd\ndf = pd.read_csv("data.csv")' }, { language: 'python' }),

    block(69, 36, 'main', 'practice', 0, { title: 'Libraries Practice', points: 45 }),

    block(70, 37, 'main', 'text', 0, { html: '<h1>Final Project Overview</h1>' }),
    block(71, 38, 'left', 'text', 0, { html: '<h2>Data Collection</h2>' }),
    block(72, 39, 'left', 'text', 0, { html: '<h2>Analysis</h2>' }),
    block(73, 40, 'main', 'text', 0, { html: '<h1>Final Presentation</h1>' }),

    // =============================================
    // OTHER COURSES - Minimal (1 block each)
    // =============================================
    block(74, 41, 'main', 'text', 0, { html: '<h1>Welcome to NodeJS</h1><p>Server-side JavaScript runtime.</p>' }),
    block(75, 42, 'main', 'text', 0, { html: '<h1>Machine Learning Intro</h1>' }),
    block(76, 43, 'main', 'text', 0, { html: '<h1>Flutter Introduction</h1>' }),
    block(77, 44, 'main', 'text', 0, { html: '<h1>IELTS Speaking</h1>' }),
    block(78, 45, 'main', 'text', 0, { html: '<h1>TOEIC Test Structure</h1>' }),
    block(79, 46, 'main', 'text', 0, { html: '<h1>Business Email</h1>' }),
    block(80, 47, 'main', 'text', 0, { html: '<h1>UI vs UX</h1>' }),
    block(81, 48, 'main', 'text', 0, { html: '<h1>Photoshop Interface</h1>' }),
    block(82, 49, 'main', 'text', 0, { html: '<h1>Premiere Pro</h1>' }),
    block(83, 50, 'main', 'text', 0, { html: '<h1>Digital Marketing</h1>' }),
    block(84, 51, 'main', 'text', 0, { html: '<h1>Excel Basics</h1>' }),
    block(85, 52, 'main', 'text', 0, { html: '<h1>Presentation Skills</h1>' }),
    block(86, 53, 'main', 'text', 0, { html: '<h1>Time Management</h1>' }),

    // =============================================
    // DEMO COURSE - All Block Types (version IDs 54-67)
    // =============================================

    // Demo - All layouts with varied blocks
    block(87, 54, 'main', 'text', 0, { html: '<h1>Single Layout</h1><p>Full width content area.</p>' }, { text_align: 'center' }),
    block(88, 54, 'main', 'video', 1, { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }, { show_controls: true }),

    block(89, 55, 'left', 'text', 0, { html: '<h2>Left Column</h2>' }, { background_color: 'bg-blue-50' }),
    block(90, 55, 'right', 'text', 0, { html: '<h2>Right Column</h2>' }, { background_color: 'bg-green-50' }),

    block(91, 56, 'nav', 'text', 0, { html: '<h3>Navigation</h3><ul><li>Item 1</li><li>Item 2</li></ul>' }, { is_sticky: true }),
    block(92, 56, 'main', 'text', 0, { html: '<h1>Main Content</h1>' }),

    block(93, 57, 'main', 'text', 0, { html: '<h1>Content with Sidebar</h1>' }),
    block(94, 57, 'sidebar', 'text', 0, { html: '<h3>Sidebar Info</h3>' }, { background_color: 'bg-yellow-50' }),

    block(95, 58, 'grid-1', 'text', 0, { html: '<h3>Cell 1</h3>' }, { background_color: 'bg-red-50' }),
    block(96, 58, 'grid-2', 'text', 0, { html: '<h3>Cell 2</h3>' }, { background_color: 'bg-blue-50' }),
    block(97, 58, 'grid-3', 'text', 0, { html: '<h3>Cell 3</h3>' }, { background_color: 'bg-green-50' }),
    block(98, 58, 'grid-4', 'text', 0, { html: '<h3>Cell 4</h3>' }, { background_color: 'bg-purple-50' }),

    block(99, 59, 'hero', 'text', 0, { html: '<h1>Hero Section</h1>' }, { background_color: 'bg-gradient-to-r from-blue-500 to-purple-600', text_align: 'center' }),
    block(100, 59, 'content', 'text', 0, { html: '<h2>Content Below</h2>' }),

    block(101, 60, 'center', 'text', 0, { html: '<h1>Focused Content</h1><p>Centered for readability.</p>' }, { text_align: 'center' }),

    // Demo Block Types
    block(102, 61, 'left', 'video', 0, { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }, { show_controls: true, is_sticky: true }),
    block(103, 61, 'right', 'text', 0, { html: '<h2>Text Block</h2><p>Rich formatted text content.</p>' }),
    block(104, 61, 'right', 'image', 1, { url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600', caption: 'Image Block' }),

    block(105, 62, 'left', 'quiz', 0, { question: 'Quiz Demo Question?', question_type: 'multiple-choice', options: ['A', 'B', 'C', 'D'], correct_answer: 0 }, { points: 10 }),
    block(106, 62, 'right', 'ide', 0, { code: '// IDE Block Demo\nfunction example() {\n  console.log("Hello!");\n}' }, { language: 'javascript', height: 'h-48' }),

    block(107, 63, 'main', 'text', 0, { html: '<h1>Document & Embed Demo</h1>' }),
    block(108, 63, 'main', 'document', 1, { url: '/docs/sample.pdf', title: 'Sample Document' }, { height: 'h-80' }),
    block(109, 63, 'main', 'embed', 2, { url: 'https://codesandbox.io/embed/react-new', title: 'CodeSandbox' }, { height: 'h-80' }),

    block(110, 64, 'main', 'practice', 0, { title: 'Practice Block Demo', description: 'Build something cool', requirements: ['Req 1', 'Req 2'], points: 100 }),
    block(111, 64, 'sidebar', 'image', 0, { url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400' }),

    block(112, 65, 'grid-1', 'text', 0, { html: '<h3>Text</h3>' }),
    block(113, 65, 'grid-2', 'video', 0, { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }),
    block(114, 65, 'grid-3', 'quiz', 0, { question: 'Quick quiz?', options: ['A', 'B'], correct_answer: 0 }),
    block(115, 65, 'grid-4', 'ide', 0, { code: '// Code' }, { language: 'javascript' }),

    block(116, 66, 'hero', 'text', 0, { html: '<h1>Advanced Features</h1>' }),
    block(117, 66, 'content', 'text', 0, { html: '<h2>Sticky, Flex-grow, Custom styles</h2>' }),

    block(118, 67, 'nav', 'text', 0, { html: '<h3>Complete Example Nav</h3>' }, { is_sticky: true }),
    block(119, 67, 'main', 'text', 0, { html: '<h1>Complete Lesson</h1><p>This demonstrates a full lesson with all features.</p>' }),
    block(120, 67, 'main', 'video', 1, { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }),
    block(121, 67, 'main', 'quiz', 2, { question: 'Final Quiz?', options: ['Yes', 'No'], correct_answer: 0 }),
    block(122, 67, 'main', 'ide', 3, { code: '// Final code example' }, { language: 'javascript' }),
    block(123, 67, 'main', 'practice', 4, { title: 'Final Practice', points: 100 }),
];

// Helper functions
export const getBlocksByVersionId = (versionId: number) => LESSON_BLOCKS.filter(b => b.lesson_version_id === versionId);
export const getBlocksBySlot = (versionId: number, slotId: string) =>
    LESSON_BLOCKS.filter(b => b.lesson_version_id === versionId && b.slot_id === slotId).sort((a, b) => a.order_index - b.order_index);
