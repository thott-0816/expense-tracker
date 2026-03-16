# Feature Specification: Tab Báo Cáo Chi Tiêu Theo Tháng

**Feature Branch**: `003-reports-tab`  
**Created**: 2026-03-16  
**Status**: Draft  
**Input**: User description: "Sau dashboard và giao dịch, thêm tab Báo cáo để người dùng lọc theo tháng, xem tổng thu, tổng chi, bộ lọc báo cáo, biểu đồ cột thu chi theo tháng, và biểu đồ tròn thu chi theo danh mục."

## Clarifications

### Session 2026-03-16

- Q: Bộ lọc của tab Báo Cáo gồm những điều kiện nào? → A: Bộ lọc gồm tháng và danh mục.
- Q: Biểu đồ cột thu chi theo tháng nên hiển thị phạm vi nào? → A: Chỉ hiển thị đúng 1 tháng đang chọn, với 2 cột thu màu xanh lá và chi màu đỏ nhạt.
- Q: Bộ lọc danh mục có áp dụng lên biểu đồ tròn không? → A: Bộ lọc danh mục áp dụng cho tổng quan và biểu đồ cột, nhưng biểu đồ tròn luôn hiển thị toàn bộ cơ cấu chi của tháng.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Xem Báo Cáo Tổng Quan Theo Tháng (Priority: P1)

Người dùng mở tab Báo cáo để xem nhanh tổng thu, tổng chi trong tháng đã chọn mà không cần đối chiếu thủ công từ danh sách giao dịch.

**Why this priority**: Đây là giá trị cốt lõi của tab mới. Nếu chưa có tổng quan theo tháng thì tab Báo cáo chưa tạo ra khác biệt rõ ràng so với màn Giao dịch.

**Independent Test**: Có thể test độc lập bằng cách chọn một tháng có dữ liệu mẫu và xác nhận tổng thu, tổng chi khớp với tập giao dịch thuộc tháng đó.

**Acceptance Scenarios**:

1. **Given** người dùng mở ứng dụng và điều hướng sang tab Báo cáo, **When** màn hình tải xong, **Then** hệ thống hiển thị tab Báo cáo sau Dashboard và Giao dịch trong điều hướng chính và mở được trang báo cáo.
2. **Given** tab Báo cáo đang hiển thị, **When** người dùng chọn một tháng cụ thể, **Then** hệ thống cập nhật tổng thu và tổng chi đúng theo các giao dịch thuộc tháng đó.

---

### User Story 2 - Lọc Dữ Liệu Báo Cáo (Priority: P2)

Người dùng áp dụng bộ lọc trong tab Báo cáo để giới hạn dữ liệu cần phân tích theo tháng và danh mục.

**Why this priority**: Bộ lọc giúp báo cáo có ích trong thực tế, nhưng chỉ có ý nghĩa sau khi màn hình tổng quan theo tháng đã hoạt động.

**Independent Test**: Có thể test độc lập bằng cách thay đổi tháng hoặc danh mục, sau đó đối chiếu số liệu tổng hợp với tập dữ liệu mong đợi.

**Acceptance Scenarios**:

1. **Given** tab Báo cáo đang hiển thị dữ liệu mặc định, **When** người dùng đổi tháng báo cáo hoặc chọn một danh mục cụ thể, **Then** thẻ tổng hợp và biểu đồ cột được cập nhật đồng bộ theo bộ lọc mới, còn biểu đồ tròn vẫn phản ánh toàn bộ cơ cấu chi tiêu của tháng đã chọn.
2. **Given** tab Báo cáo có bộ lọc danh mục đang được áp dụng, **When** người dùng đặt lại bộ lọc, **Then** hệ thống trở về trạng thái báo cáo mặc định của tháng đang chọn và không giới hạn theo danh mục.
3. **Given** người dùng đã tạo, chỉnh sửa, hoặc xóa giao dịch, hoặc bổ sung danh mục liên quan trong cùng phiên sử dụng, **When** người dùng đang ở tab Báo Cáo hoặc quay lại tab này, **Then** hệ thống hiển thị dữ liệu báo cáo mới nhất phù hợp với tháng và bộ lọc hiện tại mà không yêu cầu tải lại toàn bộ ứng dụng.

---

### User Story 3 - Phân Tích Xu Hướng Và Cơ Cấu Chi Tiêu (Priority: P3)

Người dùng xem biểu đồ cột thu chi của tháng đang chọn và biểu đồ tròn theo danh mục để nhận biết tương quan thu chi và nhóm chi tiêu lớn nhất.

**Why this priority**: Đây là lớp giá trị phân tích sâu hơn sau khi dữ liệu tổng quan và bộ lọc cơ bản đã sẵn sàng.

