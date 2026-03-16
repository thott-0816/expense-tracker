# Research - Expense Tracker Report

## Decision 1: Kiến trúc hệ thống
- Decision: Sử dụng single Next.js App Router project.
- Rationale: Scope hiện tại tập trung 1 domain nghiệp vụ, tránh chi phí vận hành cao của mô hình tách service.
- Alternatives considered: Tách backend API riêng (bị loại vì tăng boilerplate deploy/monitoring).

## Decision 2: Lưu trữ dữ liệu
- Decision: Sử dụng SQLite thông qua Prisma ORM.
- Rationale: Phù hợp phase 1 với quy mô đến 10k transactions, migration rõ ràng, setup nhanh.
- Alternatives considered: PostgreSQL (mạnh hơn khi scale lớn nhưng chưa cần thiết); localStorage (khó truy vấn aggregate).

## Decision 3: Validation và trust boundaries
- Decision: Validate payload tại route handlers bằng Zod schemas.
- Rationale: Đảm bảo input hợp lệ ở trust boundary, thông điệp lỗi có cấu trúc, đúng constitutional security gate.
- Alternatives considered: Chỉ validate client (không an toàn); validate thủ công (dễ sót edge cases).

## Decision 4: Dashboard aggregate
- Decision: Aggregate tại server theo period day/week/month.
- Rationale: Giảm payload và tránh sai lệch khi client tự tính toán.
- Alternatives considered: Tính trên client từ full dataset (không tối ưu khi dữ liệu lớn).

## Decision 5: Lọc tìm kiếm
- Decision: Hỗ trợ kết hợp filter (date range/kind/category) + keyword search trên note/category.
- Rationale: Bám sát FR-006 FR-007 và nhu cầu đối soát thực tế.
- Alternatives considered: Chỉ filter hoặc chỉ search (không đủ bao phủ use case).

## Decision 6: Export CSV
- Decision: Export theo tập kết quả đang hiển thị sau filter/search.
- Rationale: Đúng FR-008 và kỳ vọng người dùng "what you see is what you export".
- Alternatives considered: Export toàn bộ records không theo filter (dễ gây nhầm lẫn).

## Decision 7: Quality gates
- Decision: Áp dụng lint + type-check + unit/integration + smoke e2e.
- Rationale: Đáp ứng constitution quality gate, cân bằng tốc độ và độ tin cậy.
- Alternatives considered: Chỉ unit tests (thiếu bao phủ luồng API/UI), chỉ e2e (thời gian chạy dài và khó debug).

## Decision 8: Logging và operability
- Decision: Logging có cấu trúc cho thao tác CRUD + export, ẩn danh/bỏ qua dữ liệu nhạy cảm.
- Rationale: Đáp ứng principle Simplicity and Operability + Security.
- Alternatives considered: Log toàn bộ payload (rủi ro lộ dữ liệu), không log (khó điều tra sự cố).
