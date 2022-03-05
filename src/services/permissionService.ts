export const permissionService = (permissions: any) => {
  const checkViewPermission = (id: number) => {
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

  const checkAddPermission = (id: number) => {
    if (permissions.length === 0) {
      return true;
    }
    const index = permissions.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      return permissions[index].is_add === 1;
    } else {
      return false;
    }
  };

  const checkEditPermission = (id: number) => {
    if (permissions.length === 0) {
      return true;
    }
    const index = permissions.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      return permissions[index].is_update === 1;
    } else {
      return false;
    }
  };

  const checkDeletePermission = (id: number) => {
    if (permissions.length === 0) {
      return true;
    }
    const index = permissions.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      return permissions[index].is_delete === 1;
    } else {
      return false;
    }
  };

  const checkImportPermission = (id: number) => {
    if (permissions.length === 0) {
      return true;
    }
    const index = permissions.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      return permissions[index].is_import === 1;
    } else {
      return false;
    }
  };

  const checkExportPermission = (id: number) => {
    if (permissions.length === 0) {
      return true;
    }
    const index = permissions.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      return permissions[index].is_export === 1;
    } else {
      return false;
    }
  };

  const checkPrintPermission = (id: number) => {
    if (permissions.length === 0) {
      return true;
    }
    const index = permissions.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      return permissions[index].is_print === 1;
    } else {
      return false;
    }
  };

  return {
    checkViewPermission,
    checkAddPermission,
    checkEditPermission,
    checkDeletePermission,
    checkImportPermission,
    checkExportPermission,
    checkPrintPermission
  };
};
