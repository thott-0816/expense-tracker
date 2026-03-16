# API Contract - Tab Báo Cáo Chi Tiêu Theo Tháng

Base path: /api

## GET /api/reports/monthly
- Purpose: Lấy dữ liệu tổng hợp cho tab Báo Cáo theo tháng được chọn.
- Query params:
  - month: string (required, format YYYY-MM)
  - categoryId: string (optional)
- Response 200:
```json
{
  "filter": {
    "month": "2026-03",
    "categoryId": "cat_food"
  },
  "summary": {
    "month": "2026-03",
    "totalIncome": 25000000,
    "totalExpense": 9500000,
    "balance": 15500000,
    "filterCategoryId": "cat_food"
  },
  "barChart": {
    "month": "2026-03",
    "incomeAmount": 0,
    "expenseAmount": 2500000,
    "incomeColor": "green",
    "expenseColor": "light-red"
  },
  "pieChart": {
    "month": "2026-03",
    "items": [
      {
        "categoryId": "cat_food",
        "categoryName": "Ăn uống",
        "amount": 2500000,
        "ratio": 0.2632
      },
      {
        "categoryId": "cat_transport",
        "categoryName": "Di chuyển",
        "amount": 1800000,
        "ratio": 0.1895
      }
    ]
  },
  "generatedAt": "2026-03-16T09:00:00.000Z"
}
```

### Behavioral rules
- `summary` và `barChart` được tính trên tập giao dịch theo `month` và `categoryId` (nếu có).
- `pieChart` được tính trên toàn bộ giao dịch chi tiêu trong `month`, bỏ qua `categoryId`.
- Biểu đồ cột luôn có 2 giá trị `incomeAmount` và `expenseAmount` (có thể = 0).
- Nếu tháng không có dữ liệu phù hợp, API vẫn trả `200` với `totalIncome = 0`, `totalExpense = 0`, và `pieChart.items = []`.
- Mỗi lần gọi API phải phản ánh trạng thái dữ liệu đã được lưu mới nhất tại thời điểm request, để client có thể làm mới tab Báo Cáo trong cùng phiên mà không cần tải lại toàn bộ ứng dụng.
- Nếu `categoryId` được truyền nhưng không tồn tại trong hệ thống, API trả lỗi `NOT_FOUND` theo error contract chung.

## Error Contract

Tất cả lỗi dùng format:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu đầu vào không hợp lệ",
    "details": [
      {
        "field": "month",
        "message": "month must match YYYY-MM"
      }
    ]
  }
}
```

Error codes:
- VALIDATION_ERROR (400)
- NOT_FOUND (404)
- INTERNAL_ERROR (500)
