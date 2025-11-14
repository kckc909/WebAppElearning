import { Course, Instructor, Lesson, LessonComment, LessonQA, Review } from './cus_types';

export const INSTRUCTORS: Instructor[] = [
  {
    id: 1,
    name: 'An Tuan',
    avatar: 'https://picsum.photos/seed/instructor1/100/100',
    title: 'Data Scientist & AI Engineer',
    bio: 'With over 10 years of experience in AI, An Tuan has helped thousands of students master machine learning and data science. His courses are practical and project-based.',
    rating: 4.9,
    reviews: 1250,
    students: 15000,
    courses: 8,
  },
  {
    id: 2,
    name: 'Bao Chau',
    avatar: 'https://picsum.photos/seed/instructor2/100/100',
    title: 'IELTS 9.0 & English Communication Expert',
    bio: 'Bao Chau is a certified English teacher with a passion for helping students achieve their language goals. She specializes in IELTS preparation and real-world communication skills.',
    rating: 4.8,
    reviews: 980,
    students: 22000,
    courses: 12,
  },
  {
    id: 3,
    name: 'Minh Hieu',
    avatar: 'https://picsum.photos/seed/instructor3/100/100',
    title: 'Full-Stack Web Developer & UI/UX Designer',
    bio: 'Hieu is a passionate developer who loves building beautiful and functional websites. He has a knack for breaking down complex concepts into easy-to-understand lessons.',
    rating: 4.9,
    reviews: 1500,
    students: 18000,
    courses: 10,
  }
];

const REVIEWS: Review[] = [
  {
    id: 1,
    author: 'Minh Quan',
    avatar: 'https://picsum.photos/seed/user1/100/100',
    rating: 5,
    comment: 'Khóa học rất tuyệt vời! Giảng viên dạy dễ hiểu và nội dung rất thực tế. Tôi đã học được rất nhiều.',
    date: '2 weeks ago',
  },
  {
    id: 2,
    author: 'Lan Anh',
    avatar: 'https://picsum.photos/seed/user2/100/100',
    rating: 4,
    comment: 'Nội dung hay nhưng một vài video âm thanh hơi nhỏ. Nhìn chung vẫn là một khóa học đáng tiền.',
    date: '1 month ago',
  }
]

