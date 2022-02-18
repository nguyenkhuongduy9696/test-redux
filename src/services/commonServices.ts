import { useRecoilValue } from 'recoil';
import { permissionsState } from 'store/atoms/commonState';

export const commonServices = () => {
  const permissions = useRecoilValue(permissionsState);

  const checkViewPermissions = (id: number) => {
    console.log(permissions, id);
  };

  return { checkViewPermissions };
};
