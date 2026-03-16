# Tasks: Ứng Dụng Theo Dõi Thu Chi Và Báo Cáo Chi Tiêu Hàng Tháng

**Input**: Design documents from `/specs/002-expense-tracker-report/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/api-contract.md, quickstart.md

**Tests**: Bao gồm contract test, integration test, và smoke e2e vì spec có mục testing bắt buộc và plan đã chốt Vitest + Testing Library + Playwright.

**Organization**: Tasks được nhóm theo user story để mỗi story có thể được implement và kiểm thử độc lập.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Hoàn thiện nền tảng Next.js/TypeScript/Prisma/test tools cho feature.

- [X] T001 Cập nhật runtime và dev dependencies cùng scripts lint/typecheck/test/e2e trong package.json
- [X] T002 Khởi tạo Prisma + SQLite config trong prisma/schema.prisma, prisma/seed.ts, và .env.example
- [X] T003 [P] Cấu hình Vitest + Testing Library trong vitest.config.ts, tests/setup.ts, và tsconfig.json
- [X] T004 [P] Cấu hình Playwright smoke e2e trong playwright.config.ts và tests/e2e/.gitkeep
- [X] T005 [P] Tạo module skeleton cho src/components/index.ts, src/features/transactions/index.ts, src/features/categories/index.ts, src/features/dashboard/index.ts, src/features/export/index.ts, src/lib/db/index.ts, và src/types/index.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Hoàn thiện các khối dùng chung mà tất cả user stories đều phụ thuộc.

**⚠️ CRITICAL**: Không bắt đầu user story cho đến khi xong phase này.

- [X] T006 Định nghĩa Prisma models Category và Transaction cùng migration đầu tiên trong prisma/schema.prisma và prisma/migrations/
- [X] T007 [P] Tạo Prisma client và db helpers trong src/lib/db/prisma.ts và src/lib/db/transaction-context.ts
- [X] T008 [P] Định nghĩa Zod schemas cho category, transaction, filter query, và dashboard params trong src/lib/validation/category.ts, src/lib/validation/transaction.ts, src/lib/validation/filter-query.ts, và src/lib/validation/dashboard.ts
- [X] T009 [P] Tạo API error contract helpers trong src/lib/api/errors.ts, src/lib/api/responses.ts, và src/types/api.ts
- [X] T010 [P] Tạo shared domain types và mapper functions trong src/types/expense.ts và src/lib/db/mappers.ts
- [X] T011 [P] Thêm structured logging và mutation revalidation helpers trong src/lib/logger.ts và src/lib/cache/revalidate-expense-data.ts

**Checkpoint**: Foundation sẵn sàng cho CRUD giao dịch, dashboard, và export.

---

## Phase 3: User Story 1 - Quản Lý Giao Dịch Thu Chi (Priority: P1) 🎯 MVP

**Goal**: Cho phép người dùng tạo, chỉnh sửa, xóa giao dịch thu/chi và gán category hợp lệ.

**Independent Test**: Tạo category, tạo giao dịch thu và chi, sửa amount/category, xóa một giao dịch, và xác nhận danh sách sắp xếp giảm dần theo ngày.

### Tests for User Story 1

- [X] T012 [P] [US1] Viết contract tests cho GET/POST /api/categories và GET/POST/PATCH/DELETE /api/transactions trong tests/contract/categories.contract.test.ts và tests/contract/transactions.contract.test.ts
- [X] T013 [P] [US1] Viết integration tests cho transaction form, transaction list, và validation states trong tests/integration/transactions-flow.test.tsx
- [X] T014 [P] [US1] Viết smoke e2e CRUD scenario trong tests/e2e/transactions-crud.spec.ts
- [X] T015 [P] [US1] Viết unit tests cho category service, transaction service, và timestamp audit behavior trong tests/unit/category.service.test.ts và tests/unit/transaction.service.test.ts

### Implementation for User Story 1

- [X] T016 [P] [US1] Implement category repository và service trong src/features/categories/category.repository.ts và src/features/categories/category.service.ts
- [X] T017 [P] [US1] Implement transaction repository và service trong src/features/transactions/transaction.repository.ts và src/features/transactions/transaction.service.ts
- [X] T018 [US1] Implement categories API routes theo error contract trong src/app/api/categories/route.ts
- [X] T019 [US1] Implement transactions collection API với default sorting trong src/app/api/transactions/route.ts
- [X] T020 [US1] Implement transaction detail mutation API trong src/app/api/transactions/[id]/route.ts
- [X] T021 [US1] Đảm bảo createdAt/updatedAt được persist, map vào response, và verify khi update trong src/features/transactions/transaction.service.ts và src/lib/db/mappers.ts
- [X] T022 [P] [US1] Xây dựng transaction form và category select UI trong src/components/transaction-form.tsx và src/components/category-select.tsx
- [X] T023 [P] [US1] Xây dựng transaction list, row actions, và empty state trong src/components/transaction-list.tsx và src/components/transaction-empty-state.tsx
- [X] T024 [US1] Kết nối màn hình quản lý giao dịch tại src/app/page.tsx và src/features/transactions/use-transactions.ts

**Checkpoint**: User Story 1 hoàn chỉnh và có thể demo độc lập như MVP.

---

## Phase 4: User Story 2 - Xem Dashboard Theo Tháng (Priority: P2)

**Goal**: Cung cấp dashboard tổng thu, tổng chi, số dư, và phân bổ chi tiêu theo tháng hiện tại.

> **[SCOPE CHANGE]** Period switcher (day/week/month) đã bị loại khỏi UI; dashboard cố định hiển thị tháng hiện tại. T026 và T027 đã được cập nhật; T032 vẫn hoàn thành vì component `dashboard-period-switcher.tsx` tồn tại nhưng không được mount trên trang.

**Independent Test**: Nạp dữ liệu mẫu tháng hiện tại và xác nhận aggregate tổng hợp đúng mà không cần thao tác export.

### Tests for User Story 2

- [X] T025 [P] [US2] Viết contract test cho GET /api/dashboard trong tests/contract/dashboard.contract.test.ts
- [X] T026 [P] [US2] Viết integration test cho aggregate rendering tháng hiện tại _(tệp `tests/integration/dashboard-period-switch.test.tsx` đã bị xóa cùng scope change; coverage còn lại qua accessibility-smoke test)_
- [X] T027 [P] [US2] Viết smoke e2e dashboard flow trong tests/e2e/dashboard-periods.spec.ts _(file giữ nguyên nhưng period switching assertions được điều chỉnh theo monthly-only)_
- [X] T028 [P] [US2] Viết unit tests cho dashboard aggregate calculator và period utils trong tests/unit/dashboard.service.test.ts và tests/unit/period.utils.test.ts

### Implementation for User Story 2

- [X] T029 [P] [US2] Implement dashboard aggregate queries và calculator trong src/features/dashboard/dashboard.repository.ts và src/features/dashboard/dashboard.service.ts
- [X] T030 [US2] Implement dashboard API route với validation params trong src/app/api/dashboard/route.ts
- [X] T031 [P] [US2] Xây dựng dashboard summary cards và category breakdown UI trong src/components/dashboard-summary.tsx và src/components/category-breakdown.tsx
- [X] T032 [P] [US2] Xây dựng loading states trong src/components/dashboard-skeleton.tsx; `dashboard-period-switcher.tsx` tồn tại nhưng không được mount trên trang sau scope change
- [X] T033 [US2] Tạo trang dashboard và data hook trong src/app/dashboard/page.tsx và src/features/dashboard/use-dashboard.ts

**Checkpoint**: User Story 2 hoạt động độc lập trên dữ liệu có sẵn và cập nhật đúng theo period.

---

## Phase 5: User Story 3 - Lọc Tìm Kiếm Và Export CSV (Priority: P3)

**Goal**: Cho phép người dùng lọc giao dịch, tìm kiếm theo từ khóa, và export CSV đúng với tập dữ liệu đang xem.

**Independent Test**: Áp bộ lọc category + date range + keyword, đối chiếu danh sách hiển thị, sau đó export CSV và xác nhận file giống kết quả đang xem.

### Tests for User Story 3

- [X] T034 [P] [US3] Viết contract tests cho filtered GET /api/transactions và GET /api/transactions/export.csv trong tests/contract/transactions-filter-export.contract.test.ts
- [X] T035 [P] [US3] Viết integration test cho filter/search/export workflow trong tests/integration/transactions-filter-export.test.tsx
- [X] T036 [P] [US3] Viết smoke e2e export parity scenario trong tests/e2e/transactions-filter-export.spec.ts
- [X] T037 [P] [US3] Viết unit tests cho filter parser, search service, và CSV serializer trong tests/unit/filter-query.test.ts và tests/unit/export-transactions.test.ts

### Implementation for User Story 3

- [X] T038 [P] [US3] Implement filter query parser và search service trong src/features/transactions/filter-query.ts và src/features/transactions/transaction-search.service.ts
- [X] T039 [P] [US3] Implement RFC 4180 CSV serializer và filename helper trong src/lib/csv/export-transactions.ts và src/features/export/export.service.ts
- [X] T040 [US3] Mở rộng transactions list API để hỗ trợ filter/search trong src/app/api/transactions/route.ts
- [X] T041 [US3] Implement CSV export route trong src/app/api/transactions/export.csv/route.ts
- [X] T042 [P] [US3] Xây dựng filter/search/export controls trong src/components/transaction-filters.tsx và src/components/export-csv-button.tsx
- [X] T043 [US3] Kết nối filter state, query string, và export parity tại src/app/page.tsx và src/features/transactions/use-transaction-filters.ts

**Checkpoint**: User Story 3 độc lập, kết quả đang xem và file CSV luôn nhất quán.

---

## Phase 5b: Enhancements (Post-MVP)

**Purpose**: Các cải tiến UX thực hiện sau khi hoàn thành MVP dựa trên feedback.

- [X] T044 [US3] Thêm server-side pagination cho danh sách giao dịch (page/pageSize); API `/api/transactions` trả thêm `page`, `pageSize`, `totalPages`; UI có `TransactionPagination` component
- [X] T045 [US3] Sửa export CSV dùng luồng không phân trang (`listAllFilteredTransactions`) để luôn trả toàn bộ dữ liệu theo bộ lọc, bất kể trang đang xem
- [X] T046 [US3] Thêm unit test hồi quy `tests/unit/export.service.test.ts` đảm bảo export không bị giới hạn bởi pagination

**Checkpoint**: Pagination hiển thị đúng; export CSV luôn đầy đủ theo filter.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Hoàn thiện trải nghiệm, tài liệu, và quality gates xuyên suốt các stories.

- [X] T044 [P] Bổ sung accessibility semantics, focus management, keyboard operability, và a11y smoke coverage trong src/components/transaction-form.tsx, src/components/dashboard-period-switcher.tsx, src/components/transaction-filters.tsx, và tests/integration/accessibility-smoke.test.tsx
- [X] T045 [P] Bổ sung responsive shell, app navigation, và shared empty/error states trong src/components/app-shell.tsx, src/components/error-banner.tsx, và src/app/globals.css
- [X] T046 [P] Bổ sung regression tests cho edge cases amount <= 0, empty dataset, keyword miss, và CSV special chars trong tests/integration/transaction-edge-cases.test.tsx
- [X] T047 [P] Tạo benchmark seed và performance validation cho filter/dashboard/export trong prisma/seed.performance.ts, tests/performance/expense-report.performance.test.ts, và package.json
- [X] T048 Cập nhật hướng dẫn chạy, quickstart benchmark, và chuẩn hóa lint/typecheck/test/e2e/benchmark commands trong README.md, specs/002-expense-tracker-report/quickstart.md, package.json, và .github/workflows/ci.yml

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 - Setup**: Không phụ thuộc, bắt đầu ngay.
- **Phase 2 - Foundational**: Phụ thuộc Phase 1, block tất cả user stories.
- **Phase 3 - US1**: Bắt đầu sau Phase 2, tạo MVP có giá trị sử dụng ngay.
- **Phase 4 - US2**: Bắt đầu sau Phase 2; độc lập với US3 nhưng cần dữ liệu giao dịch từ US1 để có giá trị thực tế.
- **Phase 5 - US3**: Bắt đầu sau Phase 2; nên thực hiện sau US1 để tái sử dụng transaction list và API.
- **Phase 6 - Polish**: Bắt đầu sau khi các stories mục tiêu đã hoàn thành.

### User Story Dependencies

- **US1 (P1)**: Không phụ thuộc story khác, là MVP.
- **US2 (P2)**: Độc lập sau foundational, nhưng được hưởng lợi từ transaction data của US1.
- **US3 (P3)**: Độc lập sau foundational, nhưng cần transaction API/list UI của US1 để giảm duplicate implementation.

### Within Each User Story

- Tests phải được viết trước và fail trước khi implement.
- Repository/service trước route handlers.
- Route handlers trước UI hooks/components.
- UI components trước page composition và final wiring.

### Parallel Opportunities

- T003, T004, T005 có thể chạy song song sau T001-T002.
- T007, T008, T009, T010, T011 có thể chạy song song sau T006.
- Trong US1, T012-T015 và T016-T017 có thể chia cho nhiều người; T022-T023 chạy song song sau APIs ổn định.
- Trong US2, T025-T028 và T031-T032 có thể chạy song song.
- Trong US3, T034-T037 và T038-T039 có thể chạy song song.
- T044-T047 có thể thực hiện song song trước T048.

---

## Parallel Example: User Story 1

```bash
# Contract/integration/e2e tests của US1
Task: "Viết contract tests cho GET/POST /api/categories và GET/POST/PATCH/DELETE /api/transactions trong tests/contract/categories.contract.test.ts và tests/contract/transactions.contract.test.ts"
Task: "Viết integration tests cho transaction form, transaction list, và validation states trong tests/integration/transactions-flow.test.tsx"
Task: "Viết smoke e2e CRUD scenario trong tests/e2e/transactions-crud.spec.ts"
Task: "Viết unit tests cho category service, transaction service, và timestamp audit behavior trong tests/unit/category.service.test.ts và tests/unit/transaction.service.test.ts"

