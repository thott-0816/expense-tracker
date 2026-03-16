# Implementation Plan: Tab Báo Cáo Chi Tiêu Theo Tháng

**Branch**: `003-reports-tab` | **Date**: 2026-03-16 | **Spec**: /home/tran.thi.tho@sun-asterisk.com/workspace/expense-tracker/specs/003-reports-tab/spec.md
**Input**: Feature specification from `/specs/003-reports-tab/spec.md`

## Summary

Bổ sung tab Báo Cáo sau Dashboard và Giao dịch, hỗ trợ lọc theo tháng và danh mục,
hiển thị tổng thu/tổng chi, biểu đồ cột 2 giá trị của đúng tháng đang chọn, và
biểu đồ tròn cơ cấu chi tiêu theo danh mục của toàn bộ tháng. Hướng kỹ thuật là
thêm API báo cáo riêng, aggregate dữ liệu ở server theo pattern dashboard hiện có,
dùng chart component client-side, và đảm bảo dữ liệu báo cáo được làm mới trong
cùng phiên sử dụng sau các thay đổi giao dịch hoặc danh mục liên quan.

Map user stories -> success criteria:
- US1 (Tổng quan theo tháng) -> SC-001, SC-002
- US2 (Bộ lọc tháng + danh mục, đồng bộ cùng phiên) -> SC-002, SC-003
- US3 (Biểu đồ cột + cơ cấu danh mục) -> SC-004, SC-005

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 24+  
**Primary Dependencies**: Next.js 16 App Router, React 19, Prisma ORM, Zod, Recharts  
**Storage**: SQLite qua Prisma  
**Testing**: Vitest (unit/contract/integration/performance), Playwright (e2e)  
**Target Platform**: Web browser desktop/mobile, local Linux dev, GitHub Actions CI  
**Project Type**: Web application (single Next.js project)  
**Performance Goals**: Tải báo cáo mặc định trong <= 10 giây; cập nhật bộ lọc hoặc dữ liệu liên quan trong <= 2 giây với bộ dữ liệu đến 10.000 giao dịch  
**Constraints**: TypeScript strict; validate input tại API boundary; pie chart không bị ảnh hưởng bởi bộ lọc danh mục; không yêu cầu tải lại toàn bộ ứng dụng để thấy dữ liệu báo cáo mới nhất trong cùng phiên sử dụng  
**Scale/Scope**: 1 người dùng mỗi môi trường; báo cáo chỉ phân tích theo tháng; dùng chung nguồn dữ liệu giao dịch và danh mục hiện có

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- User value gate: PASS. Mỗi user story đều map tới success criteria đo được và có independent test rõ ràng trong spec.
- Spec chain gate: PASS. Spec đã làm rõ FR-012; plan giữ đúng phạm vi month/category filter, rule pie chart, và same-session refresh behavior.
- Quality gate: PASS. Quality gates dự kiến gồm `npm run lint`, `npm run typecheck`, `npm run test`, `npm run test:e2e`, và `npm run test:perf` khi có thay đổi aggregate/performance.
- Security gate: PASS. Trust boundary chính là `GET /api/reports/monthly`; query params phải được validate bằng Zod, category không tồn tại phải trả error contract thống nhất, và không có secrets mới.
- Simplicity gate: PASS. Tiếp tục dùng route/service/repository pattern và fetch `no-store`; tránh thêm global state library hoặc realtime channel chỉ để làm mới báo cáo cùng phiên.
- Language gate: PASS. Tài liệu thiết kế dùng tiếng Việt cho nội bộ team.

Post-Design Re-check (Phase 1): PASS. `research.md`, `data-model.md`, `contracts/api-contract.md`, và `quickstart.md` đã phản ánh FR-012, success criteria mới, và không vi phạm constitution.

## Project Structure

### Documentation (this feature)

```text
specs/003-reports-tab/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── api-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── dashboard/page.tsx
│   ├── reports/page.tsx                  # mới
│   └── api/
│       ├── categories/route.ts          # cập nhật revalidation nếu cần
│       ├── transactions/
│       │   ├── route.ts
│       │   └── [id]/route.ts
│       └── reports/
│           └── monthly/route.ts         # mới
├── components/
│   ├── app-shell.tsx                    # cập nhật điều hướng
│   ├── error-banner.tsx
│   ├── report-filters.tsx               # mới
│   ├── report-summary.tsx               # mới
│   ├── report-income-expense-bar.tsx    # mới
│   └── report-category-pie.tsx          # mới
├── features/
│   ├── categories/
│   ├── dashboard/
│   ├── reports/
│   │   ├── report.repository.ts         # mới
│   │   ├── report.service.ts            # mới
│   │   ├── use-reports.ts               # mới
│   │   └── index.ts                     # mới
│   └── transactions/
├── lib/
│   ├── cache/
│   │   └── revalidate-expense-data.ts   # cập nhật thêm /reports
│   ├── logger.ts
│   └── validation/
│       └── report-query.ts              # mới
└── types/
    ├── expense.ts                       # mở rộng types báo cáo
    └── index.ts

tests/
├── contract/
│   └── reports.contract.test.ts         # mới
├── e2e/
│   └── reports.spec.ts                  # mới
├── integration/
│   └── reports-page.test.tsx            # mới
└── unit/
    └── report.service.test.ts           # mới
```

**Structure Decision**: Giữ mô hình single Next.js project và tái sử dụng pattern route/service/repository/hook đã có ở dashboard và transactions. Feature `reports` được thêm như một vertical slice mới để giảm rủi ro regression, trong khi same-session refresh được giải quyết bằng revalidation hiện có cộng với refetch logic ở report hook thay vì thêm state management toàn cục.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
