# 🚀 RF_WORKSPACE_PRO — SYSTEM CHANGELOG & RELEASE HISTORY

Tài liệu lưu trữ toàn bộ lịch sử phát hành, nâng cấp kiến trúc, tối ưu nghiệp vụ và sửa lỗi của hệ điều hành `RF_Workspace_Pro`.

---

## [v2.34.2] - 2026-09-02

### 💎 Tái Cấu Trúc Nhật Ký Chứng Từ: Tách Bạch Xuất - Nhập Từng Kho, Thống Kê Ròng & Ẩn Mã Kỹ Thuật
- **Tối Ưu Hoá Nút Thao Tác Tạo Phiếu Thành Icon Gọn Gàng (`Tab_ImportExport.html`)**:
  - Chuyển đổi toàn bộ nút `[Nhập Kho]`, `[Đặt Hàng]`, `[Xuất Kho]`, `[Thanh Lý]`, `[Đồng Bộ BOM]`, `[Sửa BOM]` thành các nút Icon tinh gọn, có Tooltip trực quan và co giãn thông minh trên di động/máy tính bàn.
- **Tách Biệt Độc Lập Luồng Xuất / Nhập / Đặt Hàng Trong Từng Kho Hàng (`Tab_ImportExport.html`)**:
  - Bổ sung thanh Sub-filter chips: `[Tất Cả (N) | 📥 Nhập Kho (N) | 📤 Xuất Kho (N) | 📋 Đặt Hàng (N) | 🔄 Kiểm Kho / Khác (N)]` chạy động ngay dưới bộ chọn từng Kho (`Kho Bể Kính`, `Kho Layout`, `Kho Phụ Kiện`, `Kho Vật Tư`).
- **Nâng Cấp Dải Bento Thống Kê Tài Chính Luân Chuyển 4 Thẻ (`Tab_ImportExport.html`)**:
  - **Tổng Chứng Từ**: Hiển thị tổng số phiếu kèm tỷ lệ `{N} Nhập • {N} Xuất`.
  - **Tổng Tiền Nhập**: `+{Số tiền}đ` màu xanh lục (click để lọc ngay danh sách phiếu nhập).
  - **Tổng Tiền Xuất**: `-{Số tiền}đ` màu đỏ hồng (click để lọc ngay danh sách phiếu xuất).
  - **Giá Trị Ròng (Nhập - Xuất)**: `±{Số tiền}đ` vàng gold sang trọng, phản ánh chính xác chiều hướng tăng/giảm tồn kho của xưởng.
- **Ẩn Mã Kỹ Thuật `IE_...`, Đưa Đối Tượng / Mục Đích Giao Dịch Lên Làm Tiêu Đề Chính (`Tab_ImportExport.html`)**:
  - Tiêu đề thẻ chứng từ hiển thị rõ ràng: `Bàn Giao Khách Hàng (Hàng Loạt)`, `Sản Xuất Layout`, `Tự động nhập kho (Sản xuất xong)`, `Nhà cung cấp...`.
  - Mã kỹ thuật (`IE_SAFE_OUT_...`, `IE_BOM_...`) được thu gọn thành nhãn monospace tinh tế ở hàng dưới.

---

## [v2.34.1] - 2026-09-02

### 💎 Tối Ưu Hiển Thị Kho Hàng: Làm Tròn Tồn 3 Số Thập Phân, Hiện Giá Nhập Vật Tư & Tinh Gọn Thẻ Kho
- **Chuẩn Hóa Làm Tròn Số Lượng Tồn Kho Tối Đa 3 Chữ Số Thập Phân (`Tab_Inventory.html`, `Tab_ImportExport.html`, `Code.js`)**:
  - Triệt tiêu hoàn toàn hiện tượng số thập phân dài vô tận do sai số dấu phẩy động của JavaScript (như `0.11249999999999999` $\rightarrow$ `0.112` hoặc `0.113`).
  - Áp dụng đồng bộ cho Thẻ sản phẩm, Phân loại variants, Chế độ xem bảng, Tổng tồn danh mục và Modal Thẻ kho chi tiết (`StockHistoryModal`).
- **Kho Nguyên Liệu / Vật Tư Ưu Tiên Hiển Thị Giá Nhập (Giá Vốn) (`Tab_Inventory.html`)**:
  - Tự động nhận diện nhóm `DANH MỤC SẢN XUẤT` và các danh mục con nguyên vật liệu (`NGUYÊN LIỆU LAYOUT`, `NGUYÊN LIỆU BỂ KÍNH`, `VẬT TƯ SẢN XUẤT`).
  - Hiển thị nổi bật **Giá Nhập (Vốn)** `{formatMoney(costPrice)}đ` thay vì giá bán mặc định `0đ` vô nghĩa.
- **Tinh Gọn & Chuẩn Hóa Ghi Chú Giao Dịch Thẻ Kho (`Tab_ImportExport.html`, `Code.js`)**:
  - Tự động rút gọn và định dạng đẹp các dòng lịch sử xuất vật tư BOM: `Trừ vật tư lệnh sản xuất (Tên hàng hoá) đơn (Mã đơn hàng)`.
  - Tự động giải mã các chuỗi JSON kiểm kho `{"status":"BALANCED", ...}` thành văn bản gọn gàng `Đã cân bằng kho / Cân bằng kiểm kho (Người tạo)`.

---

## [v2.34.0] - 2026-09-02

### 💎 Nâng Cấp Vận Hành Lean: Phiếu Nhận Vật Tư Đầu Ca & Quyết Toán Tiêu Hao Cuối Ca Cho Đơn Tùy Chỉnh
- **Thiết Lập Quy Trình Lĩnh Vật Tư & Quyết Toán Thực Dùng Chuẩn Xưởng (`Tab_Production.html`, `Code.js`)**:
  - **Phạm vi áp dụng nghiêm ngặt**: Chỉ áp dụng cho `BỂ KÍNH ➔ BỂ LẺ SIZE` và `LAYOUT ➔ COVER` (đơn đặt theo kích thước/ảnh mẫu tùy chỉnh).
  - **Chạm 1 (Đầu ca - Nhận việc)**: Mở popup **"Phiếu Nhận Nguyên Liệu & Vật Tư"** cho phép thợ chọn trực tiếp đá/lũa/keo/kính từ kho `DANH MỤC SẢN XUẤT ➔ NGUYÊN LIỆU LAYOUT` hoặc `NGUYÊN LIỆU BỂ KÍNH` và nhập số lượng lấy ra bàn làm việc.
  - **Chạm 2 (Cuối ca - Nộp ảnh hoàn thành)**: Mở popup **"Quyết Toán Tiêu Hao Vật Tư"** với bảng 4 cột (`Tên Vật Tư | Đã Lấy | Trả Lại Kho | Thực Dùng`). Thợ chỉ cần nhập số lượng trả thừa vào ô `Trả Lại Kho` (mặc định 0), hệ thống tự động tính toán `Thực Dùng = Đã Lấy - Trả Lại`.
- **Tự Động Trừ Tồn Kho Thực Tế & Cập Nhật Giá Vốn Đơn Hàng (`Code.js`)**:
  - Tự động trừ tồn kho `Products.quantity` theo đúng số lượng `Thực Dùng` qua action backend `deductInventoryBOM` (bọc `LockService` an toàn chống đè dữ liệu).
  - Tự động tính tổng tiền vật tư thực tế và cộng dồn vào giá vốn `Orders.cogs` của đơn hàng liên quan, đảm bảo báo cáo lợi nhuận chuẩn xác $100\%$.

---

## [v2.33.9] - 2026-09-01

### 🛡️ Hotfix: Khắc Phục Triệt Để Sự Cố Đơn Hàng Mới Biến Mất Sau Khi Nhập Trên Toàn Bộ Thiết Bị
- **Tự Động Khởi Tạo & Bảo Đảm Mã Đơn Hàng Không Bao Giờ Rỗng (`Modals_Orders.html`, `Code.js`)**:
  - Tự động sinh mã đơn hàng chuẩn tiền tố (`BL...`, `BS...`, `CTV...`, `BH...`, `TK...`, `ORD...`) ngay khi mở form hoặc chuyển kênh bán hàng nếu người dùng không tự nhập mã thủ công.
  - Bổ sung lớp bảo vệ trong `formatOrder` và `getAppData` trên Google Apps Script (`Code.js`): Gán fallback `orderCode = id` thay vì lọc bỏ đơn như rác công thức (ghost order).
- **Chuẩn Hóa Phân Quyền RBAC Backend `validateTableWritePermission` (`Code.js`)**:
  - Nhận diện linh hoạt mọi biến thể vai trò (`QUẢN LÝ BÁN HÀNG`, `QUẢN LÝ SẢN XUẤT`, `QUẢN LÝ KHO VẬN`, `QUẢN LÝ NHÂN SỰ`, `KẾ TOÁN`, `CỘNG TÁC VIÊN`, `NHÂN VIÊN`, `THỢ SẢN XUẤT`).
  - Cho phép tất cả các khâu vận hành ghi nhận đơn hàng và các đối tượng dữ liệu phụ thuộc đi kèm (phiếu cọc `TX_PRE_`, KPI bán hàng 5% `BP_KPI_`, BOM layout) mà không bị lỗi `PERMISSION_DENIED`.