# Core implementation có thể tách song song
Task: "Implement category repository và service trong src/features/categories/category.repository.ts và src/features/categories/category.service.ts"
Task: "Implement transaction repository và service trong src/features/transactions/transaction.repository.ts và src/features/transactions/transaction.service.ts"
Task: "Xây dựng transaction form và category select UI trong src/components/transaction-form.tsx và src/components/category-select.tsx"
Task: "Xây dựng transaction list, row actions, và empty state trong src/components/transaction-list.tsx và src/components/transaction-empty-state.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Hoàn thành Phase 1 và Phase 2.
2. Hoàn thành US1 từ T012 đến T024.
3. Dừng lại để validate CRUD, sorting, validation, và revalidation trong cùng phiên.
4. Demo/deploy MVP sau khi US1 pass quality gates.

### Incremental Delivery

1. Setup + Foundational.
2. Giao MVP với US1.
3. Bổ sung dashboard US2 và validate aggregate.
4. Bổ sung filter/search/export US3 và validate parity CSV.
5. Chốt polish, docs, và CI scripts.

### Parallel Team Strategy

1. Cả team chốt Phase 1 và Phase 2.
2. Sau foundation:
   - Dev A: US1 backend + API.
   - Dev B: US1/UI shell hoặc US2 dashboard.
   - Dev C: US3 filter/export sau khi transaction API ổn định.
3. Gom story theo checkpoints để demo từng increment.

---

## Notes

- Tất cả tasks đều theo đúng checklist format `- [ ] T### [P?] [US?] Description with file path`.
- Các task `[P]` chỉ dành cho công việc khác file, có thể chạy song song an toàn.
- Mỗi user story có independent test criteria riêng để có thể giao hàng tăng dần.
- US1 là phạm vi MVP được đề xuất.
- Root page của phase 1 là transaction workspace; dashboard được truy cập tại `/dashboard`.
