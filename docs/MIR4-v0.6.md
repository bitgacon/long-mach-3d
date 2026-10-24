# Long Mạch v0.6 — Đối chiếu MIR4 và quy tắc triển khai

Ngày kiểm tra: 24/10/2026. Tài liệu này mô tả bản chơi đơn Long Mạch; không khẳng định sao chép toàn bộ MIR4.

## Nguồn đã đối chiếu

- [Bách khoa MIR4](https://forum.mir4global.com/board/dictionary): danh mục hệ thống, dùng để xác định phạm vi đối chiếu.
- [Spirit — bài 36](https://forum.mir4global.com/post/36): triển khai tối đa 10 Spirit, mở ô theo tiến trình; từng Spirit có kỹ năng/chỉ số và bảo vật. Long Mạch giữ ý tưởng đội hình, nhưng dùng mốc cấp/nhiệm vụ riêng bên dưới. “10 đội hình” và “10 Spirit triển khai” là hai khái niệm riêng.
- [Craft — bài 35](https://forum.mir4global.com/post/35): cơ chế kết hợp bốn đầu vào cùng loại/phẩm chất, có thể nhận kết quả cùng hoặc cao hơn một phẩm chất; một số hệ thống có bảo hiểm Incense Burner. Long Mạch dùng xác suất 20% theo yêu cầu người dùng, không lấy 20% làm tỷ lệ chính thức của MIR4 và chưa có bảo hiểm.
- [Skill — bài 33](https://forum.mir4global.com/post/33): học/nâng kỹ năng, linh lực, hồi chiêu, bố trí kỹ năng và thức tỉnh. Long Mạch triển khai ba lớp hiện có, ba kỹ năng/lớp, cấp 1–10 theo yêu cầu; chưa triển khai Awakening.
- [Forge — bài 34](https://forum.mir4global.com/post/34) và [Mirkit Craft](https://mirkit.mir4collection.com/craft): đối chiếu tiếp từ [phân tích v0.4](MIR4-AUDIT-v0.4.md), gồm nhóm vật liệu, cường hóa và dùng phôi. Công thức và xác suất dưới đây là luật Long Mạch, không phải dữ liệu công thức MIR4 chính thức.

## Thay đổi hình ảnh và thao tác

Năm bản đồ giữ cốt truyện và 28 nhiệm vụ hiện có. Mỗi map có 3 khu tài nguyên, mỗi khu 8 điểm (24 điểm/map, 120 điểm tổng). Quái thường tập trung thành hai bãi; boss giữ vị trí riêng. Bản đồ lớn vẽ khu khai thác; minimap theo dõi các cụm mỏ/quái. Cây/đá lớn được tránh khỏi tâm khu tài nguyên để dễ nhìn và thao tác.

Thêm nền khu khai thác, đá viền, hoa, tinh thể và cỏ; làm mượt mặt nhân vật, thân/chân/mõm pet; cánh có từng lông cong và chuyển động. Mười pet được triển khai cùng hiện quanh nhân vật. Ảnh trong đội hình/túi pet được dựng một lần từ mô hình thật rồi tái sử dụng; xem pet lớn có xoay 3D.

Túi trang bị là danh sách cá thể có mã riêng, màu, bậc, cường hóa và trạng thái. Chọn đồ → Cường hóa/Ghép bậc; chọn món thứ hai ngay trong túi. Bước xem trước ghi chính xác hai mã sẽ tiêu hao. “Xem vật phẩm 3D” dựng riêng đúng hình học của món đó, còn “Thử ngoại hình” xem trên nhân vật. Có 11 loại trang bị, gồm cánh.

Đồ họa vẫn là mô hình hình học cách điệu. Hai mươi loài pet dùng tám bộ hình dáng nền với màu/chỉ số khác nhau, chưa phải 20 model nghệ thuật độc lập.

## Kỹ năng theo lớp

| Lớp | Ô 2 / Q | Ô 3 | Ô 4 |
|---|---|---|---|
| Kiếm khách | Kiếm khí liên hoàn — quạt trước mặt | Thiên kiếm chấn — diện rộng | Kiếm tâm hộ thể — hồi phục/hộ thân |
| Linh sư | Hỏa cầu liên tinh — đơn mục tiêu tầm xa | Băng liên trận — diện rộng/khống chế | Linh tuyền hồi phục |
| Thương vệ | Xuyên tâm thương — đường thẳng | Bão thương — diện rộng | Chiến ý — hồi phục/hộ thân |

Tất cả bắt đầu cấp 1, nâng tối đa 10. Hình vùng trúng, MP, sát thương, hồi phục, choáng và hồi chiêu áp dụng thật trong engine. L mở bảng chi tiết; từ cấp 2 có chuyên hóa Cân bằng/Uy lực/Lưu chuyển. Có thể bật/tắt từng skill cho auto; thao tác tay vẫn dùng được.

## Pet theo cá thể

20 loài, 4 loài mỗi màu. Mỗi cá thể có ID, loài, cấp nuôi dưỡng 1–5, bảo vật 0–3 và cờ bảo vệ. Chỉ pet đang đeo cộng chỉ số, tốc độ khai thác và tham gia chiến đấu. Mỗi loài đeo tối đa một cá thể.

Mở ô theo cấp nhân vật **hoặc** nhiệm vụ chính tương ứng:

| Ô | Cấp | Điều kiện chính tuyến thay thế |
|---|---:|---|
| 1 | 1 | Có sẵn |
| 2–6 | 3 / 5 / 8 / 12 / 16 | Vân Sơn nhiệm vụ 2 / 4 / 6 / 8 / 12 |
| 7–10 | 22 / 28 / 36 / 45 | Hoàn thành Trúc Hải / Băng Hồ / Hỏa Sơn / Thiên Cung |

Ghép: chọn đúng 4 cá thể cùng màu, chưa đeo và chưa bảo vệ. **20% nhận một pet màu kế, 80% nhận một pet cùng màu**; cả hai nhánh đều tiêu hao bốn cá thể. Loài kết quả ngẫu nhiên trong màu, cấp nuôi dưỡng 1, bảo vật 0. Chưa ghép tiếp từ Vàng. Luật thất bại trả một pet cùng màu được chọn theo cơ chế tham khảo, vì yêu cầu chỉ chốt tỷ lệ lên màu. Không có cam kết đủ 5 lần sẽ thành công.

Có hành vi Chủ động/Bảo vệ/Đi theo; Đi theo giữ chỉ số và tăng tốc nhưng tắt hành động chiến đấu/hồi phục của pet. Pet không có giao dịch trong bản này.

## Mỏ và sản lượng

Trữ lượng được hiểu là **số lượt khai thác mỗi mỏ**, không phải số mỏ trên map.

| Màu mỏ | Trữ lượng ngẫu nhiên, gồm cả hai đầu | Màu sản phẩm |
|---|---:|---|
| Trắng | 50–75 | 100% Trắng |
| Xanh lá | 75–150 | 100% Xanh lá |
| Xanh lam | 150–250 | 100% Xanh lam |
| Đỏ | 250–400 | 20% Đỏ; 80% Xanh lam |
| Vàng | 400–700 | 20% Vàng; 30% Đỏ; 50% Xanh lam |

Mỗi lượt cho một đơn vị mỗi loại trong nhóm: khoáng = Thanh Thạch + Huyền thiết; hái thuốc = Linh thảo + Linh bì; hấp thu = Linh khí + Ngọc tinh + Thiên vũ. Màu và nhãn giao dịch gieo độc lập; 20% giao dịch cho cả bó sản phẩm của một lượt. Linh phách từ săn quái và đá cường hóa từ luyện đá vẫn theo nguồn riêng.

Mỏ giữ trữ lượng khi chuyển map/tải lại. Chỉ khi cạn mới đếm 60 giây trong game để hồi và gieo lại trữ lượng; không hồi bằng thời gian tắt game. Mỏ hiển thị còn lại/tổng ngay trên map.

Thời gian mỗi lượt = **10 / (1 + tổng tốc độ / 100)** giây. Bonus từ các pet đang đeo cộng với nhau. Bonus từng pet = bonus loài × [1 + 0,1 × (cấp nuôi dưỡng − 1) + 0,1 × cấp bảo vật]. 100% = 5s; 150% = 4s; 233,3% ≈ 3s. Giao diện P hiển thị riêng đào/hái/hấp thu.

## Chế tạo

Mọi màu dùng 300 nguyên liệu chính và 100 mỗi nguyên liệu phụ **cùng màu**:

| Nhóm | Chính | Phụ |
|---|---|---|
| Giáp: mũ/áo/quần/găng/giày | 300 Linh bì | 100 Thanh Thạch + 100 Linh thảo |
| Vũ khí chính/phụ | 300 Huyền thiết | 100 Thanh Thạch + 100 Linh khí |
| Vòng cổ/vòng tay/nhẫn | 300 Ngọc tinh | 100 Linh khí + 100 Linh thảo |
| Cánh | 300 Thiên vũ | 100 Ngọc tinh + 100 Linh khí |

Chế thành công 100%, giao dịch 20%. Ghép nguyên liệu 10:1 và ghép trang bị 2:1 giữ luật đã chốt. Phôi IV +8 tiêu hao để thay nguyên liệu chính khi thăng màu; vẫn cần 100 mỗi nguyên liệu phụ màu kế và đồng, kết quả I +0. Cường hóa an toàn đến +8, giữ nhãn giao dịch.

## Bản lưu và phạm vi

Giữ khóa long-mach-v3, bổ sung rulesRevision 6; di chuyển pet cũ sang cá thể, giữ cấp nuôi dưỡng/bảo vật và lựa chọn đang đeo, skill cũ cấp 0 chuyển thành 1. Không reset nhân vật. Mỏ cũ chưa có trữ lượng được khởi tạo lần đầu.

Chơi đơn, mỗi trình duyệt giữ tiến trình riêng. Nhãn giao dịch chưa có chợ máy chủ. Không có offline auto, MMO, tài khoản hay đồng bộ nhiều thiết bị.
