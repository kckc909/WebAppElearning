# 📚 API Documentation - New Modules

## 🎯 Overview

Tài liệu này mô tả các API endpoints mới được tạo cho hệ thống E-Learning.

---

## 🔗 Base URL

```
http://localhost:3000
```

---

## 📋 Modules

### 1. Class Assignments (Bài tập lớp học)

#### Endpoints

```http
GET    /class-assignments              # Lấy tất cả bài tập
GET    /class-assignments/:id          # Lấy bài tập theo ID
GET    /class-assignments/class/:classId  # Lấy bài tập theo lớp
POST   /class-assignments              # Tạo bài tập mới
PUT    /class-assignments              # Cập nhật bài tập
DELETE /class-assignments/:id          # Xóa bài tập
```

#### Request Body (POST/PUT)

```json
{
  "class_id": 1,
  "title": "Bài tập tuần 1",
  "description": "Làm bài tập về React Hooks",
  "file_url": "https://example.com/assignment.pdf",
  "due_date": "2025-12-20T23:59:59Z"
}
```

---

### 2. Class Calendar (Lịch lớp học)

#### Endpoints

```http
GET    /class-calendar                 # Lấy tất cả sự kiện
GET    /class-calendar/:id             # Lấy sự kiện theo ID
GET    /class-calendar/class/:classId  # Lấy lịch theo lớp
POST   /class-calendar                 # Tạo sự kiện mới
PUT    /class-calendar                 # Cập nhật sự kiện
DELETE /class-calendar/:id             # Xóa sự kiện
```

#### Request Body (POST/PUT)

```json
{
  "class_id": 1,
  "title": "Buổi học React",
  "description": "Học về React Hooks và State Management",
  "event_date": "2025-12-15T14:00:00Z",
  "duration_minutes": 120,
  "lesson": 5
}
```

---

### 3. Class Exams (Bài kiểm tra)

#### Endpoints

```http
GET    /class-exams                    # Lấy tất cả bài kiểm tra
GET    /class-exams/:id                # Lấy bài kiểm tra theo ID
GET    /class-exams/class/:classId     # Lấy bài kiểm tra theo lớp
POST   /class-exams                    # Tạo bài kiểm tra mới
PUT    /class-exams                    # Cập nhật bài kiểm tra
DELETE /class-exams/:id                # Xóa bài kiểm tra
```

#### Request Body (POST/PUT)

```json
{
  "class_id": 1,
  "title": "Kiểm tra giữa kỳ",
  "exam_type": "quiz",  // "quiz" | "written" | "oral"
  "total_score": 100
}
```

---

### 4. Class Exam Results (Kết quả kiểm tra)

#### Endpoints

```http
GET    /class-exam-results                    # Lấy tất cả kết quả
GET    /class-exam-results/:id                # Lấy kết quả theo ID
GET    /class-exam-results/exam/:examId       # Lấy kết quả theo bài thi
GET    /class-exam-results/student/:studentId # Lấy kết quả theo học viên
POST   /class-exam-results                    # Tạo kết quả mới
PUT    /class-exam-results                    # Cập nhật kết quả
DELETE /class-exam-results/:id                # Xóa kết quả
```

#### Request Body (POST/PUT)

```json
{
  "exam_id": 1,
  "student_id": 5,
  "score": 85.5,
  "feedback": "Làm tốt! Cần cải thiện phần async/await"
}
```

---

### 5. Class Materials (Tài liệu lớp học)

#### Endpoints

```http
GET    /class-materials                # Lấy tất cả tài liệu
GET    /class-materials/:id            # Lấy tài liệu theo ID
GET    /class-materials/class/:classId # Lấy tài liệu theo lớp
POST   /class-materials                # Tạo tài liệu mới
PUT    /class-materials                # Cập nhật tài liệu
DELETE /class-materials/:id            # Xóa tài liệu
```

#### Request Body (POST/PUT)

```json
{
  "class_id": 1,
  "title": "Slide bài giảng React",
  "description": "Tài liệu về React Hooks",
  "file_url": "https://example.com/slides.pdf"
}
```

---

### 6. Class Students (Học viên lớp học)

#### Endpoints

```http
GET    /class-students                     # Lấy tất cả đăng ký
GET    /class-students/:id                 # Lấy đăng ký theo ID
GET    /class-students/class/:classId      # Lấy học viên theo lớp
GET    /class-students/student/:studentId  # Lấy lớp theo học viên
POST   /class-students                     # Đăng ký học viên
PUT    /class-students                     # Cập nhật trạng thái
DELETE /class-students/:id                 # Xóa đăng ký
```

