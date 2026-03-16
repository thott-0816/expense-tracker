# Feature Specification: Ứng Dụng Theo Dõi Thu Chi Và Báo Cáo Chi Tiêu Hàng Tháng

**Feature Branch**: `002-expense-tracker-report`  
**Created**: 2026-03-14  
**Status**: Ready for Implementation  
**Input**: User description: "Xây dựng ứng dụng theo dõi thu/chi, phân loại và báo cáo chi tiêu hàng tháng. Người dùng tạo Transactions (thu/chi), gán Category, xem Dashboard theo ngày/tuần/tháng. Hỗ trợ lọc, tìm kiếm, và export CSV đơn giản."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Quản Lý Giao Dịch Thu Chi (Priority: P1)

Người dùng thêm, chỉnh sửa, và xóa giao dịch thu/chi để ghi nhận dòng tiền hằng ngày.

**Why this priority**: Đây là giá trị cốt lõi của ứng dụng. Nếu không có giao dịch thì không thể phân tích và báo cáo.

**Independent Test**: Có thể test độc lập bằng cách tạo giao dịch thu/chi, cập nhật thông tin, và kiểm tra danh sách phản ánh đúng.

**Acceptance Scenarios**:

1. **Given** người dùng mở form tạo giao dịch, **When** người dùng nhập đủ trường bắt buộc và lưu, **Then** hệ thống tạo giao dịch mới đúng loại và số tiền.
2. **Given** đã tồn tại một giao dịch, **When** người dùng sửa danh mục hoặc số tiền và lưu, **Then** hệ thống cập nhật ngay trên danh sách giao dịch.

---

### User Story 2 - Xem Dashboard Theo Tháng (Priority: P2)

Người dùng xem dashboard tổng quan tháng hiện tại để biết tổng thu, tổng chi, chênh lệch, và phân bổ chi tiêu theo danh mục.

**Why this priority**: Dashboard là giá trị phân tích sau khi có dữ liệu giao dịch, giúp người dùng ra quyết định chi tiêu.

**Independent Test**: Có thể test độc lập bằng dữ liệu mẫu tháng hiện tại để xác nhận aggregate tổng thu, tổng chi, số dư, và phân bổ danh mục đúng.

**Acceptance Scenarios**:

1. **Given** có giao dịch thu và chi trong tháng hiện tại, **When** dashboard tải xong, **Then** hệ thống hiển thị tổng thu, tổng chi, và số dư tháng rõ ràng.
2. **Given** có nhiều giao dịch với các danh mục khác nhau, **When** dashboard tải xong, **Then** hệ thống hiển thị phân bổ chi tiêu theo danh mục với tỉ lệ phần trăm chính xác.

---

### User Story 3 - Lọc Tìm Kiếm Và Export CSV (Priority: P3)

Người dùng lọc giao dịch theo khoảng ngày, loại giao dịch, danh mục; tìm kiếm theo từ khóa và xuất CSV để đối soát.

**Why this priority**: Đây là tầng giá trị bổ sung cho nhu cầu truy xuất dữ liệu, nhưng phụ thuộc vào việc có dữ liệu và dashboard cơ bản.

**Independent Test**: Có thể test độc lập bằng cách áp bộ lọc, tìm kiếm, sau đó xuất CSV và đối chiếu file với kết quả đang hiển thị.

**Acceptance Scenarios**:

1. **Given** danh sách giao dịch có nhiều bản ghi, **When** người dùng lọc theo danh mục và khoảng ngày, **Then** hệ thống chỉ hiển thị các bản ghi hợp lệ.
2. **Given** đang hiển thị kết quả đã lọc, **When** người dùng bấm export CSV, **Then** hệ thống tạo file CSV chứa đúng cột và toàn bộ bản ghi theo bộ lọc hiện tại (không giới hạn theo trang đang xem).

---

### Edge Cases

