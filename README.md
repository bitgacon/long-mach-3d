# Long Mạch 3D · Vọng Nguyệt — v0.6

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
- 5 khu vực: Vân Sơn, Trúc Hải, Băng Hồ, Hỏa Sơn, Thiên Cung; tổng 28 nhiệm vụ, 6 boss, minimap và cổng chuyển vùng.
- Nhân vật 3D xoay được trong cửa sổ Trang bị; 11 ô đồ có hình minh họa, mặc/tháo đổi ngoại hình trong menu và ngoài map.
- 5 phẩm chất: Trắng, Xanh lá, Xanh lam, Đỏ, Vàng. 9 loại nguyên liệu, mỗi loại có kho khóa/giao dịch riêng.
- Ghép nguyên liệu 10:1; trang bị ghép 2:1 tới bậc IV, cường hóa +8, tiêu hao để thăng màu. Ghép/chế thành công 100%, đầu ra giao dịch 20%.
- Công thức theo nhóm giáp/vũ khí/phụ kiện/cánh; xem nguyên liệu thiếu, bảo vệ đồ, ưu tiên tiêu hao hàng khóa hoặc giao dịch.
- 9 nhánh nâng cấp: binh khí, chiến giáp, pháp khí; thể phách, chân khí, tâm pháp; ba kỹ năng riêng mỗi lớp cấp 1–10.
- Auto farm chọn loại quái, đào Thanh Thạch, hái linh thảo, hấp thu linh khí; auto nhiệm vụ tìm đường, tự vệ và hồi phục.
- Auto nhiệm vụ dừng ở hội thoại nhận thưởng và yêu cầu nâng cấp. Người chơi tự quyết định chi tiêu.
- 20 loài pet, tối đa 10 cá thể triển khai, mở ô theo cấp/nhiệm vụ; thú cưỡi mở sau nhiệm vụ 6.
- Chế thuốc, hành trang, truy nã, bốn thành tựu, bản đồ và nhật ký.
- Quái và tài nguyên hồi sinh. Boss chỉ hạ một lần mỗi lượt chơi.

## Điều khiển
| Phím | Chức năng |
|---|---|
| WASD / mũi tên | Di chuyển, dừng auto |
| 1 / Space | Đánh thường |
| 2 / Q, 3, 4 | Ba kỹ năng riêng theo lớp (xem L) |
| Shift | Lướt tránh đòn |
| E / Tab | Tương tác / đổi mục tiêu |
| F / G / T | Auto farm / đào khoáng / nhiệm vụ |
| Esc | Dừng auto hoặc đóng bảng |
| R / V | Dùng thuốc / thú cưỡi |
| C / K / L / P | Trang bị / nội công / kỹ năng / linh thú |
| B / J / M / O | Túi đồ / nhật ký / bản đồ / cài đặt |
| I / N | Lò rèn / thế giới và chuyển map |
| H / Z / X | Đi về làng / xoay camera |
| ? | Bảng phím tắt |

Chuột: chạm đất để đi, kéo để xoay/nghiêng, cuộn để thu phóng. Điện thoại có cụm di chuyển và các nút thao tác. Thu gọn nhiệm vụ bằng tiêu đề CHÍNH TUYẾN để nhìn rộng hơn.

## Bản lưu
Lưu tự động trong trình duyệt; xuất/nhập JSON tại Túi đồ → Xuất / nhập lưu. Bản lưu 2D/v2 hợp lệ tự chuyển sang v3 và giữ nguyên khóa dữ liệu cũ. Bản local và website có kho lưu riêng: xuất/nhập để chuyển nhân vật. Reset/nhập có bước xác nhận và sao lưu bản hiện tại. Chuyển tab tạm dừng; auto không chạy khi đóng hoặc ẩn game.

## Phạm vi
Đây là prototype 3D phong cách low-poly, chưa phải đồ họa điện ảnh. Chơi đơn, chưa có tài khoản máy chủ, đồng bộ đám mây, bang hội, PvP, giao dịch, MMO hoặc blockchain. Các hệ thống đó cần máy chủ và thiết kế kinh tế riêng ở giai đoạn tiếp theo.

## Kiểm tra
Chạy các script test-3d, test-progression, test-equipment, test-companions, test-v06, test-avatar và test-campaign bằng Node.js. Bản v0.6 qua 52 kiểm thử/nhóm logic, ba lớp mô hình, chiến dịch và kiểm tra UI PC/mobile viewport. Chưa thử điện thoại vật lý. Xem [QA v0.6](docs/QA-v0.6.md).