#### Request Body (POST/PUT)

```json
{
  "class_id": 1,
  "student_id": 5,
  "status": 1  // 0: pending, 1: active, 2: completed
}
```

---

### 7. Class Submissions (Bài nộp)

#### Endpoints

```http
GET    /class-submissions                        # Lấy tất cả bài nộp
GET    /class-submissions/:id                    # Lấy bài nộp theo ID
GET    /class-submissions/assignment/:assignmentId  # Lấy bài nộp theo bài tập
GET    /class-submissions/student/:studentId     # Lấy bài nộp theo học viên
POST   /class-submissions                        # Nộp bài mới
PUT    /class-submissions                        # Cập nhật bài nộp
DELETE /class-submissions/:id                    # Xóa bài nộp
```

#### Request Body (POST/PUT)

```json
{
  "assignment_id": 1,
  "student_id": 5,
  "submission_url": "https://github.com/student/assignment1",
  "grade": 90,
  "feedback": "Tốt! Code sạch và có comment đầy đủ"
}
```

---

### 8. Lesson Contents (Nội dung bài học)

#### Endpoints

```http
GET    /lesson-contents                # Lấy tất cả nội dung
GET    /lesson-contents/:id            # Lấy nội dung theo ID
GET    /lesson-contents/lesson/:lessonId  # Lấy nội dung theo bài học
POST   /lesson-contents                # Tạo nội dung mới
PUT    /lesson-contents                # Cập nhật nội dung
DELETE /lesson-contents/:id            # Xóa nội dung
```

#### Request Body (POST/PUT)

```json
{
  "lesson_id": 1,
  "position": 1,
  "order_index": 0,
  "type": 1,  // 1: text, 2: video, 3: code, 4: quiz
  "content_data": {
    "text": "Giới thiệu về React Hooks",
    "video_url": "https://youtube.com/watch?v=xxx"
  }
}
```

---

### 9. Content IDEs (Code IDE học viên)

#### Endpoints

```http
GET    /content-ides                           # Lấy tất cả code
GET    /content-ides/:id                       # Lấy code theo ID
GET    /content-ides/user/:userId              # Lấy code theo user
GET    /content-ides/content/:contentId        # Lấy code theo content
GET    /content-ides/user/:userId/content/:contentId  # Lấy code cụ thể
POST   /content-ides                           # Lưu code mới
PUT    /content-ides                           # Cập nhật code
DELETE /content-ides/:id                       # Xóa code
```

#### Request Body (POST/PUT)

```json
{
  "user_id": 5,
  "content_id": 10,
  "language": "javascript",
  "content": "const greeting = 'Hello World';",
  "test_results": {
    "passed": 5,
    "failed": 0,
    "total": 5
  },
  "status": 1,
  "editor_config": {
    "theme": "dark",
    "fontSize": 14
  }
}
```

---

### 10. Content IDEs Starter (Code mẫu)

#### Endpoints

```http
GET    /content-ides-starter                              # Lấy tất cả code mẫu
GET    /content-ides-starter/:id                          # Lấy code mẫu theo ID
GET    /content-ides-starter/content/:contentId           # Lấy code mẫu theo content
GET    /content-ides-starter/content/:contentId/language/:language  # Lấy code mẫu theo ngôn ngữ
POST   /content-ides-starter                              # Tạo code mẫu mới
PUT    /content-ides-starter                              # Cập nhật code mẫu
DELETE /content-ides-starter/:id                          # Xóa code mẫu
```

#### Request Body (POST/PUT)

```json
{
  "content_id": 10,
  "language": "javascript",
  "content": "// Write your code here\nfunction solution() {\n  \n}"
}
```

---

## 🧪 Testing

Để test các API, chạy script:

```bash
# Test cơ bản
powershell -ExecutionPolicy Bypass -File test-api.ps1

# Test nâng cao
powershell -ExecutionPolicy Bypass -File test-api-advanced.ps1
```

---

## 📊 Response Format

Tất cả responses đều trả về JSON format:

### Success Response
```json
{
  "id": 1,
  "class_id": 1,
  "title": "Example",
  "created_at": "2025-12-13T16:00:00Z",
  ...
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

---

## 🔒 Authentication

⚠️ **Chưa implement**: Hiện tại các endpoints chưa có authentication. Cần thêm:
- JWT authentication
- Role-based access control
- API key validation

---

## 📝 Notes

- Tất cả dates sử dụng ISO 8601 format
- IDs là auto-increment integers
- Relations được include tự động khi cần
- Ordering được áp dụng cho calendar và materials

---

**Last Updated**: 2025-12-13  
**Version**: 1.0.0
