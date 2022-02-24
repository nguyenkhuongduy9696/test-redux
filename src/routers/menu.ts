export const menu = [
  {
    id: 1,
    icon: 'home',
    title: 'Tổng quan',
    path: '/',
    subMenu: []
  },
  {
    id: 2,
    icon: 'bullhorn',
    title: 'Marketing',
    path: '/admin/member',
    subMenu: [
      { id: 201, subIcon: 'bullhorn', subTitle: 'Zalo Marketing', subPath: '/admin/zalo-marketing/zalo-marketing' },
      { id: 202, subIcon: 'comments', subTitle: 'SMS Marketing', subPath: '/admin/sms-marketing/sms-marketing' },
      { id: 203, subIcon: 'envelope', subTitle: 'Email Marketing', subPath: '/admin/email-marketing/email-marketing' },
      { id: 204, subIcon: 'thumbs-up', subTitle: 'Facebook', subPath: '/admin/sale-online/sale-online' },
      { id: 206, subIcon: 'users-cog', subTitle: 'Marketing Automation', subPath: '/admin/automation/automation' },
      { id: 207, subIcon: 'file-word', subTitle: 'Web Form', subPath: '/admin/web-form/web-form' }
    ]
  },
  {
    id: 3,
    icon: 'list',
    title: 'Chiến dịch',
    path: '/admin/contact',
    subMenu: [
      { id: 300, subIcon: 'users', subTitle: 'Lead', subPath: '/admin/lead/lead' },
      { id: 303, subIcon: 'cogs', subTitle: 'Nhiệm vụ - kết quả', subPath: '/admin/setting/main-setting#tab-config-result' },
      { id: 305, subIcon: 'phone-square', subTitle: 'Telesales', subPath: '/admin/telesales/telesales' },
      { id: 302, subIcon: 'clipboard-check', subTitle: 'Chiến dịch', subPath: '/admin/campaign/campaign' },
      { id: 304, subIcon: 'calendar-plus', subTitle: 'Cơ hội', subPath: '/admin/opportunity/opportunity' },
      { id: 301, subIcon: 'project-diagram', subTitle: 'Dự án', subPath: '/admin/project/project' },
      { id: 306, subIcon: 'tasks', subTitle: 'Xem nhanh chiến dịch', subPath: '/admin/campaign/kanban' }
    ]
  },
  {
    id: 4,
    icon: 'briefcase',
    title: 'Công việc',
    path: 'admin/task',
    subMenu: [
      { id: 401, subIcon: 'calendar-alt', subTitle: 'Lịch công việc', subPath: '/admin/task/calendar' },
      { id: 402, subIcon: 'briefcase', subTitle: 'Công việc', subPath: '/admin/task/task' },
      { id: 403, subIcon: 'ticket-alt', subTitle: 'Ticket', subPath: '/admin/ticket/ticket' },
      { id: 404, subIcon: 'phone-square-alt', subTitle: 'Tổng đài', subPath: '/admin/call-center/call-center' },
      { id: 405, subIcon: 'calendar', subTitle: 'Lịch CSKH', subPath: '/admin/task/task' },
      { id: 406, subIcon: 'business-time', subTitle: 'KPI', subPath: '/admin/kpi/kpi-list' },
      { id: 407, subIcon: 'folder', subTitle: 'Quản lý tài liệu', subPath: '/admin/note-documents/note-documents' }
    ]
  },
  {
    id: 5,
    icon: 'cubes',
    title: 'Hàng hóa',
    path: '/admin/product',
    subMenu: [
      { id: 501, subIcon: 'cube', subTitle: 'Danh mục', subPath: '/admin/product/product' },
      { id: 502, subIcon: 'tags', subTitle: 'Bảng giá', subPath: '/admin/price-book/price-book' },
      { id: 504, subIcon: 'clipboard-check', subTitle: 'Kiểm kho', subPath: '/admin/stock-adjustment/list' },
      { id: 505, subIcon: 'dolly-flatbed', subTitle: 'Chuyển kho', subPath: '/admin/stock-transfer/list' }
    ]
  },
  {
    id: 6,
    icon: 'hand-holding-usd',
    title: 'Giao dịch',
    path: '/admin/trade',
    subMenu: [
      { id: 600, subIcon: 'box', subTitle: 'Đặt hàng', subPath: '/admin/purchase-order/list' },
      { id: 601, subIcon: 'hand-holding-usd', subTitle: 'Hóa đơn', subPath: '/admin/sell-order/list' },
      { id: 602, subIcon: 'file-contract', subTitle: 'Vận đơn', subPath: '/admin/order-delivery/order-delivery' },
      { id: 603, subIcon: 'reply-all', subTitle: 'Trả hàng', subPath: '/admin/return-order/return-order' },
      { id: 605, subIcon: 'cart-arrow-down', subTitle: 'Nhập hàng', subPath: '/admin/import-order/list' }
    ]
  },
  {
    id: 7,
    icon: 'user-friends',
    title: 'Đối tác',
    path: '/admin/customer',
    subMenu: [
      { id: 700, subIcon: 'users', subTitle: 'Khách hàng', subPath: '/admin/customer/customer' },
      { id: 701, subIcon: 'chalkboard-teacher', subTitle: 'Nhà cung cấp', subPath: '/admin/supplier/supplier' },
      { id: 702, subIcon: 'truck', subTitle: 'Đối tác giao hàng', subPath: '/admin/partner-delivery/partner-delivery' }
    ]
  },
  {
    id: 8,
    icon: 'user-tie',
    title: 'Nhân viên',
    path: '/admin/employee',
    subMenu: [
      { id: 800, subIcon: 'user-tie', subTitle: 'Nhân viên', subPath: '/admin/employee/employee' },
      { id: 803, subIcon: 'coins', subTitle: 'Thiết lập hoa hồng', subPath: '/admin/commission/commission' }
    ]
  },
  {
    id: 9,
    icon: 'dollar-sign',
    title: 'Sổ quỹ',
    path: '/admin/payment/payment',
    subMenu: []
  },
  {
    id: 10,
    icon: 'chart-bar',
    title: 'Báo cáo',
    path: '/admin/report',
    subMenu: [
      { id: 1009, subIcon: 'chart-line', subTitle: 'Hiệu quả Marketing', subPath: '/admin/crm/effective/marketing' },
      { id: 1008, subIcon: 'chart-line', subTitle: 'Hiệu quả cơ hội', subPath: '/admin/crm/effective/opportunistic' },
      { id: 1000, subIcon: 'calendar-check', subTitle: 'Cuối ngày', subPath: '/admin/report/end-of-day-report' },
      { id: 1001, subIcon: 'box-tissue', subTitle: 'Bán hàng', subPath: '/admin/report/sale-report' },
      { id: 1002, subIcon: 'download', subTitle: 'Nhập hàng', subPath: '/admin/report/import-report' },
      { id: 1003, subIcon: 'cube', subTitle: 'Hàng hóa', subPath: '/admin/report/product-report' },
      { id: 1004, subIcon: 'user', subTitle: 'Khách hàng', subPath: '/admin/report/customer-report' },
      { id: 1006, subIcon: 'user-tie', subTitle: 'Nhân viên', subPath: '/admin/report/employee-report' },
      { id: 1010, subIcon: 'chalkboard-teacher', subTitle: 'Kênh bán hàng', subPath: '/admin/report/channel-report' },
      { id: 1007, subIcon: 'chart-line', subTitle: 'Tài chính', subPath: '/admin/report/financial-report' }
    ]
  }
];
