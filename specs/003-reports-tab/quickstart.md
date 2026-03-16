# Quickstart - Tab Báo Cáo Chi Tiêu Theo Tháng

## 1) Chạy project

1. Cài dependencies:
   - npm install
2. Chuẩn bị CSDL:
   - npm run db:generate
   - npx prisma migrate deploy
   - npm run db:seed
3. Chạy dev server:
   - npm run dev
4. Mở ứng dụng:
   - http://localhost:3000

## 2) Kiểm thử User Story 1 (Tổng quan theo tháng)

1. Mở tab Báo Cáo trong điều hướng chính.
2. Chọn 1 tháng có dữ liệu.
3. Kiểm tra card tổng thu, tổng chi cập nhật đúng.
4. Đối soát với giao dịch của đúng tháng đã chọn.

## 3) Kiểm thử User Story 2 (Bộ lọc tháng + danh mục)

1. Chọn tháng hiện tại.
2. Chọn danh mục cụ thể trong bộ lọc.
3. Xác nhận card tổng hợp và biểu đồ cột thay đổi theo danh mục.
4. Bấm đặt lại bộ lọc, xác nhận trở về trạng thái mặc định của tháng đang chọn.

## 4) Kiểm thử User Story 3 (Biểu đồ cột + biểu đồ tròn)

1. Ở tháng đã chọn, kiểm tra biểu đồ cột chỉ có 2 cột Thu/Chi.
2. Nếu tháng chỉ có thu hoặc chỉ có chi, xác nhận cột còn lại có giá trị 0.
3. Áp bộ lọc danh mục, xác nhận biểu đồ cột thay đổi theo danh mục.
4. Xác nhận biểu đồ tròn vẫn hiển thị toàn bộ cơ cấu chi của tháng (không bị giới hạn theo danh mục).

## 5) Kiểm thử FR-012 (đồng bộ dữ liệu trong cùng phiên)

1. Mở tab Giao dịch và tạo mới hoặc chỉnh sửa một giao dịch thuộc tháng đang được xem ở tab Báo Cáo.
2. Điều hướng sang tab Báo Cáo hoặc quay lại tab này trong cùng phiên sử dụng.
3. Xác nhận card tổng hợp và biểu đồ phản ánh dữ liệu mới nhất mà không cần tải lại toàn bộ ứng dụng.
4. Tạo mới một danh mục, sau đó quay lại tab Báo Cáo và xác nhận bộ lọc danh mục hiển thị dữ liệu mới nhất.

## 6) Quality gates trước merge

1. npm run lint
2. npm run typecheck
3. npm run test
4. npm run test:e2e
5. Nếu có thay đổi aggregate/performance:
   - npm run db:seed:perf
   - npm run benchmark

## 7) Regression checklist

1. Dashboard hiện tại không bị ảnh hưởng period day/week/month.
2. Transaction list/filter/export vẫn giữ hành vi cũ.
3. API báo cáo trả lời đúng error contract khi query không hợp lệ.
4. Sau mutation giao dịch hoặc tạo danh mục, báo cáo có thể làm mới đúng trong cùng phiên sử dụng.

## 8) Kết quả quality gate gần nhất

- `npm run lint`: pass.
- `npm run typecheck`: pass.
- `npm run test`: pass (`19` test files, `50` tests).
- `CI=1 npm run test:e2e`: pass (`6` tests).
- `npm run test:perf`: pass (`4` tests), bao gồm benchmark refresh report `2000` lượt tính toán trong ngân sách.

Lưu ý: local có thể có tiến trình `next dev` khác đang giữ `.next/dev/lock`. Khi đó nên chạy e2e bằng `CI=1 npm run test:e2e` để Playwright dùng build/start mode và tránh xung đột lock.
