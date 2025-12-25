-- =====================================================
-- SEED DATA FOR E-LEARNING PLATFORM
-- =====================================================
-- This file contains sample data for development/testing
-- Run: mysql -u root -p website_milearn < backend/prisma/seed.sql
-- =====================================================

USE website_milearn;

-- Disable foreign key checks temporarily
SET FOREIGN_KEY_CHECKS = 0;

-- =====================================================
-- 1. ACCOUNTS (Users)
-- =====================================================
-- Password for all accounts: "123456" (hashed with bcrypt)
INSERT INTO accounts (username, email, password, full_name, role, avatar_url, bio, created_at, updated_at) VALUES
-- SuperAdmin (already exists, but included for reference)
('superadmin', 'superadmin@milearn.com', '$2b$10$rZ5FqF5qF5qF5qF5qF5qFOqF5qF5qF5qF5qF5qF5qF5qF5qF5qF5q', 'Super Admin', 'SuperAdmin', NULL, 'System Administrator', NOW(), NOW()),

-- Instructors
('instructor1', 'instructor1@milearn.com', '$2b$10$rZ5FqF5qF5qF5qF5qF5qFOqF5qF5qF5qF5qF5qF5qF5qF5qF5qF5q', 'Nguyễn Văn A', 'Instructor', 'https://i.pravatar.cc/150?img=1', 'Giảng viên lập trình Web với 10 năm kinh nghiệm', NOW(), NOW()),
('instructor2', 'instructor2@milearn.com', '$2b$10$rZ5FqF5qF5qF5qF5qF5qFOqF5qF5qF5qF5qF5qF5qF5qF5qF5qF5q', 'Trần Thị B', 'Instructor', 'https://i.pravatar.cc/150?img=2', 'Chuyên gia về Mobile Development', NOW(), NOW()),
('instructor3', 'instructor3@milearn.com', '$2b$10$rZ5FqF5qF5qF5qF5qF5qFOqF5qF5qF5qF5qF5qF5qF5qF5qF5qF5q', 'Lê Văn C', 'Instructor', 'https://i.pravatar.cc/150?img=3', 'Giảng viên AI & Machine Learning', NOW(), NOW()),

-- Students
('student1', 'student1@milearn.com', '$2b$10$rZ5FqF5qF5qF5qF5qF5qFOqF5qF5qF5qF5qF5qF5qF5qF5qF5qF5q', 'Phạm Văn D', 'Student', 'https://i.pravatar.cc/150?img=4', 'Sinh viên năm 3 CNTT', NOW(), NOW()),
('student2', 'student2@milearn.com', '$2b$10$rZ5FqF5qF5qF5qF5qF5qFOqF5qF5qF5qF5qF5qF5qF5qF5qF5qF5q', 'Hoàng Thị E', 'Student', 'https://i.pravatar.cc/150?img=5', 'Học viên đam mê lập trình', NOW(), NOW()),
('student3', 'student3@milearn.com', '$2b$10$rZ5FqF5qF5qF5qF5qF5qFOqF5qF5qF5qF5qF5qF5qF5qF5qF5qF5q', 'Vũ Văn F', 'Student', 'https://i.pravatar.cc/150?img=6', 'Chuyển ngành sang IT', NOW(), NOW());

-- =====================================================
-- 2. USER PROFILES
-- =====================================================
INSERT INTO user_profiles (user_id, phone, address, date_of_birth, gender, social_links, created_at, updated_at) VALUES
(2, '0901234567', 'Hà Nội', '1985-05-15', 'Male', '{"facebook": "fb.com/instructor1", "linkedin": "linkedin.com/in/instructor1"}', NOW(), NOW()),
(3, '0902234567', 'TP.HCM', '1990-08-20', 'Female', '{"facebook": "fb.com/instructor2", "github": "github.com/instructor2"}', NOW(), NOW()),
(4, '0903234567', 'Đà Nẵng', '1988-03-10', 'Male', '{"linkedin": "linkedin.com/in/instructor3"}', NOW(), NOW()),
(5, '0904234567', 'Hà Nội', '2001-12-25', 'Male', '{"github": "github.com/student1"}', NOW(), NOW()),
(6, '0905234567', 'TP.HCM', '2002-07-18', 'Female', '{"facebook": "fb.com/student2"}', NOW(), NOW()),
(7, '0906234567', 'Cần Thơ', '1995-11-05', 'Male', NULL, NOW(), NOW());

