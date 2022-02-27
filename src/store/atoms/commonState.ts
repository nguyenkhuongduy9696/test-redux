import { SIDEBAR_COLLAPSE } from 'constants/localStorage';

import { atom } from 'recoil';

const collapseState = localStorage.getItem(SIDEBAR_COLLAPSE);

export const permissionsState = atom({
  key: 'permissionState',
  default: []
});

export const branchesState = atom({
  key: 'branchesState',
  default: []
});

export const sidebarCollapsed = atom({
  key: 'sidebarCollapsed',
  default: collapseState === '1'
});

export const currentMenuId = atom({
  key: 'currentMenuId',
  default: 1
});

export const noSelectedTableState = atom({
  key: 'noSelectedTableState',
  default: []
});

export const noFilterParamState = atom({
  key: 'noFilterParamState',
  default: null
});
