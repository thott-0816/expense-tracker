# Tasks: Tab Báo Cáo Chi Tiêu Theo Tháng

**Input**: Design documents from `/specs/003-reports-tab/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/api-contract.md, quickstart.md

**Tests**: Bao gồm unit, contract, integration, e2e, và performance regression vì plan đã chốt quality gate đầy đủ cho feature báo cáo.

**Organization**: Tasks được nhóm theo user story để mỗi story có thể implement và test độc lập.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Chuẩn bị dependency, routes skeleton, và baseline test wiring cho feature Báo Cáo.

- [X] T001 Cài đặt thư viện biểu đồ và cập nhật lockfile trong package.json và package-lock.json
- [X] T002 [P] Thêm export cho report feature module trong src/features/reports/index.ts
- [X] T003 [P] Tạo skeleton trang báo cáo và route API trong src/app/reports/page.tsx và src/app/api/reports/monthly/route.ts
- [X] T004 [P] Cập nhật điều hướng tab Báo Cáo trong src/components/app-shell.tsx
- [X] T005 [P] Tạo test file skeleton cho reports trong tests/unit/report.service.test.ts, tests/contract/reports.contract.test.ts, tests/integration/reports-page.test.tsx, tests/e2e/reports.spec.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Hoàn thiện nền tảng dữ liệu, validation, và service aggregate dùng chung cho mọi user story.

**⚠️ CRITICAL**: Không bắt đầu user stories cho đến khi xong phase này.

- [X] T006 Tạo report query validation cho `month` và `categoryId` trong src/lib/validation/report-query.ts
- [X] T007 [P] Mở rộng report domain types trong src/types/expense.ts và src/types/index.ts
- [X] T008 [P] Tạo report repository aggregate theo month/category trong src/features/reports/report.repository.ts
- [X] T009 [P] Tạo report service map dữ liệu summary/bar/pie trong src/features/reports/report.service.ts
- [X] T010 [P] Tạo client hook fetch report trong src/features/reports/use-reports.ts
- [X] T011 Implement API error mapping cho report route trong src/app/api/reports/monthly/route.ts
- [X] T012 [P] Mở rộng cache revalidation cho tab Báo Cáo trong src/lib/cache/revalidate-expense-data.ts
- [X] T013 [P] Bổ sung logger events cho report request và aggregate failures trong src/lib/logger.ts và src/features/reports/report.service.ts
- [X] T014 [P] Đồng bộ category mutation với report invalidation trong src/app/api/categories/route.ts và src/lib/cache/revalidate-expense-data.ts

**Checkpoint**: Foundation sẵn sàng cho tab Báo Cáo với contract API và aggregate logic.

---

## Phase 3: User Story 1 - Xem Báo Cáo Tổng Quan Theo Tháng (Priority: P1) 🎯 MVP

**Goal**: Người dùng vào tab Báo Cáo, chọn tháng, và xem tổng thu/tổng chi đúng theo dữ liệu tháng.

**Independent Test**: Vào tab Báo Cáo, chọn tháng có dữ liệu, đối soát tổng thu/tổng chi với giao dịch trong tháng đó.

### Tests for User Story 1

- [X] T015 [P] [US1] Viết unit tests cho summary aggregate theo month trong tests/unit/report.service.test.ts
- [X] T016 [P] [US1] Viết contract test cho GET /api/reports/monthly với month hợp lệ trong tests/contract/reports.contract.test.ts
- [X] T017 [P] [US1] Viết integration test render tổng quan theo tháng cùng loading, empty, và error state trong tests/integration/reports-page.test.tsx
- [X] T018 [P] [US1] Viết e2e smoke mở tab Báo Cáo và xem tổng quan tháng hiện tại trong tests/e2e/reports.spec.ts

### Implementation for User Story 1

- [X] T019 [US1] Implement month picker và tổng quan cards trong src/components/report-filters.tsx và src/components/report-summary.tsx
- [X] T020 [US1] Wire report page với use-reports hook và default current month trong src/app/reports/page.tsx
- [X] T021 [US1] Cập nhật app shell current view cho reports trong src/components/app-shell.tsx và src/app/reports/page.tsx
- [X] T022 [US1] Thêm loading, empty, và error state cho tab Báo Cáo trong src/app/reports/page.tsx và src/components/error-banner.tsx

**Checkpoint**: US1 hoạt động độc lập với tổng thu/tổng chi theo tháng.

---

## Phase 4: User Story 2 - Lọc Dữ Liệu Báo Cáo (Priority: P2)

**Goal**: Bộ lọc tháng + danh mục tác động lên tổng quan và biểu đồ cột; reset filter đưa về mặc định của tháng; tab Báo Cáo làm mới dữ liệu đúng trong cùng phiên sau thay đổi giao dịch hoặc danh mục liên quan.

**Independent Test**: Chọn danh mục và reset filter để xác nhận số liệu đổi đúng; sau đó tạo hoặc sửa giao dịch trong cùng phiên và xác nhận tab Báo Cáo hiển thị dữ liệu mới nhất khi người dùng đang ở tab hoặc quay lại tab này.

### Tests for User Story 2

- [X] T023 [P] [US2] Viết unit tests cho category filter trong report service trong tests/unit/report.service.test.ts
- [X] T024 [P] [US2] Viết contract test cho query categoryId hợp lệ và category không tồn tại trong tests/contract/reports.contract.test.ts
- [X] T025 [P] [US2] Viết integration test filter + reset behavior trong tests/integration/reports-page.test.tsx
- [X] T026 [P] [US2] Viết integration test same-session refresh sau khi transaction hoặc category thay đổi trong tests/integration/reports-page.test.tsx
- [X] T027 [P] [US2] Viết e2e test đổi danh mục, reset, và làm mới báo cáo trong cùng phiên trong tests/e2e/reports.spec.ts

### Implementation for User Story 2

- [X] T028 [US2] Mở rộng report filter UI với category select và reset action trong src/components/report-filters.tsx
- [X] T029 [US2] Truyền month và categoryId vào report query state trong src/features/reports/use-reports.ts và src/app/reports/page.tsx
- [X] T030 [US2] Cập nhật summary và bar chart consume filtered data trong src/components/report-summary.tsx và src/components/report-income-expense-bar.tsx
- [X] T031 [US2] Implement report refetch khi quay lại tab hoặc lấy lại focus trong src/features/reports/use-reports.ts và src/app/reports/page.tsx
- [X] T032 [US2] Đồng bộ transaction/category mutation với report refresh trong src/app/api/transactions/route.ts, src/app/api/transactions/[id]/route.ts, src/app/api/categories/route.ts, và src/lib/cache/revalidate-expense-data.ts

**Checkpoint**: US2 hoạt động độc lập với month + category filter, reset đúng, và refresh đúng trong cùng phiên.

---

## Phase 5: User Story 3 - Phân Tích Thu Chi Và Cơ Cấu Danh Mục (Priority: P3)

**Goal**: Hiển thị biểu đồ cột 2 cột (thu xanh lá, chi đỏ nhạt) và biểu đồ tròn cơ cấu chi tiêu của toàn bộ tháng.

**Independent Test**: Ở cùng một tháng, xác nhận bar chart có 2 cột thu/chi; khi filter danh mục, pie chart vẫn giữ cơ cấu toàn tháng.

### Tests for User Story 3

- [X] T033 [P] [US3] Viết unit tests cho bar/pie aggregation rules và top-category ordering trong tests/unit/report.service.test.ts
- [X] T034 [P] [US3] Viết contract test đảm bảo pie chart bỏ qua category filter trong tests/contract/reports.contract.test.ts
- [X] T035 [P] [US3] Viết integration test màu sắc, 2 cột bar chart, và legend của pie chart trong tests/integration/reports-page.test.tsx
- [X] T036 [P] [US3] Viết e2e test pie chart không bị giới hạn bởi category filter trong tests/e2e/reports.spec.ts

### Implementation for User Story 3

- [X] T037 [US3] Implement bar chart component với 2 cột thu/chi trong src/components/report-income-expense-bar.tsx
- [X] T038 [US3] Implement pie chart component cho toàn bộ chi tiêu tháng trong src/components/report-category-pie.tsx
- [X] T039 [US3] Cập nhật report service và report repository để tách nguồn dữ liệu bar chart và pie chart trong src/features/reports/report.service.ts và src/features/reports/report.repository.ts
- [X] T040 [US3] Gắn chart components, layout, và legend vào reports page trong src/app/reports/page.tsx và src/components/report-category-pie.tsx

**Checkpoint**: US3 hoàn tất, báo cáo đầy đủ tổng quan + bar chart + pie chart đúng rules clarify.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Hoàn thiện regression, perf, a11y, và tài liệu để merge an toàn.

- [X] T041 [P] Thêm regression tests cho month không có dữ liệu và một phía = 0 trong tests/integration/reports-page.test.tsx và tests/unit/report.service.test.ts
- [X] T042 [P] Thêm validation tests cho month format và category không tồn tại trong tests/contract/reports.contract.test.ts
- [X] T043 [P] Tối ưu aggregate query và benchmark report refresh trong src/features/reports/report.repository.ts và tests/performance/expense-report.performance.test.ts
- [X] T044 [P] Kiểm tra a11y cho filter controls và chart labels trong tests/integration/accessibility-smoke.test.tsx và src/components/report-filters.tsx
- [X] T045 Cập nhật README và quickstart feature docs trong README.md và specs/003-reports-tab/quickstart.md
- [X] T046 Chạy full quality gates và ghi kết quả trong specs/003-reports-tab/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Không phụ thuộc, có thể bắt đầu ngay.
- **Phase 2 (Foundational)**: Phụ thuộc Phase 1; block tất cả user stories.
- **Phase 3 (US1)**: Bắt đầu sau Phase 2; là MVP.
- **Phase 4 (US2)**: Bắt đầu sau US1 vì phụ thuộc report page cơ bản và mở rộng thêm same-session refresh cho bộ lọc.
- **Phase 5 (US3)**: Bắt đầu sau US2 để tái sử dụng bộ lọc và refresh flow hoàn chỉnh.
- **Phase 6 (Polish)**: Sau khi stories mục tiêu đã xong.

### User Story Dependencies

- **US1 (P1)**: Độc lập sau foundation.
- **US2 (P2)**: Phụ thuộc US1 vì cần summary page/hook đã hoạt động trước khi thêm category filter và same-session refresh.
- **US3 (P3)**: Phụ thuộc US2 để dùng chung filter và refresh behavior đã ổn định.

### Within Each User Story

- Test tasks được viết trước và phải fail trước implement.
- Repository/service trước API route.
- API route trước hooks/components.
- Components trước page composition và e2e finalize.

### Parallel Opportunities

- T002, T003, T004, T005 có thể chạy song song sau T001.
- T007, T008, T009, T010, T012, T013, T014 có thể chạy song song sau T006.
- Trong US1: T015-T018 có thể chạy song song; T019 và T022 có thể tách theo file.
- Trong US2: T023-T027 song song; T028-T031 có thể song song một phần.
- Trong US3: T033-T036 song song; T037 và T038 song song.
- Trong Polish: T041-T044 song song.

---

## Parallel Example: User Story 2

```bash
# Chạy tests song song cho US2
Task: "Viết unit tests cho category filter trong report service trong tests/unit/report.service.test.ts"
Task: "Viết contract test cho query categoryId hợp lệ và category không tồn tại trong tests/contract/reports.contract.test.ts"
Task: "Viết integration test same-session refresh sau khi transaction hoặc category thay đổi trong tests/integration/reports-page.test.tsx"

