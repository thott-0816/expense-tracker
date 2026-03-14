# Tasks: Ung Dung Theo Doi Thu Chi Va Bao Cao Chi Tieu Hang Thang

**Input**: Design documents from `/specs/002-expense-tracker-report/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/api-contract.md, quickstart.md

**Tests**: Bao gom contract test, integration test, va smoke e2e vi spec co muc testing bat buoc va plan da chot Vitest + Testing Library + Playwright.

**Organization**: Tasks duoc nhom theo user story de moi story co the duoc implement va kiem thu doc lap.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Hoan thien nen tang Next.js/TypeScript/Prisma/test tools cho feature.

- [ ] T001 Cap nhat runtime va dev dependencies cung scripts lint/typecheck/test/e2e trong package.json
- [ ] T002 Khoi tao Prisma + SQLite config trong prisma/schema.prisma, prisma/seed.ts, va .env.example
- [ ] T003 [P] Cau hinh Vitest + Testing Library trong vitest.config.ts, tests/setup.ts, va tsconfig.json
- [ ] T004 [P] Cau hinh Playwright smoke e2e trong playwright.config.ts va tests/e2e/.gitkeep
- [ ] T005 [P] Tao module skeleton cho src/components/index.ts, src/features/transactions/index.ts, src/features/categories/index.ts, src/features/dashboard/index.ts, src/features/export/index.ts, src/lib/db/index.ts, va src/types/index.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Hoan thien cac khoi dung chung ma tat ca user stories deu phu thuoc.

**⚠️ CRITICAL**: Khong bat dau user story cho den khi xong phase nay.

- [ ] T006 Dinh nghia Prisma models Category va Transaction cung migration dau tien trong prisma/schema.prisma va prisma/migrations/
- [ ] T007 [P] Tao Prisma client va db helpers trong src/lib/db/prisma.ts va src/lib/db/transaction-context.ts
- [ ] T008 [P] Dinh nghia Zod schemas cho category, transaction, filter query, va dashboard params trong src/lib/validation/category.ts, src/lib/validation/transaction.ts, src/lib/validation/filter-query.ts, va src/lib/validation/dashboard.ts
- [ ] T009 [P] Tao API error contract helpers trong src/lib/api/errors.ts, src/lib/api/responses.ts, va src/types/api.ts
- [ ] T010 [P] Tao shared domain types va mapper functions trong src/types/expense.ts va src/lib/db/mappers.ts
- [ ] T011 [P] Them structured logging va mutation revalidation helpers trong src/lib/logger.ts va src/lib/cache/revalidate-expense-data.ts

**Checkpoint**: Foundation san sang cho CRUD giao dich, dashboard, va export.

---

## Phase 3: User Story 1 - Quan Ly Giao Dich Thu Chi (Priority: P1) 🎯 MVP

**Goal**: Cho phep nguoi dung tao, chinh sua, xoa giao dich thu/chi va gan category hop le.

**Independent Test**: Tao category, tao giao dich thu va chi, sua amount/category, xoa mot giao dich, va xac nhan danh sach sap xep giam dan theo ngay.

### Tests for User Story 1

- [ ] T012 [P] [US1] Viet contract tests cho GET/POST /api/categories va GET/POST/PATCH/DELETE /api/transactions trong tests/contract/categories.contract.test.ts va tests/contract/transactions.contract.test.ts
- [ ] T013 [P] [US1] Viet integration tests cho transaction form, transaction list, va validation states trong tests/integration/transactions-flow.test.tsx
- [ ] T014 [P] [US1] Viet smoke e2e CRUD scenario trong tests/e2e/transactions-crud.spec.ts
- [ ] T015 [P] [US1] Viet unit tests cho category service, transaction service, va timestamp audit behavior trong tests/unit/category.service.test.ts va tests/unit/transaction.service.test.ts

### Implementation for User Story 1

- [ ] T016 [P] [US1] Implement category repository va service trong src/features/categories/category.repository.ts va src/features/categories/category.service.ts
- [ ] T017 [P] [US1] Implement transaction repository va service trong src/features/transactions/transaction.repository.ts va src/features/transactions/transaction.service.ts
- [ ] T018 [US1] Implement categories API routes theo error contract trong src/app/api/categories/route.ts
- [ ] T019 [US1] Implement transactions collection API voi default sorting trong src/app/api/transactions/route.ts
- [ ] T020 [US1] Implement transaction detail mutation API trong src/app/api/transactions/[id]/route.ts
- [ ] T021 [US1] Dam bao createdAt/updatedAt duoc persist, map vao response, va verify khi update trong src/features/transactions/transaction.service.ts va src/lib/db/mappers.ts
- [ ] T022 [P] [US1] Xay dung transaction form va category select UI trong src/components/transaction-form.tsx va src/components/category-select.tsx
- [ ] T023 [P] [US1] Xay dung transaction list, row actions, va empty state trong src/components/transaction-list.tsx va src/components/transaction-empty-state.tsx
- [ ] T024 [US1] Ket noi man hinh quan ly giao dich tai src/app/page.tsx va src/features/transactions/use-transactions.ts

**Checkpoint**: User Story 1 hoan chinh va co the demo doc lap nhu MVP.

---

## Phase 4: User Story 2 - Xem Dashboard Theo Ngay Tuan Thang (Priority: P2)

**Goal**: Cung cap dashboard tong thu, tong chi, so du, va phan bo chi tieu theo day/week/month.

**Independent Test**: Nap du lieu mau, chuyen period day -> week -> month, va xac nhan aggregate thay doi dung ma khong can thao tac export.

### Tests for User Story 2

- [ ] T025 [P] [US2] Viet contract test cho GET /api/dashboard trong tests/contract/dashboard.contract.test.ts
- [ ] T026 [P] [US2] Viet integration test cho period switch va aggregate rendering trong tests/integration/dashboard-period-switch.test.tsx
- [ ] T027 [P] [US2] Viet smoke e2e dashboard flow trong tests/e2e/dashboard-periods.spec.ts
- [ ] T028 [P] [US2] Viet unit tests cho dashboard aggregate calculator va period utils trong tests/unit/dashboard.service.test.ts va tests/unit/period.utils.test.ts

### Implementation for User Story 2

- [ ] T029 [P] [US2] Implement dashboard aggregate queries va calculator trong src/features/dashboard/dashboard.repository.ts va src/features/dashboard/dashboard.service.ts
- [ ] T030 [US2] Implement dashboard API route voi validation params trong src/app/api/dashboard/route.ts
- [ ] T031 [P] [US2] Xay dung dashboard summary cards va category breakdown UI trong src/components/dashboard-summary.tsx va src/components/category-breakdown.tsx
- [ ] T032 [P] [US2] Xay dung period switcher va loading states trong src/components/dashboard-period-switcher.tsx va src/components/dashboard-skeleton.tsx
- [ ] T033 [US2] Tao trang dashboard va data hook trong src/app/dashboard/page.tsx va src/features/dashboard/use-dashboard.ts

**Checkpoint**: User Story 2 hoat dong doc lap tren du lieu co san va cap nhat dung theo period.

---

## Phase 5: User Story 3 - Loc Tim Kiem Va Export CSV (Priority: P3)

**Goal**: Cho phep nguoi dung loc giao dich, tim kiem theo tu khoa, va export CSV dung voi tap du lieu dang xem.

**Independent Test**: Ap bo loc category + date range + keyword, doi chieu danh sach hien thi, sau do export CSV va xac nhan file giong ket qua dang xem.

### Tests for User Story 3

- [ ] T034 [P] [US3] Viet contract tests cho filtered GET /api/transactions va GET /api/transactions/export.csv trong tests/contract/transactions-filter-export.contract.test.ts
- [ ] T035 [P] [US3] Viet integration test cho filter/search/export workflow trong tests/integration/transactions-filter-export.test.tsx
- [ ] T036 [P] [US3] Viet smoke e2e export parity scenario trong tests/e2e/transactions-filter-export.spec.ts
- [ ] T037 [P] [US3] Viet unit tests cho filter parser, search service, va CSV serializer trong tests/unit/filter-query.test.ts va tests/unit/export-transactions.test.ts

### Implementation for User Story 3

- [ ] T038 [P] [US3] Implement filter query parser va search service trong src/features/transactions/filter-query.ts va src/features/transactions/transaction-search.service.ts
- [ ] T039 [P] [US3] Implement RFC 4180 CSV serializer va filename helper trong src/lib/csv/export-transactions.ts va src/features/export/export.service.ts
- [ ] T040 [US3] Mo rong transactions list API de ho tro filter/search trong src/app/api/transactions/route.ts
- [ ] T041 [US3] Implement CSV export route trong src/app/api/transactions/export.csv/route.ts
- [ ] T042 [P] [US3] Xay dung filter/search/export controls trong src/components/transaction-filters.tsx va src/components/export-csv-button.tsx
- [ ] T043 [US3] Ket noi filter state, query string, va export parity tai src/app/page.tsx va src/features/transactions/use-transaction-filters.ts

**Checkpoint**: User Story 3 doc lap, ket qua dang xem va file CSV luon nhat quan.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Hoan thien trai nghiem, tai lieu, va quality gates xuyen suot cac stories.

- [ ] T044 [P] Bo sung accessibility semantics, focus management, keyboard operability, va a11y smoke coverage trong src/components/transaction-form.tsx, src/components/dashboard-period-switcher.tsx, src/components/transaction-filters.tsx, va tests/integration/accessibility-smoke.test.tsx
- [ ] T045 [P] Bo sung responsive shell, app navigation, va shared empty/error states trong src/components/app-shell.tsx, src/components/error-banner.tsx, va src/app/globals.css
- [ ] T046 [P] Bo sung regression tests cho edge cases amount <= 0, empty dataset, keyword miss, va CSV special chars trong tests/integration/transaction-edge-cases.test.tsx
- [ ] T047 [P] Tao benchmark seed va performance validation cho filter/dashboard/export trong prisma/seed.performance.ts, tests/performance/expense-report.performance.test.ts, va package.json
- [ ] T048 Cap nhat huong dan chay, quickstart benchmark, va chuan hoa lint/typecheck/test/e2e/benchmark commands trong README.md, specs/002-expense-tracker-report/quickstart.md, package.json, va .github/workflows/ci.yml

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 - Setup**: Khong phu thuoc, bat dau ngay.
- **Phase 2 - Foundational**: Phu thuoc Phase 1, block tat ca user stories.
- **Phase 3 - US1**: Bat dau sau Phase 2, tao MVP co gia tri su dung ngay.
- **Phase 4 - US2**: Bat dau sau Phase 2; doc lap voi US3 nhung can du lieu giao dich tu US1 de co gia tri thuc te.
- **Phase 5 - US3**: Bat dau sau Phase 2; nen thuc hien sau US1 de tai su dung transaction list va API.
- **Phase 6 - Polish**: Bat dau sau khi cac stories muc tieu da hoan thanh.

### User Story Dependencies

- **US1 (P1)**: Khong phu thuoc story khac, la MVP.
- **US2 (P2)**: Doc lap sau foundational, nhung duoc huong loi tu transaction data cua US1.
- **US3 (P3)**: Doc lap sau foundational, nhung can transaction API/list UI cua US1 de giam duplicate implementation.

### Within Each User Story

- Tests phai duoc viet truoc va fail truoc khi implement.
- Repository/service truoc route handlers.
- Route handlers truoc UI hooks/components.
- UI components truoc page composition va final wiring.

### Parallel Opportunities

- T003, T004, T005 co the chay song song sau T001-T002.
- T007, T008, T009, T010, T011 co the chay song song sau T006.
- Trong US1, T012-T015 va T016-T017 co the chia cho nhieu nguoi; T022-T023 chay song song sau APIs on dinh.
- Trong US2, T025-T028 va T031-T032 co the chay song song.
- Trong US3, T034-T037 va T038-T039 co the chay song song.
- T044-T047 co the thuc hien song song truoc T048.

---

## Parallel Example: User Story 1

```bash
# Contract/integration/e2e tests cua US1
Task: "Viet contract tests cho GET/POST /api/categories va GET/POST/PATCH/DELETE /api/transactions trong tests/contract/categories.contract.test.ts va tests/contract/transactions.contract.test.ts"
Task: "Viet integration tests cho transaction form, transaction list, va validation states trong tests/integration/transactions-flow.test.tsx"
Task: "Viet smoke e2e CRUD scenario trong tests/e2e/transactions-crud.spec.ts"
Task: "Viet unit tests cho category service, transaction service, va timestamp audit behavior trong tests/unit/category.service.test.ts va tests/unit/transaction.service.test.ts"

