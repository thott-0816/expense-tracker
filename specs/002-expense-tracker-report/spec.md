# Feature Specification: Ung Dung Theo Doi Thu Chi Va Bao Cao Chi Tieu Hang Thang

**Feature Branch**: `002-expense-tracker-report`  
**Created**: 2026-03-14  
**Status**: Ready for Implementation  
**Input**: User description: "Xay dung ung dung theo doi thu/chi, phan loai va bao cao chi tieu hang thang. Nguoi dung tao Transactions (thu/chi), gan Category, xem Dashboard theo ngay/tuan/thang. Ho tro loc, tim kiem, va export CSV don gian."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Quan Ly Giao Dich Thu Chi (Priority: P1)

Nguoi dung them, chinh sua, va xoa giao dich thu/chi de ghi nhan dong tien hang ngay.

**Why this priority**: Day la gia tri cot loi cua ung dung. Neu khong co giao dich thi khong the phan tich va bao cao.

**Independent Test**: Co the test doc lap bang cach tao giao dich thu/chi, cap nhat thong tin, va kiem tra danh sach phan anh dung.

**Acceptance Scenarios**:

1. **Given** nguoi dung mo form tao giao dich, **When** nguoi dung nhap du truong bat buoc va luu, **Then** he thong tao giao dich moi dung loai va so tien.
2. **Given** da ton tai mot giao dich, **When** nguoi dung sua danh muc hoac so tien va luu, **Then** he thong cap nhat ngay tren danh sach giao dich.

---

### User Story 2 - Xem Dashboard Theo Ngay Tuan Thang (Priority: P2)

Nguoi dung xem dashboard tong quan de biet tong thu, tong chi, chenhlech, va phan bo chi tieu theo tung khoang thoi gian.

**Why this priority**: Dashboard la gia tri phan tich sau khi co du lieu giao dich, giup nguoi dung ra quyet dinh chi tieu.

**Independent Test**: Co the test doc lap bang du lieu mau va doi bo loc thoi gian ngay/tuan/thang de xac nhan tong hop dung.

**Acceptance Scenarios**:

1. **Given** dashboard dang hien thi theo ngay, **When** nguoi dung doi sang tuan hoac thang, **Then** he thong cap nhat chi so tong hop theo khoang moi.
2. **Given** co giao dich thu va chi trong ky, **When** dashboard tai xong, **Then** he thong hien thi tong thu, tong chi, va so du ky ro rang.

---

### User Story 3 - Loc Tim Kiem Va Export CSV (Priority: P3)

Nguoi dung loc giao dich theo khoang ngay, loai giao dich, danh muc; tim kiem theo tu khoa va xuat CSV de doi soat.

**Why this priority**: Day la tang gia tri bo sung cho nhu cau truy xuat du lieu, nhung phu thuoc vao viec co du lieu va dashboard co ban.

**Independent Test**: Co the test doc lap bang cach ap bo loc, tim kiem, sau do xuat CSV va doi chieu file voi ket qua dang hien thi.

**Acceptance Scenarios**:

1. **Given** danh sach giao dich co nhieu ban ghi, **When** nguoi dung loc theo danh muc va khoang ngay, **Then** he thong chi hien thi cac ban ghi hop le.
2. **Given** dang hien thi ket qua da loc, **When** nguoi dung bam export CSV, **Then** he thong tao file CSV chua dung cot va ban ghi dang xem.

---

### Edge Cases

- Nguoi dung nhap so tien bang 0 hoac am: he thong chan luu va hien thi thong bao loi ro rang.
- Khong co giao dich trong khoang thoi gian da chon: dashboard va danh sach hien thi trang thai rong, khong coi la loi he thong.
- Tu khoa tim kiem khong khop: he thong tra ket qua rong va giu nguyen bo loc hien tai.
- File CSV co ky tu dac biet trong mo ta: he thong van xuat file hop le de mo bang cong cu bang tinh thong dung.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST cho phep tao giao dich moi voi cac truong bat buoc: loai (thu/chi), so tien, ngay phat sinh, danh muc.
- **FR-002**: System MUST cho phep cap nhat va xoa giao dich da ton tai.
- **FR-003**: System MUST sap xep danh sach giao dich theo ngay phat sinh giam dan mac dinh.
- **FR-004**: System MUST cung cap dashboard tong hop theo ngay, tuan, thang.
- **FR-005**: System MUST hien thi tong thu, tong chi, so du trong khoang thoi gian da chon.
- **FR-006**: System MUST ho tro loc theo khoang ngay, loai giao dich, va danh muc.
- **FR-007**: System MUST ho tro tim kiem theo tu khoa tren mo ta giao dich hoac ten danh muc.
- **FR-008**: System MUST cho phep export CSV theo tap du lieu dang hien thi sau loc/tim kiem.
- **FR-009**: System MUST cho phep tao va liet ke danh muc de nguoi dung gan cho giao dich trong pham vi phase 1.
- **FR-010**: System MUST thong bao loi than thien cho nguoi dung khi du lieu dau vao khong hop le.
- **FR-011**: System MUST ghi nhan dau vet thoi gian tao va cap nhat cho moi giao dich.
- **FR-012**: System MUST dam bao du lieu dashboard cap nhat khi giao dich thay doi trong cung phien lam viec.

### Key Entities *(include if feature involves data)*

- **Transaction**: Dai dien mot khoan thu hoac chi, gom loai giao dich, so tien, ngay phat sinh, danh muc, mo ta, ngay tao, ngay cap nhat.
- **Category**: Dai dien nhom phan loai giao dich, gom ten danh muc, mo ta tuy chon, va pham vi ap dung.
- **Dashboard Aggregate**: Tap chi so tong hop theo khoang thoi gian da chon, gom tong thu, tong chi, so du, phan bo theo danh muc.
- **Filter Query**: Tap dieu kien loc va tim kiem hien tai, gom khoang ngay, loai giao dich, danh muc, va tu khoa.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Nguoi dung co the tao mot giao dich hop le trong toi da 30 giay.
- **SC-002**: 100% giao dich hop le duoc hien thi trong danh sach va duoc tinh vao dashboard sau khi luu.
- **SC-003**: Ket qua loc/tim kiem duoc tra ve trong <= 2 giay voi bo du lieu den 10.000 giao dich.
- **SC-004**: Ty le export CSV thanh cong dat it nhat 95% trong cac truong hop hop le.
- **SC-005**: Nguoi dung hoan thanh luong xem bao cao thang (chon khoang + doc tong hop) trong <= 15 giay.
- **SC-006**: It nhat 90% nguoi dung thu nghiem tim thay giao dich can doi soat ngay lan thao tac dau tien.

## Assumptions

- Phien ban dau la ung dung cho mot nguoi dung trong moi moi truong su dung.
- Don vi tien te duoc cau hinh thong nhat trong toan bo ung dung.
- CSV la dinh dang xuat duy nhat trong pham vi feature nay.
- Dashboard khong bao gom du bao tuong lai; chi phan tich du lieu da ghi nhan.

## Dependencies

- Can co co che luu tru ben vung cho transactions va categories.
- Can co co che tai file tu client de nguoi dung nhan tep CSV.
- Can co quy tac validation nhat quan cho input giao dich va danh muc.

## Scope Notes

- Phase 1 chi bao gom tao va su dung category; chinh sua/xoa category se duoc xem xet o phase sau.

## Language and Readability

- Spec SHOULD be written in Vietnamese for internal team clarity unless external
  stakeholders explicitly require English.
