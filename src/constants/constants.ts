// Fontawesome
export const TRASH_CAN_REGULAR: any = 'fa-regular fa-trash-can';

export const QUERY_PLACEHOLDER_DATA = {
  data: [],
  meta: {
    pagination: {
      total: 1,
      count: 1,
      per_page: 1,
      current_page: 1,
      total_pages: 1
    },
    summation: {},
    attributes: [],
    status_code: 0,
    message: 'Successfully',
    recordsTotal: 0,
    recordsFiltered: 0
  }
};

export const FILTER_DATE_TIME = [
  {
    id: 1,
    title: 'Theo ngày',
    list: [{ id: 11, title: 'Hôm nay' }, { id: 12, title: 'Hôm qua' }]
  },
  {
    id: 2,
    title: 'Theo tuần',
    list: [{ id: 21, title: 'Tuần này' }, { id: 22, title: 'Tuần trước' }, { id: 23, title: '7 ngày qua' }]
  },
  {
    id: 3,
    title: 'Theo tháng',
    list: [{ id: 31, title: 'Tháng này' }, { id: 32, title: 'Tháng trước' }, { id: 33, title: '30 ngày qua' }]
  },
  {
    id: 4,
    title: 'Theo quý',
    list: [{ id: 41, title: 'Quý này' }, { id: 42, title: 'Quý trước' }]
  },
  {
    id: 5,
    title: 'Theo năm',
    list: [{ id: 51, title: 'Năm nay' }, { id: 52, title: 'Năm trước' }, { id: 53, title: 'Toàn thời gian' }]
  }
];

export const FILTER_DATE_ARRAY = [
  { id: 11, title: 'Hôm nay' }, { id: 12, title: 'Hôm qua' },
  { id: 21, title: 'Tuần này' }, { id: 22, title: 'Tuần trước' }, { id: 23, title: '7 ngày qua' },
  { id: 31, title: 'Tháng này' }, { id: 32, title: 'Tháng trước' }, { id: 33, title: '30 ngày qua' },
  { id: 41, title: 'Quý này' }, { id: 42, title: 'Quý trước' },
  { id: 51, title: 'Năm nay' }, { id: 52, title: 'Năm trước' }, { id: 53, title: 'Toàn thời gian' }
];

export const GENDER_RADIO = [
  { value: 0, label: 'Nam' },
  { value: 1, label: 'Nữ' }
];
