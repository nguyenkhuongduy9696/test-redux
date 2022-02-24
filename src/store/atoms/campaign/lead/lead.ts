import { atom } from 'recoil';

export const leadFilterParamState = atom({
  key: 'leadFilterParamState',
  default: {

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
    // { field: ' ', title: '', minWidnt: 50, isShow: true },
    { field: 'checked', title: '', minWidnt: 50, isShow: true },
    { field: 'code', title: 'Mã Lead', minWidnt: 155, isShow: true },
    { field: 'name', title: 'Tên Lead', minWidnt: 200, isShow: true },
    { field: 'birthday', title: 'Ngày sinh', minWidnt: 150, isShow: true },
    { field: 'mobile', title: 'Số điện thoại', minWidnt: 150, isShow: true },
    { field: 'email', title: 'Email', minWidnt: 220, isShow: true },
    { field: 'sex', title: 'Giới tính', minWidnt: 100, isShow: true },
    { field: 'address', title: 'Địa chỉ', minWidnt: 200, isShow: false },
    { field: 'employee', title: 'Nhân viên phụ trách', minWidnt: 230, isShow: true },
    { field: 'tags', title: 'Thẻ', minWidnt: 150, isShow: true },
    { field: 'created_at', title: 'Ngày nhận lead', minWidnt: 150, isShow: true },
    { field: 'sales_stage', title: 'Trạng thái', minWidnt: 150, isShow: true },
    { field: 'categories', title: 'Nhóm Lead', minWidnt: 250, isShow: true },
    { field: 'resources', title: 'Nguồn Lead', minWidnt: 250, isShow: true },
    { field: 'description', title: 'Ghi chú', minWidnt: 300, isShow: true }
  ]
});