-- =====================================================
-- 3. COURSE CATEGORIES
-- =====================================================
INSERT INTO course_categories (name, description, icon, created_at, updated_at) VALUES
('Web Development', 'Lập trình web từ cơ bản đến nâng cao', '🌐', NOW(), NOW()),
('Mobile Development', 'Phát triển ứng dụng di động iOS & Android', '📱', NOW(), NOW()),
('Data Science', 'Khoa học dữ liệu và phân tích', '📊', NOW(), NOW()),
('AI & Machine Learning', 'Trí tuệ nhân tạo và học máy', '🤖', NOW(), NOW()),
('DevOps', 'Vận hành và triển khai phần mềm', '⚙️', NOW(), NOW()),
('Database', 'Quản trị cơ sở dữ liệu', '🗄️', NOW(), NOW());

-- =====================================================
-- 4. COURSES
-- =====================================================
INSERT INTO courses (instructor_id, category_id, title, description, thumbnail_url, price, discount_price, level, duration, language, status, certificate_threshold, created_at, updated_at) VALUES
-- Web Development Courses
(2, 1, 'HTML & CSS Cơ Bản', 'Khóa học HTML CSS từ con số 0 cho người mới bắt đầu', 'https://picsum.photos/seed/course1/400/300', 0, NULL, 'Beginner', 1200, 'Vietnamese', 'Published', 100, NOW(), NOW()),
(2, 1, 'JavaScript Nâng Cao', 'Làm chủ JavaScript ES6+ và các design patterns', 'https://picsum.photos/seed/course2/400/300', 499000, 399000, 'Advanced', 2400, 'Vietnamese', 'Published', 80, NOW(), NOW()),
(2, 1, 'React.js Full Course', 'Xây dựng ứng dụng web hiện đại với React', 'https://picsum.photos/seed/course3/400/300', 799000, 599000, 'Intermediate', 3600, 'Vietnamese', 'Published', 85, NOW(), NOW()),
(2, 1, 'Node.js & Express', 'Backend development với Node.js và Express', 'https://picsum.photos/seed/course4/400/300', 699000, NULL, 'Intermediate', 3000, 'Vietnamese', 'Published', 90, NOW(), NOW()),

-- Mobile Development Courses
(3, 2, 'React Native Cơ Bản', 'Phát triển app di động với React Native', 'https://picsum.photos/seed/course5/400/300', 899000, 699000, 'Intermediate', 4200, 'Vietnamese', 'Published', 85, NOW(), NOW()),
(3, 2, 'Flutter & Dart', 'Xây dựng app đa nền tảng với Flutter', 'https://picsum.photos/seed/course6/400/300', 999000, 799000, 'Intermediate', 4800, 'Vietnamese', 'Published', 80, NOW(), NOW()),

-- AI & ML Courses
(4, 4, 'Python cho Data Science', 'Python cơ bản cho khoa học dữ liệu', 'https://picsum.photos/seed/course7/400/300', 599000, 499000, 'Beginner', 2400, 'Vietnamese', 'Published', 90, NOW(), NOW()),
(4, 4, 'Machine Learning A-Z', 'Khóa học Machine Learning toàn diện', 'https://picsum.photos/seed/course8/400/300', 1299000, 999000, 'Advanced', 6000, 'Vietnamese', 'Published', 75, NOW(), NOW());

-- =====================================================
-- 5. COURSE SECTIONS
-- =====================================================
INSERT INTO course_sections (course_id, title, description, order_index, created_at, updated_at) VALUES
-- HTML & CSS Course (course_id: 1)
(1, 'Giới thiệu về HTML', 'Tìm hiểu cơ bản về HTML', 1, NOW(), NOW()),
(1, 'CSS Styling', 'Styling với CSS', 2, NOW(), NOW()),
(1, 'Responsive Design', 'Thiết kế responsive', 3, NOW(), NOW()),

