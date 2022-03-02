import { QUERY_PLACEHOLDER_DATA } from 'constants/constants';
import { LEAD_LIST_KEY } from 'constants/queryKeys/campaignQueryKeys';

import React, { useCallback, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from 'common/table/Table';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { leadService } from 'services/campaign/leadService';
import { helperService } from 'services/helperService';
import { leadFilterParamState, leadPageLimitState, leadSelectedTableState } from 'store/atoms/campaign/lead/lead';
import { leadColumnTableSelector } from 'store/selectors/campaign/lead';

import DetailContent from './detail/DetailContent';
import LeadScreenFilter from './filters';

const LeadScreen = () => {
  const pageLimit = useRecoilValue(leadPageLimitState);
  const filterParams = useRecoilValue(leadFilterParamState);
  const [pagination, setPagination] = useState({ skip: 1, take: pageLimit });

  const getData = useCallback(async (page, pageLimit) => {
    const { filterDate } = filterParams;
    const { from, to } = helperService().getFilterStateTime(filterDate);
    return await leadService().getList({
      page, pageLimit, fromDate: from, toDate: to
    });
  }, [pagination.skip, pageLimit, filterParams]);

  const { data, refetch } = useQuery(
    [LEAD_LIST_KEY, pagination.skip, pageLimit, JSON.stringify(filterParams)],
    () => getData(pagination.skip, pageLimit),
    { keepPreviousData: true, staleTime: 5000, placeholderData: QUERY_PLACEHOLDER_DATA }
  );

  useEffect(() => {
    refetch();
    setPagination({ skip: 1, take: pageLimit });
  }, [pageLimit, filterParams]);

  return (
    <>
      <div className="w-full p-2 lg:p-4">
        <div className="w-full flex items-center mb-4">
          <div className='screen-icon-title'>
            <FontAwesomeIcon icon='users' />
          </div>
          <p className='text-primary-500 font-bold'>Quản lý Lead</p>
        </div>
        <LeadScreenFilter />
        <Table selectedState={ leadSelectedTableState } columnSelector={ leadColumnTableSelector }
          data={ data } paging={ pagination } setPaging={ setPagination }
          detail={ <DetailContent /> }/>
      </div>
    </>
  );
};

export default LeadScreen;
