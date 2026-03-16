# Data Model - Expense Tracker Report

## Entity: Category
- Description: Nhóm phân loại giao dịch.
- Fields:
  - id: string (uuid, primary key)
  - name: string (required, unique trong phạm vi người dùng)
  - type: enum (income, expense, both)
  - description: string (optional, max 255)
  - createdAt: datetime
  - updatedAt: datetime
- Validation rules:
  - name: trim, độ dài 2..50, không rỗng
  - type: phải nằm trong tập giá trị hợp lệ
- Relationships:
  - 1 Category - N Transactions

## Entity: Transaction
- Description: Bản ghi thu hoặc chi.
- Fields:
  - id: string (uuid, primary key)
  - kind: enum (income, expense)
  - amount: decimal(14,2)
  - occurredAt: date
  - categoryId: string (foreign key -> Category.id)
  - note: string (optional, max 500)
  - createdAt: datetime
  - updatedAt: datetime
- Validation rules:
  - amount > 0
  - occurredAt không null
  - categoryId phải tồn tại
  - note nếu có thì <= 500 và được trim
- State transitions:
  - created -> updated -> deleted

## Entity: FilterQuery (View Model)
- Description: Tập điều kiện lọc và tìm kiếm.
- Fields:
  - fromDate: date (optional)
  - toDate: date (optional)
  - kind: enum (income, expense, all)
  - categoryId: string (optional)
  - keyword: string (optional)
  - period: enum (day, week, month)
- Validation rules:
  - fromDate <= toDate nếu cả hai cùng tồn tại
  - keyword <= 100 ký tự

## Entity: DashboardAggregate (Read Model)
- Description: Tổng hợp số liệu dashboard theo period.
- Fields:
  - period: enum (day, week, month)
  - totalIncome: decimal(14,2)
  - totalExpense: decimal(14,2)
  - balance: decimal(14,2)
  - categoryBreakdown: array<{categoryId, categoryName, amount, ratio}>
- Validation rules:
  - balance = totalIncome - totalExpense
  - ratio nằm trong [0, 1]

## CSV Schema
- Columns:
  - id
  - occurredAt
  - kind
  - categoryName
  - amount
  - note
  - createdAt
  - updatedAt
- Rules:
  - CSV phản ánh đúng tập dữ liệu sau filter/search
  - Escape ký tự đặc biệt theo RFC 4180