- **Tối Ưu Giao Dịch Cọc & Chống Trừ Kép State**:
  - Chỉ gửi bản ghi giao dịch `Transactions` khi khách có cọc thực tế (`prePaid > 0đ`).

---

## [v2.33.8] - 2026-09-01

### 💎 Nâng Cấp Bảng Lương: Tăng Phí Công Đoàn Lên 100k & Tách Thành Khoản Trừ Cố Định Độc Lập
- **Nâng Mức Phí Công Đoàn Lên 100.000đ/Tháng/Nhân Sự (`Tab_HR.html`, `Tab_Analytics.html`, `Code.js`)**:
  - Cập nhật đồng bộ phí công đoàn từ mức cũ `50.000đ` lên `100.000đ/tháng` cho mọi nhân sự trên toàn bộ hệ thống tính lương, báo cáo tài chính chi phí nhân sự (`Tab_Analytics`), backend đồng bộ dữ liệu (`Code.js`) và mẫu in phiếu lương (`In Phiếu Lương`).
- **Tách Riêng Mục Phí Công Đoàn Thành Hàng Cố Định Độc Lập (`Tab_HR.html`)**:
  - Tách hẳn dòng **Phí Công Đoàn (Trừ cố định): -100.000đ** ra khỏi khối *Khấu Trừ & KCS Phạt*, hiển thị trang trọng với huy hiệu và icon riêng biệt trên Thẻ Lương Nhân Sự.
  - Khối **Khấu Trừ & KCS Phạt** giờ đây chỉ tập trung phản ánh các khoản phạt biến động thực tế (Vi phạm chấm công, phạt KCS, chi phí đền bù bảo hành, tạm ứng, giảm trừ khác), giúp nhân sự theo dõi minh bạch, rõ ràng, không bị hiểu nhầm phí công đoàn là tiền phạt.

---

## [v2.33.7] - 2026-09-01

### 💎 Tối Ưu & Chuẩn Hóa: Đồng Bộ Hóa 100% Phiếu In Lương Với Thẻ Lương Nhân Sự
- **Khớp Chuẩn 100% Các Khoản Thu Nhập & KPI (`Tab_HR.html`)**:
  - Tách bạch rõ ràng và chuẩn xác các dòng thu nhập: `Lương Thời Gian` (chấm công xưởng), `Tiến Trình KPI` (chức vụ/chỉ tiêu), `Phụ Cấp Xăng Xe` (cố định), `KPI Sản Xuất` (khâu 1 & khâu 2), `KPI Đóng Gói & Chở Kho`, `KPI Bán Hàng & Chốt Đơn`, `Lương Tăng Ca` và `Thưởng / Phụ Cấp Khác`.
  - Khắc phục lỗi dùng tên cũ "Hoa hồng sản xuất", "Hỗ trợ sản lượng kho" và "Lương chức vụ" gây sai lệch số liệu so với giao diện Thẻ Nhân Sự.
- **Minh Bạch Bảng Kê Chi Tiết Từng Khoản Thưởng & Phạt KCS**:
  - Liệt kê chi tiết từng dòng con kèm ngày tháng và nội dung cho mục *Thưởng & Phụ cấp khác* (Thưởng chuyên cần, thưởng nóng, bù KPI...) và mục *Khấu trừ vi phạm, KCS & Chấm công*.
  - Nhân viên đối soát rõ ràng từng đồng tiền thưởng và khoản phạt minh bạch, không còn tình trạng gộp số mơ hồ.
- **Bổ Sung Đối Chiếu Lương Mục Tiêu & Căn Chỉnh Layout In A4 Portrait Chuẩn Hallmark**:
  - Hiển thị song song `Lương Mục Tiêu` (đủ 26 công + 100% KPI) và `Thực Nhận Kỳ Này` khớp $100\%$ từng chữ số với Thẻ Lương.
  - Tinh chỉnh CSS in ấn khổ A4 Portrait, căn lề 10mm cân đối, sắc nét, không bị ngắt trang dư thừa.

---

## [v2.33.6] - 2026-08-31

### 🛡️ Hotfix: Khôi Phục Quy Trình Duyệt Khâu 1 & Khóa Khâu 2 Dây Chuyền Sản Xuất
- **Kích Hoạt Trạng Thái `Chờ duyệt khung` Khi Thợ Hoàn Thành Khâu 1 (`Tab_Production.html`)**:
  - Khắc phục sự cố thợ Tân bấm hoàn thành / tải ảnh Khâu 1 (Dựng Khung) thì lệnh nhảy thẳng sang trạng thái hoàn thành hoặc bỏ qua bước duyệt.
  - Khi Khâu 1 nộp ảnh nghiệm thu, hệ thống tự động gán cờ `qc_status = 'Chờ duyệt khung'`, hiển thị huy hiệu `[CHỜ DUYỆT KHÂU 1]` và mở khối `DUYỆT KHÂU DỰNG KHUNG` cho Quản lý / Tối Cao.
- **Khóa Chặt Khâu 2 (`GIA CỐ`) Đến Khi Được Duyệt Đạt Khung**:
  - Khâu 2 của thợ Tâm sẽ bị khóa hoàn toàn (`isLocked = true`) cho đến khi Quản lý bấm `DUYỆT ĐẠT` tại khối kiểm định khung, đảm bảo One-Piece Flow và không bao giờ để thợ làm sai mẫu.

---

## [v2.33.5] - 2026-08-31

### 🛡️ Hotfix: Chuẩn Hóa Thanh Điều Hướng Tab Đơn Hàng
- **Khử Trùng Lặp Mảng Tabs (`Tab_Orders.html`)**:
  - Khắc phục lỗi thanh điều hướng bị hiển thị lặp 2 lần các tab con.
  - Chuẩn hóa cố định 9 tab nghiệp vụ theo đúng luồng Lean One-Piece Flow: `Tất Cả`, `Chờ Sản Xuất`, `Chờ Mã Vận Đơn`, `Sẵn Sàng Đóng Gói`, `Chờ Bàn Giao`, `Đã Bàn Giao`, `Đơn Huỷ`, `Hàng Hoàn`, `Hoàn Thành`.

---

## [v2.33.4] - 2026-08-31

### 🚀 Tối Ưu: Cho Phép Phụ Kiện Âm Kho & Gỡ Bỏ Tab "Chờ Phụ Kiện"
- **Cho Phép Phụ Kiện Âm Kho Không Chặn Đóng Gói (`Tab_Orders.html` & `Modals_Orders.html`)**:
  - Phụ kiện xuất bán được phép ghi nhận âm kho bình thường để không làm gián đoạn dây chuyền đóng gói.
  - Vô hiệu hóa việc chặn đơn và gắn cờ `isMissingAccessories`. Đơn chỉ gồm phụ kiện hoặc đã làm xong sản xuất sẽ đi thẳng vào `Sẵn Sàng Đóng Gói`.
- **Gỡ Bỏ Hoàn Toàn Tab "Chờ Phụ Kiện" Khỏi Giao Diện (`Tab_Orders.html`)**:
  - Xóa tab `Chờ Phụ Kiện` khỏi thanh tab, triệt tiêu vĩnh viễn số đếm ảo 62 đơn từ các đơn lịch sử.
  - Tinh gọn thanh tab thành các luồng rõ ràng: `Tất Cả`, `Chờ Sản Xuất`, `Chờ Mã Vận Đơn`, `Sẵn Sàng Đóng Gói`, `Chờ Bàn Giao`, `Đã Bàn Giao`, `Đơn Huỷ`, `Hàng Hoàn`, `Hoàn Thành`.

---

## [v2.33.3] - 2026-08-31

### 🛡️ Hotfix: Cô Lập Tuyệt Đối Đơn Hủy & Hoàn Tất Khỏi Tab "Chờ Mã Vận Đơn"
- **Thiết Lập Chốt Chặn Group Guard Trong Bộ Lọc `filtered` & `stats` (`Tab_Orders.html`)**:
  - Khắc phục sự cố đơn hàng `Đơn Huỷ` (như đơn Shopee `260828FYPUNS0C`) chưa có mã vận đơn bị hiển thị lọt vào tab `Chờ Mã Vận Đơn`.
  - Ép điều kiện lọc trực tiếp: Tab `Chờ Mã Vận Đơn` và `Chờ Phụ Kiện` **chỉ chấp nhận đơn thuộc nhóm `Sẵn Sàng Đóng Gói`** (`group === 'Sẵn Sàng Đóng Gói'`).
  - Loại trừ $100\%$ các nhóm `Đơn Huỷ`, `Hàng Hoàn`, `Hoàn Thành`, `Đã Bàn Giao` và `Chờ Sản Xuất` khỏi tab `Chờ Mã Vận Đơn` và `Chờ Phụ Kiện`.

---

## [v2.33.2] - 2026-08-31