export const COURSES: Course[] = [
  {
    id: 1,
    title: 'ReactJS cho Người Mới Bắt Đầu - Xây Dựng Web App 2024',
    subtitle: 'Học ReactJS từ cơ bản đến nâng cao qua các dự án thực tế, bao gồm Hooks, Router, Redux và TailwindCSS.',
    category: 'Digital Skills',
    instructor: INSTRUCTORS[0],
    thumbnail: 'https://picsum.photos/seed/react/600/400',
    price: 599000,
    originalPrice: 1200000,
    rating: 4.8,
    reviewsCount: 1254,
    level: 'Beginner',
    language: 'Vietnamese',
    duration: '25 giờ',
    lectures: 150,
    description: 'Đây là khóa học ReactJS toàn diện nhất, được thiết kế để giúp bạn từ một người chưa biết gì trở thành một lập trình viên React tự tin. Chúng ta sẽ đi qua tất cả các khái niệm cốt lõi và xây dựng nhiều dự án thú vị.',
    whatYouWillLearn: [
      'Nắm vững các khái niệm cốt lõi của React: Components, Props, State.',
      'Sử dụng thành thạo React Hooks (useState, useEffect, useContext).',
      'Xây dựng ứng dụng trang đơn (SPA) với React Router.',
      'Quản lý trạng thái ứng dụng phức tạp với Redux Toolkit.',
      'Tạo giao diện hiện đại và responsive với TailwindCSS.',
    ],
    curriculum: [
      { section: 'Giới thiệu & Cài đặt', lectures: [{ title: 'Tổng quan khóa học', duration: '5:30' }, { title: 'Cài đặt môi trường', duration: '12:15' }] },
      { section: 'ReactJS Cơ Bản', lectures: [{ title: 'Components và Props', duration: '25:00' }, { title: 'State và Lifecycle', duration: '30:45' }] },
    ],
    reviews: REVIEWS,
  },
  {
    id: 2,
    title: 'Giao Tiếp Tiếng Anh Tự Tin trong Môi Trường Công Sở',
    subtitle: 'Cải thiện kỹ năng nghe, nói, viết email và thuyết trình chuyên nghiệp bằng tiếng Anh.',
    category: 'Applied Language',
    instructor: INSTRUCTORS[1],
    thumbnail: 'https://picsum.photos/seed/english/600/400',
    price: 499000,
    rating: 4.9,
    reviewsCount: 2341,
    level: 'Intermediate',
    language: 'Vietnamese',
    duration: '15 giờ',
    lectures: 80,
    description: 'Khóa học này tập trung vào các tình huống giao tiếp thực tế trong môi trường làm việc quốc tế. Bạn sẽ học cách diễn đạt ý tưởng một cách rõ ràng, tự tin và chuyên nghiệp.',
    whatYouWillLearn: [
      'Tham gia các cuộc họp và thảo luận bằng tiếng Anh.',
      'Viết email công việc chuyên nghiệp và hiệu quả.',
      'Thực hiện các bài thuyết trình ấn tượng.',
      'Mở rộng vốn từ vựng chuyên ngành kinh doanh.',
    ],
    curriculum: [
      { section: 'Kỹ năng Viết Email', lectures: [{ title: 'Cấu trúc một email chuyên nghiệp', duration: '15:10' }, { title: 'Các mẫu câu thường dùng', duration: '20:00' }] },
      { section: 'Kỹ năng Thuyết trình', lectures: [{ title: 'Chuẩn bị nội dung', duration: '18:30' }, { title: 'Ngôn ngữ cơ thể và giọng nói', duration: '22:50' }] },
    ],
    reviews: REVIEWS,
  },
  {
    id: 3,
    title: 'Python Masterclass: From Zero to Hero',
    subtitle: 'Comprehensive Python course for beginners. Learn data science, machine learning, and web development.',
    category: 'Digital Skills',
    instructor: INSTRUCTORS[0],
    thumbnail: 'https://picsum.photos/seed/python/600/400',
    price: 799000,
    originalPrice: 1500000,
    rating: 4.7,
    reviewsCount: 3102,
    level: 'All Levels',
    language: 'English',
    duration: '40 giờ',
    lectures: 250,
    description: 'The complete Python bootcamp. Learn everything from Python basics to advanced topics like decorators, generators, and build real-world applications.',
    whatYouWillLearn: [
      'Master Python 3 fundamentals.',
      'Build web applications with Flask and Django.',
      'Perform data analysis with Pandas and NumPy.',
      'Create machine learning models with Scikit-learn.',
    ],
    curriculum: [
      { section: 'Python Basics', lectures: [{ title: 'Variables and Data Types', duration: '15:00' }, { title: 'Control Flow', duration: '25:30' }] },
      { section: 'Web Development with Flask', lectures: [{ title: 'Your First Flask App', duration: '20:10' }, { title: 'Templates and Forms', duration: '35:00' }] },
    ],
    reviews: REVIEWS,
  },
  {
    id: 4,
    title: 'Luyện Thi IELTS Speaking Band 7.0+',
    subtitle: 'Chiến lược, từ vựng và bài mẫu chi tiết giúp bạn chinh phục band điểm 7.0+ trong kỳ thi IELTS Speaking.',
    category: 'Applied Language',
    instructor: INSTRUCTORS[1],
    thumbnail: 'https://picsum.photos/seed/ielts/600/400',
    price: 650000,
    rating: 4.9,
    reviewsCount: 1890,
    level: 'Advanced',
    language: 'Vietnamese',
    duration: '20 giờ',
    lectures: 100,
    description: 'Khóa học cung cấp một lộ trình học tập bài bản, từ việc xây dựng ý tưởng, sử dụng từ vựng và ngữ pháp nâng cao, đến việc luyện tập trả lời các dạng câu hỏi thường gặp trong cả 3 phần của bài thi Speaking.',
    whatYouWillLearn: [
      'Hiểu rõ các tiêu chí chấm điểm của IELTS Speaking.',
      'Phát triển ý tưởng và trả lời câu hỏi một cách logic.',
      'Sử dụng thành thạo các cấu trúc ngữ pháp phức tạp và từ vựng band 7+.',
      'Luyện tập với các đề thi thật và nhận phản hồi chi tiết.',
    ],
    curriculum: [
      { section: 'Part 1: Introduction and Interview', lectures: [{ title: 'Answering Common Topics', duration: '18:00' }, { title: 'Extending Your Answers', duration: '20:45' }] },
      { section: 'Part 2: The Long Turn', lectures: [{ title: 'Structuring Your Talk', duration: '25:00' }, { title: 'Using Notes Effectively', duration: '15:15' }] },
    ],
    reviews: REVIEWS,
  },
  {
    id: 5,
    title: 'UI/UX Design Toàn Tập - Thiết Kế Web và App Chuyên Nghiệp',
    subtitle: 'Học quy trình thiết kế UI/UX hoàn chỉnh từ nghiên cứu, wireframing, prototyping đến handover cho lập trình viên.',
    category: 'Digital Skills',
    instructor: INSTRUCTORS[2],
    thumbnail: 'https://picsum.photos/seed/uiux/600/400',
    price: 899000,
    rating: 4.9,
    reviewsCount: 2150,
    level: 'All Levels',
    language: 'Vietnamese',
    duration: '30 giờ',
    lectures: 120,
    description: 'Trở thành một nhà thiết kế UI/UX chuyên nghiệp. Khóa học này sẽ trang bị cho bạn tư duy thiết kế và kỹ năng sử dụng các công cụ hàng đầu như Figma.',
    whatYouWillLearn: [
      'Hiểu rõ các nguyên tắc cơ bản của UI và UX.',
      'Thực hiện nghiên cứu người dùng và xây dựng persona.',
      'Thiết kế wireframe, mockup và prototype tương tác.',
      'Xây dựng một portfolio thiết kế ấn tượng.',
    ],
    curriculum: [
      { section: 'Introduction to UI/UX', lectures: [{ title: 'What is UI/UX?', duration: '10:00' }, { title: 'The Design Process', duration: '15:30' }] },
      { section: 'Figma Mastery', lectures: [{ title: 'Interface and Tools', duration: '22:00' }, { title: 'Auto Layout and Components', duration: '45:10' }] },
    ],
    reviews: REVIEWS,
  },
  {
    id: 6,
    title: 'Luyện Thi TOEIC Listening & Reading Mục Tiêu 900+',
    subtitle: 'Tổng hợp chiến lược làm bài, ngữ pháp và từ vựng trọng tâm giúp bạn đạt điểm tối đa trong kỳ thi TOEIC.',
    category: 'Applied Language',
    instructor: INSTRUCTORS[1],
    thumbnail: 'https://picsum.photos/seed/toeic/600/400',
    price: 750000,
    originalPrice: 1300000,
    rating: 4.8,
    reviewsCount: 3421,
    level: 'Intermediate',
    language: 'Vietnamese',
    duration: '35 giờ',
    lectures: 200,
    description: 'Chinh phục TOEIC với lộ trình học tập hiệu quả. Khóa học cung cấp đầy đủ kiến thức và mẹo làm bài cho cả 7 phần thi, cùng với các bộ đề thi thử sát với đề thi thật.',
    whatYouWillLearn: [
      'Nắm vững các bẫy thường gặp trong đề thi TOEIC.',
      'Cải thiện tốc độ làm bài và kỹ năng quản lý thời gian.',
      'Hệ thống hóa các chủ điểm ngữ pháp và từ vựng cốt lõi.',
      'Luyện tập với hàng ngàn câu hỏi và đề thi thử có giải thích chi tiết.',
    ],
    curriculum: [
      { section: 'Listening Comprehension', lectures: [{ title: 'Part 1: Photographs', duration: '12:00' }, { title: 'Part 3: Short Conversations', duration: '30:00' }] },
      { section: 'Reading Comprehension', lectures: [{ title: 'Part 5: Incomplete Sentences', duration: '25:00' }, { title: 'Part 7: Reading Comprehension', duration: '40:00' }] },
    ],
    reviews: REVIEWS,
  },
];

