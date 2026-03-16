# Implementation Plan: Expense Tracker Report

**Branch**: `002-expense-tracker-report` | **Date**: 2026-03-14 | **Spec**: /home/tran.thi.tho@sun-asterisk.com/workspace/ai/specs/002-expense-tracker-report/spec.md
**Input**: Feature specification from `/specs/002-expense-tracker-report/spec.md`

## Summary

Xây dựng ứng dụng theo dõi thu/chi có các luồng chính: quản lý transactions,
gán category, tổng hợp dashboard theo ngày/tuần/tháng, lọc/tìm kiếm, và export
CSV. Kế hoạch kỹ thuật ưu tiên đơn giản và khả năng vận hành: single Next.js app,
TypeScript strict, data layer nhẹ với SQLite, validation đầy đủ tại trust
boundary, và quality gates rõ ràng trước merge.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 24 LTS  
**Primary Dependencies**: Next.js 16 App Router, React 19, Zod, Prisma ORM, SQLite  
**Storage**: SQLite (file-based) cho transactions và categories  
**Testing**: Vitest + Testing Library + Playwright (smoke e2e)  
**Target Platform**: Web browser desktop/mobile, local Linux dev  
**Project Type**: Web application (single Next.js project)  
**Performance Goals**: lọc/tìm kiếm p95 <= 2s với 10k transactions; dashboard tải <= 1.5s dataset trung bình  
**Constraints**: TypeScript strict; không commit secrets; validate input tại route handlers; ưu tiên thiết kế đơn giản  
**Scale/Scope**: Phase 1 cho 1 người dùng/phiên, đến khoảng 10k transactions

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- User value gate: PASS. US1/US2/US3 map trực tiếp tới SC-001..SC-006.
- Spec chain gate: PASS. Kế hoạch giữ nhất quán với `spec.md`; `tasks.md` sẽ được tách theo user stories.
- Quality gate: PASS. Định nghĩa rõ lint + type-check + test unit/integration + regression test.
- Security gate: PASS. Input validation bằng schema, secrets không nằm trong source, lỗi được xử lý có kiểm soát.
- Simplicity gate: PASS. Chọn single app, không thêm microservice hoặc tầng phụ trợ chưa cần thiết.
- Language gate: PASS. Tài liệu plan và artefacts sử dụng tiếng Việt.

Post-Design Re-check (Phase 1): PASS. Các artefact research/data-model/contracts/quickstart giữ nhất quán với constitution.

## Project Structure

### Documentation (this feature)

```text
specs/002-expense-tracker-report/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── page.tsx
│   ├── dashboard/
│   └── api/
├── components/
├── features/
│   ├── transactions/
│   ├── categories/
│   ├── dashboard/
│   └── export/
├── lib/
│   ├── db/
│   ├── validation/
│   └── csv/
└── types/

tests/
├── unit/
├── integration/
├── contract/
└── e2e/
```

**Structure Decision**: Chọn single Next.js app để giảm complexity và triển khai
nhanh theo constitution "Simplicity and Operability", tách module theo feature
để dễ mở rộng ở phase sau. Phase 1 sử dụng `src/app/page.tsx` làm transaction
workspace chính; dashboard được tách riêng tại `src/app/dashboard/page.tsx`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