### 🛡️ Hotfix: Triệt Tiêu Trùng Lặp Giữa Tab "Chờ Sản Xuất" & "Chờ Mã Vận Đơn"
- **Ràng Buộc Điều Kiện `allProdDone` (`Tab_Orders.html`)**:
  - Khắc phục sự cố đơn hàng đang trong khâu sản xuất (`Chờ Sản Xuất`) bị hiển thị đồng thời ở tab `Chờ Mã Vận Đơn`.
  - Chỉ kích hoạt cờ `isMissingMVD` và `isMissingAccessories` khi đơn đã hoàn tất $100\%$ công đoạn sản xuất phôi/bể/layout hoặc có sẵn kho (`allProdDone === true`).
  - Đơn đang chờ sản xuất sẽ nằm cố định tại tab `Chờ Sản Xuất`, không bị nhảy sang tab `Chờ Mã Vận Đơn` hay `Chờ Phụ Kiện`.
- **Tối Ưu Hiển Thị Huy Hiệu Mã Vận Đơn (`Modals_Orders.html`)**:
  - Chỉ hiển thị huy hiệu `[⚡ Chờ MVĐ GHN]` và `[🚌 Nhập SĐT Xe]` khi đơn hàng đã ở trạng thái `Sẵn Sàng Đóng Gói` (`isReadyPack`), giữ thẻ đơn ở khâu sản xuất luôn tinh gọn.

---

## [v2.33.1] - 2026-08-31

### 🛡️ Hotfix: Cô Lập Phạm Vi Tab "Chờ Phụ Kiện" & Chặn Tràn Đơn Lịch Sử Đã Giao
- **Cô Lập Phạm Vi Quét Tồn Kho Phụ Kiện (`Tab_Orders.html`)**:
  - Khắc phục sự cố 62 đơn hàng lịch sử (đã đóng gói, đã bàn giao, đã hoàn thành hoặc đơn huỷ) bị nhảy tràn vào tab "Chờ Phụ Kiện" do tồn kho mặt hàng phụ kiện đó ở hiện tại bằng 0.
  - Bổ sung chốt chặn `isOrderClosedOrPacked`: Chỉ quét kiểm tra tồn kho và bật cờ `isMissingAccessories` cho các đơn đang vận hành (`Chờ Sản Xuất` / `Sẵn Sàng Đóng Gói` chưa có ảnh đóng gói).
  - Loại trừ 100% các đơn đã bàn giao, hoàn thành, chở kho hoặc hủy khỏi tab `Chờ Phụ Kiện` và `Chờ Mã Vận Đơn`.
- **Khóa Nút "Nhập Thiếu" Phụ Kiện Cho Đơn Đã Xong (`Modals_Orders.html`)**:
  - Ẩn nút bấm `Nhập Thiếu` trên các đơn đã đóng gói / bàn giao, ngăn chặn thao tác nhập bù kho nhầm cho các đơn đã xuất đi trong quá khứ.

---

## [v2.33.0] - 2026-08-31

### 🛡️ Khắc Phục Triệt Để Sự Cố Đơn Bán Lẻ Gửi GHN & Chuẩn Hóa Phân Luồng Tab Poka-Yoke
- **Chuẩn Hóa Phân Luồng Tab Vận Hành Poka-Yoke (`Tab_Orders.html` & `Modals_Orders.html`)**:
  - Khắc phục sự cố kéo giật đơn `Sẵn Sàng Đóng Gói` sang tab `Chờ Mã Vận Đơn`. Toàn bộ đơn hàng đã hoàn tất sản xuất hoặc có sẵn kho luôn nằm đúng tại tab `Sẵn Sàng Đóng Gói` (và `Tất Cả`) để thợ đóng gói thực hiện đơn ngay.
  - Gắn Huy hiệu Cảnh báo Poka-Yoke phát sáng `[⚡ Chờ MVĐ GHN]` tương tác trực tiếp: Người dùng có thể click 1-chạm để mở popup đẩy đơn GHN hoặc nhập mã vận đơn nhanh mà không cần tìm kiếm thủ công.
  - Tab `Chờ Mã Vận Đơn` được chuẩn hóa thành bộ lọc tổng hợp (Aggregate Filter) toàn hệ thống cho phép quét nhanh toàn bộ đơn thiếu mã vận đơn của các kênh.
- **Khử Lỗi Lọc Ghost Orders Trên Backend (`Code.js` - `getAppData`)**:
  - Sửa chốt chặn bộ lọc ghost order: Chỉ loại bỏ dòng khi `customer === '0'` VÀ `orderCode === '0'`.
  - Bảo vệ 100% đơn bán lẻ thật có mã đơn hợp lệ (`BL...`, `ORD_...`, `CTV...`) ngay cả khi tên khách hàng tạm thời để trống, ngăn chặn việc đơn bị server drop khi polling máy chủ chạy ngầm.
- **Tối Ưu Động Cơ Bảo Toàn State Optimistic UI & Bộ Lọc Thời Gian Động (`App_Main.html` & `Tab_Orders.html`)**:
  - Tăng thời gian lưu giữ đơn hàng mới tạo trong RAM từ $20\text{s}$ lên $180\text{s}$ trong `smartMergeOrders` và `smartMerge`, chống mất trạng thái khi đường truyền mạng chập chờn.
  - Chuyển đổi bộ lọc `matchTimeFilter` sang cơ chế tính toán năm/tháng động học theo `new Date()`, triệt tiêu hoàn toàn lỗi rớt đơn khi bước sang tháng mới.

---

## [v2.17.2] - 2026-08-28

### 🎨 Khắc Phục Triệt Để Lỗi Form/Modal/Ảnh Bị Nhảy Lên Đầu Trang (`Index.html`, `App_Main.html`)
- **Giải phóng Stacking Context cho Container Tab cha**:
  - Loại bỏ các thuộc tính `transform: translate3d(0, 0, 0)` và `will-change: transform` khỏi class `.rf-gpu-accelerated` và animation `tabFadeIn` ở cả `Index.html` và `App_Main.html`.
  - Giúp mọi thành phần `position: fixed` (Modal tạo phiếu, Form tạo đơn, Form sửa lệnh sản xuất, Lightbox xem ảnh QC/đơn hàng, Hộp thoại xác nhận) luôn neo chuẩn xác vào Viewport của màn hình trình duyệt thay vì bị nhốt vào hệ tọa độ cuộn của tab cha.
- **Trải nghiệm mượt mà, không giật trôi**:
  - Người dùng có thể thoải mái cuộn xuống dòng thứ 50, 100 ở bất kỳ tab nào (Orders, Production, HR, Inventory, Finance, Suppliers...) và bấm mở form/xem ảnh mà không bị hiện tượng form chạy tít lên trên đỉnh đầu trang hoặc nhảy giật màn hình.

---

## [v2.17.1] - 2026-08-28

### ⚙️ Tự Động Đẩy Đơn Có Sẵn Sang Trạng Thái Sẵn Sàng Đóng Gói (`Tab_Orders.html`, `Modals_Orders.html`)
- **Tự động cập nhật `_effectiveStatus` khi đơn được đáp ứng từ tồn kho**:
  - Bổ sung logic kiểm tra `meta.allProdDone` (hàng có sẵn 100%) ở tầng frontend. Ngay khi tất cả các mục sản xuất của đơn được đánh dấu hoàn thành hoặc bốc từ kho có sẵn, UI sẽ tự động ép kiểu `_effectiveStatus` sang `SẴN SÀNG ĐÓNG GÓI` thay vì kẹt lại ở `CHỜ SẢN XUẤT`.
  - Khắc phục triệt để tình trạng các đơn lấy từ kho có sẵn nhưng backend chưa đồng bộ kịp (hoặc bị sót do lỗi đếm 0) khiến đơn hàng không hiện ở bất kỳ tab nào ngoài "Tất Cả".
- **Tinh chỉnh thứ tự ưu tiên tab**:
  - Việc ép kiểu thiếu mã vận đơn (`isMissingMVD`) sang tab `Chờ Mã Vận Đơn` chỉ diễn ra ĐÚNG LÚC khi đơn đã thật sự ở trạng thái sẵn sàng đóng gói, không cướp nhầm các đơn chờ sản xuất chưa có mã vận đơn.

---

## [v2.17.0] - 2026-08-28

### ⚙️ Đồng Bộ Chuẩn Hoá Ma Trận Định Mức BomLayout & Khớp Tên Kho Nguyên Liệu (`Code.js`, `Config.html`, `Tab_Production.html`, `Tab_Inventory.html`)
- **Trích xuất định mức 100% từ Sheet `BomLayout` chính thức**:
  - Xây dựng hàm `getBomFromBomLayoutSheet(ss, prodName, targetSku)` đọc trực tiếp cấu hình ma trận dòng/cột từ sheet `BomLayout` trong Google Spreadsheet.
  - Tự động lấy chuẩn xác số lượng vật tư (Lũa Săn Miếng, Đá Tai Mèo, Nham Nhọ Nồi, Fomex 8li/10li, Keo 502) cho từng mã Layout theo đúng thiết kế của xưởng.
