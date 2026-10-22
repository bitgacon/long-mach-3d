# Kiểm tra Long Mạch 0.3

Ngày 22/10/2026. Bản web chơi đơn, không có máy chủ multiplayer.

## Đã chạy

- `node test-3d.mjs`: 21/21, gồm lưu/nhập, nhiệm vụ, chiến đấu, tu luyện, auto, hồi sinh, pet, đường đi.
- `node test-campaign.mjs`: cả Kiếm khách, Linh sư và Thương vệ hoàn thành 12 nhiệm vụ gốc, không cấp tài nguyên thử. Thời gian mô phỏng 274/253/277 giây, không hồi sinh.
- `node test-progression.mjs`: 9 nhóm kiểm tra: chuyển bản lưu v2; ngưỡng ngẫu nhiên .2; quy đổi 10:1 và ưu tiên khóa/giao dịch; 55 tổ hợp ô đồ/màu; chuỗi 8 món → IV → +8 → màu tiếp; chặn phôi đang mặc/bảo vệ; bản lưu sai; nguyên liệu còn thiếu; cổng và mở map; tài nguyên đúng màu; 8 pet.
- Cùng tệp kiểm tra trên mô phỏng tiếp 16 nhiệm vụ mới, từ trạng thái nhân vật cấp 6 sau Vân Sơn. Không cấp thêm tài nguyên trong hành trình. Chế vũ khí bằng tài nguyên tự thu ở mỗi vùng; cả 4 vùng hoàn thành, tổng 766 giây mô phỏng và không hồi sinh. Đây là kiểm tra chức năng, chưa phải cân bằng dài hạn.
- `node test-avatar.mjs`: 3 lớp nhân vật × 11 ô trang bị; kiểm tra thay đổi hình học, tọa độ hữu hạn, tái dùng mô hình khi không đổi đồ, tháo cánh và giải phóng tài nguyên.

## Kiểm tra trình duyệt

- Trang tạo nhân vật và HUD v0.3 tải được.
- Dữ liệu QA riêng ở localhost:8790, không thay lưu của localhost:8789 hoặc GitHub Pages.
- Nạp nhân vật Băng Hồ, mở Trang bị thấy người 3D và 11 ô đồ.
- Tháo mũ làm ô thành trống; chế mũ Xanh lam trừ 6 Linh bì, 3 Thanh Thạch, 2 Linh thảo cùng màu và 120 đồng; mặc lại hiện mũ Xanh lam.
- Chuyển Băng Hồ → Hỏa Sơn bằng cổng: đổi tên vùng, cảnh, danh sách quái, minimap, giữ đồ và tiến trình.
- Cửa sổ lò rèn có vật liệu đang có/cần, trạng thái khóa/giao dịch, xem chỉ số +1 và điều kiện thăng phẩm.
- Viewport 390×844: minimap, phím cảm ứng, auto, lọc mỏ và màn hình nhân vật hiển thị. Đã trả viewport về mặc định.
- Không có lỗi console trong các lượt kiểm tra nêu trên.

## Giới hạn kiểm tra

Chưa thử điện thoại vật lý, chưa đo GPU/bộ nhớ trong phiên kéo dài, chưa thử mọi tổ hợp pet/đồ trong giao diện. Chưa có multiplayer, giao dịch giữa người chơi hoặc bảo vệ kinh tế bằng máy chủ. Hình đồ/mô hình là đồ họa low-poly/vector tự dựng.
