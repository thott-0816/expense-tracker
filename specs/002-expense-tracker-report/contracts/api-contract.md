# API Contract - Expense Tracker Report

Base path: /api

## GET /api/categories
- Purpose: Lấy danh sách category.
- Response 200:
```json
{
  "items": [
    {
      "id": "cat_123",
      "name": "Food",
      "type": "expense",
      "description": "Chi phi an uong"
    }
  ]
}
```

## POST /api/categories
- Purpose: Tạo category mới.
- Request body:
```json
{
  "name": "Salary",
  "type": "income",
  "description": "Thu nhập lương"
}
```
- Response 201: category object đã tạo.

## GET /api/transactions
- Purpose: Lấy transactions với filter/search.
- Query params: fromDate, toDate, kind, categoryId, keyword.
- Response 200:
```json
{
  "items": [
    {
      "id": "txn_001",
      "kind": "expense",
      "amount": 120000,
      "occurredAt": "2026-03-14",
      "categoryId": "cat_123",
      "categoryName": "Food",
      "note": "Bữa trưa"
    }
  ],
  "total": 1
}
```

## POST /api/transactions
- Purpose: Tạo transaction.
- Request body:
```json
{
  "kind": "expense",
  "amount": 120000,
  "occurredAt": "2026-03-14",
  "categoryId": "cat_123",
  "note": "Bữa trưa"
}
```
- Response 201: transaction object đã tạo.

## PATCH /api/transactions/:id
- Purpose: Cập nhật transaction.
- Request body: kind, amount, occurredAt, categoryId, note (partial update).
- Response 200: transaction object đã cập nhật.

## DELETE /api/transactions/:id
- Purpose: Xóa transaction.
- Response 204: empty body.

## GET /api/dashboard
- Purpose: Lấy tổng hợp dashboard theo period.
- Query params:
  - period: day|week|month (required)
  - fromDate, toDate (optional)
- Response 200:
```json
{
  "period": "month",
  "totalIncome": 25000000,
  "totalExpense": 9500000,
  "balance": 15500000,
  "categoryBreakdown": [
    {
      "categoryId": "cat_123",
      "categoryName": "Food",
      "amount": 2500000,
      "ratio": 0.2632
    }
  ]
}
```

## GET /api/transactions/export.csv
- Purpose: Export CSV theo kết quả đang filter/search.
- Query params: giống GET /api/transactions.
- Response 200:
  - Content-Type: text/csv; charset=utf-8
  - Content-Disposition: attachment; filename="transactions-YYYYMMDD.csv"

## Error Contract

Tất cả lỗi dùng format:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu đầu vào không hợp lệ",
    "details": [
      {
        "field": "amount",
        "message": "amount must be greater than 0"
      }
    ]
  }
}
```

Error codes:
- VALIDATION_ERROR (400)
- NOT_FOUND (404)
- CONFLICT (409)
- INTERNAL_ERROR (500)