- **Đồng bộ tên và giá theo Kho Nguyên Liệu (`Products`)**:
  - Bổ sung hàm `findMaterialInProducts(matSku, matId, prodList)` với từ điển SKU Alias toàn diện (`NLSX-NHAMNONOI` <-> `NLSX-NOIN`, `NLSX-NHAMXANH` <-> `NLSX-NHAM`, `NLSX-VIAVOI` <-> `NLSX-VIA`, `NLSX-DANHCANH` <-> `NLSX-LUASANCANH`, `NLSX-REEN` <-> `NLSX-RE`...).
  - Triệt tiêu hoàn toàn hiện tượng hiển thị mã thô `NLSX-NOIN`, `NLSX-RE` trong Tab Sản Xuất (`Tab_Production.html`) và Kho Hàng (`Tab_Inventory.html`), đảm bảo 100% hiển thị đúng Tên tiếng Việt và Đơn giá từ bảng `Products`.
- **Chuẩn hóa tính năng Sửa Phiếu Xuất BOM (`repairAllBomTickets`)**:
  - Quét lại toàn bộ phiếu xuất kho BOM cũ `IE_BOM_...` trong `ImportExport`, gán đúng vật tư và giá vốn theo `BomLayout` và `Products`.

---

## [v2.16.9] - 2026-08-28

### ⚙️ Đồng Bộ Chuẩn Hoá Nhóm Trạng Thái Đơn Hàng & Sửa Lỗi Đếm Badge (`Tab_Orders.html` & `Code.js`)
- **Khắc phục lỗi đếm 0 trên thẻ tab nhưng có đơn bên trong (`Tab_Orders.html`)**:
  - Xây dựng hàm `getOrderTabGroup(o)` làm Single Source of Truth phân loại đơn hàng đồng bộ 100% giữa bộ đếm `stats` và bộ lọc hiển thị `filtered`.
  - Khắc phục lỗi so khớp chuỗi không cùng hoa/thường (case sensitivity mismatch) khiến tất cả các đơn hàng rơi vào nhánh fallback `completed++` (437 đơn).
- **Khắc phục triệt để lỗi ép kiểu chuỗi `"FALSE"` từ Google Sheets (`isReconciledSafe`)**:
  - Tạo hàm kiểm tra an toàn `isReconciledSafe(val)` ngăn chặn việc chuỗi `"FALSE"` từ Google Sheets bị ép kiểu thành `true` trong JavaScript, khiến hàng loạt đơn hàng bị ghi đè thành `HOÀN THÀNH`.
  - Đồng bộ logic kiểm tra `isReconciled` an toàn trong cả `Code.js` và `Tab_Orders.html`.

---

## [v2.16.8] - 2026-08-28

### 📊 Khắc Phục Lỗi Tính Doanh Thu Đa Kênh & Chuẩn Hóa Chi Phí P&L (`Tab_Analytics.html` & `Tab_BusinessReport.html`)
- **Đồng bộ chuẩn 100% Doanh Thu Thực Tế VNĐ (`Tab_Analytics.html` & `Tab_BusinessReport.html`)**:
  - Triệt tiêu lỗi nhân tỷ giá ngoại tệ (THB x715, MYR x5850) lần thứ hai trên các đơn Shopee Global (TH, MA/MY, SG...) vốn đã được quy đổi sẵn sang VNĐ khi lưu vào bảng `Orders`.
  - Khôi phục chính xác doanh thu thực tế của toàn bộ các kênh bán hàng (Shopee VN, Shopee TH, Shopee MA, TikTok Shop, CTV, Bán Lẻ...).
- **Chuẩn hóa quét Chi Phí Lương & Chi Phí Vận Hành (OPEX)**:
  - Ưu tiên đọc Quỹ Lương Chốt từ `Monthly_Snapshots` cho kỳ báo cáo tương ứng, tránh tình trạng cộng dồn các giao dịch tạm ứng trùng lặp.
  - Khoanh vùng chính xác chi phí vận hành OPEX (Mặt bằng, Điện nước, Quảng cáo/Ads, Tiếp khách, Sinh hoạt xưởng...), tuyệt đối không quét nhầm các khoản thanh toán tiền hàng nhập, công nợ nhà cung cấp hay hoàn tiền.

---

## [v2.16.7] - 2026-08-28

### ⚙️ Chuẩn Hóa Engine Trừ Vật Tư BOM & Khôi Phục Đối Tượng Xuất Kho (`Code.js` & `Tab_ImportExport.html`)
- **Tách biệt triệt để Engine định mức BOM Bể Kính vs Layout (`Code.js`)**:
  - Bổ sung trích xuất cột `type` từ bảng `Production`, triệt tiêu hoàn toàn hiện tượng `targetProd.type` bị undefined.
  - Phân loại chính xác 100%: Bể Kính chỉ trừ nguyên liệu kính/keo silicon/mài CNC và gán `target = 'Sản Xuất Bể Kính'`, Layout chỉ trừ lũa/đá/keo 502/fomex/rêu và gán `target = 'Sản Xuất Layout'`.
  - Làm tròn tất cả các số tiền thành số nguyên, ngăn chặn lỗi hiển thị thập phân dạng `3.628,044đ`.
- **Bổ sung tính năng Tự Động Sửa BOM Lỗi (`repairAllBomTickets`)**:
  - Cung cấp hàm backend quét và tự động chuẩn hóa toàn bộ các phiếu xuất BOM cũ trong sheet `ImportExport`.
  - Tích hợp nút bấm trực quan `Sửa BOM Lỗi` ngay trên thanh công cụ `Tab_ImportExport.html` cho Admin/Quản Lý Kho.

---

## [v2.16.6] - 2026-08-28

### ⚙️ Tối Ưu Luồng Tạo Lệnh Sản Xuất Tồn Kho & Hiển Thị Đơn Hàng Đa Tháng (`Tab_Production.html` & `Modals_Orders.html`)
- **Đồng bộ hiển thị lệnh chờ sản xuất xuyên tháng (`Tab_Production.html`)**:
  - Khắc phục triệt để lỗi lệnh sản xuất tạo vào cuối tháng có deadline rơi vào đầu tháng sau (hoặc lệnh tồn đọng từ tháng trước) bị bộ lọc thời gian `Tháng Này` ẩn đi.
  - Thiết lập cơ chế ưu tiên: Mọi lệnh `Chờ Sản Xuất` và `Kiểm Định` chưa hoàn thành (`!isFinished`) bắt buộc luôn hiển thị 100% trên bảng điều khiển xưởng để thợ nhận việc và gia công liên tục (One-Piece Flow).
- **Bổ sung validation và hướng dẫn chọn mẫu sản xuất tồn (`Modals_Orders.html`)**:
  - Bổ sung validation chặn lưu đơn khi giỏ hàng rỗng trong luồng Tạo Lệnh Tồn Kho, ngăn chặn việc submit nhầm đơn trống.
  - Cải tiến giao diện giỏ hàng trống: Bổ sung chỉ dẫn trực quan kèm nút bấm nhanh `+ BỂ KÍNH` và `+ LAYOUT` ngay bên trong khung thông báo.
  - Truyền đầy đủ cấu hình `configGiaLayout` và `kpiConfig` vào `AddModal` trong `Tab_Production.html` để tự động tính giá và BOM chuẩn xác.

---

## [v2.16.5] - 2026-08-28

### 🛠️ Khắc Phục Lỗi Hiển Thị Tổng Quỹ Lương Kỳ Này (`Tab_HR.html` Hotfix)
- **Chuẩn hóa giải thuật bóc tách số `cleanNumber`**:
  - Nâng cấp `cleanNumber` bóc tách an toàn mọi định dạng số (chuỗi có dấu phẩy/chấm phân cách hàng nghìn, khoảng trắng, undefined, null, NaN).
  - Bọc toàn bộ các phép tính thành phần trong `payroll` (lương chính, thưởng KPI, phụ cấp, thưởng nóng, chuyên cần, giảm trừ, tạm ứng) bằng `cleanNumber`, triệt tiêu hoàn toàn hiện tượng 1 nhân sự lỗi format làm lây lan `NaN` sụp đổ số tổng cả xưởng.
- **Mở rộng phân quyền hiển thị tổng lương**:
  - Bổ sung quyền Founder (`FOUNDER`), Admin (`ADMIN`, `isBoss`, `isAdmin`) và Quản Lý Tối Cao vào điều kiện hiển thị số tổng trên thẻ "TỔNG QUỸ LƯƠNG KỲ NÀY".

---

## [v2.16.4] - 2026-08-28

### 🛡️ Đại Tổng Rà Soát Kiến Trúc, Đồng Bộ Tỷ Giá Đa Tiền Tệ & Khóa Dữ Liệu Đồng Thời (Deep Architecture Audit & Concurrency Hardening)
- **1. Đồng Bộ Tỷ Giá Đa Tiền Tệ Shopee Global (`Tab_Analytics.html`)**:
  - Bổ sung bảng tỷ giá quy đổi sang VNĐ cho toàn bộ các kênh quốc tế: USD ($25.500$), TH ($715$), SG ($19.200$), MY ($5.850$), PH ($440$), TW ($810$).
  - Đồng bộ 100% số liệu doanh thu thuần, chi phí nền tảng và lợi nhuận gộp giữa `Tab_Analytics.html` và `Tab_BusinessReport.html`.
