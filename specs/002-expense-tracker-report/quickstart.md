# Quickstart - Expense Tracker Report

## 1) Chay project

1. Dam bao dang dung Node.js 24 LTS.
2. Cai dependencies:
   - npm install
3. Chay dev server:
   - npm run dev
4. Mo: http://localhost:3000

## 2) Chuan bi du lieu mau

1. Tao categories:
   - Food (expense)
   - Transport (expense)
   - Salary (income)
2. Tao toi thieu 10 transactions o nhieu ngay khac nhau.

## 3) Kiem thu User Story 1 (Transactions CRUD)

1. Tao giao dich thu va chi.
2. Sua amount/category cua giao dich.
3. Xoa mot giao dich.
4. Xac nhan danh sach transactions cap nhat dung.

## 4) Kiem thu User Story 2 (Dashboard)

1. Mo dashboard.
2. Chuyen period day -> week -> month.
3. Kiem tra totalIncome, totalExpense, balance thay doi dung.

## 5) Kiem thu User Story 3 (Filter/Search/CSV)

1. Ap bo loc theo category va khoang ngay.
2. Tim kiem theo keyword trong note.
3. Export CSV.
4. Mo file CSV va doi chieu voi ket qua dang hien thi.

## 6) Quality gates truoc merge

1. Lint:
   - npm run lint
2. Type-check:
   - npx tsc --noEmit
3. Tests:
   - npm run test
4. Neu la bug fix: bo sung regression test fail-truoc/pass-sau.

## 7) Security checks

1. Validate input tai route handlers.
2. Khong commit secrets vao repository.
3. Khong log du lieu nhay cam.