-- JavaScript Course (course_id: 2)
(2, 'ES6+ Features', 'Các tính năng mới của JavaScript', 1, NOW(), NOW()),
(2, 'Async Programming', 'Lập trình bất đồng bộ', 2, NOW(), NOW()),
(2, 'Design Patterns', 'Các mẫu thiết kế', 3, NOW(), NOW()),

-- React Course (course_id: 3)
(3, 'React Basics', 'Cơ bản về React', 1, NOW(), NOW()),
(3, 'State Management', 'Quản lý state', 2, NOW(), NOW()),
(3, 'React Hooks', 'Hooks trong React', 3, NOW(), NOW()),

-- Node.js Course (course_id: 4)
(4, 'Node.js Fundamentals', 'Cơ bản về Node.js', 1, NOW(), NOW()),
(4, 'Express Framework', 'Framework Express', 2, NOW(), NOW()),
(4, 'Database Integration', 'Tích hợp database', 3, NOW(), NOW());

-- =====================================================
-- 6. LESSONS
-- =====================================================
INSERT INTO course_lessons (section_id, title, description, video_url, duration, order_index, is_preview, created_at, updated_at) VALUES
-- Section 1: HTML Basics
(1, 'HTML là gì?', 'Giới thiệu về HTML', 'https://www.youtube.com/watch?v=example1', 600, 1, TRUE, NOW(), NOW()),
(1, 'Cấu trúc HTML', 'Cấu trúc cơ bản của HTML', 'https://www.youtube.com/watch?v=example2', 900, 2, TRUE, NOW(), NOW()),
(1, 'HTML Tags', 'Các thẻ HTML phổ biến', 'https://www.youtube.com/watch?v=example3', 1200, 3, FALSE, NOW(), NOW()),

-- Section 2: CSS Styling
(2, 'CSS Selectors', 'Bộ chọn CSS', 'https://www.youtube.com/watch?v=example4', 800, 1, FALSE, NOW(), NOW()),
(2, 'Box Model', 'Mô hình hộp CSS', 'https://www.youtube.com/watch?v=example5', 1000, 2, FALSE, NOW(), NOW()),
(2, 'Flexbox', 'Layout với Flexbox', 'https://www.youtube.com/watch?v=example6', 1200, 3, FALSE, NOW(), NOW()),

-- Section 3: Responsive Design
(3, 'Media Queries', 'Truy vấn media', 'https://www.youtube.com/watch?v=example7', 900, 1, FALSE, NOW(), NOW()),
(3, 'Mobile First', 'Thiết kế mobile first', 'https://www.youtube.com/watch?v=example8', 1100, 2, FALSE, NOW(), NOW());

