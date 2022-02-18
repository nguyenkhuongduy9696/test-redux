import { atom } from 'recoil';

export const permissionsState = atom({
  key: 'permissionState',
  default: []
});

export const branchesState = atom({
  key: 'branchesState',
  default: []
});
