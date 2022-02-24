import { QUERY_PLACEHOLDER_DATA } from 'constants/constants';
import { LEAD_LIST_KEY } from 'constants/queryKeys/campaignQueryKeys';

import React, { useCallback, useEffect, useState } from 'react';

import Table from 'common/table/Table';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { leadService } from 'services/campaign/leadService';
import { leadFilterParamState, leadPageLimitState, leadSelectedTableState } from 'store/atoms/campaign/lead/lead';
import { leadColumnTableSelector } from 'store/selectors/campaign/lead';

const LeadScreen = () => {
  const pageLimit = useRecoilValue(leadPageLimitState);
  const filterParams = useRecoilValue(leadFilterParamState);
  const [pagination, setPagination] = useState({ skip: 1, take: pageLimit });

  const getData = useCallback(async (page, pageLimit) => {
    return await leadService().getList({
      page, pageLimit
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
      <Table selectedState={ leadSelectedTableState } columnSelector={ leadColumnTableSelector }
        data={ data } paging={ pagination } setPaging={ setPagination } />
    </>
  );
};

export default LeadScreen;