- **2. Quản Trị Công Nợ & Thanh Toán Từng Phần Nhà Cung Cấp (`Tab_Suppliers.html`)**:
  - Lưu vết `paidAmount` lũy kế và tính toán `debtAmount` còn nợ theo từng phiếu nhập kho.
  - Bổ sung huy hiệu `TRẢ 1 PHẦN` trực quan, bảo vệ công nợ không bị mất dấu và chỉ đóng trạng thái `isPaid: true` khi đã thanh toán đủ 100%.
- **3. Chống Rò Rỉ Bộ Nhớ RAM Canvas & Object URL Trên Mobile (`Modals_Orders.html`)**:
  - Đóng gói Component `SafeCoverImagePreview` tự động giải phóng Object URL thông qua `URL.revokeObjectURL(url)` trong hook cleanup React `useEffect`.
- **4. Bảo Vệ Dữ Liệu Đồng Thời Backend LockService (`Code.js`)**:
  - Bọc `LockService.getScriptLock().waitLock(15000)` kèm `try ... finally { lock.releaseLock(); }` trên toàn bộ các hàm ghi/xóa CSDL: `closeMonthAndArchive`, `cleanUpOldReconciliationJunk`, `autoCleanOrdersData`, `updateAppealStatus`, `hardDeleteOrderAndRelatedData`, `restoreFulfilledFromStock`.
- **5. Chuẩn Hóa Nhận Diện Thương Hiệu Kênh TikTok (`Config.html`)**:
  - Đồng bộ màu badge và inline accent của kênh TikTok sang màu Cyan chuẩn (`#06b6d4`, `bg-[#06b6d4]`).

---

## [v2.16.3] - 2026-08-27

### 🛠️ Triệt Tiêu Khối Code Trùng Lặp Trong summaryStats (`Tab_Orders.html` Hotfix)
- Xóa bỏ hoàn toàn đoạn code thừa bị lặp lại sau dòng `});` trong hook `summaryStats` tại `Tab_Orders.html`.
- Làm sạch 100% các cảnh báo IDE Linter: `',' expected`, `Argument expression expected`, `Declaration or statement expected`.

---

## [v2.16.2] - 2026-08-27

### 🛠️ Sửa Lỗi Cú Pháp Khối Hàm Lọc Thời Gian (`Tab_Orders.html` Hotfix)
- Khắc phục triệt để lỗi syntax `Unexpected token, expected ','` tại khối hàm `matchTimeFilter` và `computeOrderMetadata` trong `Tab_Orders.html`.
- Chuẩn hoá hoàn toàn các khối đóng/mở ngoặc `{ }` và hook `useCallback`/`useMemo` giúp ứng dụng render mượt mà không bị lỗi crash Babel.

---

## [v2.16.1] - 2026-08-27

### 🪵 Đồng Bộ Thuật Toán Khấu Trừ Vật Tư BOM Layout & Bể Kính (`Code.js`)
- **Phân định rõ ràng Bể Kính vs Layout**:
  - Nếu là Layout (Biotop Cuội, Rừng, Bonsai, Đảo Bay... hoặc `type !== 'BỂ KÍNH'`), tuyệt đối không cho chạy vào `calculateGlassTankSpecs`, ngăn chặn việc nhận nhầm kích thước layout `30x20x20` thành bể kính và trừ nhầm kính siêu trong / mài CNC.
- **Tính chuẩn 4 nguyên liệu Layout theo size (đồng bộ 100% `getProductBOMAndCosts`)**:
  - **Nguyên liệu chính**: Phân loại chuẩn xác Đá Cuội (`NLSX-CUOI`), Đá Tai Mèo (`NLSX-TAIMEO`), Nham Thạch (`NLSX-NHAM`), Lũa Săn Miếng (`NLSX-LUASANMIENG`), Lũa Đỗ Quyên (`NLSX-DOQUYEN`), Đá Vỉa (`NLSX-VIA`), Rễ Rừng (`NLSX-RE`), Đá Voi (`NLSX-DAVOI`), v.v. với định mức $2.5 \times (size/30)^{1.4}$ kg.
  - **Keo 502**: `NLSX-502-1CHAI` với định mức $\max(1, \text{round}(1.5 \times size/30))$ chai.
  - **Fomex**: `NLSX-FOMEX-8li` (size < 60) hoặc `NLSX-FOMEX-10li` (size $\ge$ 60) với định mức $0.08 \times (size/30)$ $\text{m}^2$.
  - **Rêu**: `NLSX-REU-A04` với định mức $\text{round}(20 \times size/30)$ gam.
- **Chuẩn hóa UOM**: Quy đổi tự động giữa $\text{m}^2$ - tấm fomex, kg - gam, chai - gram keo khi trừ vào `Products.quantity` và ghi log phiếu xuất kho `ImportExport`.

---

## [v2.16.0] - 2026-08-27

### ⚡ Đại Tu Luồng Dữ Liệu Đơn Hàng - Sản Xuất & Tối Ưu Hiệu Năng (Master Action Plan)
- **1. Single Source of Truth cho `Orders.status` (`Tab_Orders.html`)**:
  - **Triệt tiêu Trạng Thái Ma (Phantom Status)**: Gỡ bỏ việc ghi đè trạng thái ma `computeOrderStatus()` trên RAM Client, trạng thái đơn lấy 100% từ CSDL Google Sheets `Orders.status`.
  - **Tách Warning Badges**: Các trạng thái thiếu tồn kho phụ kiện hoặc thiếu MVĐ chuyển thành cờ `_isMissingAccessories` và `_isMissingMVD` render huy hiệu cảnh báo độc lập, không kéo giật trạng thái đơn.
- **2. Cô Lập Khấu Trừ BOM & Chống Trừ Kép (`Tab_Production.html` & `Code.js`)**:
  - **Xóa Trigger Trừ BOM Client**: Loại bỏ hoàn toàn lệnh gọi `processMaterialDeduction` trực tiếp từ client trên `Tab_Production.html`.
  - **Backend Single Point of Execution**: Khấu trừ BOM được giao duy nhất cho `syncDeltas` trong `Code.js` tự động thực thi 1 lần khi bản ghi lệnh chuyển sang `Done`.
  - **Bổ sung `isExportChannel`**: Mở rộng nhận diện đơn USD/Quốc tế đảm bảo thợ nhận đúng định mức thưởng x3 mà không phát sinh `ReferenceError`.
- **3. Chuẩn Hóa Hạch Toán Doanh Thu & Hàng Hoàn (`Tab_Orders.html`)**:
  - **Hạch toán 0đ cho Đơn Hoàn / Quá hạn 72h**: Đơn hàng bị hoàn hoặc đơn xuất huỷ quá hạn 72h (đã phạt COGS Diệu Hương) được hạch toán doanh thu về đúng `0đ`, không cộng vào `totalSoldOrders` hay `totalRevenue`.
  - **Nâng trần an toàn Doanh thu**: Nâng cấp `parseRevenue` lên trần an toàn 2 Tỷ đồng chống parse nhầm SĐT/mã vận đơn.
  - **Bộ lọc thời gian KPI đa mốc**: Quét toàn bộ `reconciledAt`, `returnedAt`, `date`, `createdAt` không bỏ sót đơn đối soát từ kỳ trước.
- **4. Tối Ưu Giải Phóng Bộ Nhớ RAM Canvas (`Modals_Orders.html`)**:
  - Tự động reset `canvas.width = 1; canvas.height = 1;` và dọn dẹp URL base64 khi unmount `OrderInvoiceModal`, chống tràn RAM khi xem hóa đơn liên tục.

---

## [v2.15.0] - 2026-08-27

### 💎 Tái Cấu Trúc Toàn Diện 6 Phân Hệ Cốt Lõi & Bộ 3 AI Agents Vận Hành (RF Enterprise Core)
- **1. Phân Hệ Đối Soát CTV (`Tab_Affiliate.html`)**:
  - **Triệt tiêu lỗi trừ nợ kép (Double Deduction)**: Phân tách hoàn toàn công nợ đơn hàng và dòng tiền thanh toán; `getOrderExtraExpenses` chỉ tính phụ phí dương gắn đơn (`PHÍ VẬN CHUYỂN`, `PHÍ HOÀN HÀNG`, `KHÁC...`) và bỏ qua các khoản thanh toán / kết chuyển.
  - **Khớp mã phụ phí 1:1**: Chỉ so khớp theo `(code && note.includes(code)) || (id && note.includes(id))`, loại bỏ hoàn toàn quét mờ theo tên khách.
  - **Lọc đơn huỷ, bảo lưu đơn hoàn**: Áp dụng chuẩn `normalizeStatus(o.status) === 'Đơn Huỷ'` để loại bỏ đơn hủy khỏi đối soát nhưng giữ nguyên đơn hoàn phục vụ chốt phí ship hoàn.
