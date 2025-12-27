-- Tạo database
CREATE DATABASE IF NOT EXISTS learning_platform
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE learning_platform;

-- Bảng accounts
CREATE TABLE accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  role ENUM('SUPER_ADMIN', 'ADMIN', 'INSTRUCTOR', 'STUDENT') DEFAULT 'STUDENT',
  status INT DEFAULT 1,
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  username VARCHAR(100) UNIQUE,
  deleted_at DATETIME(0),
  email_verified BOOLEAN DEFAULT FALSE,
  email_verified_at DATETIME(0),
  last_login_at DATETIME(0),
  INDEX idx_email (email),
  INDEX idx_role (role),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng audit_logs
CREATE TABLE audit_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(50) NOT NULL,
  resource_id BIGINT,
  old_values JSON,
  new_values JSON,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_action (action),
  INDEX idx_created_at (created_at),
  INDEX idx_resource (resource_type, resource_id),
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng course_categories
CREATE TABLE course_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  icon VARCHAR(100),
  description TEXT,
  parent_id INT,
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  order_index INT DEFAULT 0,
  updated_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_parent_id (parent_id),
  INDEX idx_slug (slug),
  FOREIGN KEY (parent_id) REFERENCES course_categories(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng courses
CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  instructor_id INT NOT NULL,
  category_id INT,
  title VARCHAR(500) NOT NULL,
  short_description TEXT,
  description LONGTEXT,
  level ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'ALL_LEVELS') DEFAULT 'ALL_LEVELS',
  language VARCHAR(10) DEFAULT 'vi',
  price DECIMAL(10, 2) DEFAULT 0.00,
  discount_price DECIMAL(10, 2) DEFAULT 0.00,
  status ENUM('DRAFT', 'PENDING', 'PUBLISHED', 'REJECTED', 'ARCHIVED') DEFAULT 'DRAFT',
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  average_rating DECIMAL(3, 2) DEFAULT 0.00,
  deleted_at DATETIME(0),
  is_featured BOOLEAN DEFAULT FALSE,
  preview_video_url TEXT,
  published_at DATETIME(0),
  slug VARCHAR(500) NOT NULL UNIQUE,
  thumbnail_url TEXT,
  total_duration INT DEFAULT 0,
  total_lessons INT DEFAULT 0,
  total_reviews INT DEFAULT 0,
  total_students INT DEFAULT 0,
  requirements JSON,
  what_you_will_learn JSON,
  target_audience JSON,
  revenue DECIMAL(15, 2) DEFAULT 0.00,
  rejection_reason TEXT,
  reviewed_at DATETIME(0),
  reviewed_by INT,
  submitted_at DATETIME(0),
  certificate_threshold INT DEFAULT 100,
  INDEX idx_category_id (category_id),
  INDEX idx_instructor_id (instructor_id),
  INDEX idx_slug (slug),
  INDEX idx_status (status),
  FULLTEXT idx_fulltext (title, short_description),
  FOREIGN KEY (category_id) REFERENCES course_categories(id),
  FOREIGN KEY (instructor_id) REFERENCES accounts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng carts
CREATE TABLE carts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  FOREIGN KEY (user_id) REFERENCES accounts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng cart_items
CREATE TABLE cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cart_id INT NOT NULL,
  course_id INT NOT NULL,
  added_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_cart_course (cart_id, course_id),
  INDEX idx_cart_id (cart_id),
  INDEX idx_course_id (course_id),
  FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng certificates
