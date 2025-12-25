# Database Migrations & Fixes

Thư mục này chứa các script migration để sửa và chuẩn hóa dữ liệu.

## 🔧 Scripts Chuẩn Hóa Dữ Liệu

### 1. Fix Course Lesson Count

Chuẩn hóa số lượng lessons trong bảng `courses`.

```bash
npx tsx prisma/migrations/fix-course-lesson-count.ts
```

**Chức năng:**
- Đếm số lượng lessons thực tế từ bảng `course_lessons`
- Cập nhật trường `total_lessons` trong bảng `courses`

**Khi nào cần chạy:**
- Sau khi import dữ liệu
- Khi phát hiện số lượng lessons không khớp
- Sau khi xóa/thêm lessons thủ công

---

### 2. Fix Course Duration

Chuẩn hóa tổng thời lượng khóa học.

```bash
npx tsx prisma/migrations/fix-course-duration.ts
```

**Chức năng:**
- Tính tổng duration từ tất cả lessons
- Cập nhật trường `total_duration` trong bảng `courses`

**Khi nào cần chạy:**
- Sau khi cập nhật duration của lessons
- Khi phát hiện thời lượng không chính xác

---

### 3. Fix All Course Stats (Khuyến nghị)

Chuẩn hóa tất cả thống kê cùng lúc.

```bash
npx tsx prisma/migrations/fix-all-course-stats.ts
```

**Chức năng:**
- Cập nhật cả `total_lessons` và `total_duration`
- Hiển thị báo cáo chi tiết

**Khi nào cần chạy:**
- Sau khi seed database
- Định kỳ để đảm bảo dữ liệu chính xác
- Trước khi deploy production

---

## 📊 Kết quả Mẫu

```
🔧 BẮT ĐẦU CHUẨN HÓA THỐNG KÊ KHÓA HỌC
============================================================

📊 Tìm thấy 9 khóa học

📝 Khóa học: ReactJS cho Người Mới Bắt Đầu
   ID: 1
   📚 Lessons: 45 → 3
   ⏱️  Duration: 1200 phút → 60 phút (1h 0m)

============================================================
✅ HOÀN THÀNH!
============================================================

📊 Tổng kết:
   - Tổng số khóa học: 9
   - Đã cập nhật: 3 khóa học
   - Không thay đổi: 6 khóa học

✨ Đã chuẩn hóa thành công 3 khóa học!
💡 Lưu ý: Học viên giờ có thể hoàn thành khóa học chính xác!
```

---

## 🔄 Tự Động Hóa (Future)

### Prisma Middleware

Để tự động cập nhật stats khi có thay đổi, có thể sử dụng Prisma middleware:

```typescript
// src/prisma.service.ts
import { createUpdateCourseStatsMiddleware } from './prisma-middleware/update-course-stats.middleware';

// Trong PrismaService
this.$use(createUpdateCourseStatsMiddleware());
```

**Lợi ích:**
- Tự động cập nhật khi tạo/sửa/xóa lesson
- Không cần chạy script thủ công
- Đảm bảo dữ liệu luôn chính xác

**Lưu ý:**
- Có thể ảnh hưởng performance nếu có nhiều lessons
- Nên test kỹ trước khi áp dụng

---

## 🐛 Troubleshooting

### Lỗi: "Cannot find module"

```bash
# Đảm bảo đã cài đặt dependencies
npm install

# Hoặc
pnpm install
```

### Lỗi: "Database connection failed"

```bash
# Kiểm tra DATABASE_URL trong .env
# Đảm bảo database đang chạy
```

### Lỗi: "Permission denied"

```bash
# Chạy với quyền admin (Windows)
# Hoặc dùng sudo (Linux/Mac)
```

---

## 📝 Best Practices

1. **Backup trước khi chạy migration:**
   ```bash
   # MySQL
   mysqldump -u user -p database > backup.sql
   
   # PostgreSQL
   pg_dump database > backup.sql
   ```

2. **Test trên development trước:**
   - Chạy script trên DB development
   - Kiểm tra kết quả
   - Sau đó mới chạy trên production

3. **Chạy định kỳ:**
   - Thêm vào cron job
   - Hoặc chạy sau mỗi lần deploy
   - Hoặc khi phát hiện dữ liệu không khớp

4. **Monitor logs:**
   - Kiểm tra output của script
   - Lưu logs để audit
   - Báo cáo nếu có lỗi

---

## 🔗 Liên Quan

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Middleware](https://www.prisma.io/docs/concepts/components/prisma-client/middleware)
- [Database Migrations Best Practices](https://www.prisma.io/docs/guides/migrate/production-troubleshooting)
