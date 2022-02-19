import { atom } from 'recoil';

import { SIDEBAR_COLLAPSE } from 'constants/localStorage';

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
