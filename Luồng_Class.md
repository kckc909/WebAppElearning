# Luồng_Class (Chức năng Lớp học / Classes)

Tài liệu này mô tả luồng hoạt động dự kiến cho phần chức năng Classes (Lớp học) với yêu cầu: CLASS LÀ THỰC THỂ ĐỘC LẬP với Course. Class có thể sử dụng Course trên hệ thống như một giáo trình/bộ nội dung đính kèm nếu muốn, nhưng KHÔNG BẮT BUỘC và vận hành độc lập như một lớp học online hoàn chỉnh.

- Course: nội dung học dạng “tĩnh” (curriculum: sections/lessons/blocks) do giảng viên tạo và admin duyệt.
- Class: thực thể lớp học độc lập, có lịch học, danh sách học viên, thông báo, tài liệu lớp, bài tập, điểm danh, Q&A, tiến độ… Có thể tham chiếu 0..n Course làm tài liệu/giáo trình tham khảo hoặc import nội dung, nhưng không phụ thuộc vào quyền học Course.

Tài liệu ưu tiên luồng thực tế (MVP) nhưng có mở rộng để nâng cấp về sau.

---

## 1. Mục tiêu & phạm vi

### 1.1. Mục tiêu của Classes
- Cung cấp một lớp học online độc lập, tự vận hành mà không cần sở hữu Course.
- Cho phép optionally nhập/tham chiếu Course làm giáo trình/bài tập nhưng không ràng buộc quyền hạn.
- Quản lý:
  - học viên trong lớp (enroll/approve/remove)
  - timeline (lịch, deadline, pacing) và tiến độ lớp
  - tương tác lớp (announcements, Q&A)
  - tài nguyên lớp (documents)
  - bài tập/chấm điểm/nộp bài (assignment theo lớp)
  - điểm danh (nếu lớp có lịch)

### 1.2. Phạm vi nên có (theo dấu hiệu code hiện tại)
- Hooks hiện có: useClasses, useClassAnnouncements, useClassDocuments, useClassHomework, useClassQA, useAttendance → phù hợp hướng độc lập.
- Kết nối với Course: chỉ ở mức optional import/link.

---

## 2. Khái niệm & phân loại lớp

### 2.1. Kiểu lớp (ClassType)
- COHORT (có lịch, session, attendance, deadline)
- SELF_PACED (không lịch cố định, vẫn có announcement/Q&A/docs/homework theo lớp)

### 2.2. Trạng thái lớp (ClassStatus)
- DRAFT → OPEN → ONGOING → COMPLETED → ARCHIVED
- OPEN → ARCHIVED (hủy)

### 2.3. Quan hệ với Course (độc lập)
- classCourses: 0..n tham chiếu Course (optional) theo 2 chế độ:
  - LINK: liên kết tới course (xem/đi học như tài liệu tham khảo)
  - IMPORT: import snapshot nội dung course vào phạm vi lớp (tạo bản sao lesson/assignment theo lớp)
- Không yêu cầu “đã mua course” để tham gia lớp.

---

## 3. Actor & quyền hạn

### 3.1. Actor
- **Admin**: quản trị hệ thống, can thiệp, audit.
- **Instructor (Giảng viên)**: tạo/điều hành lớp, quản lý nội dung “theo lớp”.
- **Student (Học viên)**: tham gia lớp, học, nộp bài, hỏi đáp.

### 3.2. Quyền (gợi ý RBAC)
- Admin: full.
- Instructor: CRUD class (trong phạm vi mình), quản lý member, announcement, doc, homework, attendance, Q&A moderation.
- Student:
  - đọc announcements/documents
  - tham gia Q&A
  - nộp bài / xem kết quả chấm
  - xem tiến độ/điểm danh của bản thân

---

## 4. Luồng tổng quan theo vòng đời Class

### 4.1. Tạo lớp (không phụ thuộc Course)
1. Instructor vào trang danh sách lớp → “Tạo lớp (Create Class)”.
2. Nhập cấu hình lớp:
   - Tên lớp (className)
   - ClassType (COHORT/SELF_PACED)
   - startDate/endDate (nếu COHORT)
   - capacity, policy (AUTO_APPROVE/MANUAL_APPROVE)
   - openAt/closeAt, visibility (public/unlisted/private)