- **2. Quản Trị Kho & Chứng Từ (`Tab_Inventory.html` & `Tab_ImportExport.html`)**:
  - **Giao diện Hallmark Data Grid 1-tầng**: Xóa bỏ ma trận thư mục lồng nhau (`activeFolders`), chuyển sang danh sách phẳng kèm 2 nút gạt View Mode linh hoạt giữa **Dạng Thẻ (`VariantGroupCard`)** và **Dạng Bảng (`Compact Table`)**.
  - **Chuẩn hoá Thẻ Kho (`StockHistoryModal`)**: Khớp 3 tầng linh hoạt (`SKU` ➡️ `id` ➡️ fallback tên chính xác), bỏ qua chứng từ `log.type === 'Đặt Hàng'`, lũy kế ngược kèm làm tròn UOM 3 chữ số thập phân (`Math.round(val * 1000) / 1000`).
  - **Chuẩn hoá 4 phân hệ danh mục kho**: Ghim cố định 4 nhánh `BỂ KÍNH`, `LAYOUT`, `PHỤ KIỆN`, `DANH MỤC SẢN XUẤT`.
- **3. Báo Cáo Kinh Doanh & Phân Tích P&L (`Tab_BusinessReport.html` & `Tab_Analytics.html`)**:
  - **Tỷ giá ngoại tệ Shopee Global**: Tự động quy đổi tỷ giá sang VNĐ (TH: 715, SG: 19.200, MY: 5.850, PH: 440, TW: 810, USD: 25.500).
  - **Ngưỡng an toàn thực tế 2 Tỷ đồng**: Nâng cấp `safeNum` với trần an toàn 2.000.000.000đ, ngăn chặn lỗi parse nhầm số điện thoại nhưng không ép các đơn doanh thu lớn về 0.
- **4. Bộ 3 AI Agents Vận Hành & Master Cron (`RFEnterpriseCore.js`)**:
  - Tích hợp 3 Autonomous Agents: `ProductionAgent`, `HRAgent`, `WarehouseAgent`.
  - Khởi tạo `RFEnterpriseCore.setupMasterCron()` gom toàn bộ tiến trình quét ngầm vào duy nhất 1 trigger GAS chu kỳ 15 phút, giải quyết triệt để giới hạn GAS Trigger Quota.

---

## [v2.14.4] - 2026-08-27

### ⚖️ Sửa Lỗi Lưu & Đồng Bộ Dữ Liệu Phân Hệ Trách Nhiệm (Workspaces Hotfix)
- **Khắc Phục Lỗi Crash Form Lập Bàn Giao**: Sửa lỗi truy xuất thuộc tính `ws` rỗng khi bấm nút "Lập Bàn Giao Mới" trong `WorkspaceModal`, đảm bảo mở form và lưu bàn giao thành công 100%.
- **Đồng Bộ Hoàn Toàn Bảng Workspaces Vào React State**: Bổ sung mảng `Workspaces` vào `erpData`, `updateStateWithData`, và `pushDeltas` trong `App_Main.html`, giúp giao diện hiển thị ngay lập tức (Optimistic UI) các trạm làm việc vừa tạo mà không bị mất dữ liệu hay hiển thị trống.
- **Hỗ Trợ Đầy Đủ Deletes Cho ERP Tables**: Cập nhật hàm `pushErpData` để hỗ trợ chuyển tiếp tham số xoá (`deletes`) và thông báo toast tuỳ biến.

---

## [v2.14.3] - 2026-08-27

### 🛠️ Xử Lý Triệt Để Dữ Liệu Rác & Tối Ưu KPI/SLA (Minor Hotfixes)
- **Cập nhật màng lọc Ghost Orders (R6)**: Chặn đứng tình trạng các dòng trống `customer = ""` (do Google Sheets ARRAYFORMULA sinh ra) lọt vào danh sách API, giảm tải đáng kể rác vào RAM trình duyệt.
- **Bảo Toàn Giờ Số Zero (R7)**: Sửa lỗi hàm `readSheet` khi phân giải mốc thời gian 1899 của Google Sheets. Thời điểm `00:00:00` sẽ trả đúng giờ phút giây thay vì bị biến thành chuỗi rỗng.
- **Version hóa cờ Migration (R8)**: Thay thế cờ fix cứng `MIGRATION_V2_10_6_DONE` bằng `LAST_MIGRATION_VERSION` giúp các bản cập nhật CSDL ngầm trong tương lai chạy mượt mà không bị chặn.
- **Sửa Lỗi Khấu Trừ Giờ Trưa Trong Tính SLA (R9)**: Tính toán thời gian thực thi (SLA) sản xuất sẽ tự động trừ đi 1 giờ nghỉ trưa (từ 12:00 - 13:00) theo đúng thực tế, bảo vệ quyền lợi tính KPI của thợ và đo lường chính xác hiệu suất thời gian.

---

## [v2.14.2] - 2026-08-27

### 🚀 Đồng bộ trạng thái hủy trên toàn bộ hệ thống (Single Source of Truth)
- **Triệt để xử lý Unicode inconsistency (R3)**: 
  - Thay thế toàn bộ 13+ vị trí kiểm tra chuỗi `HỦY`, `HUỶ`, `HỦY/VỠ` thủ công bằng hàm `normalizeStatus()`.
  - Đảm bảo tính nhất quán dữ liệu ở mức tuyệt đối cho mọi phân hệ (Tính lương, Tồn kho, Đối soát CTV).
- **Rà soát & Đảm bảo Data Schema (R4)**:
  - Khẳng định các truy xuất thông tin nhân sự đã gọi đúng tên cột quy chuẩn `Tên Nhân Sự` để phòng tránh các lỗi crash ngầm trong khi gọi báo cáo tháng.

---

## [v2.14.1] - 2026-08-27

### 🚀 Khắc phục Trùng lặp Code tính lương (DRY Refactor)
- **Tái Cấu Trúc Động Cơ Tính Lương (Payroll Engine)**:
  - Khắc phục lỗi trùng lặp logic 700+ dòng code giữa `api_syncMasterPayroll` và `generateMonthlySnapshot` bằng hàm lõi `calculatePayrollForUser`, đảm bảo Single Source of Truth.
  - Triệt tiêu rủi ro sai lệch tài chính khi tính lương cuối tháng khi có sự cố mất điện hoặc sửa logic ở một nơi mà quên cập nhật nơi khác.

---

## [v2.14.0] - 2026-08-27

### 🚀 Tối Ưu Hiệu Năng CSDL & Dọn Dẹp Mã Nguồn (Data Audit & Optimization)
- **Chuẩn Hóa Trạng Thái Đơn Hàng Về 1 Nguồn Chân Lý (Single Source of Truth)**:
  - Hàm `normalizeStatus()`: Tự động chuẩn hóa (NFC normalization) và map hơn 20 biến thể Unicode trạng thái từ các sàn TMĐT về 5 giá trị cốt lõi.
  - Hàm `isTerminalStatus()`: Chốt chặn duy nhất thay thế cho 25+ vị trí check inline rải rác toàn hệ thống, đảm bảo tuyệt đối không còn sót trường hợp lỗi font chữ gây kẹt đơn.
- **Nâng Cấp Dung Lượng Đọc CSDL**:
  - Tăng trần giới hạn đọc hàm `readSheet` từ 4000 lên 10000 dòng, cảnh báo tự động khi sắp đầy (thay vì âm thầm cắt mất dữ liệu cũ).
- **Tự Động Hóa Dọn Dẹp Dữ Liệu Rác (Nightly Auto-Archive)**:
  - Tích hợp Trigger `nightlyAutoArchive()` chạy ngầm lúc 2h sáng: Tự động gom các đơn hàng hoàn tất quá 60 ngày sang kho lưu trữ lạnh `Orders_Archive`. Cơ chế bypass PIN giúp bot chạy không bị vướng bảo mật.
- **API Kiểm Kê Sức Khoẻ CSDL (Health Check)**:
  - Lệnh `runDataIntegrityCheck()`: Phát hiện tức thì Lệnh sản xuất mồ côi (Orphan), Trùng ID, Sai lệch Schema, Tồn kho âm, hoặc Bảng phình to quá mức giới hạn.


## [v2.13.0] - 2026-08-26

### ⚖️ Phân Hệ Quản Lý Trách Nhiệm & Bàn Giao Thiết Bị: Từng Dòng, Khấu Hao & Phạt Tự Động
- **Kiểm Kê Từng Dòng Thiết Bị Động (Dynamic Line Items)**:
  - Cho phép khai báo danh mục công cụ, thiết bị theo từng dòng cụ thể: `Tên thiết bị`, `Số lượng`, `Giá trị (VNĐ)` và `Thời gian khấu hao` (3 tháng, 6 tháng, 12 tháng, 24 tháng, 36 tháng hoặc vĩnh viễn).
  - Tự động tính tổng số lượng thiết bị và tổng định giá tài sản của từng trạm làm việc.
- **Bộ Thao Tác Sửa, Xoá, Phạt Trực Tiếp Trên Từng Dòng Thiết Bị**:
  - **Nút Phạt (🚨)**: Cho phép phạt sự cố trực tiếp trên từng món đồ bị hỏng/mất. Hệ thống tự động điền sẵn tên món đồ, nhân sự chịu trách nhiệm và gợi ý mức phạt bằng đúng giá trị món đồ.
  - Tự động sinh bản ghi phạt âm tiền vào bảng `BonusPenalty` để trừ lương cuối tháng và bắn thông báo khẩn cấp qua Ntfy.sh (0ms Push).
  - **Nút Sửa & Xoá (✏️ / 🗑️)**: Cho phép quản trị viên chỉnh sửa hoặc xoá bỏ từng thiết bị khỏi trạm.