# Core implementation co the tach song song
Task: "Implement category repository va service trong src/features/categories/category.repository.ts va src/features/categories/category.service.ts"
Task: "Implement transaction repository va service trong src/features/transactions/transaction.repository.ts va src/features/transactions/transaction.service.ts"
Task: "Xay dung transaction form va category select UI trong src/components/transaction-form.tsx va src/components/category-select.tsx"
Task: "Xay dung transaction list, row actions, va empty state trong src/components/transaction-list.tsx va src/components/transaction-empty-state.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Hoan thanh Phase 1 va Phase 2.
2. Hoan thanh US1 tu T012 den T024.
3. Dung lai de validate CRUD, sorting, validation, va revalidation trong cung phien.
4. Demo/deploy MVP sau khi US1 pass quality gates.

### Incremental Delivery

1. Setup + Foundational.
2. Giao MVP voi US1.
3. Bo sung dashboard US2 va validate aggregate.
4. Bo sung filter/search/export US3 va validate parity CSV.
5. Chot polish, docs, va CI scripts.

### Parallel Team Strategy

1. Ca team chot Phase 1 va Phase 2.
2. Sau foundation:
   - Dev A: US1 backend + API.
   - Dev B: US1/UI shell hoac US2 dashboard.
   - Dev C: US3 filter/export sau khi transaction API on dinh.
3. Gom story theo checkpoints de demo tung increment.

---

## Notes

- Tat ca tasks deu theo dung checklist format `- [ ] T### [P?] [US?] Description with file path`.
- Cac task `[P]` chi danh cho cong viec khac file, co the chay song song an toan.
- Moi user story co independent test criteria rieng de co the giao hang tang dan.
- US1 la pham vi MVP duoc de xuat.
- Root page cua phase 1 la transaction workspace; dashboard duoc truy cap tai `/dashboard`.
