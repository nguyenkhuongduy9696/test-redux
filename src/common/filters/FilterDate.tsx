import { FILTER_DATE_ARRAY, FILTER_DATE_TIME } from 'constants/constants';

import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import { useRecoilState } from 'recoil';

import { helperService } from '../../services/helperService';
import BaseButton from '../BaseButton';
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
  filterKey?: any,
  title?: string
}

const FilterDate = ({ filterParams, filterKey = 'filterDate', title = 'Thời gian' } : propTypes) => {
  const [visible, setVisible] = useState(false);
  const [filterState, setFilterState] = useRecoilState<any>(filterParams);
  const [value, setValue] = useState(filterState[filterKey]);
  const [textField, setTextField] = useState('');

  const onSetValueDate = (id: number) => {
    setValue({
      type: 0,
      value: id
    });
  };

  const onSetValueTime = (day: any, type: string) => {
    if (value.type === 0) {
      setValue({
        type: 1,
        value: {
          from: day,
          to: day
        }
      });
    } else {
      const { value: { to } } = value;
      if (type === 'from') {
        if (day.getTime() > to.getTime()) {
          setValue({
            type: 1,
            value: {
              from: day,
              to: day
            }
          });
        } else {
          setValue((item: any) => {
            return {
              ...item,
              value: {
                ...item.value,
                from: day
              }
            };
          });
        }
      }
    }
  };

  const handleClickTo = (day: any, e: any) => {
    if (value.type === 0) {
      setValue({
        type: 1,
        value: {
          from: day,
          to: day
        }
      });
    } else {
      if (!e.disabled) {
        setValue((item: any) => {
          return {
            ...item,
            value: {
              ...item.value,
              to: day
            }
          };
        });
      }
    }
  };

  const onSearch = () => {
    setFilterState((item: any) => {
      return {
        ...item,
        [filterKey]: value
      };
    });
    setVisible(false);
  };

  useEffect(() => {
    const time = filterState[filterKey];
    if (time.type === 0) {
      const item = helperService().findValueById(time.value, FILTER_DATE_ARRAY, 'id');
      if (item) {
        setTextField(item.title);
      }
    } else {
      setTextField(`${moment(time.value.from).format('DD/MM/YYYY')} - ${moment(time.value.to).format('DD/MM/YYYY')}`);
    }
  }, [filterState[filterKey]]);

  return (
    <>
      <InputLabel label={ title }>
        <div className='mb-3'>
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
              <p className='ml-4 font-bold'>Theo khoảng thời gian</p>
              <div className="w-full flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2">
                  {
                    value.type === 1 &&
                      <p className="ml-4 mt-2">Từ ngày: <span className="text-primary-500">{ moment(value.value.from).format('DD/MM/YYYY') }</span></p>
                  }
                  <DayPicker
                    selectedDays={ value.type === 1 ? value.value.from : null }
                    onDayClick={ (e) => onSetValueTime(e, 'from') }
                    months={ MONTHS }
                    weekdaysShort={ WEEKDAYS_SHORT }
                    localeUtils={ MomentLocaleUtils }
                    locale={ 'vi' }
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  {
                    value.type === 1 &&
                      <p className="ml-4 mt-2">Đến ngày: <span className="text-primary-500">{ moment(value.value.to).format('DD/MM/YYYY') }</span></p>
                  }
                  <DayPicker
                    disabledDays={ {
                      after: new Date('1990-01-01'),
                      before: value.type === 1 ? value.value.from : null
                    } }
                    selectedDays={ value.type === 1 ? value.value.to : null }
                    onDayClick={ handleClickTo }
                    months={ MONTHS }
                    weekdaysShort={ WEEKDAYS_SHORT }
                    localeUtils={ MomentLocaleUtils }
                    locale={ 'vi' }
                  />
                </div>
              </div>
              <div className="w-full flex justify-end pr-3 pb-1">
                <BaseButton iconLeft='search' title='Tìm kiếm' className='btn-primary' onClick={ onSearch } />
              </div>
            </div> }
            visible={ visible }
            onClickOutside={ () => setVisible(false) }
            placement="right"
            theme="light">
            <div className='mt-1.5 px-2 py-1.5 border rounded-md flex items-center input-wrapper' onClick={ () => setVisible(!visible) }>
              <input type='text' placeholder='Thời gian' value={ textField } onChange={ () => {} }
                className='w-full focus:outline-none px-2' readOnly={ true }/>
              <span className='cursor-pointer text-primary-500 hover:text-primary-600'>
                <FontAwesomeIcon icon='calendar-alt' />
              </span>
            </div>
          </Tippy>
        </div>
      </InputLabel>
    </>
  );
};

export default FilterDate;
