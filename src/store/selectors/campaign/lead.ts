import { selector } from 'recoil';
import { leadColumnTableState } from 'store/atoms/campaign/lead/lead';

export const leadColumnTableSelector = selector({
  key: 'leadColumnTableSelector',
  get: ({ get }) => {
    const columns = get(leadColumnTableState);
    const totalColumns = columns.length;
    const totalColumnsShow = columns.filter(col => col.isShow);
    return { totalColumns, totalColumnsShow };
  }
});