-- =====================================================
-- 7. COURSE ENROLLMENTS
-- =====================================================
INSERT INTO course_enrollments (student_id, course_id, enrolled_at, progress, status, completed_at) VALUES
-- Student 1 enrollments
(5, 1, DATE_SUB(NOW(), INTERVAL 30 DAY), 100, 'Completed', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(5, 2, DATE_SUB(NOW(), INTERVAL 20 DAY), 65, 'In Progress', NULL),
(5, 3, DATE_SUB(NOW(), INTERVAL 10 DAY), 30, 'In Progress', NULL),

-- Student 2 enrollments
(6, 1, DATE_SUB(NOW(), INTERVAL 25 DAY), 80, 'In Progress', NULL),
(6, 5, DATE_SUB(NOW(), INTERVAL 15 DAY), 45, 'In Progress', NULL),

-- Student 3 enrollments
(7, 7, DATE_SUB(NOW(), INTERVAL 40 DAY), 100, 'Completed', DATE_SUB(NOW(), INTERVAL 10 DAY)),
(7, 8, DATE_SUB(NOW(), INTERVAL 20 DAY), 55, 'In Progress', NULL);

-- =====================================================
-- 8. LESSON PROGRESS
-- =====================================================
INSERT INTO lesson_progress (enrollment_id, lesson_id, status, completed_at, time_spent) VALUES
-- Student 1 - Course 1 (Completed)
(1, 1, 'Completed', DATE_SUB(NOW(), INTERVAL 28 DAY), 600),
(1, 2, 'Completed', DATE_SUB(NOW(), INTERVAL 27 DAY), 900),
(1, 3, 'Completed', DATE_SUB(NOW(), INTERVAL 26 DAY), 1200),
(1, 4, 'Completed', DATE_SUB(NOW(), INTERVAL 25 DAY), 800),
(1, 5, 'Completed', DATE_SUB(NOW(), INTERVAL 24 DAY), 1000),
(1, 6, 'Completed', DATE_SUB(NOW(), INTERVAL 23 DAY), 1200),
(1, 7, 'Completed', DATE_SUB(NOW(), INTERVAL 22 DAY), 900),
(1, 8, 'Completed', DATE_SUB(NOW(), INTERVAL 21 DAY), 1100),

-- Student 1 - Course 2 (In Progress)
(2, 1, 'Completed', DATE_SUB(NOW(), INTERVAL 18 DAY), 600),
(2, 2, 'Completed', DATE_SUB(NOW(), INTERVAL 16 DAY), 900),
(2, 3, 'In Progress', NULL, 400);

-- =====================================================
-- 9. CERTIFICATES
-- =====================================================
INSERT INTO certificates (student_id, course_id, certificate_code, certificate_url, issued_at) VALUES
(5, 1, 'CERT-2024-001-5-1', 'https://storage.milearn.com/certificates/cert-001.png', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(7, 7, 'CERT-2024-002-7-7', 'https://storage.milearn.com/certificates/cert-002.png', DATE_SUB(NOW(), INTERVAL 10 DAY));

-- =====================================================
-- 10. COURSE REVIEWS
-- =====================================================
INSERT INTO course_reviews (course_id, student_id, rating, comment, created_at, updated_at) VALUES
(1, 5, 5, 'Khóa học rất tuyệt vời! Giảng viên giải thích rất dễ hiểu.', DATE_SUB(NOW(), INTERVAL 5 DAY), DATE_SUB(NOW(), INTERVAL 5 DAY)),
(1, 6, 4, 'Nội dung hay, nhưng cần thêm bài tập thực hành.', DATE_SUB(NOW(), INTERVAL 3 DAY), DATE_SUB(NOW(), INTERVAL 3 DAY)),
(7, 7, 5, 'Khóa học Python tuyệt vời cho người mới bắt đầu!', DATE_SUB(NOW(), INTERVAL 10 DAY), DATE_SUB(NOW(), INTERVAL 10 DAY)),
(2, 5, 4, 'Nội dung nâng cao, phù hợp cho người đã có kinh nghiệm.', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY));

-- =====================================================
-- 11. PAYMENT METHODS
-- =====================================================
INSERT INTO payment_methods (name, type, config, is_active, created_at, updated_at) VALUES
('Chuyển khoản ngân hàng', 'Bank Transfer', '{"bank_name": "Vietcombank", "account_number": "1234567890", "account_name": "MILEARN PLATFORM"}', TRUE, NOW(), NOW()),
('Ví MoMo', 'E-Wallet', '{"phone": "0901234567"}', TRUE, NOW(), NOW()),
('Thẻ tín dụng/ghi nợ', 'Credit Card', '{"gateway": "stripe"}', TRUE, NOW(), NOW()),
('ZaloPay', 'E-Wallet', '{"phone": "0901234567"}', TRUE, NOW(), NOW());

-- =====================================================
-- 12. INVOICES (Sample completed payments)
-- =====================================================
INSERT INTO invoices (user_id, total_amount, discount_amount, final_amount, payment_method, payment_status, transaction_code, billing_info, promo_code, created_at, updated_at) VALUES
-- Student 1 purchases
(5, 0, 0, 0, 'Free', 'Completed', 'TXN-5-1704067200000-ABC123', '{"name": "Phạm Văn D", "email": "student1@milearn.com", "phone": "0904234567"}', NULL, DATE_SUB(NOW(), INTERVAL 30 DAY), DATE_SUB(NOW(), INTERVAL 30 DAY)),
(5, 499000, 100000, 399000, 'Bank Transfer', 'Completed', 'TXN-5-1706745600000-DEF456', '{"name": "Phạm Văn D", "email": "student1@milearn.com", "phone": "0904234567"}', 'NEWYEAR2024', DATE_SUB(NOW(), INTERVAL 20 DAY), DATE_SUB(NOW(), INTERVAL 20 DAY)),
(5, 799000, 200000, 599000, 'MoMo', 'Completed', 'TXN-5-1708560000000-GHI789', '{"name": "Phạm Văn D", "email": "student1@milearn.com", "phone": "0904234567"}', 'DISCOUNT200K', DATE_SUB(NOW(), INTERVAL 10 DAY), DATE_SUB(NOW(), INTERVAL 10 DAY)),

-- Student 2 purchases
(6, 0, 0, 0, 'Free', 'Completed', 'TXN-6-1705276800000-JKL012', '{"name": "Hoàng Thị E", "email": "student2@milearn.com", "phone": "0905234567"}', NULL, DATE_SUB(NOW(), INTERVAL 25 DAY), DATE_SUB(NOW(), INTERVAL 25 DAY)),
(6, 899000, 200000, 699000, 'Credit Card', 'Completed', 'TXN-6-1707955200000-MNO345', '{"name": "Hoàng Thị E", "email": "student2@milearn.com", "phone": "0905234567"}', 'MOBILE50', DATE_SUB(NOW(), INTERVAL 15 DAY), DATE_SUB(NOW(), INTERVAL 15 DAY)),

-- Student 3 purchases
(7, 599000, 100000, 499000, 'ZaloPay', 'Completed', 'TXN-7-1702598400000-PQR678', '{"name": "Vũ Văn F", "email": "student3@milearn.com", "phone": "0906234567"}', 'PYTHON100K', DATE_SUB(NOW(), INTERVAL 40 DAY), DATE_SUB(NOW(), INTERVAL 40 DAY)),
(7, 1299000, 300000, 999000, 'Bank Transfer', 'Completed', 'TXN-7-1706745600000-STU901', '{"name": "Vũ Văn F", "email": "student3@milearn.com", "phone": "0906234567"}', 'ML300K', DATE_SUB(NOW(), INTERVAL 20 DAY), DATE_SUB(NOW(), INTERVAL 20 DAY));

-- =====================================================
-- 13. INVOICE DETAILS (Chi tiết hóa đơn)
-- =====================================================
INSERT INTO invoice_details (invoice_id, course_id, price, discount, final_price, created_at) VALUES
-- Invoice 1: Student 1 - Free course
(1, 1, 0, 0, 0, DATE_SUB(NOW(), INTERVAL 30 DAY)),

-- Invoice 2: Student 1 - JavaScript course
(2, 2, 499000, 100000, 399000, DATE_SUB(NOW(), INTERVAL 20 DAY)),

-- Invoice 3: Student 1 - React course
(3, 3, 799000, 200000, 599000, DATE_SUB(NOW(), INTERVAL 10 DAY)),

-- Invoice 4: Student 2 - Free course
(4, 1, 0, 0, 0, DATE_SUB(NOW(), INTERVAL 25 DAY)),

-- Invoice 5: Student 2 - React Native course
(5, 5, 899000, 200000, 699000, DATE_SUB(NOW(), INTERVAL 15 DAY)),

-- Invoice 6: Student 3 - Python course
(6, 7, 599000, 100000, 499000, DATE_SUB(NOW(), INTERVAL 40 DAY)),

-- Invoice 7: Student 3 - ML course
(7, 8, 1299000, 300000, 999000, DATE_SUB(NOW(), INTERVAL 20 DAY));

-- =====================================================
-- 14. CLASSES (Live classes)
-- =====================================================
INSERT INTO classes (instructor_id, title, description, start_date, end_date, schedule, max_students, status, created_at, updated_at) VALUES
(2, 'Web Development Bootcamp 2024', 'Bootcamp lập trình web toàn diện', '2024-01-15', '2024-04-15', 'Thứ 2, 4, 6 - 19:00-21:00', 30, 'Active', NOW(), NOW()),
(3, 'Mobile App Development', 'Khóa học phát triển app di động', '2024-02-01', '2024-05-01', 'Thứ 3, 5, 7 - 18:00-20:00', 25, 'Active', NOW(), NOW()),
(4, 'AI & ML Intensive', 'Khóa học chuyên sâu về AI', '2024-03-01', '2024-06-01', 'Thứ 2, 4 - 19:30-21:30', 20, 'Upcoming', NOW(), NOW());

-- =====================================================
-- 15. CLASS STUDENTS
-- =====================================================
INSERT INTO class_students (class_id, student_id, enrolled_at, status) VALUES
(1, 5, DATE_SUB(NOW(), INTERVAL 30 DAY), 'Active'),
(1, 6, DATE_SUB(NOW(), INTERVAL 28 DAY), 'Active'),
(2, 6, DATE_SUB(NOW(), INTERVAL 20 DAY), 'Active'),
(2, 7, DATE_SUB(NOW(), INTERVAL 18 DAY), 'Active');

-- =====================================================
-- 16. NOTIFICATIONS
-- =====================================================
INSERT INTO notifications (user_id, title, message, type, is_read, created_at) VALUES
(5, 'Chúc mừng hoàn thành khóa học!', 'Bạn đã hoàn thành khóa học "HTML & CSS Cơ Bản". Chứng chỉ của bạn đã sẵn sàng!', 'Achievement', TRUE, DATE_SUB(NOW(), INTERVAL 5 DAY)),
(5, 'Khóa học mới được thêm vào', 'Khóa học "Node.js & Express" vừa được thêm vào danh mục của chúng tôi!', 'Info', FALSE, DATE_SUB(NOW(), INTERVAL 2 DAY)),
(6, 'Nhắc nhở học tập', 'Bạn chưa học bài nào trong 3 ngày qua. Hãy tiếp tục học tập nhé!', 'Reminder', FALSE, DATE_SUB(NOW(), INTERVAL 1 DAY)),
(7, 'Chúc mừng hoàn thành khóa học!', 'Bạn đã hoàn thành khóa học "Python cho Data Science". Chứng chỉ của bạn đã sẵn sàng!', 'Achievement', TRUE, DATE_SUB(NOW(), INTERVAL 10 DAY));

-- =====================================================
-- 17. MESSAGES (Sample messages)
-- =====================================================
INSERT INTO messages (sender_id, receiver_id, content, is_read, created_at) VALUES
(5, 2, 'Thầy ơi, em có thắc mắc về bài tập phần Flexbox ạ.', TRUE, DATE_SUB(NOW(), INTERVAL 2 DAY)),
(2, 5, 'Chào em, thầy sẵn sàng giải đáp. Em hỏi đi nhé!', TRUE, DATE_SUB(NOW(), INTERVAL 2 DAY)),
(6, 3, 'Cô ơi, em muốn hỏi về React Native Navigation.', FALSE, DATE_SUB(NOW(), INTERVAL 1 DAY));

-- =====================================================
-- 18. ADMIN LOGS
-- =====================================================
INSERT INTO admin_logs (user_id, action, resource_type, resource_id, details, created_at) VALUES
(1, 'Create', 'Course', 1, 'Created course: HTML & CSS Cơ Bản', DATE_SUB(NOW(), INTERVAL 60 DAY)),
(1, 'Update', 'Course', 2, 'Updated course pricing', DATE_SUB(NOW(), INTERVAL 45 DAY)),
(1, 'Create', 'User', 5, 'Created student account', DATE_SUB(NOW(), INTERVAL 40 DAY));

-- =====================================================
-- 19. INSTRUCTOR VERIFICATIONS
-- =====================================================
INSERT INTO instructor_verifications (user_id, full_name, email, phone, bio, experience, education, portfolio_url, id_card_url, certificate_urls, status, reviewed_by, reviewed_at, notes, created_at, updated_at) VALUES
(2, 'Nguyễn Văn A', 'instructor1@milearn.com', '0901234567', 'Giảng viên lập trình Web', '10 năm kinh nghiệm', 'Thạc sĩ CNTT', 'https://portfolio.instructor1.com', 'https://storage.milearn.com/id-cards/instructor1.jpg', '["https://storage.milearn.com/certs/cert1.jpg"]', 'Approved', 1, DATE_SUB(NOW(), INTERVAL 90 DAY), 'Hồ sơ đầy đủ, phê duyệt', DATE_SUB(NOW(), INTERVAL 100 DAY), DATE_SUB(NOW(), INTERVAL 90 DAY)),
(3, 'Trần Thị B', 'instructor2@milearn.com', '0902234567', 'Chuyên gia Mobile Development', '8 năm kinh nghiệm', 'Cử nhân CNTT', 'https://portfolio.instructor2.com', 'https://storage.milearn.com/id-cards/instructor2.jpg', '["https://storage.milearn.com/certs/cert2.jpg"]', 'Approved', 1, DATE_SUB(NOW(), INTERVAL 85 DAY), 'Phê duyệt', DATE_SUB(NOW(), INTERVAL 95 DAY), DATE_SUB(NOW(), INTERVAL 85 DAY));

-- =====================================================
-- 20. CARTS (Current cart items)
-- =====================================================
INSERT INTO carts (user_id, created_at, updated_at) VALUES
(5, NOW(), NOW()),
(6, NOW(), NOW()),
(7, NOW(), NOW());

INSERT INTO cart_items (cart_id, course_id, added_at) VALUES
-- Student 1 cart
(1, 4, DATE_SUB(NOW(), INTERVAL 2 DAY)),
(1, 6, DATE_SUB(NOW(), INTERVAL 1 DAY)),

-- Student 2 cart
(2, 2, DATE_SUB(NOW(), INTERVAL 3 DAY)),

-- Student 3 cart
(3, 3, DATE_SUB(NOW(), INTERVAL 1 DAY)),
(3, 5, DATE_SUB(NOW(), INTERVAL 1 DAY));

-- =====================================================
-- Re-enable foreign key checks
-- =====================================================
SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- Run these to verify data was inserted correctly:

-- SELECT COUNT(*) as total_accounts FROM accounts;
-- SELECT COUNT(*) as total_courses FROM courses;
-- SELECT COUNT(*) as total_enrollments FROM course_enrollments;
-- SELECT COUNT(*) as total_invoices FROM invoices;
-- SELECT COUNT(*) as total_certificates FROM certificates;

-- =====================================================
-- SUMMARY
-- =====================================================
-- ✅ 7 Accounts (1 SuperAdmin, 3 Instructors, 3 Students)
-- ✅ 6 Course Categories
-- ✅ 8 Courses (various levels and prices)
-- ✅ 12 Course Sections
-- ✅ 8 Lessons
-- ✅ 7 Course Enrollments (2 completed, 5 in progress)
-- ✅ 11 Lesson Progress records
-- ✅ 2 Certificates (for completed courses)
-- ✅ 4 Course Reviews
-- ✅ 4 Payment Methods
-- ✅ 7 Invoices (completed payments)
-- ✅ 7 Invoice Details
-- ✅ 3 Classes
-- ✅ 4 Class Students
-- ✅ 4 Notifications
-- ✅ 3 Messages
-- ✅ 3 Admin Logs
-- ✅ 2 Instructor Verifications
-- ✅ 3 Carts with 5 Cart Items

-- =====================================================
-- USAGE INSTRUCTIONS
-- =====================================================
-- 1. Make sure your database exists: website_milearn
-- 2. Run this file:
--    mysql -u root -p website_milearn < backend/prisma/seed.sql
-- 
-- 3. Or from MySQL command line:
--    USE website_milearn;
--    SOURCE backend/prisma/seed.sql;
--
-- 4. Default password for all accounts: "123456"
--    (You'll need to hash it properly with bcrypt)
--
-- 5. Test accounts:
--    - SuperAdmin: superadmin@milearn.com / 123456
--    - Instructor: instructor1@milearn.com / 123456
--    - Student: student1@milearn.com / 123456
-- =====================================================
