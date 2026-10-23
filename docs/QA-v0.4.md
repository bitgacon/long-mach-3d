# QA v0.4 — 23/10/2026

- `node test-3d.mjs`: 21/21.
- `node test-progression.mjs`: 9/9; mô phỏng 4 map mới hoàn thành 16 nhiệm vụ, không chết.
- `node test-campaign.mjs`: cả 3 lớp hoàn thành 12 nhiệm vụ đầu.
- `node test-avatar.mjs`: cả 3 lớp, 11 ô, thay/tháo và thu hồi mô hình.
- `node test-equipment.mjs`: 5/5 nhóm: mặc tốt nhất/hòa điểm/lọc; chế hàng loạt/thiếu tài nguyên; cường hóa tổng phí/bảo vệ; thăng phẩm thay vật liệu chính; phân giải và lưu/đọc lại.

Kiểm tra trình duyệt trên phiên dữ liệu mẫu ở localhost:8791, tách bản lưu người chơi: mở túi, lọc màu, so sánh, thử ngoại hình (vũ khí Xanh lá trên bộ Vàng), quay lại giữ vũ khí Vàng đang mặc. Cường hóa món Xanh lá +0 tới +8 báo 1.440 đồng và 15 đá, xác nhận cho kết quả +8. Chế hai món làm túi tăng 16→18. Kiểm tra bảng nhân vật, PC 1365×900 và viewport 390×844; túi không tràn ngang (modal clientWidth=scrollWidth=339). Không có lỗi JS trong lượt đọc log.

Chưa kiểm thử điện thoại vật lý; đây vẫn là game chơi đơn và đồ họa low-poly. Chưa kiểm chứng giao dịch nhiều người vì chưa có máy chủ.
