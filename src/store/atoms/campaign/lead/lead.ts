import { atom } from 'recoil';

export const leadFilterParamState = atom({
  key: 'leadFilterParamState',
  default: {
    filterDate: { type: 0, value: 53 },
    employeeStatus: { id: 99, text: 'Tất cả' },
    employees: []
  }
});

export const leadPageLimitState = atom({
  key: 'leadPageLimitState',
  default: 15
});

export const leadSelectedTableState = atom({
  key: 'leadSelectedTableState',
  default: []
});

export const leadColumnTableState = atom({
  key: 'leadColumnTableState',
  default: [
    { field: 'expanded', title: ' ', minWidth: 50, isShow: true },
    { field: 'checked', title: '', minWidth: 50, isShow: true },
    { field: 'code', title: 'Mã Lead', minWidth: 120, isShow: true },
    { field: 'name', title: 'Tên Lead', minWidth: 200, isShow: true },
    { field: 'birthday', title: 'Ngày sinh', minWidth: 120, isShow: true },
    { field: 'mobile', title: 'Số điện thoại', minWidth: 120, isShow: true },
    { field: 'email', title: 'Email', minWidth: 220, isShow: true },
    { field: 'sex', title: 'Giới tính', minWidth: 100, isShow: true },
    { field: 'address', title: 'Địa chỉ', minWidth: 200, isShow: false },
    { field: 'employee', title: 'Nhân viên phụ trách', minWidth: 230, isShow: true },
    { field: 'tags', title: 'Thẻ', minWidth: 150, isShow: true },
    { field: 'created_at', title: 'Ngày nhận lead', minWidth: 150, isShow: true },
    { field: 'sales_stage', title: 'Trạng thái', minWidth: 150, isShow: true },
    { field: 'categories', title: 'Nhóm Lead', minWidth: 200, isShow: true },
    { field: 'resources', title: 'Nguồn Lead', minWidth: 200, isShow: true },
    { field: 'description', title: 'Ghi chú', minWidth: 300, isShow: true }
  ]
});
