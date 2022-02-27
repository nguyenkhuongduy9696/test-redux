import { useRecoilValue } from 'recoil';
import { permissionsState } from 'store/atoms/commonState';

export const commonService = () => {
  const permissions = useRecoilValue<any>(permissionsState);

  const checkViewPermissions = (id: number) => {
    if (permissions.length === 0) {
      return true;
    }
    const index = permissions.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      return permissions[index].is_view === 1;
    } else {
      return false;
    }
  };

  return { checkViewPermissions };
};
