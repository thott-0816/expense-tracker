# API Contract - Expense Tracker Report

Base path: /api

## GET /api/categories
- Purpose: Lay danh sach category.
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
- Purpose: Tao category moi.
- Request body:
```json
{
  "name": "Salary",
  "type": "income",
  "description": "Thu nhap luong"
}
```
- Response 201: category object da tao.

## GET /api/transactions
- Purpose: Lay transactions voi filter/search.
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
      "note": "Bua trua"
    }
  ],
  "total": 1
}
```

## POST /api/transactions
- Purpose: Tao transaction.
- Request body:
```json
{
  "kind": "expense",
  "amount": 120000,
  "occurredAt": "2026-03-14",
  "categoryId": "cat_123",
  "note": "Bua trua"
}
```
- Response 201: transaction object da tao.

## PATCH /api/transactions/:id
- Purpose: Cap nhat transaction.
- Request body: kind, amount, occurredAt, categoryId, note (partial update).
- Response 200: transaction object da cap nhat.

## DELETE /api/transactions/:id
- Purpose: Xoa transaction.
- Response 204: empty body.

## GET /api/dashboard
- Purpose: Lay tong hop dashboard theo period.
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
- Purpose: Export CSV theo ket qua dang filter/search.
- Query params: giong GET /api/transactions.
- Response 200:
  - Content-Type: text/csv; charset=utf-8
  - Content-Disposition: attachment; filename="transactions-YYYYMMDD.csv"

## Error Contract

Tat ca loi dung format:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Du lieu dau vao khong hop le",
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
