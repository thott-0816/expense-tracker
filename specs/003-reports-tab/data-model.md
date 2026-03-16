# Data Model - Tab Báo Cáo Chi Tiêu Theo Tháng

## Entity: ReportFilter
- Description: Bộ điều kiện lọc dữ liệu cho màn Báo Cáo.
- Fields:
  - month: string (format YYYY-MM, required)
  - categoryId: string (optional)
- Validation rules:
  - month phải đúng định dạng YYYY-MM và là tháng hợp lệ
  - categoryId nếu có thì phải tồn tại trong Category

## Entity: MonthlyReportSummary
- Description: Số liệu tổng quan hiển thị trên card tổng hợp.
- Fields:
  - month: string (YYYY-MM)
  - totalIncome: decimal(14,2)
  - totalExpense: decimal(14,2)
  - balance: decimal(14,2)
  - filterCategoryId: string | null
- Validation rules:
  - totalIncome >= 0
  - totalExpense >= 0
  - balance = totalIncome - totalExpense

## Entity: MonthlyIncomeExpenseSeries
- Description: Dữ liệu cho biểu đồ cột của duy nhất tháng đang chọn.
- Fields:
  - month: string (YYYY-MM)
  - incomeAmount: decimal(14,2)
  - expenseAmount: decimal(14,2)
  - incomeColor: string (UI token: green)
  - expenseColor: string (UI token: light-red)
- Validation rules:
  - incomeAmount >= 0
  - expenseAmount >= 0
  - Luôn có đủ 2 cột (income và expense), kể cả khi giá trị = 0

## Entity: CategoryExpenseDistribution
- Description: Cơ cấu chi tiêu theo danh mục của toàn bộ tháng đã chọn.
- Fields:
  - month: string (YYYY-MM)
  - items: array<CategoryExpenseSlice>

## Value Object: CategoryExpenseSlice
- Fields:
  - categoryId: string
  - categoryName: string
  - amount: decimal(14,2)
  - ratio: decimal(5,4)
- Validation rules:
  - amount >= 0
  - ratio trong khoảng [0, 1]
  - Tổng ratio xấp xỉ 1.0 khi tổng chi > 0

## Entity: MonthlyReportResponse
- Description: Payload tổng hợp cho màn Báo Cáo.
- Fields:
  - filter: ReportFilter
  - summary: MonthlyReportSummary
  - barChart: MonthlyIncomeExpenseSeries
  - pieChart: CategoryExpenseDistribution
  - generatedAt: datetime
- Rules:
  - `summary` và `barChart` áp dụng bộ lọc month + categoryId
  - `pieChart` chỉ áp dụng month, không áp dụng categoryId

## Entity: ReportViewState
- Description: Trạng thái hiển thị của tab Báo Cáo trong cùng phiên sử dụng.
- Fields:
  - filter: ReportFilter
  - status: enum(`idle`, `loading`, `ready`, `empty`, `error`, `refreshing`)
  - errorMessage: string | null
  - lastSyncedAt: datetime | null
- State transitions:
  - `idle -> loading -> ready|empty|error` khi mở tab lần đầu
  - `ready -> loading -> ready|empty|error` khi đổi tháng hoặc danh mục
  - `ready -> refreshing -> ready|empty|error` khi dữ liệu giao dịch hoặc danh mục liên quan thay đổi trong cùng phiên và tab được làm mới
- Validation rules:
  - `lastSyncedAt` phải khớp hoặc trễ không quá thời điểm `generatedAt` của payload mới nhất
  - `errorMessage` chỉ có giá trị khi `status = error`

## Existing Domain Dependencies
- Transaction:
  - kind (income|expense), amount, occurredAt, categoryId
- Category:
  - id, name
- Quan hệ dữ liệu:
  - Category (1) -> (N) Transaction
  - Monthly report aggregate đọc dữ liệu từ Transaction join Category theo month
  - Category mới được tạo trong cùng phiên có thể làm thay đổi danh sách lựa chọn của `ReportFilter`, dù không nhất thiết làm thay đổi aggregate hiện tại
