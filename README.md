# Long Mạch 3D · Vọng Nguyệt — v0.2

Game nhập vai 3D chơi đơn trên trình duyệt PC/điện thoại. Mỗi người chơi có tiến trình riêng trong trình duyệt. Đây là bản chơi đơn, chưa có chơi chung bản đồ.

Lấy cảm hứng từ vòng lặp nhiệm vụ, chiến đấu, khai thác và tu luyện của MIR4; nhân vật, lời thoại và thế giới Long Mạch được viết riêng.

## Chơi
- Chơi trực tiếp: https://bitgacon.github.io/long-mach-3d/
- Mã nguồn và gửi lỗi: https://github.com/bitgacon/long-mach-3d
- Windows: giải nén, chạy CHOI-GAME.cmd. Cần Node.js hoặc Python 3 có trong PATH. Giữ cửa sổ máy chủ mở khi chơi.
- Không mở trực tiếp dist/index.html: mô-đun 3D cần HTTP.
- Trình duyệt cần WebGL2. Nếu máy yếu, vào Cài đặt chọn đồ họa Thấp. Không cần tải thư viện qua mạng khi chơi bản local.

## Nội dung
- Bản đồ 3D, camera xoay/nghiêng/thu phóng; ba lớp Kiếm khách, Linh sư, Thương vệ.
- Hai chương, 12 nhiệm vụ, hai boss, ba trụ phong ấn.
- 9 nhánh nâng cấp: binh khí, chiến giáp, pháp khí; thể phách, chân khí, tâm pháp; Long trảm, Địa chấn, Hồi nguyên.
- Auto farm chọn loại quái, đào Thanh Thạch, hái linh thảo, hấp thu linh khí; auto nhiệm vụ tìm đường, tự vệ và hồi phục.
- Auto nhiệm vụ dừng ở hội thoại nhận thưởng và yêu cầu nâng cấp. Người chơi tự quyết định chi tiêu.
- Ba linh thú với chỉ số và hình dáng riêng; thú cưỡi mở sau nhiệm vụ 6.
- Chế thuốc, hành trang, truy nã, bốn thành tựu, bản đồ và nhật ký.
- Quái và tài nguyên hồi sinh. Boss chỉ hạ một lần mỗi lượt chơi.

## Điều khiển
| Phím | Chức năng |
|---|---|
| WASD / mũi tên | Di chuyển, dừng auto |
| 1 / Space | Đánh thường |
| 2 / Q, 3, 4 | Long trảm, Địa chấn, Hồi nguyên |
| Shift | Lướt tránh đòn |
| E / Tab | Tương tác / đổi mục tiêu |
| F / G / T | Auto farm / đào khoáng / nhiệm vụ |
| Esc | Dừng auto hoặc đóng bảng |
| R / V | Dùng thuốc / thú cưỡi |
| C / K / L / P | Trang bị / nội công / kỹ năng / linh thú |
| B / J / M / O | Hành trang / nhật ký / bản đồ / cài đặt |
| H / Z / X | Đi về làng / xoay camera |
| ? | Bảng phím tắt |

Chuột: chạm đất để đi, kéo để xoay/nghiêng, cuộn để thu phóng. Điện thoại có cụm di chuyển và các nút thao tác. Thu gọn nhiệm vụ bằng tiêu đề CHÍNH TUYẾN để nhìn rộng hơn.

## Bản lưu
Lưu tự động trong trình duyệt; xuất/nhập JSON tại Hành trang. Bản lưu 2D hợp lệ tự chuyển sang v2 và giữ nguyên khóa dữ liệu cũ. Bản local và website có kho lưu riêng: xuất/nhập để chuyển nhân vật. Reset/nhập có bước xác nhận và sao lưu bản hiện tại. Chuyển tab tạm dừng; auto không chạy khi đóng hoặc ẩn game.

## Phạm vi
Đây là prototype 3D phong cách low-poly, chưa phải đồ họa điện ảnh. Chơi đơn, chưa có tài khoản máy chủ, đồng bộ đám mây, bang hội, PvP, giao dịch, MMO hoặc blockchain. Các hệ thống đó cần máy chủ và thiết kế kinh tế riêng ở giai đoạn tiếp theo.

## Kiểm tra
Chạy `node test-3d.mjs` và `node test-campaign.mjs`.
21 kiểm thử logic và ba hành trình trọn 12 nhiệm vụ với cả ba lớp; không cộng tài nguyên giả trong kiểm thử hành trình. Kiểm tra giao diện/cảnh 3D trên trình duyệt máy tính. Chưa kiểm thử trên điện thoại vật lý.

Thư viện Three.js 0.180.0 đóng gói trong dist/vendor; giấy phép MIT kèm LICENSE.
