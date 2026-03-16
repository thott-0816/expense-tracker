# Quickstart - Expense Tracker Report

## 1) Chạy project

1. Đảm bảo đang dùng Node.js 24 LTS.
2. Cài dependencies:
   - npm install
3. Tạo file môi trường:
   - cp .env.example .env
4. Tạo Prisma client và apply migration:
   - npm run db:generate
   - npx prisma migrate deploy
5. Seed dữ liệu mặc định:
   - npm run db:seed
3. Chạy dev server:
   - npm run dev
4. Mở: http://localhost:3000

## 2) Chuẩn bị dữ liệu mẫu

1. Tạo categories:
   - Food (expense)
   - Transport (expense)
   - Salary (income)
2. Tạo tối thiểu 10 transactions ở nhiều ngày khác nhau.

## 3) Kiểm thử User Story 1 (Transactions CRUD)

1. Tạo giao dịch thu và chi.
2. Sửa amount/category của giao dịch.
3. Xóa một giao dịch.
4. Xác nhận danh sách transactions cập nhật đúng.

## 4) Kiểm thử User Story 2 (Dashboard)

1. Mở dashboard.
2. Kiểm tra totalIncome, totalExpense, balance hiển thị đúng cho tháng hiện tại.
3. Kiểm tra phân bổ chi tiêu theo danh mục hiển thị đúng tỉ lệ.

## 5) Kiểm thử User Story 3 (Filter/Search/CSV)

1. Áp bộ lọc theo category và khoảng ngày.
2. Tìm kiếm theo keyword trong note.
3. Kiểm tra danh sách phân trang đúng (dùng điều khiển page/pageSize).
4. Export CSV.
5. Mở file CSV và xác nhận file chứa **toàn bộ** bản ghi theo bộ lọc, không chỉ trang đang xem.

## 6) Quality gates trước merge

1. Lint:
   - npm run lint
2. Type-check:
   - npm run typecheck
3. Tests:
   - npm run test
4. E2E smoke:
   - npm run test:e2e
5. Benchmark:
   - npm run db:seed:perf
   - npm run benchmark
4. Nếu là bug fix: bổ sung regression test fail-trước/pass-sau.

## 7) Security checks

1. Validate input tại route handlers.
2. Không commit secrets vào repository.
3. Không log dữ liệu nhạy cảm.

## 8) CI parity

1. Trước khi mở PR, chạy nhanh:
   - npm run validate
2. Nếu thay đổi UI flow quan trọng, chạy thêm:
   - npm run test:e2e
3. Nếu thay đổi filter/dashboard/export, chạy thêm:
   - npm run benchmark
