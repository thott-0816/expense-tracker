# Expense Tracker Report

Ứng dụng Next.js App Router này quản lý giao dịch thu chi, dashboard tổng hợp theo kỳ, và export CSV theo tập dữ liệu đang xem. Quy trình đặc tả và implement được vận hành bằng SpecKit.

## Tính năng theo từng màn

### Dashboard

- Xem tổng quan thu/chi.
- Hiển thị tổng thu, tổng chi, số dư và phân bổ chi tiêu theo danh mục.

### Giao dịch

- Tạo, chỉnh sửa, xóa giao dịch thu/chi.
- Gắn danh mục cho từng giao dịch, hỗ trợ lọc và tìm kiếm.
- Export CSV theo đúng tập dữ liệu đang hiển thị sau lọc.

### Báo cáo

- Tab Báo Cáo (feature `003-reports-tab`) bổ sung sau Dashboard và Giao dịch.
- Lọc theo tháng và danh mục.
- Hiển thị tổng thu, tổng chi theo bộ lọc đang chọn.
- Biểu đồ cột gồm 2 cột Thu/Chi cho đúng tháng đang xem.
- Biểu đồ tròn hiển thị cơ cấu chi tiêu theo danh mục của toàn bộ tháng.

## Prerequisites

- Node.js 24+
- npm

## Local setup

```bash
npm install
cp .env.example .env
npm run db:generate
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Mở http://localhost:3000 để vào transaction workspace và http://localhost:3000/dashboard để xem dashboard.

## Quality commands

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run test:perf
npm run validate
```

## Benchmark data

Dữ liệu benchmark dùng để stress filter, dashboard, và CSV export:

```bash
npm run db:seed:perf
npm run benchmark
```

Script benchmark seed tạo 5000 giao dịch có đánh dấu `[perf]` để có thể seed lại an toàn mà không ảnh hưởng dữ liệu thủ công.

## SpecKit workflow

Slash commands có sẵn trong Copilot Chat:

- `/speckit.constitution`
- `/speckit.specify`
- `/speckit.plan`
- `/speckit.tasks`
- `/speckit.implement`
- `/speckit.clarify`
- `/speckit.analyze`
- `/speckit.checklist`

## Context7 trong development workflow

Repo này có cấu hình MCP server Context7 để hỗ trợ tra cứu tài liệu chính thức của thư viện và framework trong quá trình phát triển. Khi cần xác minh API, cấu hình, hoặc best practices theo version của Next.js, React, Prisma, Zod, hoặc Playwright, Copilot có thể dùng Context7 trước khi đề xuất cách triển khai trong codebase này.

## CI

Workflow [./.github/workflows/ci.yml](./.github/workflows/ci.yml) chạy lint, typecheck, unit/contract/integration tests, performance validation, và Playwright smoke tests cho mỗi pull request.
