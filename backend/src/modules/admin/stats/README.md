# Stats Module

Module thống kê học tập dựa trên dữ liệu thực tế từ database.

## Cấu trúc

```
stats/
├── stats.controller.ts   # REST API endpoints
├── stats.service.ts      # Business logic
├── stats.module.ts       # Module definition
└── README.md            # Documentation
```

## Tính năng

### 1. Overview (Tổng quan)
- Tổng giờ học (từ `lesson_progress.time_spent`)
- Số khóa học đã đăng ký
- Số khóa học hoàn thành (progress >= 100%)
- Số chứng chỉ đạt được
- Tỷ lệ hoàn thành

### 2. Streak (Chuỗi ngày học)
- Chuỗi ngày học liên tiếp hiện tại
- Chuỗi ngày học dài nhất
- Dựa trên `lesson_progress.last_accessed_at`

### 3. Activity (Hoạt động theo thời gian)
- Hoạt động học tập theo ngày
- Hỗ trợ 3 khoảng thời gian: week, month, year
- Trả về minutes và hours cho mỗi ngày

### 4. Category Distribution (Phân bố theo chủ đề)
- Số khóa học theo từng category
- Tổng giờ học theo category
- Phần trăm phân bố

### 5. Weekly Activity (Hoạt động trong tuần)
- Hoạt động theo ngày trong tuần (CN-T7)
- Dựa trên 30 ngày gần nhất
- Giúp xác định ngày nào học nhiều nhất

### 6. Course Progress (Tiến độ khóa học)
- Danh sách tất cả khóa học đang học
- Progress, completed lessons, total lessons
- Sắp xếp theo last_accessed_at

## API Endpoints

Xem chi tiết tại: `backend/docs/STATS_API.md`

```
GET /api/stats/overview
GET /api/stats/streak
GET /api/stats/activity?period=month
GET /api/stats/category-distribution
GET /api/stats/weekly-activity
GET /api/stats/course-progress
```

## Nguồn dữ liệu

Tất cả dữ liệu đều từ các bảng hiện có:

- `lesson_progress`: time_spent, last_accessed_at, is_completed, completed_at
- `course_enrollments`: progress, status, enrolled_at, last_accessed_at
- `courses`: title, thumbnail_url, total_lessons, category_id
- `course_categories`: name
- `certificates`: student_id, course_id

## Ưu điểm

✅ **100% dữ liệu thực**: Không cần bảng tracking riêng

✅ **Chính xác**: Dựa trên hành vi học tập thực tế

✅ **Không cần migration**: Sử dụng schema hiện tại

✅ **Performance**: Query được optimize với indexes

## Testing

Sử dụng file `backend/test-stats-api.http` để test các endpoints.

## Integration với Frontend

Frontend có thể gọi các API này từ trang `/stats`:

```typescript
// Example: Fetch overview
const response = await fetch('/api/stats/overview', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const data = await response.json();
```

## Notes

- Tất cả endpoints yêu cầu authentication (JWT)
- Chỉ STUDENT role mới có thể truy cập
- Thời gian lưu bằng phút trong DB, convert sang giờ khi trả về
- Làm tròn 1 chữ số thập phân cho hours
