# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


## Note for me:
1 tài khoản có thể ăn nhiều quyền

3 phân hệ trên dùng chung header sidebar 

student dùng chung header với trang tổng => chơi 1 mình ưu tiên làm ? => cần mock data

Quy trình trở thành instructor: đăng ký/ đăng nhập => hệ thống chuyển sang trang nhập thông tin xác thực giảng viên => xác minh bước 2 => 

// Prompt gần nhất
// tiếp tục phát triển thêm sau khi người dùng đăng nhập thì trên thanh header và trong avatar sẽ thay đổi:
// trên thanh header sẽ có thêm một số đường dẫn đến trang học tập như : khóa học của tôi, lớp học của tôi
// avatar xổ xuống sau khi đang nhập sẽ có: Học tập cá nhân, Khóa học của tôi, Lớp học của tôi, lịch học, Hồ sơ cá nhân, Cài đặt
// xây dựng trang Học tập của tôi có 1 sidebar để điều hướng, khi truy cập trang học tập của tôi sẽ vào trang Student_Dashboard
// Thiết kế sidebar điều hướng (Có thể collapse ) :
// Dashboard (Thiết kế Dashboard :hiển lớp đang học, có thể nhấn vào nút MonitorPlay để tham gia học tập, bên dưới lần lượt là bài tập và lịch học 1 tháng; Nếu chưa tham gia lớp học nào thì ẩn đi; sau đó hiển thị đến thông tin tổng hợp về các khóa học)
// 📚 Khóa học của tôi: (Khi nhấn vào thì hiển thị danh sách khóa học đang học, có dropdown để chọn bộ lọc, hiển thị trên các card, trên các card lại có thanh tiến độ + hiển thị %; Nếu khóa học đã nhận chứng chỉ thì sẽ được đẩy sang phần đã nhận chứng chỉ)
// 🏫 Lớp học của tôi
// Danh sách lớp học
// + Lịch học
// + Tài liệu
// + Bài tập
// 📈 Thống kê học tập
// ⭐ Đánh giá của tôi
// ──────────────────────────
// ⚙️ Cài đặt

// chi tiết lớp học là 