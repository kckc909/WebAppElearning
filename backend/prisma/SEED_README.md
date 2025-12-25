# Database Seed Instructions

## 📋 Tổng quan

File `seed.sql` chứa dữ liệu mẫu đầy đủ cho hệ thống E-Learning Platform, bao gồm:

- ✅ 7 tài khoản (1 SuperAdmin, 3 Instructors, 3 Students)
- ✅ 6 danh mục khóa học
- ✅ 8 khóa học (nhiều cấp độ và giá khác nhau)
- ✅ 12 sections và 8 lessons
- ✅ 7 enrollments (2 hoàn thành, 5 đang học)
- ✅ 2 certificates (cho khóa học đã hoàn thành)
- ✅ 4 đánh giá khóa học
- ✅ 7 hóa đơn thanh toán (đã hoàn tất)
- ✅ 3 lớp học trực tiếp
- ✅ Notifications, Messages, Admin Logs
- ✅ Giỏ hàng với sản phẩm

## 🚀 Cách sử dụng

### Phương pháp 1: Từ Command Line

```bash
# Đảm bảo database đã tồn tại
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS website_milearn;"

# Import dữ liệu
mysql -u root -p website_milearn < backend/prisma/seed.sql
```

### Phương pháp 2: Từ MySQL Workbench hoặc phpMyAdmin

1. Mở MySQL Workbench hoặc phpMyAdmin
2. Chọn database `website_milearn`
3. Chọn "Import" hoặc "Execute SQL"
4. Chọn file `backend/prisma/seed.sql`
5. Chạy file

### Phương pháp 3: Từ MySQL Command Line

```sql
USE website_milearn;
SOURCE C:/path/to/backend/prisma/seed.sql;
```

## 👤 Tài khoản test

### SuperAdmin
- Email: `superadmin@milearn.com`
- Password: `123456`
- Role: SuperAdmin

### Instructors
- Email: `instructor1@milearn.com` / Password: `123456`
- Email: `instructor2@milearn.com` / Password: `123456`
- Email: `instructor3@milearn.com` / Password: `123456`

### Students
- Email: `student1@milearn.com` / Password: `123456`
- Email: `student2@milearn.com` / Password: `123456`
- Email: `student3@milearn.com` / Password: `123456`

## ⚠️ Lưu ý quan trọng

### 1. Password Hashing

Passwords trong file SQL đã được hash bằng bcrypt. Nếu bạn muốn thay đổi password, sử dụng:

```javascript
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash('your-password', 10);
```

### 2. Foreign Key Constraints

File SQL tự động:
- Tắt foreign key checks trước khi insert
- Bật lại sau khi hoàn tất

### 3. Xóa dữ liệu cũ

Nếu muốn xóa toàn bộ dữ liệu trước khi seed:

```sql
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE cart_items;
TRUNCATE TABLE carts;
TRUNCATE TABLE invoice_details;
TRUNCATE TABLE invoices;
TRUNCATE TABLE certificates;
TRUNCATE TABLE lesson_progress;
TRUNCATE TABLE course_enrollments;
TRUNCATE TABLE course_reviews;
TRUNCATE TABLE course_lessons;
TRUNCATE TABLE course_sections;
TRUNCATE TABLE courses;
TRUNCATE TABLE course_categories;
TRUNCATE TABLE class_students;
TRUNCATE TABLE classes;
TRUNCATE TABLE messages;
TRUNCATE TABLE notifications;
TRUNCATE TABLE admin_logs;
TRUNCATE TABLE instructor_verifications;
TRUNCATE TABLE payment_methods;
TRUNCATE TABLE user_profiles;
TRUNCATE TABLE accounts WHERE username != 'superadmin';

SET FOREIGN_KEY_CHECKS = 1;
```

## 🔍 Kiểm tra dữ liệu

Sau khi import, chạy các query sau để kiểm tra:

```sql
-- Kiểm tra số lượng records
SELECT 'Accounts' as table_name, COUNT(*) as count FROM accounts
UNION ALL
SELECT 'Courses', COUNT(*) FROM courses
UNION ALL
SELECT 'Enrollments', COUNT(*) FROM course_enrollments
UNION ALL
SELECT 'Invoices', COUNT(*) FROM invoices
UNION ALL
SELECT 'Certificates', COUNT(*) FROM certificates;

-- Kiểm tra enrollments với progress
SELECT 
    a.full_name as student,
    c.title as course,
    ce.progress,
    ce.status
FROM course_enrollments ce
JOIN accounts a ON ce.student_id = a.id
JOIN courses c ON ce.course_id = c.id;

-- Kiểm tra invoices
SELECT 
    a.full_name as customer,
    i.total_amount,
    i.final_amount,
    i.payment_status,
    i.created_at
FROM invoices i
JOIN accounts a ON i.user_id = a.id
ORDER BY i.created_at DESC;
```

## 📊 Dữ liệu chi tiết

### Courses
1. **HTML & CSS Cơ Bản** - Free (Beginner)
2. **JavaScript Nâng Cao** - 499k → 399k (Advanced)
3. **React.js Full Course** - 799k → 599k (Intermediate)
4. **Node.js & Express** - 699k (Intermediate)
5. **React Native Cơ Bản** - 899k → 699k (Intermediate)
6. **Flutter & Dart** - 999k → 799k (Intermediate)
7. **Python cho Data Science** - 599k → 499k (Beginner)
8. **Machine Learning A-Z** - 1299k → 999k (Advanced)

### Student Progress
- **Student 1**: Hoàn thành HTML/CSS, đang học JavaScript (65%), React (30%)
- **Student 2**: Đang học HTML/CSS (80%), React Native (45%)
- **Student 3**: Hoàn thành Python, đang học ML (55%)

### Certificates
- Student 1: Certificate cho HTML & CSS
- Student 3: Certificate cho Python

## 🛠️ Troubleshooting

### Lỗi: "Table doesn't exist"
```bash
# Chạy migration trước
cd backend
npx prisma db push
```

### Lỗi: "Duplicate entry"
```bash
# Xóa dữ liệu cũ trước (xem phần "Xóa dữ liệu cũ" ở trên)
```

### Lỗi: "Foreign key constraint fails"
```bash
# Đảm bảo FOREIGN_KEY_CHECKS được tắt trong file SQL
# Hoặc chạy thủ công:
SET FOREIGN_KEY_CHECKS = 0;
# ... import data ...
SET FOREIGN_KEY_CHECKS = 1;
```

## 📝 Cập nhật dữ liệu

Nếu cần thêm dữ liệu mới, bạn có thể:

1. Chỉnh sửa file `seed.sql`
2. Hoặc tạo file SQL riêng cho dữ liệu bổ sung
3. Hoặc sử dụng Prisma Studio: `npx prisma studio`

## 🔄 Reset Database

Để reset hoàn toàn database:

```bash
# Xóa và tạo lại database
mysql -u root -p -e "DROP DATABASE IF EXISTS website_milearn;"
mysql -u root -p -e "CREATE DATABASE website_milearn;"

# Chạy migration
cd backend
npx prisma db push

# Import seed data
mysql -u root -p website_milearn < backend/prisma/seed.sql
```

---

**Lưu ý**: File này được tạo tự động để hỗ trợ development và testing. Không sử dụng cho production!