**Independent Test**: Có thể test độc lập bằng bộ dữ liệu mẫu của một tháng có cả khoản thu và chi, cùng nhiều danh mục, rồi kiểm tra biểu đồ phản ánh đúng số liệu tổng hợp.

**Acceptance Scenarios**:

1. **Given** có dữ liệu trong tháng đã chọn, **When** người dùng xem biểu đồ cột, **Then** hệ thống hiển thị đúng 2 cột đại diện cho tổng thu và tổng chi của tháng đó trên cùng một trục số tiền.
2. **Given** có dữ liệu chi tiêu theo nhiều danh mục trong tháng đã chọn, **When** người dùng xem biểu đồ tròn, **Then** hệ thống hiển thị tỷ trọng chi tiêu theo từng danh mục của toàn bộ tháng đã chọn, không bị giới hạn bởi bộ lọc danh mục.

---

### Edge Cases

- Tháng được chọn không có giao dịch: hệ thống vẫn hiển thị tab Báo cáo, tổng thu và tổng chi bằng 0, đồng thời biểu đồ chuyển sang trạng thái rỗng dễ hiểu.
- Chỉ có giao dịch thu hoặc chỉ có giao dịch chi trong tháng: hệ thống vẫn hiển thị số liệu và biểu đồ hợp lệ, không làm hỏng bố cục hoặc gây hiểu nhầm dữ liệu bị thiếu.
- Chỉ có dữ liệu thu hoặc chỉ có dữ liệu chi trong tháng: biểu đồ cột vẫn hiển thị đủ 2 cột, trong đó cột không có dữ liệu phải có giá trị 0.
- Một danh mục không có giao dịch trong tháng hiện tại: danh mục đó không được đưa vào biểu đồ tròn hoặc được hiển thị với giá trị 0 theo cùng một quy tắc nhất quán trên toàn màn hình.
- Người dùng thay đổi bộ lọc liên tiếp: hệ thống chỉ hiển thị một trạng thái kết quả cuối cùng đúng với bộ lọc hiện tại, không để lẫn dữ liệu cũ và mới.
- Người dùng chọn một danh mục cụ thể: tổng quan và biểu đồ cột chỉ phản ánh danh mục đó, nhưng biểu đồ tròn vẫn phải giữ nguyên cơ cấu chi tiêu của toàn bộ tháng đang xem.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST thêm tab Báo Cáo trong điều hướng chính và đặt tab này sau Dashboard và Giao dịch.
- **FR-002**: System MUST cho phép người dùng mở tab Báo Cáo mà không cần rời khỏi phạm vi ứng dụng hiện tại.
- **FR-003**: System MUST mặc định hiển thị báo cáo của tháng hiện tại khi người dùng mở tab Báo Cáo lần đầu.
- **FR-004**: System MUST cho phép người dùng chọn tháng báo cáo để cập nhật toàn bộ dữ liệu trên màn hình.
- **FR-005**: System MUST hiển thị tổng thu của tập giao dịch thuộc phạm vi báo cáo hiện tại.
- **FR-006**: System MUST hiển thị tổng chi của tập giao dịch thuộc phạm vi báo cáo hiện tại.
- **FR-007**: System MUST cung cấp bộ lọc báo cáo gồm tháng và danh mục để người dùng thu hẹp dữ liệu phân tích trong tab Báo Cáo.
- **FR-008**: System MUST áp dụng bộ lọc báo cáo một cách nhất quán cho thẻ tổng hợp và biểu đồ cột trong cùng màn hình.
- **FR-009**: System MUST cung cấp hành động đặt lại bộ lọc để trở về trạng thái mặc định của tháng đang chọn và bỏ giới hạn danh mục.
- **FR-010**: System MUST hiển thị biểu đồ cột của đúng tháng đang chọn với 2 cột riêng biệt đại diện cho tổng thu và tổng chi trên cùng trục số tiền.
- **FR-011**: System MUST hiển thị biểu đồ tròn thể hiện cơ cấu chi tiêu theo danh mục của toàn bộ tháng đã chọn, không bị giới hạn bởi bộ lọc danh mục.
- **FR-012**: System MUST làm mới dữ liệu báo cáo đang hiển thị hoặc dữ liệu được hiển thị khi người dùng quay lại tab Báo Cáo trong cùng phiên sử dụng sau khi giao dịch hoặc danh mục liên quan thay đổi, mà không yêu cầu tải lại toàn bộ ứng dụng.
- **FR-013**: System MUST hiển thị trạng thái rỗng rõ ràng khi không có dữ liệu phù hợp với tháng hoặc bộ lọc hiện tại.
- **FR-014**: System MUST hiển thị thông báo lỗi thân thiện khi dữ liệu báo cáo không tải được hoặc bộ lọc không hợp lệ.
- **FR-015**: System MUST đảm bảo mọi số liệu hiển thị trong tab Báo Cáo có thể đối soát về cùng một tập giao dịch nguồn.

