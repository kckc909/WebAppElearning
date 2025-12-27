Tôi muốn bạn chia nhỏ các file code đó thành các đoạn ngắn hơn được lưu trong các file cùng cấp.

2 trường hợp : 
1. tên file là index.tsx
2. tên file không phải index.tsx

với trường hợp 1: bạn tạo các file cùng cấp với file index, đặt tên hợp lý, đưa code vào đó.

trường hợp 2: bạn tạo 1 folder đặt tên hợp lý, đưa file gốc vào folder, đổi tên thành index.tsx và xử lý tiếp như trường hợp 1.

Ví dụ : Superadmin/UserManagement/ có index, trong index gọi AccountModal để sử dụng chứ không tạo trong index. 

* Lưu ý: nếu có nhiều phần code mà có chung tác dụng => bạn có thể cho vào components tổng ở root.