Thư viện Three.js 0.180.0 đóng gói trong dist/vendor; giấy phép MIT kèm LICENSE.

## Đối chiếu MIR4 và quy tắc riêng

Đã đọc trang giới thiệu, bách khoa và các bài Character/Craft/Forge/Spirit cùng Mirkit. Xem [phân tích nguồn và phạm vi](docs/MIR4-DOI-CHIEU.md).

Cường hóa hiện chắc chắn lên +8, khác vùng rủi ro của MIR4. Nhãn giao dịch hiện lưu trên vật phẩm; chưa có chợ nhiều người. Ghép bậc chỉ dùng đồ +0 chưa mặc/chưa bảo vệ. Đồng và bình thuốc không chia phẩm chất.


## Bản 0.4 — Nhân vật và lò rèn

- Lực chiến và bảng nguồn chỉ số; túi đồ có lọc, sắp xếp, phân trang, so sánh và mặc tốt nhất có xem trước.
- Thử đồ trên mô hình 3D không thay món đang mặc. B mở Túi đồ, C mở Nhân vật, I mở Lò rèn.
- Bốn thẻ Chế tạo / Cường hóa / Ghép bậc / Thăng phẩm; chế tối đa 20 món mỗi lượt, nguồn thu thập theo màu.
- Cường hóa chọn mức đích tới +8, báo tổng chi phí; thiếu tài nguyên thì không trừ một phần. Bảo vệ chặn cường hóa và tiêu hao.
- Phôi IV +8 được tiêu hao để thay nguyên liệu chính của nhóm ở màu kế tiếp; vẫn cần các nguyên liệu phụ và đồng. Kết quả I +0.
- Phân giải có xác nhận: hoàn 50% nguyên liệu công thức gốc nhân số phôi I, làm tròn xuống; toàn bộ nhận lại bị khóa, không hoàn đồng/đá.
- Kiểm thử bổ sung: `node test-equipment.mjs` (5 nhóm). Xem [đối chiếu nguồn](docs/MIR4-AUDIT-v0.4.md) và [QA v0.4](docs/QA-v0.4.md).


## Lịch sử bản 0.5 — Pet, thú cưỡi, võ học

P: tám pet có xem 3D, kỹ năng riêng, hành vi Chủ động/Bảo vệ/Đi theo và bảo vật 3 cấp. U: bốn thú cưỡi mở theo vùng, huấn luyện tối đa 5, tốc độ và HP theo thú được chọn; V để cưỡi. L: nâng ba skill, xem MP/hồi chiêu/hiệu quả, chọn chuyên hóa từ bậc 2 và bật/tắt từng skill khi auto. Mô hình xem trước dùng cùng hình học trong bản đồ.

Quy tắc, nguồn MIR4, chi phí và bằng chứng kiểm thử: [COMPANIONS-v0.5.md](docs/COMPANIONS-v0.5.md). Chạy thêm `node test-companions.mjs` (7 nhóm). Bản lưu cũ tự bổ sung dữ liệu mới, không reset.


## Bản 0.6 — Đội hình pet, kỹ năng theo lớp và mỏ có trữ lượng

- 20 loài pet (4/màu), túi theo cá thể; đeo tối đa 10 khác loài. Ảnh pet dựng từ model thật, xem xoay 3D; pet đang đeo cùng xuất hiện ngoài map.
- Ghép 4 pet: 20% lên một màu, 80% trả một cùng màu; tiêu hao cả 4. Chọn từng cá thể và xem trước trước khi ghép. Pet đang đeo/bảo vệ không dùng làm nguyên liệu.
- Mỗi lớp có 3 kỹ năng riêng cấp 1–10, khác vùng trúng, MP, hồi chiêu và hiệu quả.
- 24 mỏ/map chia ba khu; trữ lượng 50–75 / 75–150 / 150–250 / 250–400 / 400–700. Rơi màu đỏ/vàng và 20% giao dịch theo luật đã chốt.
- Thu thập gốc 10 giây; thời gian = 10/(1+tốc độ pet/100). P hiển thị tốc độ của từng hoạt động.
- Chế đồ: 300 nguyên liệu chính + 100 mỗi phụ, cùng màu. B/I chọn món thật để cường hóa/ghép trực tiếp, xem riêng vật phẩm 3D.
- Bản lưu cũ tự chuyển, không reset. Cánh có lông cong; nhân vật/pet và khu tài nguyên thêm chi tiết.

[Phân tích nguồn MIR4 và toàn bộ luật v0.6](docs/MIR4-v0.6.md) · [Bằng chứng kiểm thử và thời gian kiếm tài nguyên](docs/QA-v0.6.md).
