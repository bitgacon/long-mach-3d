# MIR4: đối chiếu nguồn và thiết kế Long Mạch

Ngày đọc: 22/10/2026. Tài liệu này phân biệt chức năng được nguồn mô tả, quy tắc người dùng đã chốt và phạm vi thực sự có trong bản thử.

## 1. Trang giới thiệu và cốt truyện

[mir4global.com](https://mir4global.com/) trình bày các lớp nhân vật, tăng trưởng và các chương cập nhật gắn với vùng đất, chiến tranh, boss và hệ thống mới. Ví dụ Phantasia/Sabuk mở rộng vùng đất; Nine Dragon Ice Field và Ice Palace gắn với hành trình tìm dấu vết Cheonpa và Hắc Long. Danh mục Chronicle là lịch sử cập nhật; không nên coi mỗi mục là một nhiệm vụ chính tuyến hoàn chỉnh.

**Áp dụng:** Long Mạch có cốt truyện riêng về An Nhiên và các long ấn, với 5 vùng Vân Sơn → Trúc Hải → Băng Hồ → Hỏa Sơn → Thiên Cung. Mỗi vùng mới có nhân vật dẫn truyện, mục tiêu chiến đấu, thu thập, chế tạo và boss. Đây là thiết kế lấy cảm hứng từ nhịp khám phá/tăng trưởng, chưa phải tái hiện bản đồ và toàn bộ truyện MIR4.

## 2. Bách khoa là cấu trúc hệ thống

[Game encyclopedia](https://forum.mir4global.com/board/dictionary) chia thành Mission, Community, Contents, System, War, Upgrade và các nhóm khác. Nó là mục lục dẫn đến nhiều bài hướng dẫn, không phải một công thức thống nhất áp dụng cho mọi loại đồ.

| Nhóm tham khảo | Hiện có trong Long Mạch | Hướng phát triển tiếp |
|---|---|---|
| Mission / Task / Mystery | 28 nhiệm vụ theo khu vực; NPC và thưởng | Nhiệm vụ phụ, chuỗi bí ẩn, nhiệm vụ ngày |
| Character / Craft / Forge | 11 ô đồ, 5 màu, bậc I–IV, +0–+8 | Dòng thuộc tính phụ, bộ trang bị |
| Spirit | 8 pet, chọn một pet đồng hành, nuôi dưỡng | Đội hình pet, bảo vật, kỹ năng riêng sâu hơn |
| Portal / Raid / World Boss | Cổng chuyển vùng; boss khu vực chơi đơn | Phụ bản có phiên, tổ đội và boss chung |
| Party / Clan / Chat / Market | Chưa có máy chủ nhiều người | Tài khoản, máy chủ xác thực, trao đổi và bang hội |
| War / Siege | Chưa triển khai | PvP và chiếm lãnh thổ sau nền tảng online |

“Bách khoa” trong bản 0.3 là hướng dẫn các quy tắc Long Mạch đang hoạt động. Chưa có hệ sưu tập nộp đồ nhận chỉ số giống chức năng Codex của MIR4.

## 3. Character: hiển thị người và trang bị

[Character](https://forum.mir4global.com/post/406) mô tả quản lý đồ đang mặc, chỉ số, chuyển sang chế tạo, tự trang bị đồ có Power Score cao và các nhóm trang bị/ngoại hình. Danh sách MIR4 gồm vũ khí, vũ khí phụ, áo, quần, găng, giày và nhiều phụ kiện; danh sách không trùng hoàn toàn 11 ô người dùng yêu cầu.

**Áp dụng:** mô hình 3D xoay được trong cửa sổ Trang bị; từng ô có hình riêng, màu phẩm chất, bậc, mức cộng, nhãn giao dịch và chỉ số. Mặc/tháo cập nhật cả mô hình xem trước lẫn nhân vật ngoài bản đồ. Mũ và cánh được đưa vào theo yêu cầu riêng. Mô hình, hình đồ và tên vùng do dự án dựng mới; không dùng tài sản hình ảnh MIR4.

## 4. Craft và Mirkit: phân biệt loại ghép

[Mirkit Craft](https://mirkit.mir4collection.com/craft) là công cụ tính nguyên liệu. Trang cho biết quy đổi nguyên liệu 10:1; tính hàng thường và giao dịch vào tổng đang có; tính phần còn thiếu theo cấp bắt đầu; công thức Dragon material có nhóm nguyên liệu khác nhau. MIR4 còn có phí quy đổi, nên “10:1” không đồng nghĩa miễn phí trong game gốc.

[Craft chính thức](https://forum.mir4global.com/post/35) mô tả chế đồ/vật liệu/thuốc, xem nguồn nguyên liệu và dùng đồ cấp trước bậc IV +8 trở lên thay nguyên liệu chủ chốt khi chế Rare trở lên. Mục Combine cho một số nhóm khác dùng 4 món cùng loại/cấp, có thể nhận cùng cấp hoặc cao hơn. Vì vậy không suy diễn tất cả ghép đều là 10:1 hoặc 2:1.

**Quy tắc riêng đã chốt cho Long Mạch:**

- 10 nguyên liệu cùng loại, cùng màu → 1 màu kế tiếp; thành công 100%.
- 2 trang bị cùng ô, màu, bậc → 1 bậc kế tiếp, tối đa IV; thành công 100%.
- Mỗi đầu ra ghép/chế có xác suất giao dịch 20%, độc lập giữa các lần. Đây là yêu cầu người dùng, không phải tỷ lệ chung xác nhận từ các trang MIR4.
- Đồ IV +8 bị tiêu hao cùng nguyên liệu màu kế → đồ màu kế I +0.
- Bản thử chỉ cho ghép bậc với đồ +0 chưa mặc, chưa bảo vệ, nhằm tránh vô tình mất mức cường hóa; UI ghi rõ điều kiện.
- Có thể chế trực tiếp từng màu từ đủ nguyên liệu cùng màu. Thăng phẩm là một đường phát triển khác, chưa giảm số nguyên liệu so với chế trực tiếp.

## 5. Forge: cấp cộng khác phẩm chất và bậc

[Forge](https://forum.mir4global.com/post/34) tách Enhance, Enchant và các hệ nâng cao. Enhance dùng đá cùng phẩm chất, có khoảng an toàn và vùng rủi ro phá hủy khi thất bại. Bài cũng mô tả xem chỉ số tăng và nguyên liệu trước khi thực hiện.

**Áp dụng:** giữ riêng 3 chiều: màu / bậc I–IV / cường hóa +0–+8. Hiển thị giá và chỉ số kế tiếp. Bản thử đang cường hóa chắc chắn, không phá hủy; đây là lựa chọn đơn giản hóa tạm thời, không phải cơ chế MIR4 gốc. Chưa làm Enchant, Dragon Forge, Primal Force hoặc Infuse.

## 6. Pet

[Spirit](https://forum.mir4global.com/post/36) có chỉ số, kỹ năng, đội hình, ô triển khai mở dần, bảo vật và Transcend. Đây là hệ phát triển riêng chứ không chỉ là vật thể chạy theo nhân vật.

**Áp dụng:** 8 loài hình dáng khác nhau, phẩm chất, chỉ số cộng, hỗ trợ đánh hoặc hồi phục, điều kiện mở theo vùng; chọn một pet hoạt động. Chưa có đội hình nhiều pet, bảo vật hay Transcend của MIR4.

## 7. Công thức bản 0.3

Tất cả thành phần trong một công thức cùng màu với món chế:

| Nhóm | Công thức |
|---|---|
| Giáp: mũ, áo, quần, găng, giày | 6 Linh bì + 3 Thanh Thạch + 2 Linh thảo |
| Vũ khí chính/phụ | 8 Huyền thiết + 4 Thanh Thạch + 2 Linh khí |
| Vòng cổ, vòng tay, nhẫn | 6 Ngọc tinh + 4 Linh khí + 2 Linh thảo |
| Cánh | 8 Thiên vũ + 4 Ngọc tinh + 6 Linh khí |

Thêm 40 × (chỉ số màu + 1) đồng; chỉ số màu bắt đầu ở 0. Mỏ khoáng cho Thanh Thạch và Huyền thiết; hái thuốc cho Linh thảo và Linh bì; hấp thu cho Linh khí, Ngọc tinh, Thiên vũ. Săn quái cho Linh phách. Luyện đá cường hóa dùng 2 Thanh Thạch + 1 Linh khí cùng màu. Đây là định lượng riêng để thử vòng chơi, không sao chép kinh tế MIR4.

## 8. Tiêu chí nghiệm thu trực quan

- Mô hình nhân vật và 11 ô đồ có thể quan sát trong cửa sổ Trang bị.
- Vũ khí chính có hình kiếm / trượng / thương tùy lớp; đồ mặc gắn đúng bộ phận.
- Màu phẩm chất nhận biết bằng nền, viền và chữ, không chỉ màu sắc.
- Đồ đang mặc và được bảo vệ không bị chọn làm phôi ghép.
- Đổi map và đóng/mở xem nhân vật giải phóng tài nguyên đồ họa cũ.
- Tiến trình cũ được chuyển sang bản lưu v3; bản lưu cũ giữ ở khóa gốc.
