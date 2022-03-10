import { SIDEBAR_COLLAPSE } from 'constants/localStorage';

import { atom } from 'recoil';

const collapseState = localStorage.getItem(SIDEBAR_COLLAPSE);

export const permissionsState = atom<unknown>({
  key: 'permissionState',
  default: []
});

export const branchesState = atom<unknown>({
  key: 'branchesState',
  default: []
});

export const sidebarCollapsed = atom<boolean>({
  key: 'sidebarCollapsed',
  default: collapseState === '1'
});

export const currentMenuId = atom<number>({
  key: 'currentMenuId',
  default: 1
});

export const noSelectedTableState = atom<unknown>({
  key: 'noSelectedTableState',
  default: []
});

export const noFilterParamState = atom<unknown>({
  key: 'noFilterParamState',
  default: null
});
