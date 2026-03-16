# Expense Tracker Report

Ứng dụng Next.js App Router này quản lý giao dịch thu chi, dashboard tổng hợp theo kỳ, và export CSV theo tập dữ liệu đang xem. Quy trình đặc tả và implement được vận hành bằng SpecKit.

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

## CI

Workflow [./.github/workflows/ci.yml](./.github/workflows/ci.yml) chạy lint, typecheck, unit/contract/integration tests, performance validation, và Playwright smoke tests cho mỗi pull request.