- **Phân Quyền Khép Kín (Tối Cao & Nhân Sự Phụ Trách)**:
  - Chỉ tài khoản quyền **TỐI CAO** (`isBoss`) mới có quyền Lập Bàn Giao Mới, Chỉnh sửa thông tin trạm hoặc Xoá trạm.
  - Nhân sự phụ trách chỉ có quyền xem danh sách tài sản được bàn giao và Báo Sự Cố để bảo vệ tính minh bạch.
- **Thiết Kế Bento UI Chuẩn Hallmark Anti-AI-Slop**:
  - Tối ưu Dark mode cao cấp, bảng phân cách dòng tinh xảo, font chữ Plus Jakarta Sans và Monospace chuẩn chỉ.

---

## [v2.12.0] - 2026-08-24

### 👑 Tái Thiết Kế Giao Diện Chuẩn Hallmark & Động Cơ Zero-Latency Chống Lag Toàn Diện
- **Chuẩn Hóa Design System Royal Workbench Dark (Hallmark Anti-AI-Slop)**:
  - Định nghĩa lại toàn bộ bảng mã màu Tokens nhất quán: Obsidian Canvas (`#09090b`), Elevated Cards (`#121215`), Surface Surfaces (`#1a1a20`), viền Hairline tinh xảo (`rgba(255,255,255,0.08)`), Gold Accent (`#d4af37` & `#f0ca5e`).
  - Triệt tiêu hoàn toàn hơn 300 dòng CSS override bằng `!important` gây xung đột style và vỡ giao diện trên các thiết bị khác nhau.
  - Thiết lập phân cấp Typography sắc nét: Tiêu đề dùng `Plus Jakarta Sans` Roman display, nội dung dùng `Inter`, các trường số liệu (Mã đơn, SKU, Tiền, Giờ) dùng `Monospace`.
  - Cung cấp đầy đủ 8 trạng thái tương tác (`default`, `hover`, `active`, `focus-visible`, `disabled`, `loading`, `error`, `success`) cho nút bấm và form điều khiển.
- **Tối Ưu Hiệu Năng Zero-Latency & Triệt Tiêu Cascading Re-renders**:
  - Chuẩn hóa toàn bộ props truyền xuống 12 Tab nghiệp vụ tại `App_Main.html` thành các biến Memoized ổn định (`useMemo`), triệt tiêu hoàn toàn hiện tượng vỡ `React.memo` do inline object literals `{{ ... }}`.
  - Giúp thao tác gõ tìm kiếm, bấm checkbox, hoặc nhận tín hiệu đồng bộ nền không làm kích hoạt re-render ở các tab khác, duy trì tốc độ 60–120 FPS mượt mà.
  - Tích hợp `React.startTransition` và Hardware Acceleration GPU (`rf-tab-view`, `rf-gpu-accelerated`) giúp chuyển tab tức thì với độ trễ tiệm cận 0ms.
- **Khóa Chặt Khung Nhìn Viewport & Responsive Chống Trượt Ngang**:
  - Khóa chặt `overscroll-behavior: none`, `overflow-x: clip` và `touch-action: pan-y pinch-zoom` trên toàn bộ khung viewport.
  - Tối ưu kích thước nút bấm và touch target $\ge 40\text{px}$, chống tràn dòng trên màn hình hẹp 320px–375px.
- **Bảo Toàn Tính Toàn Vẹn 23 Bảng Relational Schema**:
  - Đảm bảo 100% tính toàn vẹn CSDL và cơ chế khóa `LockService.waitLock(15000)` chống đè dữ liệu trên Google Apps Script backend.

---

## [v2.9.7] - 2026-08-23

### 🔍 Bổ Sung Nút & Modal Xem Toàn Diện Thông Tin & Trạng Thái Đơn Hàng CTV
- **Trải Nghiệm Tra Cứu Đơn Hàng Chuẩn Bento Hallmark**:
  - Bổ sung nút **`[👁️ Chi Tiết]`** trên từng thẻ đơn hàng tại Tab Đối Soát CTV.
  - Xây dựng component modal **`AffiliateOrderDetailModal`** hiển thị toàn bộ 5 góc nhìn nghiệp vụ của đơn:
    1. **Thông tin khách hàng & Giao vận**: Tên khách, SĐT (link gọi điện `tel:` và copy), Địa chỉ, Kênh bán, CTV phụ trách, MVĐ kèm link tra cứu trực tiếp hành trình GHN/SPX.
    2. **Hạch toán tài chính & Dư nợ**: Giá bán, Thu COD, Cọc/Trả trước, Phụ phí phát sinh, Dư nợ đơn kèm công thức giải trình chi tiết.
    3. **Tiến độ sản xuất & KCS**: Chi tiết từng Layout/Bể kính, thợ Khâu 1/Khâu 2, thời gian thực hiện, kết quả KCS kèm ảnh trước/hông.
    4. **Tiến độ đóng gói & Xuất kho**: Nhân sự đóng gói, thời gian hoàn tất, ảnh bọc xốp & ảnh thùng hàng hoàn thiện.
    5. **Giao dịch phụ phí liên quan**: Lịch sử các khoản phí phát sinh đã gắn với đơn này.
  - Tích hợp trình xem ảnh phóng to toàn màn hình (Fullscreen Photo Preview).

---

## [v2.9.6] - 2026-08-23

### 🎨 Chuẩn Hóa Hiển Thị Số Tiền Dư CTV (Loại Bỏ Dấu Trừ Gây Nhầm Lẫn)
- **Tối Ưu Trải Nghiệm Đọc Số Liệu Dư Nợ**:
  - Khi đơn hàng hoặc kỳ đối soát có số dư cho CTV (Shop giữ dư tiền trả CTV) $\rightarrow$ Hiển thị trực tiếp `Dư: 14.000đ` (Màu Xanh), loại bỏ hoàn toàn dấu trừ `-` phía trước chữ Dư để tránh cảm giác bị âm/thiếu tiền.
  - Khi CTV nợ Shop $\rightarrow$ Hiển thị `Nợ: +466.000đ` (Màu Đỏ).
  - Tinh chỉnh tiêu đề và nhãn thẻ Bento Card 1 & Card 3: Tự động đổi thành `Shop Dư từ Đơn hàng` / `TỔNG XƯỞNG DƯ TRẢ CTV` khi có số dư.

---

## [v2.9.5] - 2026-08-23

### 🤝 Hoàn Thiện Dư Nợ CTV, Cộng Phụ Phí & Chuẩn Hóa Màu Sắc
- **Cộng Phụ Phí Vào Dư Nợ Đơn Hàng**:
  - Khóa chặt công thức: $\text{Dư Nợ Đơn} = \text{Giá Hàng} + \text{Phụ Phí} - \text{Thu COD} - \text{Cọc}$.
  - Tự động cộng phụ phí phát sinh (ship hoàn, gửi ngoài...) vào số dư nợ của từng đơn hàng cụ thể, đồng thời loại trừ trùng lặp trong tổng quyết toán công nợ cuối kỳ.
- **Chuẩn Hóa Màu Sắc Dư Nợ & Thêm Khung Ghi Chú Quy Ước**:
  - 🔴 **Số ĐỎ (+)**: CTV đang nợ Shop $\rightarrow$ Màu Đỏ nổi bật (`text-rose-400`).
  - 🟢 **Số XANH (-)**: Shop đang giữ tiền dư của CTV (Shop nợ CTV) $\rightarrow$ Màu Xanh (`text-emerald-400`).
  - ⚪ **0đ**: Đã tất toán cân bằng $\rightarrow$ Màu Xám (`text-zinc-400`).
  - Bổ sung khung Banner Chú Thích Quy Ước Màu Sắc thẩm mỹ trên đầu Tab CTV giúp người dùng nhận diện ngay tức thì.
- **Sửa Lỗi Nhãn Trạng Thái Sản Phẩm Trên Thẻ Đơn**:
  - Khắc phục lỗi đơn hàng đã `Hoàn Thành` / `Đối Soát Thành Công` / `Đã Bàn Giao` nhưng bên trong item sản xuất vẫn bị kẹt chữ `"SẴN SÀNG ĐÓNG GÓI"`.
  - Nhãn trạng thái sản phẩm tự động phản chiếu chính xác trạng thái thực tế của đơn hàng (`ĐỐI SOÁT THÀNH CÔNG`, `ĐÃ BÀN GIAO`, `ĐÃ ĐÓNG GÓI - CHỜ BÀN GIAO`).

---

## [v2.9.4] - 2026-08-23

### 🪙 Phân Tách Quỹ Xu Tích Lũy Vào Đúng Bảng ThongKe_TichLuyXu
- **Quy Hoạch Chuẩn Xác Vùng Lưu Trữ Dữ Liệu Xu**:
  - Di chuyển toàn bộ các khoản tặng Xu (`XU_REWARD`, `Boss tặng xu khai ví`) từ bảng tiền mặt `BonusPenalty` sang đúng bảng chuyên biệt **`ThongKe_TichLuyXu`**.
  - Tự động quét dọn và chuyển dịch dữ liệu (migration) các bản ghi Xu trong `BonusPenalty` sang `ThongKe_TichLuyXu`, bảo đảm bảng lương tiền mặt không bị cộng dồn nhầm lẫn.
  - Tích hợp `ThongKe_TichLuyXu` vào `SCHEMA_ERP`, `syncDeltas` và đồng bộ realtime số dư Xu tích lũy hiển thị trên thanh tiêu đề ứng dụng.

