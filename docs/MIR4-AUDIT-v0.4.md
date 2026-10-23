# Đối chiếu MIR4 — bản 0.4 (23/10/2026)

Phạm vi ưu tiên do người dùng chọn: nhân vật, túi đồ, chế tạo, cường hóa. Đây là đợt đọc sâu các mục liên quan trong bách khoa, không phải tuyên bố đã triển khai hoặc đọc hết mọi bài. Trang danh mục và một số lần mở trực tiếp bị timeout; Craft/Forge đối chiếu bằng nội dung chính thức được công cụ tìm kiếm lập chỉ mục, Character đọc trực tiếp. Nội dung có thể thay đổi sau ngày kiểm tra.

| Nguồn | Điều rút ra từ tài liệu | Sửa trong Long Mạch |
|---|---|---|
| [Character](https://forum.mir4global.com/post/406) | Trang nhân vật kết hợp trang bị, chỉ số, lực chiến, mặc tự động; có xem ngoại hình và phân giải. MIR4 giới hạn phân giải theo phẩm chất. | Bảng tổng và nguồn chỉ số, so sánh từng món, mặc tốt nhất có xem trước, thử đồ 3D, lọc túi và phân giải có xác nhận. |
| [Craft](https://forum.mir4global.com/post/35) | Công thức hiển thị vật liệu và nguồn kiếm; đồ phẩm trước bậc IV +8 có thể thay vật liệu chính khi chế phẩm cao. Combine, Unseal và Exchange là các thao tác khác nhau. | Tách Chế tạo/Ghép bậc/Thăng phẩm; hiện thiếu hụt và nguồn theo khu vực; phôi IV+8 thay vật liệu chính, tiêu hao cùng phần còn lại. |
| [Forge](https://forum.mir4global.com/post/34) | Đá theo phẩm; tăng cường có vùng an toàn/rủi ro; tự nâng theo đích, khóa vật phẩm và các chế độ nâng khác nhau. Enchant không đồng nghĩa Enhance. | Chọn mức đích +1…+8, tổng phí và chỉ số trước/sau; chặn đồ bảo vệ; xác nhận trước khi trừ. Giữ quy tắc thành công 100% của Long Mạch. |
| [Mirkit Craft](https://mirkit.mir4collection.com/craft) | Công cụ lập kế hoạch nguyên liệu, tồn kho khóa/giao dịch và lượng còn phải kiếm; có quy đổi 10:1. | Giữ bảng tính nguyên liệu, ưu tiên tiêu hao; thêm chế hàng loạt 1/2/4/8/20 món và tổng chi phí. |
| [Codex](https://forum.mir4global.com/post/37) | Codex là hệ thống đăng ký vật phẩm để nhận chỉ số, không chỉ là màn hình đọc hướng dẫn. | Chưa triển khai hiến vật phẩm Codex. Bách khoa Long Mạch hiện chỉ là hướng dẫn, không nhận thưởng chỉ số. |
| [Transference](https://forum.mir4global.com/post/1524) | Có so sánh thuộc tính trước khi áp dụng chuyển thuộc tính. | Dùng nguyên tắc xem trước; chưa thêm chuyển thuộc tính/phù phép. |

## Quy tắc riêng, không coi là bản sao MIR4

- Năm phẩm chất và 11 ô đồ, tên/cốt truyện Long Mạch. MIR4 còn nhiều hệ thống/ô đồ khác; không gọi bộ 11 ô là đầy đủ của MIR4 hiện tại.
- Ghép nguyên liệu 10:1 và đồ 2:1 thành công 100%; mỗi sản phẩm có 20% cơ hội giao dịch theo yêu cầu người dùng. Không nhầm với Combine ngẫu nhiên trong MIR4.
- Cường hóa chắc chắn đến +8, không mất đồ; giữ nhãn giao dịch. Không thêm xác suất phá đồ khi người dùng chưa chọn cơ chế đó.
- Thăng phẩm tiêu hao IV+8, thay vải/thép/ngọc/lông theo nhóm; cần phần vật liệu màu kế và đồng. Tạo bậc I +0, có thể giảm chỉ số tạm thời; giao diện nói rõ.
- Lực chiến = HP + 2×MP + 10×Công + 15×Thủ: công thức công khai riêng, không phải công thức MIR4. Mặc tốt nhất dùng điểm này và giữ món hiện tại khi hòa điểm.
- Phân giải áp dụng mọi màu: 50% nguyên liệu công thức gốc × 2^(bậc−1), làm tròn xuống; nhận hàng khóa, không hoàn đồng hoặc đá cường hóa. Đây là cân bằng riêng, không phải tỷ lệ MIR4.
- Bảo vệ khác khóa giao dịch. Đồ đang mặc/bảo vệ không làm phôi hoặc phân giải. Đồ bảo vệ không cường hóa; vẫn mặc/tháo được.
- Bản lưu vẫn schema v3, không reset tiến trình. Nhãn giao dịch chưa có chợ hay máy chủ.

## Chưa triển khai ở đợt này

Enchant, Special Enhance, Dragon Forge, Infuse, Magic Stone, Mystical Piece, đăng ký Codex, đổi lớp trang bị, mở phong ấn, chợ, tổ đội và bang hội. Cần thiết kế riêng cùng vòng kiếm nguyên liệu trước khi đưa vào game; không dùng nút giả cho các tính năng này.
