# Database Seed Instructions

## 📋 Tổng quan

File `seed.ts` chứa dữ liệu mẫu cho hệ thống E-Learning Platform, bao gồm:

- ✅ 7 tài khoản (1 SuperAdmin, 3 Instructors, 3 Students)
- ✅ 4 danh mục khóa học
- ✅ 3 khóa học (nhiều cấp độ và giá khác nhau)
- ✅ 3 sections và 2 lessons
- ✅ 2 enrollments (1 hoàn thành, 1 đang học)
- ✅ 2 đánh giá khóa học
- ✅ 3 user profiles cho instructors

## 🚀 Cách sử dụng

### Chạy seed với npm script (Khuyến nghị)

```bash
cd backend
npm run db:seed
```

### Hoặc chạy trực tiếp với tsx

```bash
cd backend
npx tsx prisma/seed.ts
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

Passwords được hash tự động bằng bcrypt trong seed script. Tất cả tài khoản test đều dùng password: `123456`

### 2. Upsert Strategy

Seed script sử dụng `upsert` để tránh duplicate errors. Nếu dữ liệu đã tồn tại, nó sẽ không bị ghi đè.

### 3. Reset Database

Nếu muốn reset hoàn toàn database:

```bash
cd backend
npx prisma migrate reset
npm run db:seed
```

## 🔍 Kiểm tra dữ liệu

Sau khi seed, bạn có thể:

1. **Sử dụng Prisma Studio** (Khuyến nghị):
```bash
cd backend
npx prisma studio
```

2. **Hoặc query trực tiếp trong MySQL**:
```sql
SELECT * FROM accounts;
SELECT * FROM courses;
SELECT * FROM course_enrollments;
```

## 📊 Dữ liệu chi tiết

### Courses
1. **HTML & CSS Cơ Bản** - Free (Beginner) - Featured
2. **JavaScript Nâng Cao** - 499k → 399k (Advanced) - Featured
3. **React.js Full Course** - 799k → 599k (Intermediate)

### Student Progress
- **Student 1 (Phạm Văn D)**: 
  - Hoàn thành HTML/CSS (100%)
  - Đang học JavaScript (65%)

### Reviews
- Student 1 đánh giá HTML/CSS: 5 sao
- Student 1 đánh giá JavaScript: 4 sao

## 🛠️ Troubleshooting

### Lỗi: "Cannot find module '@prisma/client'"
```bash
cd backend
npm install
npx prisma generate
```

### Lỗi: "Table doesn't exist"
```bash
cd backend
npx prisma db push
# hoặc
npx prisma migrate deploy
```

### Lỗi: "Unique constraint failed"
Dữ liệu đã tồn tại. Nếu muốn reset:
```bash
cd backend
npx prisma migrate reset
npm run db:seed
```

## 📝 Cập nhật dữ liệu

Nếu cần thêm dữ liệu mới:

1. **Chỉnh sửa file `seed.ts`** - Thêm các upsert/create mới
2. **Sử dụng Prisma Studio** - `npx prisma studio` để thêm dữ liệu qua UI
3. **Viết migration script riêng** - Tạo file TypeScript mới trong thư mục prisma

## 🔄 Reset Database

Để reset hoàn toàn database và chạy lại seed:

```bash
cd backend

# Cách 1: Reset và seed tự động
npx prisma migrate reset

# Cách 2: Thủ công
npx prisma db push --force-reset
npm run db:seed
```

---

**Lưu ý**: File này được tạo để hỗ trợ development và testing. Không sử dụng cho production!
