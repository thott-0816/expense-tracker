# Research - Tab Báo Cáo Chi Tiêu Theo Tháng

## Decision 1: API báo cáo riêng
- Decision: Tạo endpoint riêng cho tab Báo Cáo tại `GET /api/reports/monthly`.
- Rationale: Tách rõ trách nhiệm với dashboard hiện có, để mở rộng contract báo cáo mà không ảnh hưởng logic dashboard period day/week/month.
- Alternatives considered: Tái sử dụng `GET /api/dashboard` (không phù hợp vì contract khác, dễ làm mơ nghĩa period và bộ lọc danh mục).

## Decision 2: Input bộ lọc báo cáo
- Decision: Bộ lọc cho API báo cáo chỉ gồm `month` và `categoryId`.
- Rationale: Bám sát clarify trong spec, giảm độ phức tạp, dễ test và đối soát.
- Alternatives considered: Thêm `kind`, `keyword`, `dateRange` (vượt phạm vi feature, tăng nguy cơ sai lệch với spec).

## Decision 3: Nguồn dữ liệu cho từng widget
- Decision: Tổng quan và biểu đồ cột dùng tập dữ liệu đã áp bộ lọc danh mục; biểu đồ tròn luôn dùng toàn bộ chi tiêu của tháng đã chọn.
- Rationale: Duy trì giá trị phân tích cơ cấu chi tiêu, đồng thời vẫn cho phép khoanh vùng danh mục trên phần tổng quan.
- Alternatives considered: Áp bộ lọc danh mục lên tất cả widget (biểu đồ tròn mất ý nghĩa khi chỉ còn 1 danh mục).

## Decision 4: Đại diện dữ liệu biểu đồ cột
- Decision: Biểu đồ cột có đúng 2 cột: `income` và `expense` của duy nhất tháng đang chọn.
- Rationale: Bám sát clarify, trình bày gọn, dễ nhìn trên mobile.
- Alternatives considered: Chuỗi 6/12 tháng (không đúng yêu cầu đã chốt trong clarify).

## Decision 5: Kỹ thuật render biểu đồ
- Decision: Sử dụng thư viện biểu đồ React (đề xuất Recharts) cho cột và tròn.
- Rationale: Recharts có `ResponsiveContainer`, `BarChart`, và `PieChart` phù hợp cho client component trong Next.js App Router, giảm rủi ro responsive/layout và hỗ trợ accessibility tốt hơn so với tự dựng SVG.
- Alternatives considered: Tự vẽ bằng CSS/SVG (nhanh cho bản đơn giản nhưng tốn công bảo trì và edge cases tooltip/legend).

## Decision 6: Mục tiêu hiệu năng cho báo cáo
- Decision: p95 <= 2 giây cho thao tác đổi tháng hoặc đổi danh mục với bộ dữ liệu đến 10.000 giao dịch.
- Rationale: Đồng bộ với SC trong spec và benchmark hiện có của repo.
- Alternatives considered: Mục tiêu chặt hơn <= 1 giây (dễ vỡ gate khi mới thêm biểu đồ và aggregate).

## Decision 7: Validation và error contract
- Decision: Validate query params tại API boundary (month format YYYY-MM, categoryId optional), trả lời theo error contract chung.
- Rationale: Đặt trust boundary rõ ràng, thông điệp lỗi nhất quán với hệ thống API hiện tại.
- Alternatives considered: Validate ở client là chính (không đủ an toàn, dễ lộ lỗi logic server).

## Decision 8: Làm mới dữ liệu báo cáo trong cùng phiên
- Decision: Dữ liệu báo cáo được lấy bằng fetch `no-store`, refetch khi vào lại tab Báo Cáo hoặc khi màn hình lấy lại focus, đồng thời mở rộng `revalidateExpenseData()` để bao phủ `/reports` sau mutation giao dịch hoặc tạo danh mục.
- Rationale: Cách này bám pattern hiện có của repo, đáp ứng FR-012 mà không cần thêm global state store, WebSocket, hay cơ chế đồng bộ phức tạp.
- Alternatives considered: Event bus toàn cục trên client hoặc realtime push (vượt nhu cầu hiện tại, tăng complexity không cần thiết).

## Decision 9: Kiểm thử hồi quy
- Decision: Thêm unit tests cho hàm aggregate báo cáo, contract test cho API reports, integration test cho hành vi bộ lọc/widget/same-session refresh, và e2e smoke cho luồng tab Báo Cáo.
- Rationale: Bám constitutional quality gate và giảm rủi ro phá vỡ luồng Dashboard/Giao dịch đã có.
- Alternatives considered: Chỉ test UI integration (thiếu bao phủ trust boundary API và xử lý edge case dữ liệu).
