# Kiểm tra v0.2 — 2026-10-22
- 21 kiểm thử logic PASS (test-3d.mjs).
- Hành trình tự động đủ 12 nhiệm vụ: Kiếm khách 274s, Linh sư 253s, Thương vệ 277s thời gian mô phỏng; không cấp tài nguyên giả, không tử vong trong ba lượt xác định này. Đây không phải thời lượng chơi thực tế của người mới.
- Kiểm tra trình duyệt: WebGL 3D hiển thị; phím G bật đào khoáng; auto tự vệ hạ sói; phím K mở đúng nội công; chuyển bảng Võ học; lưu được tải lại. Không có lỗi console trên tab kiểm tra cuối.
- Kiểm tra bố cục ở khung trình duyệt hẹp 614x719. Chưa xác nhận điện thoại vật lý hoặc nhiều GPU. FPS đo được 12–18 ở cấu hình cao trong trình duyệt kiểm tra; có tùy chọn Thấp.
- Sửa lỗi parent.add khi dựng cây; quái hồi sinh giữ bộ đếm âm khiến auto bỏ qua; auto hồi máu trước xử lý tử vong; thêm tự vệ lúc thu thập. Nhà che camera được làm mờ.
- Phạm vi: prototype 3D chơi đơn lưu cục bộ; online/bang hội/PvP chưa triển khai.
