# Research - Expense Tracker Report

## Decision 1: Kien truc he thong
- Decision: Su dung single Next.js App Router project.
- Rationale: Scope hien tai tap trung 1 domain nghiep vu, tranh chi phi van hanh cao cua mo hinh tach service.
- Alternatives considered: Tach backend API rieng (bi loai vi tang boilerplate deploy/monitoring).

## Decision 2: Luu tru du lieu
- Decision: Su dung SQLite thong qua Prisma ORM.
- Rationale: Phu hop phase 1 voi quy mo den 10k transactions, migration ro rang, setup nhanh.
- Alternatives considered: PostgreSQL (manh hon khi scale lon nhung chua can thiet); localStorage (kho truy van aggregate).

## Decision 3: Validation va trust boundaries
- Decision: Validate payload tai route handlers bang Zod schemas.
- Rationale: Dam bao input hop le o trust boundary, thong diep loi co cau truc, dung constitutional security gate.
- Alternatives considered: Chi validate client (khong an toan); validate thu cong (de sot edge cases).

## Decision 4: Dashboard aggregate
- Decision: Aggregate tai server theo period day/week/month.
- Rationale: Giam payload va tranh sai lech khi client tu tinh toan.
- Alternatives considered: Tinh tren client tu full dataset (khong toi uu khi du lieu lon).

## Decision 5: Loc tim kiem
- Decision: Ho tro ket hop filter (date range/kind/category) + keyword search tren note/category.
- Rationale: Bap sat FR-006 FR-007 va nhu cau doi soat thuc te.
- Alternatives considered: Chi filter hoac chi search (khong du bao phu use case).

## Decision 6: Export CSV
- Decision: Export theo tap ket qua dang hien thi sau filter/search.
- Rationale: Dung FR-008 va ky vong nguoi dung "what you see is what you export".
- Alternatives considered: Export toan bo records khong theo filter (de gay nham lan).

## Decision 7: Quality gates
- Decision: Ap dung lint + type-check + unit/integration + smoke e2e.
- Rationale: Dap ung constitution quality gate, can bang toc do va do tin cay.
- Alternatives considered: Chi unit tests (thieu bao phu luong API/UI), chi e2e (thoi gian chay dai va kho debug).

## Decision 8: Logging va operability
- Decision: Logging co cau truc cho thao tac CRUD + export, an danh/bo qua du lieu nhay cam.
- Rationale: Dap ung principle Simplicity and Operability + Security.
- Alternatives considered: Log toan bo payload (rui ro lo du lieu), khong log (kho dieu tra su co).