### Key Entities *(include if feature involves data)*

- **Report Filter**: Đại diện tập điều kiện đang dùng để tạo báo cáo, gồm tháng báo cáo và danh mục đang được chọn để lọc số liệu tổng hợp.
- **Monthly Report Summary**: Đại diện phần tổng quan của báo cáo theo phạm vi hiện tại, gồm tổng thu, tổng chi và khoảng thời gian đang được xem.
- **Monthly Income Expense Series**: Đại diện dữ liệu dùng cho biểu đồ cột của tháng đang chọn, gồm 2 giá trị tổng thu và tổng chi để so sánh trực tiếp.
- **Category Expense Distribution**: Đại diện dữ liệu phân bổ chi tiêu theo danh mục của toàn bộ tháng đã chọn, gồm danh mục, giá trị chi và tỷ trọng tương ứng, không phụ thuộc bộ lọc danh mục đang áp dụng cho phần tổng quan.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Người dùng có thể mở tab Báo Cáo và đọc được tổng thu, tổng chi của tháng hiện tại trong tối đa 10 giây kể từ lúc vào màn hình.
- **SC-002**: 100% số liệu tổng thu và tổng chi trên tab Báo Cáo khớp với tập giao dịch nguồn trong phạm vi tháng và bộ lọc đang áp dụng, còn biểu đồ tròn khớp với toàn bộ chi tiêu của tháng đã chọn.
- **SC-003**: Khi thay đổi tháng, thay đổi bộ lọc, hoặc khi dữ liệu giao dịch hay danh mục liên quan vừa được cập nhật trong cùng phiên sử dụng, hệ thống cập nhật đầy đủ thẻ tổng hợp và biểu đồ trong tối đa 2 giây với bộ dữ liệu đến 10.000 giao dịch, trong đó biểu đồ cột luôn hiển thị đúng 2 cột thu và chi của tháng đang chọn.
- **SC-004**: Trong 100% bộ dữ liệu thử nghiệm có ít nhất 3 danh mục chi tiêu trong tháng được chọn, tab Báo Cáo hiển thị đủ thông tin để người dùng xác định được danh mục chi tiêu lớn nhất mà không cần chuyển sang màn hình khác.
- **SC-005**: Trong các tháng không có dữ liệu, 100% phiên thử nghiệm hiển thị trạng thái rỗng rõ ràng thay vì lỗi hoặc biểu đồ sai lệch.

## Assumptions

- Tab Báo Cáo sử dụng cùng nguồn dữ liệu giao dịch và danh mục đã tồn tại trong ứng dụng hiện tại.
- Phạm vi người dùng của ứng dụng vẫn là một người dùng trong mỗi môi trường vận hành.
- Bộ lọc báo cáo của phase này chỉ bao gồm chọn tháng và danh mục.
- Biểu đồ tròn trong phase này tập trung vào cơ cấu chi tiêu theo danh mục; cơ cấu thu theo danh mục không nằm trong phạm vi mặc định.
- Bộ lọc danh mục chỉ tác động lên phần tổng quan và biểu đồ cột; biểu đồ tròn luôn dùng toàn bộ dữ liệu chi của tháng đang chọn để giữ giá trị phân tích cơ cấu.
- Biểu đồ cột của phase này chỉ dùng để so sánh tổng thu và tổng chi trong đúng tháng đang chọn, không mở rộng thành chuỗi nhiều tháng.
- Trong cùng một phiên sử dụng, việc tạo, sửa, xóa giao dịch hoặc bổ sung danh mục liên quan được xem là thay đổi nguồn dữ liệu cần phản ánh lại ở tab Báo Cáo mà không cần tải lại toàn bộ ứng dụng.

## Dependencies

- Cần có dữ liệu giao dịch đã được phân loại bằng danh mục để tổng hợp báo cáo theo tháng.
- Cần có quy tắc tính toán nhất quán giữa màn Giao dịch, Dashboard và tab Báo Cáo để tránh sai lệch số liệu.
- Cần có khả năng hiển thị dữ liệu tổng hợp và trực quan hóa trong giao diện hiện tại của ứng dụng.

## Scope Notes

- Feature này chỉ bổ sung tab Báo Cáo và các nội dung liên quan đến phân tích theo tháng; không mở rộng sang dự báo, ngân sách, hoặc cảnh báo vượt chi.
- Feature này không thay đổi hành vi nhập liệu giao dịch ngoài yêu cầu đồng bộ dữ liệu báo cáo sau khi giao dịch thay đổi.

## Language and Readability

- Spec SHOULD be written in Vietnamese for internal team clarity unless external
  stakeholders explicitly require English.