- Người dùng nhập số tiền bằng 0 hoặc âm: hệ thống chặn lưu và hiển thị thông báo lỗi rõ ràng.
- Không có giao dịch trong khoảng thời gian đã chọn: dashboard và danh sách hiển thị trạng thái rỗng, không coi là lỗi hệ thống.
- Từ khóa tìm kiếm không khớp: hệ thống trả kết quả rỗng và giữ nguyên bộ lọc hiện tại.
- File CSV có ký tự đặc biệt trong mô tả: hệ thống vẫn xuất file hợp lệ để mở bằng công cụ bảng tính thông dụng.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST cho phép tạo giao dịch mới với các trường bắt buộc: loại (thu/chi), số tiền, ngày phát sinh, danh mục.
- **FR-002**: System MUST cho phép cập nhật và xóa giao dịch đã tồn tại.
- **FR-003**: System MUST sắp xếp danh sách giao dịch theo ngày phát sinh giảm dần mặc định.
- **FR-004**: System MUST cung cấp dashboard tổng hợp theo tháng hiện tại.
- **FR-005**: System MUST hiển thị tổng thu, tổng chi, số dư trong khoảng thời gian đã chọn.
- **FR-006**: System MUST hỗ trợ lọc theo khoảng ngày, loại giao dịch, và danh mục.
- **FR-007**: System MUST hỗ trợ tìm kiếm theo từ khóa trên mô tả giao dịch hoặc tên danh mục.
- **FR-008**: System MUST cho phép export CSV toàn bộ giao dịch theo bộ lọc/tìm kiếm hiện tại, không giới hạn theo phân trang.
- **FR-009**: System MUST cho phép tạo và liệt kê danh mục để người dùng gán cho giao dịch trong phạm vi phase 1.
- **FR-010**: System MUST thông báo lỗi thân thiện cho người dùng khi dữ liệu đầu vào không hợp lệ.
- **FR-011**: System MUST ghi nhận dấu vết thời gian tạo và cập nhật cho mỗi giao dịch.
- **FR-012**: System MUST đảm bảo dữ liệu dashboard cập nhật khi giao dịch thay đổi trong cùng phiên làm việc.

### Key Entities *(include if feature involves data)*

- **Transaction**: Đại diện một khoản thu hoặc chi, gồm loại giao dịch, số tiền, ngày phát sinh, danh mục, mô tả, ngày tạo, ngày cập nhật.
- **Category**: Đại diện nhóm phân loại giao dịch, gồm tên danh mục, mô tả tùy chọn, và phạm vi áp dụng.
- **Dashboard Aggregate**: Tập chỉ số tổng hợp theo khoảng thời gian đã chọn, gồm tổng thu, tổng chi, số dư, phân bổ theo danh mục.
- **Filter Query**: Tập điều kiện lọc và tìm kiếm hiện tại, gồm khoảng ngày, loại giao dịch, danh mục, và từ khóa.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Người dùng có thể tạo một giao dịch hợp lệ trong tối đa 30 giây.
- **SC-002**: 100% giao dịch hợp lệ được hiển thị trong danh sách và được tính vào dashboard sau khi lưu.
- **SC-003**: Kết quả lọc/tìm kiếm được trả về trong <= 2 giây với bộ dữ liệu đến 10.000 giao dịch.
- **SC-004**: Tỷ lệ export CSV thành công đạt ít nhất 95% trong các trường hợp hợp lệ.
- **SC-005**: Người dùng hoàn thành luồng xem báo cáo tháng (chọn khoảng + đọc tổng hợp) trong <= 15 giây.
- **SC-006**: Ít nhất 90% người dùng thử nghiệm tìm thấy giao dịch cần đối soát ngay lần thao tác đầu tiên.

## Assumptions

- Phiên bản đầu là ứng dụng cho một người dùng trong mỗi môi trường sử dụng.
- Đơn vị tiền tệ được cấu hình thống nhất trong toàn bộ ứng dụng.
- CSV là định dạng xuất duy nhất trong phạm vi feature này.
- Dashboard không bao gồm dự báo tương lai; chỉ phân tích dữ liệu đã ghi nhận.

## Dependencies

- Cần có cơ chế lưu trữ bền vững cho transactions và categories.
- Cần có cơ chế tải file từ client để người dùng nhận tệp CSV.
- Cần có quy tắc validation nhất quán cho input giao dịch và danh mục.

## Scope Notes

- Phase 1 chỉ bao gồm tạo và sử dụng category; chỉnh sửa/xóa category sẽ được xem xét ở phase sau.

## Language and Readability

- Spec SHOULD be written in Vietnamese for internal team clarity unless external
  stakeholders explicitly require English.
