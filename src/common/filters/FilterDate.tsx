import { FILTER_DATE_TIME } from 'constants/constants';

import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import DayPicker from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import { useRecoilState } from 'recoil';

import InputLabel from '../InputLabel';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import 'react-day-picker/lib/style.css';
import 'moment/locale/vi';

const MONTHS = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
];
const WEEKDAYS_SHORT = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

interface propTypes {
  filterParams: any,
  filterKey?: any
}

const FilterDate = ({ filterParams, filterKey = 'filterDate' } : propTypes) => {
  const [visible, setVisible] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [filterState, setFilterState] = useRecoilState<any>(filterParams);
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState(filterState[filterKey]);
  console.log(value);

  const onSetValueDate = (id: number) => {
    setValue({
      type: 0,
      value: id
    });
  };

  return (
    <>
      <InputLabel label='Thời gian'>
        <div className='mb-3'>
          <div className='mt-1.5 px-2 py-1.5 border rounded-md flex items-center input-wrapper'>
            <input type='text' placeholder='Thời gian' className='w-full focus:outline-none px-2' readOnly={ true }/>
            <Tippy
              interactive
              interactiveBorder={ 20 }
              allowHTML
              content={ <div className="w-full py-2" style={ { width: 530 } }>
                <div className="w-full px-4 pb-3 mb-3 border-b lg:flex">
                  {
                    FILTER_DATE_TIME.map((item: any) => {
                      return (
                        <div className="w-full lg:w-1/5" key={ item.id }>
                          <p className='font-bold mb-1.5'>{ item.title }</p>
                          {
                            item.list.map((i: any) => {
                              return (
                                <p className={ `mt-1 mb-1.5 cursor-pointer ${value.type === 0 && value.value === i.id ? 'text-primary-500' : 'hover:text-primary-500'}` }
                                  key={ i.id }
                                  onClick={ () => onSetValueDate(i.id) }>
                                  { i.title }
                                </p>
                              );
                            })
                          }
                        </div>
                      );
                    })
                  }
                </div>
                <div className="w-full flex flex-col lg:flex-row">
                  <div className="w-full lg:w-1/2">
                    <p className="ml-4">Từ ngày: <span className="text-next-vision">ádasdasd</span></p>
                    <DayPicker
                      // selectedDays={ selectedDate.from }
                      // onDayClick={ handleDayClickFrom }
                      months={ MONTHS }
                      weekdaysShort={ WEEKDAYS_SHORT }
                      localeUtils={ MomentLocaleUtils }
                      locale={ 'vi' }
                    />
                  </div>
                  <div className="w-full lg:w-1/2">
                    <p className="ml-4">Đến ngày: <span className="text-next-vision">ádasdsadsad</span></p>
                    <DayPicker
                      disabledDays={ {
                        after: new Date('1990-01-01')
                        // before: selectedDate.from,
                      } }
                      // modifiers={ {
                      //     before: day => day.getTime() >= selectedDate.from.getTime()
                      // } }
                      // month={ thatMonth }
                      // selectedDays={ selectedDate.to }
                      // onDayClick={ handleDayClickTo }
                      months={ MONTHS }
                      weekdaysShort={ WEEKDAYS_SHORT }
                      localeUtils={ MomentLocaleUtils }
                      locale={ 'vi' }
                    />
                  </div>
                </div>
              </div> }
              visible={ visible }
              onClickOutside={ () => setVisible(false) }
              placement="right"
              theme="light"
            >
              <span className='cursor-pointer text-primary-500 hover:text-primary-600' onClick={ () => setVisible(!visible) }>
                <FontAwesomeIcon icon='calendar-alt' />

              </span>
            </Tippy>
          </div>
        </div>
      </InputLabel>
    </>
  );
};

export default FilterDate;