CREATE TABLE certificates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  certificate_code VARCHAR(100) NOT NULL UNIQUE,
  issued_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  certificate_url TEXT,
  verification_url TEXT,
  UNIQUE KEY unique_student_course (student_id, course_id),
  INDEX idx_certificate_code (certificate_code),
  INDEX idx_course_id (course_id),
  INDEX idx_student_id (student_id),
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES accounts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng classes
CREATE TABLE classes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  instructor_id INT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  max_students INT DEFAULT 30,
  schedule JSON,
  status VARCHAR(20) DEFAULT 'upcoming',
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  current_students INT DEFAULT 0,
  name VARCHAR(255) NOT NULL,
  updated_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_course_id (course_id),
  INDEX idx_instructor_id (instructor_id),
  INDEX idx_status (status),
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (instructor_id) REFERENCES accounts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng class_assignments
CREATE TABLE class_assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  class_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  file_url TEXT,
  due_date DATETIME(0),
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  max_score INT DEFAULT 100,
  INDEX idx_class_id (class_id),
  INDEX idx_due_date (due_date),
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng class_calendar
CREATE TABLE class_calendar (
  id INT AUTO_INCREMENT PRIMARY KEY,
  class_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_time VARCHAR(10) NOT NULL,
  end_time VARCHAR(10) NOT NULL,
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  meeting_url TEXT,
  session_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'scheduled',
  updated_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_class_id (class_id),
  INDEX idx_session_date (session_date),
  INDEX idx_status (status),
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng class_exams
CREATE TABLE class_exams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  class_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  exam_type VARCHAR(20) DEFAULT 'QUIZ',
  total_score DECIMAL(5, 2) NOT NULL,
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_class_id (class_id),
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng class_exam_results
CREATE TABLE class_exam_results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  exam_id INT NOT NULL,
  student_id INT NOT NULL,
  score DECIMAL(5, 2),
  feedback TEXT,
  graded_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_exam_id (exam_id),
  INDEX idx_student_id (student_id),
  FOREIGN KEY (exam_id) REFERENCES class_exams(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng class_materials
CREATE TABLE class_materials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  class_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  uploaded_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  file_size BIGINT,
  file_type VARCHAR(50),
  uploaded_by INT,
  INDEX idx_class_id (class_id),
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng class_students
CREATE TABLE class_students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  class_id INT NOT NULL,
  student_id INT NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  enrolled_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  final_grade DECIMAL(5, 2),
  UNIQUE KEY unique_class_student (class_id, student_id),
  INDEX idx_class_id (class_id),
  INDEX idx_student_id (student_id),
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES accounts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng class_submissions
CREATE TABLE class_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  assignment_id INT NOT NULL,
  student_id INT NOT NULL,
  submission_url TEXT,
  submitted_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  grade DECIMAL(5, 2),
  feedback TEXT,
  INDEX idx_assignment_id (assignment_id),
  INDEX idx_student_id (student_id),
  FOREIGN KEY (assignment_id) REFERENCES class_assignments(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng content_ides
CREATE TABLE content_ides (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  content_id INT NOT NULL,
  language VARCHAR(50) NOT NULL,
  content TEXT,
  test_results JSON,
  status INT,
  editor_config JSON,
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_content_id (content_id),
  INDEX idx_user_id (user_id),
  FOREIGN KEY (user_id) REFERENCES accounts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng content_ides_starter
CREATE TABLE content_ides_starter (
  id INT AUTO_INCREMENT PRIMARY KEY,
  content_id INT NOT NULL,
  language VARCHAR(50) NOT NULL,
  content TEXT,
  description TEXT,
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_content_language (content_id, language),
  INDEX idx_content_id (content_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng content_ides_test_cases
CREATE TABLE content_ides_test_cases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  starter_id INT NOT NULL,
  test_name VARCHAR(255) NOT NULL,
  input TEXT NOT NULL,
  expected_output TEXT NOT NULL,
  is_hidden BOOLEAN DEFAULT FALSE,
  points INT DEFAULT 1,
  timeout_ms INT DEFAULT 5000,
  order_index INT DEFAULT 0,
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_starter_id (starter_id),
  INDEX idx_order_index (order_index),
  FOREIGN KEY (starter_id) REFERENCES content_ides_starter(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng course_enrollments
CREATE TABLE course_enrollments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  student_id INT NOT NULL,
  enrolled_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  progress INT DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active',
  completed_at DATETIME(0),
  last_accessed_at DATETIME(0),
  UNIQUE KEY unique_student_course (student_id, course_id),
  INDEX idx_course_id (course_id),
  INDEX idx_status (status),
  INDEX idx_student_id (student_id),
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES accounts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng course_sections
CREATE TABLE course_sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  order_index INT DEFAULT 0,
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  description TEXT,
  updated_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_course_id (course_id),
  INDEX idx_order_index (order_index),
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng course_lessons
CREATE TABLE course_lessons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  section_id INT,
  title VARCHAR(500) NOT NULL,
  order_index INT DEFAULT 0,
  course_id INT NOT NULL,
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  current_version INT DEFAULT 1,
  description TEXT,
  duration INT DEFAULT 0,
  is_preview BOOLEAN DEFAULT FALSE,
  published_at DATETIME(0),
  status VARCHAR(20) DEFAULT 'draft',
  updated_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_course_id (course_id),
  INDEX idx_section_id (section_id),
  INDEX idx_status (status),
  FOREIGN KEY (section_id) REFERENCES course_sections(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng course_reviews
CREATE TABLE course_reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  student_id INT NOT NULL,
  rating INT NOT NULL,
  comment TEXT,
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  helpful_count INT DEFAULT 0,
  is_public BOOLEAN DEFAULT TRUE,
  updated_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_course_student (course_id, student_id),
  INDEX idx_course_id (course_id),
  INDEX idx_rating (rating),
  INDEX idx_student_id (student_id),
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES accounts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng instructor_verifications
CREATE TABLE instructor_verifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  experience TEXT,
  education TEXT,
  documents_url TEXT,
  status INT DEFAULT 0,
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  rejection_reason TEXT,
  reviewed_at DATETIME(0),
  reviewed_by INT,
  updated_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_user_id (user_id),
  FOREIGN KEY (user_id) REFERENCES accounts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng lesson_versions
CREATE TABLE lesson_versions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lesson_id INT NOT NULL,
  version INT NOT NULL,
  layout_type VARCHAR(50) NOT NULL,
  layout_config JSON,
  metadata JSON,
  status VARCHAR(20) DEFAULT 'draft',
  created_by INT,
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  published_at DATETIME(0),
  UNIQUE KEY unique_lesson_version (lesson_id, version),
  INDEX idx_lesson_id (lesson_id),
  INDEX idx_status (status),
  FOREIGN KEY (lesson_id) REFERENCES course_lessons(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng lesson_assets
CREATE TABLE lesson_assets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lesson_id INT NOT NULL,
  lesson_version_id INT NOT NULL,
  type VARCHAR(20) NOT NULL,
  filename VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  preview_url TEXT,
  file_size BIGINT,
  mime_type VARCHAR(100),
  uploaded_by INT,
  uploaded_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_lesson_id (lesson_id),
  INDEX idx_lesson_version_id (lesson_version_id),
  FOREIGN KEY (lesson_version_id) REFERENCES lesson_versions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng lesson_blocks
CREATE TABLE lesson_blocks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lesson_version_id INT NOT NULL,
  slot_id VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  order_index INT DEFAULT 0,
  content JSON,
  settings JSON,
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_lesson_version_id (lesson_version_id),
  INDEX idx_slot_id (slot_id),
  FOREIGN KEY (lesson_version_id) REFERENCES lesson_versions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng lesson_layouts
CREATE TABLE lesson_layouts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lesson_version_id INT NOT NULL,
  layout_type VARCHAR(50) NOT NULL,
  slots JSON NOT NULL,
  config JSON,
  INDEX idx_lesson_version_id (lesson_version_id),
  FOREIGN KEY (lesson_version_id) REFERENCES lesson_versions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng lesson_progress
CREATE TABLE lesson_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  enrollment_id INT NOT NULL,
  lesson_id INT NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  progress INT DEFAULT 0,
  time_spent INT DEFAULT 0,
  last_position INT DEFAULT 0,
  completed_at DATETIME(0),
  last_accessed_at DATETIME(0),
  UNIQUE KEY unique_enrollment_lesson (enrollment_id, lesson_id),
  INDEX idx_enrollment_id (enrollment_id),
  INDEX idx_lesson_id (lesson_id),
  FOREIGN KEY (enrollment_id) REFERENCES course_enrollments(id) ON DELETE CASCADE,
  FOREIGN KEY (lesson_id) REFERENCES course_lessons(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng media_assets
CREATE TABLE media_assets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_type VARCHAR(20) NOT NULL,
  owner_id BIGINT NOT NULL,
  context VARCHAR(50) NOT NULL,
  file_type VARCHAR(20) NOT NULL,
  mime_type VARCHAR(100),
  original_filename VARCHAR(255),
  url TEXT NOT NULL,
  preview_url TEXT,
  cdn_url TEXT,
  size BIGINT,
  metadata JSON,
  version INT DEFAULT 1,
  status VARCHAR(20) DEFAULT 'active',
  created_by INT,
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME(0),
  expires_at DATETIME(0),
  view_count INT DEFAULT 0,
  download_count INT DEFAULT 0,
  last_accessed_at DATETIME(0),
  INDEX idx_context (context),
  INDEX idx_created_by (created_by),
  INDEX idx_expires_at (expires_at),
  INDEX idx_owner (owner_type, owner_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng messages
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  conversation_id INT,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  message TEXT NOT NULL,
  status INT DEFAULT 0,
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_conversation_id (conversation_id),
  INDEX idx_receiver_id (receiver_id),
  INDEX idx_sender_id (sender_id),
  FOREIGN KEY (receiver_id) REFERENCES accounts(id) ON DELETE CASCADE,
  FOREIGN KEY (sender_id) REFERENCES accounts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng notifications
CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  type VARCHAR(50) NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  data JSON,
  read_at DATETIME(0),
  INDEX idx_is_read (is_read),
  INDEX idx_type (type),
  INDEX idx_user_id (user_id),
  FOREIGN KEY (user_id) REFERENCES accounts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng payment_methods
CREATE TABLE payment_methods (
  id INT AUTO_INCREMENT PRIMARY KEY,
  method_name VARCHAR(100) NOT NULL,
  provider VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  config JSON,
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng payouts
CREATE TABLE payouts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  instructor_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  paid_at DATETIME(0),
  bank_info JSON,
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_instructor_id (instructor_id),
  INDEX idx_status (status),
  FOREIGN KEY (instructor_id) REFERENCES accounts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng system_logs
CREATE TABLE system_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  level VARCHAR(20) NOT NULL,
  category VARCHAR(50),
  message TEXT NOT NULL,
  context JSON,
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_created_at (created_at),
  INDEX idx_level (level)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng system_settings
CREATE TABLE system_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  `key` VARCHAR(100) NOT NULL UNIQUE,
  value TEXT,
  type VARCHAR(20) DEFAULT 'string',
  description TEXT,
  updated_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_key (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng invoices
CREATE TABLE invoices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  invoice_number VARCHAR(100) NOT NULL UNIQUE,
  user_id INT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  discount DECIMAL(10, 2) DEFAULT 0,
  tax DECIMAL(10, 2) DEFAULT 0,
  billing_info JSON,
  payment_method VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'paid',
  issued_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  due_date DATETIME(0),
  paid_at DATETIME(0),
  invoice_url TEXT,
  notes TEXT,
  INDEX idx_user_id (user_id),
  INDEX idx_invoice_number (invoice_number),
  INDEX idx_status (status),
  INDEX idx_issued_at (issued_at),
  FOREIGN KEY (user_id) REFERENCES accounts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng invoice_details
CREATE TABLE invoice_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  invoice_id INT NOT NULL,
  user_id INT NOT NULL,
  course_id INT,
  amount DECIMAL(10, 2) NOT NULL,
  method_id INT,
  transaction_code VARCHAR(100) NOT NULL UNIQUE,
  status VARCHAR(20) DEFAULT 'pending',
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME(0),
  payment_data JSON,
  INDEX idx_invoice_id (invoice_id),
  INDEX idx_course_id (course_id),
  INDEX idx_method_id (method_id),
  INDEX idx_status (status),
  INDEX idx_transaction_code (transaction_code),
  INDEX idx_user_id (user_id),
  FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id),
  FOREIGN KEY (method_id) REFERENCES payment_methods(id),
  FOREIGN KEY (user_id) REFERENCES accounts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng user_profiles
CREATE TABLE user_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  bio TEXT,
  phone VARCHAR(20),
  gender VARCHAR(10),
  country VARCHAR(100),
  language VARCHAR(10) DEFAULT 'vi',
  address TEXT,
  city VARCHAR(100),
  created_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
  date_of_birth DATE,
  timezone VARCHAR(50) DEFAULT 'Asia/Ho_Chi_Minh',
  updated_at DATETIME(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  website VARCHAR(255),
  INDEX idx_user_id (user_id),
  FOREIGN KEY (user_id) REFERENCES accounts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