# Chạy implementation song song theo file
Task: "Mở rộng report filter UI với category select và reset action trong src/components/report-filters.tsx"
Task: "Implement report refetch khi quay lại tab hoặc lấy lại focus trong src/features/reports/use-reports.ts và src/app/reports/page.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Hoàn thành Phase 1 và Phase 2.
2. Hoàn thành US1 (T015-T022).
3. Validate độc lập US1 bằng unit + contract + integration + e2e.
4. Demo MVP tab Báo Cáo (tổng quan theo tháng).

### Incremental Delivery

1. Ship MVP US1.
2. Bổ sung US2 (bộ lọc tháng + danh mục, reset, same-session refresh).
3. Bổ sung US3 (bar chart + pie chart rules clarify).
4. Chốt polish và quality gates trước merge.

### Parallel Team Strategy

1. Team chốt Setup + Foundational.
2. Sau đó chia:
   - Dev A: API + service aggregate.
   - Dev B: Reports UI + chart components.
   - Dev C: Contract/integration/e2e tests.
3. Merge theo checkpoint mỗi user story.

---

## Notes

- Tất cả tasks tuân thủ format checklist `- [ ] T### [P?] [US?] Description with file path`.
- `[P]` chỉ đánh dấu khi có thể chạy song song an toàn khác file.
- US1 là phạm vi MVP đề xuất.
- FR-012 được cover trong US2 thay vì phase riêng để giữ task organization bám user story và acceptance scenarios.
- Bảo đảm chạy các quality gate trước merge: `npm run lint`, `npm run typecheck`, `npm run test`, `npm run test:e2e`, `npm run test:perf` khi có thay đổi aggregate.