3. Lưu → DRAFT.
4. (Tùy chọn) Gắn Course vào lớp:
   - LINK 0..n course hoặc IMPORT một phần nội dung sang lớp (bài học/bài tập snapshot)
5. Cấu hình modules: sessions (nếu COHORT), announcements, documents, homework template.
6. “Mở đăng ký” → OPEN.

Kết quả: lớp hiển thị độc lập, có thể dùng/từ chối dùng Course.

### 4.2. Học viên tìm lớp & đăng ký (độc lập)
1. Student vào class landing (public/unlisted/private theo visibility).
2. Xem: mô tả lớp, lịch (nếu có), giảng viên, yêu cầu, học phí lớp (nếu có), tài nguyên/giáo trình (có thể là Course LINK/IMPORT hoặc nội dung tự tạo theo lớp).
3. Nhấn “Đăng ký/Tham gia”.
4. Kiểm tra: đăng nhập, capacity, thời gian mở đăng ký.
5. Tạo ClassEnrollment: APPROVED (AUTO) hoặc PENDING (MANUAL).
6. Nếu lớp thu phí riêng (class fee): điều hướng thanh toán lớp; sau thành công → APPROVED.

Lưu ý: không kiểm tra entitlement Course. Nếu lớp có liên kết Course ở chế độ LINK, học viên vẫn truy cập nội dung trong phạm vi lớp cho phép (ví dụ pre-view/embedded), còn quyền full course là chính sách riêng nếu được cấp kèm lớp.

### 4.3. Luồng duyệt học viên vào lớp (Manual approve)
1. Instructor mở “Danh sách chờ duyệt”.
2. Chọn approve/reject.
3. Nếu approve:
   - enrollment -> `APPROVED`
   - học viên thấy lớp trong “Lớp của tôi”
4. Nếu reject:
   - enrollment -> `REJECTED`
   - lưu lý do (optional)

### 4.4. Luồng bắt đầu lớp & vận hành
- Khi tới startDate (hoặc instructor bấm “Bắt đầu lớp”): status -> `ONGOING`.
- Trong quá trình ONGOING:
  - announcements (thông báo)
  - Q&A theo lớp
  - documents theo lớp
  - homework theo lớp
  - attendance theo session (nếu COHORT)

### 4.5. Luồng kết thúc lớp
- Instructor bấm “Kết thúc lớp” hoặc tự động khi qua endDate.
- status -> `COMPLETED`.
- Chốt:
  - tổng kết điểm/đánh giá
  - xuất báo cáo
  - khóa chỉnh sửa một số thành phần (tuỳ chính sách)
- Có thể `ARCHIVED` để lưu trữ, read-only.

---

## 5. Quan hệ Class và Course (độc lập, optional link/import)

- Class là sản phẩm/đơn vị độc lập có thể thu phí riêng (class fee) và vận hành không cần Course.
- Cho phép cấu hình 0..n Course:
  - LINK: gắn kèm như tài liệu tham khảo; quyền xem chi tiết Course phụ thuộc chính sách lớp (ví dụ mở preview/nhúng nội dung) hoặc tặng entitlement kèm lớp.
  - IMPORT: sao chép snapshot nội dung Course thành lesson/homework nội bộ của lớp; không lệ thuộc trạng thái/entitlement Course về sau.
- Mua lớp không bắt buộc mua Course; ngược lại mua Course không tự động vào lớp (trừ khi có chính sách tặng kèm).

---

## 6. Các module con trong Class (luồng chi tiết)

### 6.1. Announcements (Thông báo lớp)
Instructor
1. Tạo announcement: title, content (markdown), attachments (optional), publishAt (optional).
2. Chọn phạm vi: toàn lớp.
3. Publish → lưu DB, gửi thông báo (nếu có).

Student
- Xem list theo thời gian, đánh dấu đã đọc.

Nâng cấp: pin, comment/reaction.

### 6.2. Documents (Tài liệu lớp)
Instructor: upload file/link, phân loại, cấp quyền (members only).
Student: xem/tải.
Nâng cấp: versioning, expiration.

### 6.3. Homework / Assignments (Bài tập theo lớp)
Instructor
1. Tạo assignment (title, description, dueDate, rubric/scoreMax, attachments) thủ công hoặc IMPORT từ Course.
2. Publish.

