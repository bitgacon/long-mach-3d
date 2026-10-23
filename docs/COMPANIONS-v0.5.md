# Pet, thú cưỡi và kỹ năng — v0.5, 23/10/2026

## Nguồn và lựa chọn thiết kế

- [MIR4 Spirit](https://forum.mir4global.com/post/36): triển khai pet theo bộ, kỹ năng riêng và bảo vật gắn với pet. MIR4 có nhiều ô triển khai, bảo vật thay thế và Transcend. Long Mạch hiện dùng một pet, một tiến trình linh châu 0–3 cho mỗi pet; chưa có bộ nhiều pet, thay bảo vật hay Transcend.
- [MIR4 Character / Ride](https://forum.mir4global.com/post/406): phân biệt sở hữu, chỉ số và trạng thái cưỡi. Long Mạch có bốn thú cưỡi, mở bằng tiến trình và nguyên liệu; chỉ thú đang chọn cộng HP, không cộng dồn toàn bộ bộ sưu tập.
- [MIR4 Skill](https://forum.mir4global.com/post/33): thông tin MP, hồi chiêu, cấp nâng và hiệu quả; có học, Awakening và gán ô. Long Mạch giữ ba kỹ năng chung, thêm hai nhánh chuyên hóa từ bậc 2, tùy chọn auto độc lập; chưa có gán lại ô hay bộ skill riêng từng lớp.

Tên, mô hình low-poly, hệ số, chi phí và điều kiện dưới đây là thiết kế Long Mạch, không phải số liệu MIR4.

## Pet

8 pet, bậc 1–5 giữ chi phí cũ; xem 3D, xoay, chọn xem không tự triển khai. Nuôi dưỡng trong menu cũng không tự đổi pet. Chỉ pet triển khai cộng chỉ số.

- Hỏa hồ đánh đơn; Ngân lang ×1,2; Xích phượng đánh tối đa 3 mục tiêu; Kim long đánh tối đa 3, ×1,4.
- Bạch hổ đánh đơn và choáng 0,6s; Thanh hạc hồi HP; Bạch lộc hồi HP +6 MP; Huyền quy hộ thân khi có địch gần.
- Nhịp 3s, chọn địch trong 12m. Chủ động đánh quái gần; Bảo vệ chỉ đánh quái sát chủ hoặc đang ra đòn; Đi theo tắt kỹ năng nhưng giữ chỉ số. Hạc/lộc vẫn hồi phục ở hai chế độ đầu.
- Linh châu mỗi cấp +10% chỉ số pet, tối đa 3. Cấp kế n tốn 120n đồng, 3n ngọc tinh, 2n linh phách cùng màu pet; chắc chắn thành công, không giao dịch. Tăng sát thương nhịp thêm 5/cấp trước hệ số loài, hồi HP thêm 4/cấp, hộ thân thêm 0,1s/cấp.

## Thú cưỡi

| Thú | Mở | Màu nguyên liệu | Tốc độ bậc I |
|---|---|---|---|
| Linh lộc | Sau nhiệm vụ 6 Vân Sơn, tặng bậc I | Trắng | 13 m/s |
| Ngân lang | Trúc Hải và nhiệm vụ 6 | Xanh lá | 14 m/s |
| Bạch hổ | Băng Hồ và nhiệm vụ 6 | Xanh lam | 15 m/s |
| Long thú | Thiên Cung và nhiệm vụ 6 | Vàng | 16 m/s |

Huấn luyện tối đa V; +0,6 m/s mỗi bậc trên I. HP khi chọn = 12×(bậc−1)+10×chỉ số màu (Trắng=0). Thuần phục/nâng từ bậc n tốn 150×(n+1)×(chỉ số màu+1) đồng, 3+2n linh thảo và 2+n linh phách đúng màu. Long thú không bay vượt địa hình. V lên/xuống, U mở bộ sưu tập; tấn công/thu thập/nhận đòn tự xuống.

## Skill

2/Q Long trảm, 3 Địa chấn, 4 Hồi nguyên, Shift Lướt. Bảng L hiển thị hiệu quả hiện tại/bậc sau, chi phí, MP và hồi chiêu.

Từ bậc 2 chọn Cân bằng, Uy lực (+20% sát thương hoặc hồi HP), Lưu chuyển (−25% hồi chiêu). Đổi miễn phí; không xóa hồi chiêu đang chạy. Checkbox quyết định auto được dùng từng kỹ năng; thao tác tay vẫn hoạt động. Chưa đổi vị trí phím tắt.

## Bản lưu và kiểm thử

Schema v3 giữ nguyên khóa lưu, thêm trường companions. Bản v0.4 thiếu trường này được bổ sung mặc định; nhập trường sai/cấp sai/pet chưa có bảo vật bị từ chối.

- 21 kiểm thử engine, 9 kinh tế/khu vực, 5 trang bị: đạt.
- 7 nhóm mới: chuyển bản lưu/nhập sai; thú cưỡi/chi phí/tốc độ/chỉ số; bảo vật; kỹ năng riêng và hành vi pet; chuyên hóa có tác dụng thật; auto tôn trọng lựa chọn; hình học 8 loài và 4 thú cưỡi.
- Avatar 3 lớp đạt; cả 3 lớp qua 12 nhiệm vụ đầu, mô phỏng 16 nhiệm vụ ở 4 vùng mới không chết.
- Trình duyệt phiên QA riêng: Kim long nâng linh châu 0→1 (công 18→20, thủ 5→6), Bạch hổ thuần phục/chọn/cưỡi hiện trong map, Long trảm nâng tới bậc 2 và chọn Lưu chuyển hiện 3,75s. Viewport 390×844 không tràn ngang bảng skill (clientWidth=scrollWidth=339). Không thay dữ liệu người chơi bằng fixture.
- Chưa kiểm thử điện thoại vật lý hoặc chơi mạng; các hệ thống vẫn chạy và lưu cục bộ.
