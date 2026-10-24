# QA Long Mạch v0.6

Ngày: 24/10/2026. Kiểm tra local trước phát hành; trạng thái triển khai GitHub được xác minh riêng sau push.

## Logic và mô hình

- test-3d.mjs: 21 kiểm thử.
- test-progression.mjs: 9 nhóm kinh tế/khu vực; mô phỏng thêm 16 nhiệm vụ khu vực.
- test-equipment.mjs: 5 nhóm.
- test-companions.mjs: 7 nhóm.
- test-v06.mjs: 10 nhóm mới (migration v2/v0.5 và lưu lại, 20 loài, 10 ô, ghép bốn cá thể, chống tiêu hao sai, phân bố màu/trữ lượng, tốc độ, lưu mỏ, 300/100/100, skill 1–10, 11 mô hình đồ).
- test-avatar.mjs: ba lớp nhân vật.
- test-campaign.mjs: cả ba lớp hoàn thành 12 nhiệm vụ Vân Sơn, 0 lần chết; thời gian mô phỏng 365/359/350 giây.

Tổng 52 kiểm thử/nhóm logic, cộng ba lớp mô hình và các chiến dịch. Tỷ lệ được kiểm tra tại biên .2/.5 và quét đều 10.000 giá trị; đây là kiểm tra thuật toán, không phải cam kết tỷ lệ trong mẫu chơi ngắn.

## Giao diện trình duyệt

Dùng dữ liệu QA trên cổng riêng 8793, không thay save ở cổng cũ hoặc website công khai. PC 1440×900 và viewport điện thoại 390×844.

- Nạp bản lưu, hiện nhân vật có cánh và 10 pet cùng lúc.
- Pet: 10/10 ô; +155% đào = 3,92s, +120% hái = 4,55s, +165% hấp thu = 3,77s.
- Bốn pet-11..14 được chọn trong túi; xác nhận ghi đúng bốn ID; ghép còn 11 pet từ 14, đội hình 10 giữ nguyên. Lượt UI này trả Ngân lang Xanh lá; nhánh lên màu có test thuần riêng.
- Ảnh 10 pet triển khai tải đúng từ model 3D; xem riêng/ xoay Kim long.
- Linh sư Hỏa cầu 10/10 có nút nâng bị vô hiệu; Băng liên trận và Linh tuyền 1/10 hiện đúng MP/hồi chiêu.
- Chọn gear-12 và gear-13 trực tiếp trong túi lò rèn; xác nhận đúng ID; nhận gear-16 nhẫn Xanh lam bậc II +0. Xem riêng mô hình cánh IV +8.
- Auto đào trên cụm mỏ đỏ hoạt động, có thanh tiến trình và trữ lượng giảm; tải lại giữ tiến trình. Bản đồ lớn mở được.
- Pet và skill trên mobile: body rộng 390px, modal/nội dung 339px, không tràn ngang.
- Không thấy lỗi console trong luồng thử.

## Cân bằng và giới hạn

Mô phỏng khu vực dùng chiến đấu/thu thập thật, nhân vật đủ mạnh, ít bonus pet và RNG cố định để tái lập. Mốc thời gian cộng dồn hoàn thành: Trúc Hải 3.908s, Băng Hồ 7.818s, Hỏa Sơn 26.351s, Thiên Cung 45.458s, không chết. Riêng 16 nhiệm vụ vùng sau khoảng **12,6 giờ game** theo fixture này, không phải dự báo cho mọi người chơi. Chi phí 300 chính và rơi màu cao 20% khiến đồ đỏ/vàng cần nhiều lượt; bộ pet tăng tốc sẽ giảm thời gian.

Màn hình game với 10 pet từng ghi nhận khoảng 19 FPS ở viewport PC; một quan sát sau ở kích thước cửa sổ mặc định hiển thị 60 FPS. Đây chưa phải benchmark thiết bị; không cam kết FPS ổn định. Chưa kiểm thử điện thoại vật lý. Đồ họa hình học cách điệu; 20 loài dùng tám hình dáng nền, khác màu/chỉ số. Chưa có online chung bản đồ/chợ máy chủ.

Chạy lại bằng Node.js: node test-3d.mjs; node test-progression.mjs; node test-equipment.mjs; node test-companions.mjs; node test-v06.mjs; node test-avatar.mjs; node test-campaign.mjs.