Student: mở, nộp (text/file/link), các trạng thái DRAFT → SUBMITTED → GRADED → RETURNED.
Instructor: chấm điểm, feedback.
Nâng cấp: auto-grade (quiz/code), resubmit policy.

### 6.4. Q&A theo lớp (Class Q&A)
Student đặt câu hỏi; Instructor/TA trả lời, mark accepted, close; nâng cấp: upvote, duplicate detection.

### 6.5. Attendance (Điểm danh) – COHORT
Instructor tạo sessions (dateTime, duration, topic), điểm danh (present/late/absent, note).
Student xem lịch/trạng thái. Nâng cấp: QR check-in, auto close.

---

## 7. Màn hình (UX) đề xuất

### 7.1. Instructor
- Classes list (lọc theo status)
- Class detail (tabs):
  - Overview
  - Students
  - Announcements
  - Documents
  - Homework
  - Q&A
  - Attendance (COHORT)
  - Settings
  - Curriculum (nội dung lớp): tạo mới hoặc IMPORT từ Course

### 7.2. Student
- My Classes
- Class detail (tabs):
  - Feed (announcements)
  - Curriculum (nội dung theo lớp, không phụ thuộc Course)
  - Homework
  - Documents
  - Q&A
  - Attendance (COHORT)

---

## 8. Data model gợi ý (Prisma/Nest) – mức khái niệm (độc lập)

Chính:
- Class (id, name, type, status, visibility, capacity, start/end, open/close)
- ClassEnrollment (classId, userId, status PENDING/APPROVED/REJECTED)
- ClassAnnouncement
- ClassDocument
- ClassHomework, ClassHomeworkSubmission
- ClassQuestion, ClassAnswer
- ClassSession, AttendanceRecord
- ClassCurriculum (optional, riêng lớp): Section, Lesson, Block

Liên kết Course (optional):
- ClassCourseLink (classId, courseId, mode LINK/IMPORT, meta)
- Nếu IMPORT: snapshot tables (e.g., ImportedLesson) thuộc phạm vi class.

Indexes: unique(classId,userId) cho enrollment; index theo classId cho các bảng con.

---

## 9. Quy tắc nghiệp vụ & edge cases

1. Sĩ số/capacity và waitlist (optional).
2. Chuyển lớp: cho phép chuyển giữa các lớp độc lập theo policy (không ràng buộc course).
3. Refund/chargeback: hoàn tiền lớp không ảnh hưởng entitlement Course và ngược lại, trừ khi lớp có gói tặng kèm.
4. Xóa lớp: đã có dữ liệu → ARCHIVED thay vì delete.
5. Course updates: nếu LINK → luôn xem nội dung hiện tại; nếu IMPORT → snapshot cố định.
6. Quyền truy cập Curriculum lớp: thành viên lớp; có thể public một phần (preview) nếu muốn.

---

## 10. Kế hoạch triển khai (độc lập với Course)

MVP
1. CRUD Class + Enrollment (AUTO/MANUAL approve, visibility, capacity)
2. Announcements, Documents
3. Homework + submissions (tạo tay hoặc import từ Course)
4. Q&A
5. Attendance (COHORT)
6. Curriculum lớp (Section/Lesson/Block tối thiểu) – có thể đơn giản hóa trước

Phase 2
- Calendar + reminders
- Class feed hợp nhất
- Import từ Course theo snapshot có chọn lọc (lessons/assignments)

Phase 3
- Bán “class seat” (class fee) với voucher/bundle tặng Course (optional)
- TA role, grading workflow nâng cao

---

## 11. Mapping nhanh với hệ thống hiện tại

- Luồng mua course đã có, nhưng Class vận hành độc lập → tạo loại đơn hàng/entitlement riêng cho Class (class_enrollment/class_fee).
- Hooks class-* sẵn có → chuẩn hoá endpoints theo module độc lập; kết nối Course chỉ là optional API (link/import).
- Tận dụng storage server cho documents/submissions; curriculum lớp có thể dùng chung cơ chế asset của lesson.

---

## 12. Kết quả kỳ vọng

Sau khi hoàn thiện module Classes theo luồng này:
- Giảng viên tạo được lớp từ course đã publish.
- Học viên vào lớp theo chính sách duyệt/tự động.
- Lớp có kênh vận hành: thông báo, tài liệu, bài tập, hỏi đáp, (điểm danh nếu cohort).
- Dữ liệu lớp giúp theo dõi chất lượng học tập ngoài “đăng ký course” thuần túy.

