import { PERMISSION_ID_LEAD } from 'constants/permission/Permissions';

import React, { useState } from 'react';

import { Checkbox } from '@progress/kendo-react-inputs';
import BaseButton from 'common/BaseButton';
import Dropdown from 'common/Dropdown';
import { useRecoilState, useRecoilValue } from 'recoil';
import { helperService } from 'services/helperService';
import { permissionService } from 'services/permissionService';
import { leadColumnTableState } from 'store/atoms/campaign/lead/lead';
import { permissionsState } from 'store/atoms/commonState';

import DialogAnimate from '../../../../../common/DialogAnimate';
import DialogLead from '../../dialog/DialogLead';

const ButtonGroup = () => {
  const [columns, setColumns] = useRecoilState(leadColumnTableState);
  const permissions = useRecoilValue(permissionsState);
  const [popup, setPopup] = useState('');

  const handleChangeCheckbox = (item: any) => {
    const index = helperService().findIndexItem(columns, item);
    const newColumns = helperService().replaceItemAtIndex(columns, index, { ...item, isShow: !item.isShow });
    setColumns(newColumns);
  };

  return (
    <>
      <BaseButton iconLeft='plus'
        className='btn-primary ml-2'
        title='Thêm mới'
        disableClassName='btn-disable ml-2'
        onClick={ () => setPopup('add') }
        enable={ permissionService(permissions).checkAddPermission(PERMISSION_ID_LEAD) }
      />
      <Dropdown position='right' dropdownClassName='lg:ml-2'>
        <BaseButton iconLeft='list'
          iconLeftClassName=''
          iconRight='caret-down'
          className='btn-primary h-9'
        />
        <div className='w-400 grid grid-cols-2 px-4 py-2'>
          { columns.filter(item => item.field !== 'expanded' && item.field !== 'checked').map((item: any) => (
            <div key={ item.field } className="card__item">
              <Checkbox label={ item.title } value={ item.isShow }
                onChange={ () => handleChangeCheckbox(item) } />
            </div>
          )) }
        </div>
      </Dropdown>
      <DialogAnimate>
        { popup === 'add' ? <DialogLead title='Thêm mới Lead' onClose={ () => setPopup('') } /> : null }
      </DialogAnimate>
    </>
  );
};

export default ButtonGroup;
