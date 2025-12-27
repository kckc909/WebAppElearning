Luồng theo vòng đời của 1 course:

### Cấu trúc bài học 

Courses > Sections > Lessons > Contents

1 Giảng viên tạo ra courses, 1 courses có thể có nhiều sections. trong section có nhiều lessons. trong mỗi lesson lại có nhiều content block. content block thì lại chia thành nhiều loại, mỗi loại có đặc điểm riêng khác nhau nhưng vẫn có một số thao tác chung. mỗi phần tử ở trên đều có các property khác nhau, riêng biệt. 

### Luồng theo vòng đời của Course 

Các khả năng của giảng viên với course: 
giảng viên là người tạo ra course, có toàn quyền cấu hình thành phần cho course và nội dung course
giảng viên khi tạo course có thể chọn upload ảnh thumbnail cho khóa học, tên, mô tả, danh mục, trình độ. sau đó giảng viên nhấn vào tạo khóa học, khi này hệ thống tạo khóa học trong db, lưu ảnh vào server storage, ... sau đó giảng viên có thể cấu hình các nội dung khác chi tiết hơn của khóa học : Bạn sẽ học được gì, mô tả khóa học, yêu cầu khi học,... hoặc cấu hình nội dung khóa học (chính là curriculum). giảng viên có thể chọn vào mục lục trên menusidebar, chuyển sang tabs hiển thị mục lục hiện tại của khóa học, ở đây giảng viên có thể chọn thêm sections/lessons hoặc chọn vào 1 lesson để chỉnh sửa nội dung khóa học => chuyển sang trang lessonbuilder để chỉnh sửa nội dung khóa học hiển thị cho học viên.
nội dung học sẽ được thể hiện bằng curriculum, gồm: sections, lesson
giảng viên có thể kéo thả các nội dung, upload các file, ảnh, video (video thì có thể up từ máy hoặc lấy link của các nền tảng khác )
giảng viên đang sửa có thể thoát ra, khi này course được lưu trong draft. giảng viên có thể truy cập và tiếp tục chỉnh sửa.
Khi giảng viên hoàn thành chỉnh sửa, giảng viên chọn "Submit" hoặc "Gửi duyệt" trong tiếng việt, tại course detail hoặc lesson builder để cho admin duyệt, khi này course có trạng thái pending đợi duyêt.
giảng viên có thể thiết lập học thử cho course, course có thể có học thử hoặc không cho học thử. Nếu không cho học thử thì course nút học thử sẽ được thay thế bằng dòng "thêm vào giỏ". 
Nếu khóa học bật học thử thì giảng viên có thể chọn những lesson nào có thể học thử.

admin khi truy cập vào hệ thống sẽ thấy được course có trạng thái pending đợi duyệt, admin có thể duyệt hoặc từ chối duyệt course, khi admin duyệt course thì course có trạng thái published được hiển thị trên app
admin có thể từ chối duyệt course, khi admin từ chối duyệt course thì course có trạng thái draft được lưu lại trong hệ thống, admin sẽ phải nhập lý do giải thích trước khi từ chối. sau khi từ chối, course sẽ chuyển về trạng thái rejected, khi nào giảng viên chọn chỉnh sửa course và lưu lại thì course sẽ chuyển về trạng thái draft. khi này thì giảng viên lại có thể submit tiếp. 