---

## 13. Tổng hợp UI hiện tại (Instructor + Student) và đề xuất merge

Nguồn kiểm tra: website/pages/Instructor/ClassManagement và website/pages/Student/MyClasses, cộng với InstructorSidebar.tsx và page_routes.tsx.

1) Instructor – Menu “Quản lý lớp học” (sidebar)
- Mục con chung:
  - Tổng quan lớp học → classes/overview
  - Lớp học của tôi → classes/all
  - Lịch dạy → classes/schedule
- Dynamic menu theo từng Class (đang có):
  - Tổng quan → classes/:classId
  - Phiên trực tiếp (Live) → classes/:classId/live
  - Hoạt động → classes/:classId/activity
  - Điểm danh → classes/:classId/attendance
  - Bài tập → classes/:classId/assignments
  - Tài liệu → classes/:classId/materials (trong code folder là “Matertial”, cần rename UI → “Materials/Tài liệu”)
  - Điểm số → classes/:classId/grades
  - Thành viên → classes/:classId/members
  - Cài đặt → classes/:classId/settings
- Thiếu (đối chiếu với Student):
  - Thông báo lớp (Announcements)
  - Hỏi đáp lớp (Q&A)

2) Student – MyClasses
- Trang/tabs hiện có:
  - Announcements
  - Documents
  - Homework
  - QA
  - Schedule
  - ClassDetail
- Thiếu (đối chiếu với Instructor):
  - Live session (tham gia buổi học trực tiếp)
  - Attendance view (xem trạng thái điểm danh)
  - Grades view (xem điểm/tổng kết)

3) Đề xuất điều hướng hợp nhất (merge “điểm tốt” của hai phía)
- Instructor – Tabs/Sections per Class (gợi ý hoàn chỉnh):
  - Overview (Tổng quan)
  - Live (Phiên trực tiếp)
  - Activity (Hoạt động)
  - Announcements (Thông báo)
  - Documents/Materials (Tài liệu)
  - Homework/Assignments (Bài tập)
  - Q&A (Hỏi đáp)
  - Attendance (Điểm danh – COHORT)
  - Grades (Điểm số)
  - Members (Thành viên)
  - Settings (Cài đặt)
- Student – Tabs per Class:
  - Feed/Announcements (Bảng tin/Thông báo)
  - Curriculum (nội dung lớp – nếu dùng)
  - Documents (Tài liệu)
  - Homework (Bài tập)
  - Q&A (Hỏi đáp)
  - Schedule (Lịch)
  - Live (tham gia phiên trực tiếp – nếu có)
  - Attendance (xem trạng thái)
  - Grades (xem điểm)

4) Mapping nhanh với hooks hiện có
- useClassAnnouncements → Announcements (cả 2 phía)
- useClassDocuments → Documents/Materials
- useClassHomework → Homework/Assignments
- useClassQA → Q&A
- useAttendance → Attendance + Schedule
- useClasses → danh sách/lifecycle lớp

5) Việc nên bổ sung/sửa tên cho đồng nhất
- Thêm Announcements + Q&A cho Instructor (sidebar dynamic + routes).
- Bổ sung Live/Attendance/Grades view cho Student (nếu chưa hiển thị, dùng hooks hiện có để render dữ liệu).
- Đổi “Matertial” → “Materials” (UI/route label), không bắt buộc đổi path nếu đã public, nhưng khuyến nghị fix path sớm để tránh nợ kỹ thuật.
- Đảm bảo “Curriculum lớp” (nếu dùng) được đặt rõ ở cả phía Instructor (tạo/IMPORT) và Student (đọc-only).

6) Chính sách hiển thị theo ClassType
- COHORT: enable Live, Sessions/Schedule, Attendance; due dates theo session.
- SELF_PACED: ẩn Attendance/Live mặc định, giữ Announcements/Documents/Homework/Q&A.

Kết quả hợp nhất: giao diện 2 phía đầy đủ, tính năng công bố thống nhất, đặt tên nhất quán, tái sử dụng hooks hiện có và vẫn giữ Class độc lập với Course (LINK/IMPORT optional).