export const CATEGORIES = [
  { name: 'Kỹ năng số', icon: 'desktop-outline' },
  { name: 'Ngoại ngữ ứng dụng', icon: 'language-outline' },
  { name: 'Phát triển bản thân', icon: 'sparkles-outline' },
  { name: 'Kinh doanh & Marketing', icon: 'business-outline' },
  { name: 'Thiết kế & Sáng tạo', icon: 'color-palette-outline' },
  { name: 'Sức khỏe & Đời sống', icon: 'heart-outline' },
];

export const TEAM_MEMBERS = [
  { name: 'Nguyen Van A', title: 'CEO & Founder', avatar: 'https://picsum.photos/seed/team1/200/200' },
  { name: 'Tran Thi B', title: 'CTO', avatar: 'https://picsum.photos/seed/team2/200/200' },
  { name: 'Le Van C', title: 'Head of Content', avatar: 'https://picsum.photos/seed/team3/200/200' },
  { name: 'Pham Thi D', title: 'Marketing Director', avatar: 'https://picsum.photos/seed/team4/200/200' },
];

export const LESSONS: Lesson[] = [
  {
    id: 1,
    courseId: 1,
    title: 'Giới thiệu về JSX',
    type: 'coding',
    content: `## JSX là gì?

JSX là viết tắt của JavaScript XML.

Nó cho phép chúng ta viết HTML trong React. JSX giúp việc viết và thêm HTML vào React trở nên dễ dàng hơn.

### Ví dụ

Đây là một ví dụ đơn giản về JSX:
\`\`\`jsx
const myelement = <h1>Tôi yêu JSX!</h1>;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(myelement);
\`\`\`

### Thử thách

Bây giờ, hãy thử tạo một phần tử \`<h2>\` chứa dòng chữ "Xin chào, SkillUp!" và hiển thị nó ra màn hình.`,
    starterCode: `import React from 'react';
import ReactDOM from 'react-dom/client';

// Viết code của bạn ở đây

`,
    hints: [
      'Sử dụng cú pháp `const element = <h2>...</h2>;`',
      'Đừng quên gọi `root.render(element);`'
    ]
  }
];