student - học viên truy cập vào hệ thống sẽ xem được các course có trạng thái published, đã được xuất bản. học viên có thể chọn học thử để xem trước 1 chút chương trình học(xem được những bài nào là do giảng viên quyết định). người dùng chưa đăng nhập cũng có thể học thử. 
học viên có thể đăng ký để học hết khóa học. khi nhấn đăng ký khóa học thì mở dialog cho người dùng chọn, nếu thêm vào giỏ thì hệ thống thêm vào giỏ hàng của người dùng và hiển thị thông báo thêm vào giỏ thành công. nếu chọn vào mua ngay thì sẽ ngay lập tức thêm khóa học vào giỏ và chuyển sang trang giỏ hàng. 
Nếu người dùng chưa đăng nhập thì chuyển người dùng sang trang đăng nhập và yêu cầu người dùng đăng nhập, sau khi người dùng đăng nhập thì chuyển luôn sang trang thanh toán để tiếp tục luồng của người dùng đã đăng nhập.
bên trang giỏ hàng người dùng có thể chọn những khóa học trong giỏ để thanh toán. hệ thống sẽ tự động nhập thông tin người dùng, thông tin nào người dùng chưa cập nhật thì bỏ trắng (người dùng tự điền). sau đó tích chọn vào đồng ý điều khoản thanh toán, sau đó người dùng chọn phương thức thanh toán, sau đó chọn thanh toán thì hệ thống hiển thị lên mã qr để người dùng thanh toán, mã QR được tạo từ tài khoản liên kết của giảng viên. tình hình hiện tại không cho phép liên kết với ngân hàng
Sau khi học viên thanh toán: khi học viên quét QR và hoàn tất thanh toán, hệ thống ghi nhận giao dịch ở trạng thái thành công. Ngay sau đó, khóa học được gắn vào tài khoản học viên và xuất hiện trong khu vực “Khóa học của tôi”.
Học viên không cần thao tác thêm, có thể bắt đầu học ngay lập tức.
Nếu thanh toán không thành công hoặc người dùng đóng màn hình thanh toán, khóa học vẫn nằm trong giỏ hàng, chưa được mở quyền học.

Sau khi học viên thanh toán, trang chi tiết của khóa học đó sẽ có sự thay đổi, có thêm thanh tiến trình, các nút mua ngay, hay thêm vào giỏ hàng, sẽ ẩn đi, thay thế bằng nút học tiếp. bên dưới curriculum sẽ đánh dấu những bài đã học, với bài tập thì hiển thị kết quả.

khi học viên nhấn vào học tiếp, hệ thống đưa người dùng đến bài tập người dùng đang học, nếu người dùng chưa học bài nào thì hệ thống đưa người dùng đến bài đầu tiên. trong trang chi tiết bài học sẽ hiển thị bài học mà giảng viên đã thiết kế (chính là những khóa học mà giảng viên thiết kế trong lesson builder, hiển thị theo đúng khối và tính năng đã thiết kế)

trong những khóa học đó có thể có bài học dạy code => cần IDE để thực hành code, trong IDE có thể có các tính năng như: 
có thể lưu được nhưng gì học viên code, lần tiếp theo khi học viên truy cập có thể mở lên tiếp tục code.
giảng viên có thể thiết lập input và out để test code của học viên.

Theo dõi tiến độ học tập
Trong quá trình học:
Học viên luôn nhìn thấy % hoàn thành của khóa học
Biết mình đã học xong section nào, lesson nào
Biết còn bao nhiêu nội dung chưa học
Giảng viên có thể:
Xem danh sách học viên đã đăng ký khóa học
Theo dõi tiến độ học của từng học viên
Nhận biết lesson nào có nhiều học viên dừng lại hoặc bỏ dở
Admin có thể:
Xem số lượng học viên đang học
So sánh tiến độ trung bình giữa các khóa học
Đánh giá mức độ “học thật” của course, không chỉ dựa vào số lượng đăng ký

Hoàn thành khóa học
Khi học viên hoàn thành toàn bộ lesson trong course:
Khóa học được đánh dấu là đã hoàn thành
Tiến độ đạt 100%
Hệ thống hiển thị trạng thái hoàn thành cho học viên
Tại thời điểm này:
Học viên có thể xem lại toàn bộ nội dung đã học
Có thể đánh giá khóa học (nếu hệ thống cho phép)
Kết quả hoàn thành được lưu lại trong lịch sử học tập
Giảng viên:
Thấy được số học viên hoàn thành khóa học
Biết tỷ lệ hoàn thành so với tổng số đăng ký
Admin:
Dùng tỷ lệ hoàn thành làm chỉ số đánh giá chất lượng course
So sánh hiệu quả giữa các giảng viên

