# Data Model - Expense Tracker Report

## Entity: Category
- Description: Nhom phan loai giao dich.
- Fields:
  - id: string (uuid, primary key)
  - name: string (required, unique trong pham vi nguoi dung)
  - type: enum (income, expense, both)
  - description: string (optional, max 255)
  - createdAt: datetime
  - updatedAt: datetime
- Validation rules:
  - name: trim, do dai 2..50, khong rong
  - type: phai nam trong tap gia tri hop le
- Relationships:
  - 1 Category - N Transactions

## Entity: Transaction
- Description: Ban ghi thu hoac chi.
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
  - occurredAt khong null
  - categoryId phai ton tai
  - note neu co thi <= 500 va duoc trim
- State transitions:
  - created -> updated -> deleted

## Entity: FilterQuery (View Model)
- Description: Tap dieu kien loc va tim kiem.
- Fields:
  - fromDate: date (optional)
  - toDate: date (optional)
  - kind: enum (income, expense, all)
  - categoryId: string (optional)
  - keyword: string (optional)
  - period: enum (day, week, month)
- Validation rules:
  - fromDate <= toDate neu ca hai cung ton tai
  - keyword <= 100 ky tu

## Entity: DashboardAggregate (Read Model)
- Description: Tong hop so lieu dashboard theo period.
- Fields:
  - period: enum (day, week, month)
  - totalIncome: decimal(14,2)
  - totalExpense: decimal(14,2)
  - balance: decimal(14,2)
  - categoryBreakdown: array<{categoryId, categoryName, amount, ratio}>
- Validation rules:
  - balance = totalIncome - totalExpense
  - ratio nam trong [0, 1]

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
  - CSV phan anh dung tap du lieu sau filter/search
  - Escape ky tu dac biet theo RFC 4180