export const LESSON_COMMENTS: LessonComment[] = [
  {
    id: 1,
    lessonId: 1,
    author: 'Minh Quan',
    avatar: 'https://picsum.photos/seed/user1/100/100',
    comment: 'Bài giảng hay quá, phần thử thách giúp mình hiểu rõ hơn về JSX!',
    date: '1 day ago',
    replies: [
      {
        id: 3,
        lessonId: 1,
        author: 'An Tuan',
        avatar: 'https://picsum.photos/seed/instructor1/100/100',
        comment: 'Cảm ơn bạn, rất vui vì bạn thấy hữu ích!',
        date: '1 day ago',
      }
    ]
  },
  {
    id: 2,
    lessonId: 1,
    author: 'Lan Anh',
    avatar: 'https://picsum.photos/seed/user2/100/100',
    comment: 'Mình vẫn chưa hiểu rõ lắm về sự khác biệt giữa `render` của React DOM và component. Ai đó giải thích giúp mình với?',
    date: '2 days ago',
  }
];

export const LESSON_QA: LessonQA[] = [
  {
    id: 1,
    lessonId: 1,
    question: {
      author: 'Hieu Nguyen',
      avatar: 'https://picsum.photos/seed/user3/100/100',
      text: 'Tại sao chúng ta cần `import React from \'react\'` ngay cả khi không sử dụng trực tiếp biến React trong code JSX?',
      date: '3 days ago'
    },
    answer: {
      author: 'An Tuan',
      avatar: 'https://picsum.photos/seed/instructor1/100/100',
      text: 'Chào Hiếu, câu hỏi rất hay! Khi bạn viết JSX, trình biên dịch (như Babel) sẽ chuyển nó thành các lệnh gọi hàm `React.createElement()`. Vì vậy, mặc dù bạn không viết `React.createElement` trực tiếp, nó vẫn được sử dụng ngầm phía sau. Đó là lý do thư viện React phải được import vào trong phạm vi code của bạn.',
      date: '2 days ago'
    }
  },
  {
    id: 2,
    lessonId: 1,
    question: {
      author: 'Thao Tran',
      avatar: 'https://picsum.photos/seed/user4/100/100',
      text: 'Em có thể lồng các biểu thức JavaScript phức tạp hơn vào trong JSX không ạ, ví dụ như một câu lệnh `if/else`?',
      date: '4 days ago'
    }
  }
];

export const mockData = {
  "users": [
    { "id": 1, "full_name": "Nguyễn Văn A", "email": "a@student.com", "role": 2 },
    { "id": 2, "full_name": "Trần Thị B", "email": "b@student.com", "role": 2 },
    { "id": 3, "full_name": "Lê Minh C", "email": "c@instructor.com", "role": 1 }
  ],
  "courses": [
    {
      "id": 1,
      "title": "ReactJS từ A-Z",
      "instructor_id": 3,
      "sections": [
        {
          "id": 1,
          "title": "Giới thiệu React",
          "lessons": [
            {
              "id": 1,
              "title": "React là gì?",
              "contents": [
                { "id": 1, "type": "text", "html": "<h1>React là thư viện...</h1>" }
              ]
            }
          ]
        }
      ]
    }
  ],
  "classes": [
    {
      "id": 1,
      "course_id": 1,
      "students": [1, 2],
      "calendar": [
        { "title": "Buổi 1: Giới thiệu React", "time": "2025-11-20 19:00:00" }
      ]
    }
  ]
}
