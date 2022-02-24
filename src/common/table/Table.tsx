import React, { useEffect, useState } from 'react';

import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { useRecoilState, useRecoilValue } from 'recoil';

interface tableProps {
    data: any,
    keyId?: string,
    paging: any,
    setPaging: any,
    pageable?: boolean,
  selectedState: any,
  columnSelector: any,
}

const Table = ({
  data,
  paging,
  setPaging,
  pageable = true,
  selectedState,
  columnSelector,
  keyId = 'id'
} : tableProps) => {
  const [itemSelected, setItemSelected] = useRecoilState<any>(selectedState);
  const { totalColumnsShow } = useRecoilValue(columnSelector);
  const [dataTable, setDataTable] = useState(data.data);

  useEffect(() => {
    setDataTable(data.data.map((item: any) => {
      return {
        ...item,
        checked: itemSelected.findIndex((i: any) => i[keyId] === item[keyId]) !== -1
      };
    }));
  }, [data]);

  useEffect(() => {
    if (itemSelected.length === 0) {
      setDataTable(dataTable.map((dataItem: any) => {
        return { ...dataItem, checked: false };
      }));
    }
  }, [itemSelected]);

  const headerSelectionChange = (e: any) => {
    const checked = e.syntheticEvent.target.checked;
    setDataTable(dataTable.map((dataItem: any) => {
      return { ...dataItem, checked };
    }));
    if (checked === true) {
      const arr = dataTable.filter((item: any) => !item.checked);
      setItemSelected((item: any) => {
        return [
          ...item,
          ...arr
        ];
      });
    } else {
      const arr: any = [];
      itemSelected.forEach((item: any) => {
        const x = dataTable.findIndex((i: any) => i[keyId] === item[keyId]);
        if (x === -1) {
          arr.push(item);
        }
      });
      setItemSelected(arr);
    }
  };

  const selectionChange = (event: any) => {
    setDataTable(dataTable.map((dataItem: any) => {
      if (dataItem[keyId] === event.dataItem[keyId]) {
        return {
          ...dataItem,
          checked: !event.dataItem.checked
        };
      }
      return { ...dataItem };
    }));

    const x = itemSelected.findIndex((i: any) => i[keyId] === event.dataItem[keyId]);
    if (x === -1) {
      setItemSelected((item: any) => {
        return [
          ...item,
          event.dataItem
        ];
      });
    } else {
      const arr: any = [];
      itemSelected.forEach((item: any) => {
        if (item.id !== event.dataItem.id) {
          arr.push(item);
        }
      });
      setItemSelected(arr);
    }
  };

  const handlePaging = (event: any) => {
    const { skip, take } = event.page;
    if (data?.recordsTotal) {
      setPaging({ skip: data?.recordsTotal ? skip / take + 1 : skip / take, take });
    }
  };

  return (
    <Grid data={ dataTable }
      skip={ pageable ? paging.skip * paging.take - paging.take : undefined }
      take={ pageable ? paging.take : null }
      total={ pageable ? data.meta.pagination.total : data.data ? data.data.length : 0 }
      pageable={ pageable }
      resizable={ false }
      onPageChange={ (event) => handlePaging(event) }
      expandField="expanded"
      selectedField="checked"
      onSelectionChange={ selectionChange }
      onHeaderSelectionChange={ headerSelectionChange }
    >
      {
        totalColumnsShow.map((column: any, index: number) => {
          return (
            <GridColumn key={ index } title={ column.title } field={ column.field }
              headerSelectionValue={ dataTable.findIndex((item: any) => item.checked === false) === -1 }/>
          );
        })
      }
    </Grid>
  );
};

export default Table;
