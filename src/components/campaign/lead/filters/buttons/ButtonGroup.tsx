import React from 'react';

import { Checkbox } from '@progress/kendo-react-inputs';
import BaseButton from 'common/BaseButton';
import Dropdown from 'common/Dropdown';
import { useRecoilState } from 'recoil';
import { leadColumnTableState } from 'store/atoms/campaign/lead/lead';

const ButtonGroup = () => {
  // eslint-disable-next-line no-unused-vars
  const [columns, setColumns] = useRecoilState(leadColumnTableState);

  const handleChangeCheckbox = (item: any) => {
    console.log(item);
  };

  return (
    <>
      <Dropdown position='right' dropdownClassName='lg:ml-2'>
        <BaseButton iconLeft='list'
          iconRight='caret-down'
          className='btn-primary'
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
    </>
  );
};

export default ButtonGroup;
