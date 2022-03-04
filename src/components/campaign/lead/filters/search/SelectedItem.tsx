import { TRASH_CAN_REGULAR } from 'constants/constants';

import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BaseButton from 'common/BaseButton';
import Dropdown from 'common/Dropdown';
import { useRecoilState } from 'recoil';
import { leadSelectedTableState } from 'store/atoms/campaign/lead/lead';

const SelectedItem = () => {
  const [itemSelected, setItemSelected] = useRecoilState(leadSelectedTableState);

  const onRemoveSelected = () => {
    setItemSelected([]);
  };

  return (
    <>
      {
        itemSelected.length > 0 &&
          <Dropdown position='left' dropdownClassName='lg:ml-2'>
            <BaseButton iconLeft='list-check'
              iconRight='caret-down'
              className='btn-primary'
              titleClassName='font-bold w-16'
              title={ `${itemSelected.length} Lead` }
            />
            <ul style={ { width: '13rem' } } className='py-2'>
              <li className="flex items-center w-auto">
                <div className="w-7">
                  <FontAwesomeIcon icon='plus' />
                </div>
                <span className='item-title'>Thêm vào chiến dịch</span>
              </li>
              <li className="flex items-center w-auto">
                <div className="w-7">
                  <FontAwesomeIcon icon='pen-square' />
                </div>
                <span className='item-title'>Gán NV phụ trách</span>
              </li>
              <li className="flex items-center w-auto">
                <div className="w-7">
                  <FontAwesomeIcon icon='pen-square' />
                </div>
                <span className='item-title'>Cập nhật trạng thái</span>
              </li>
              <li className="flex items-center w-auto">
                <div className="w-7">
                  <FontAwesomeIcon icon='pen-square' />
                </div>
                <span className='item-title'>Cập nhật nhóm Lead</span>
              </li>
              <li className="flex items-center w-auto">
                <div className="w-7">
                  <FontAwesomeIcon icon='pen-square' />
                </div>
                <span className='item-title'>Cập nhật nguồn Lead</span>
              </li>
              <li className="flex items-center w-auto">
                <div className="w-7">
                  <FontAwesomeIcon icon={ TRASH_CAN_REGULAR } />
                </div>
                <span className='item-title'>Xóa Lead đã chọn</span>
              </li>

              <li className="flex items-center w-auto" onClick={ onRemoveSelected }>
                <div className="w-7">
                  <FontAwesomeIcon icon='times-circle' />
                </div>
                <span className='item-title'>Bỏ chọn</span>
              </li>
            </ul>
          </Dropdown>
      }
    </>
  );
};

export default SelectedItem;