---

## [v2.9.3] - 2026-08-23

### 📢 Tách Biệt Thông Báo Hệ Thống Khỏi Nhật Ký Kho Vận
- **Chuyển Đổi Vùng Lưu Trữ Sang Bảng Tài Liệu (Documents)**:
  - Di dời toàn bộ thông báo phát loa của Ban Quản Lý (Boss) từ bảng `ImportExport` (kho hàng) sang bảng `Documents` với phân loại `category: 'THONG_BAO_HE_THONG'`.
  - Ẩn hoàn toàn các bản ghi thông báo hệ thống ngầm khỏi danh sách tài liệu công khai trong `Tab_Documents.html`.
  - Triệt tiêu 100% việc hiển thị nhầm lẫn mã phiếu `SYS_ANNO_...` và badge `THONG_BAO_HE_THONG` trong danh sách chứng từ xuất nhập kho `Tab_ImportExport.html`.

---

## [v2.9.2] - 2026-08-23

### 📱 Tối Ưu Hiển Thị & Chống Trượt Màn Hình Mobile
- **Triệt Tiêu Hiện Tượng Trượt / Bay Màn Hình Ngang Khi Thao Tác**:
  - Khóa chặt `overscroll-behavior: none`, `overflow-x: clip` và `touch-action: pan-y pinch-zoom` trên `html, body, #root` và thẻ `main` trong `Index.html`, `App_Main.html`.
  - Trang bị thuộc tính `overscroll-x-contain` và `touch-pan-x` độc lập cho toàn bộ các thanh danh mục, bộ lọc trạng thái, bảng danh sách chi tiết và modal tạo phiếu ở `Tab_Inventory.html` (Kiểm Kho) và `Tab_ImportExport.html` (Nhật Ký Kho).
  - Khắc phục triệt để lỗi khi người dùng vuốt ngang bảng hoặc cuộn thẻ trên điện thoại làm cả khung ứng dụng bị rung lắc, trôi lệch sang hai bên.

### 📐 Chuẩn Hóa Dư Nợ CTV Bất Biến Cho Mọi Trạng Thái
- **Khóa Chặt Công Thức Dư Nợ**: $\text{Dư Nợ Đơn} = \text{Giá} - \text{Thu COD} - \text{Cọc}$ cho 100% đơn hàng CTV.
- Đơn Hàng Hoàn (`Hàng Hoàn`) hiển thị đúng `COD = 0đ` $\rightarrow$ `Dư Nợ = +Giá` (CTV nợ xưởng giá hàng), kèm phụ phí hoàn hàng `+66.000đ`.

---

## [v2.9.1] - 2026-08-23

### 🤝 Đối Soát Cộng Tác Viên (CTV) & Dòng Tiền Độc Lập
- **Tách Bạch Dư Nợ Âm / Dương Mỗi Đơn**:
  - Hạch toán rõ ràng: Tiền thu COD qua GHN là tiền **XƯỞNG THU VỀ** tài khoản công ty.
  - Dư nợ trên từng đơn hàng:
    - **Số Dương (+)**: CTV Nợ Xưởng (Ví dụ: CTV tự thu tiền trước của khách, Xưởng thu thiếu COD).
    - **Số Âm (-)**: Xưởng Nợ CTV (Ví dụ: Xưởng thu hộ COD thừa tiền đơn hàng, Xưởng cần chuyển khoản trả hoa hồng lại cho CTV).
    - **0đ**: Đã tất toán cân bằng.
- **Bảo Vệ Doanh Thu Gốc & Cách Ly Khỏi Tab Tài Chính**:
  - Sửa hàm `syncGHNViaAPI` trong `Code.js`: Tuyệt đối không ghi đè cột doanh thu (`revenue`) của đơn hàng.
  - Cách ly 100% dòng tiền CTV: Tuyệt đối không tạo bản ghi vào sheet `Transactions` (Tab Tài Chính) của công ty đối với các đơn hàng của Cộng Tác Viên.
- **Tối Ưu Giao Diện Đối Soát CTV Chuẩn Hallmark**:
  - 3 Thẻ Bento Metrics: Dư Nợ Đơn Hàng, Phụ Phí & Đã Thanh Toán, Tổng Quyết Toán Công Nợ Cuối Kỳ.
  - Bổ sung ô tìm kiếm realtime lọc đơn nhanh theo tên khách, mã đơn, mã vận đơn.

### 🛠️ Sửa Lỗi Hệ Thống
- **Khắc Phục Lỗi Trắng Màn Khi Tải Lại Trang**:
  - Thay thế lệnh `window.location.reload()` trong `ChangelogTab` bằng `window.dispatchEvent(new CustomEvent('triggerReloadData'))`, giúp đồng bộ dữ liệu mới nhất trong 0.5s mà không bị gián đoạn hay trắng màn hình trong môi trường Google Apps Script iframe.

---

## [v2.9.0] - 2026-08-23

### 🌟 Tính năng Mới & Chốt Chặn Vận Hành
- **Hộp Đen Đối Soát Thao Tác Thợ (Blackbox Action Logger)**: 
  - Ghi nhận 250 log cục bộ mili-giây, IP, tình trạng kết nối chống chối cãi khi quên bấm nhận lệnh. 
  - Mở xem và đối soát độc quyền bởi Boss phân quyền **TỐI CAO**.
- **Chốt Chặn Poka-Yoke Xác Nhận Lệnh Thông Minh**: 
  - Popup xác nhận hiển thị to rõ tên hàng, mã đơn, định mức và thưởng trước khi bắt đầu tính giờ làm việc.
- **Phản Hồi Xúc Giác & Âm Thanh (Haptic & Web Audio)**: 
  - Phát chuông Chime và rung máy khi nhận việc / hoàn thành lệnh.
- **Bảng Định Mức BOM & Giá Vốn**: 
  - Tích hợp trực tiếp vào thẻ sản xuất với ô KPI Đóng Gói và 2 khâu Dựng Khung / Gia Cố (Layout) & Cắt Dán / Gọt Keo (Bể Kính).
- **Tab Cập Nhật Hệ Thống (ChangelogTab)**:
  - Cho phép toàn bộ nhân sự và quản lý tra cứu chi tiết các tính năng mới sau mỗi lần deploy.
  - Tích hợp bộ lọc tag, ô tìm kiếm và sao chép bản ghi.

### 🎨 Tối Ưu Giao Diện & Trải Nghiệm (UI/UX)
- **Thuần Dark Mode 100%**: Gỡ bỏ hoàn toàn toggle giao diện sáng, tối ưu hoá tương phản OLED và màu Vàng Kim Hoàng Gia `#d4af37`.
- **Tái Cấu Trúc Menu Sidebar**: Phân định 3 nhóm rõ ràng:
  1. `VẬN HÀNH`: Tổng Quan, Đơn Hàng, Sản Xuất, Nhân Sự.
  2. `QUẢN LÝ (KẾ TOÁN & KHO)`: Phân Tích P&L, Báo Cáo KQKD, Kho Hàng, Tài Chính, Đối Tác, Cộng Tác Viên.
  3. `TIỆN ÍCH`: Lỗi & KCS, Tài Liệu, Trình Chiếu 3D, Cập Nhật Hệ Thống.

---

## [v2.8.5] - 2026-08-22

### 🔄 CSDL & Kiến Trúc Dữ Liệu
- **Chuẩn Hoá Relational Schema 23 Bảng**: Khớp 100% tên cột Google Sheets và AppSheet.
- **Tài Chính CTV Tách Biệt**: Cách ly sổ quỹ chính và phiếu tài chính `CTV_Finance`.
- **Lazy-load Đơn Hàng Lưu Trữ (Archive Engine)**: Nạp theo yêu cầu các đơn hàng cũ, giảm 400% dung lượng RAM máy trạm.

---

## [v2.8.0] - 2026-08-20

### 📦 Kho Hàng & Đóng Gói
- **Tự Động Bù Lệnh Sản Xuất Khi Tồn Kho Âm/Thiếu**: Tự động sinh lệnh sản xuất khi đơn sàn TMĐT về mà tồn kho = 0.
- **Pre-flight Check Phụ Kiện**: Tự động rà soát phụ kiện trước khi sang khâu đóng gói.

---

## [v2.7.0] - 2026-08-15

### 🔍 Kiểm Soát Chất Lượng (KCS) & Báo Cáo
- **Image Annotation (Vẽ Khoanh Vùng Lỗi KCS)**: Cho phép Quản lý xưởng vẽ trực tiếp vị trí lỗi lên ảnh để thợ sửa lại.
- **Báo Cáo Sản Lượng Realtime**: Bóc tách sản lượng hoàn thành theo từng khâu và từng nhân sự trong tháng.
