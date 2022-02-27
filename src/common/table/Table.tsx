import React, { useEffect, useRef, useState } from 'react';

import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { useRecoilState, useRecoilValue } from 'recoil';
import { noFilterParamState, noSelectedTableState, sidebarCollapsed } from 'store/atoms/commonState';

interface tableProps {
  data: any,
  keyId?: string,
  paging: any,
  setPaging: any,
  pageable?: boolean,
  selectedState?: any,
  columnSelector: any,
  filterParam?: any,
  detail?: any
}

const Table = ({
  data,
  paging,
  setPaging,
  pageable = true,
  selectedState = noSelectedTableState,
  columnSelector,
  filterParam = noFilterParamState,
  keyId = 'id',
  detail = null
} : tableProps) => {
  const [itemSelected, setItemSelected] = useRecoilState<any>(selectedState);
  const { totalColumnsShow } = useRecoilValue(columnSelector);
  const [dataTable, setDataTable] = useState(data.data);
  const [expanded, setExpanded] = useState<any>([]);

  const minGridWidth = totalColumnsShow.reduce((a: any, b: any) => a + b.minWidth, 0);
  const refGrid = useRef<any>(null);
  const [gridCurrent, setGridCurrent] = useState(0);
  const [applyMinWidth, setApplyMinWidth] = useState(false);
  const sidebar = useRecoilValue(sidebarCollapsed);

  const isExpand = totalColumnsShow.findIndex((item: any) => item.field === 'expanded');
  const isCheck = totalColumnsShow.findIndex((item: any) => item.field === 'checked');

  useEffect(() => {
    setTimeout(() => {
      const gridWidth = refGrid.current.element.offsetWidth;
      setGridCurrent(gridWidth);
      setApplyMinWidth(gridWidth < minGridWidth);
      window.addEventListener('resize', handleResize);
    }, 300);
    return () => window.removeEventListener('resize', handleResize);
  }, [totalColumnsShow.length, sidebar, data]);

  const handleResize = () => {
    const gridWidth = refGrid.current.element.offsetWidth;
    if (gridWidth < minGridWidth && !applyMinWidth) {
      setApplyMinWidth(true);
    } else if (gridWidth > minGridWidth) {
      setApplyMinWidth(false);
      setGridCurrent(gridWidth);
    }
  };

  const setWidth = (minWidth: number) => {
    if (applyMinWidth) {
      return minWidth;
    }
    if (isCheck !== -1 && isExpand !== -1) {
      return minWidth + (gridCurrent - 9 - minGridWidth) / (totalColumnsShow.length - 2);
    }
    if (isCheck !== -1 || isExpand !== -1) {
      return minWidth + (gridCurrent - 8 - minGridWidth) / (totalColumnsShow.length - 1);
    }
    return minWidth + (gridCurrent - 5 - minGridWidth) / totalColumnsShow.length;
  };

  useEffect(() => {
    setDataTable(data.data.map((item: any) => {
      const checkExpand = expanded.findIndex((i: any) => i === item[keyId]);
      return {
        ...item,
        expanded: data.data.length === 1 ? true : checkExpand !== -1,
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
        const index = dataTable.findIndex((i: any) => i[keyId] === item[keyId]);
        if (index === -1) {
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
    const index = itemSelected.findIndex((i: any) => i[keyId] === event.dataItem[keyId]);
    if (index === -1) {
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

  useEffect(() => {
    setExpanded([]);
  }, [paging, filterParam]);

  const onExpand = (dataItem: any) => {
    setDataTable(dataTable.map((item: any) => {
      return {
        ...item,
        expanded: item[keyId] === dataItem[keyId] ? !dataItem.expanded : item.expanded
      };
    }));
    setExpanded(dataItem.expanded ? expanded.filter((i: any) => i !== dataItem[keyId]) : [...expanded, dataItem[keyId]]);
  };

  const ExpandCell = (props: any) => {
    return (
      <td className={ `relative cursor-pointer expand-cell ${props.dataItem.expanded ? 'expanded' : ''} ${props.className}` } style={ props.style }
        onClick={ () => onExpand(props.dataItem) }>
        <div className={ `expand-arrow ${props.dataItem.expanded ? 'down' : 'right'}` }>

        </div>
      </td>
    );
  };

  return (
    <Grid ref={ refGrid } data={ dataTable }
      skip={ pageable ? paging.skip * paging.take - paging.take : undefined }
      take={ pageable ? paging.take : null }
      total={ pageable ? data.meta.pagination.total : data.data ? data.data.length : 0 }
      pageable={ pageable }
      resizable={ true }
      reorderable={ true }
      onPageChange={ (event) => handlePaging(event) }
      expandField="expanded"
      selectedField="checked"
      onSelectionChange={ selectionChange }
      onHeaderSelectionChange={ headerSelectionChange }
      detail={ detail }
      style={ { maxHeight: 'calc(100vh - 150px)' } }
    >
      {
        totalColumnsShow.map((column: any, index: number) => {
          const objTitle:any = {};
          if (!column.columns) {
            objTitle.field = column.field;
            objTitle.width = column.field !== 'expanded' && column.field !== 'checked' ? setWidth(column.minWidth) : column.minWidth;
          }
          return (
            <GridColumn key={ index } title={ column.title } { ...objTitle }
              headerSelectionValue={ dataTable.findIndex((item: any) => item.checked === false) === -1 }
              cell={ column.field === 'expanded' ? ExpandCell : '' }
            />
          );
        })
      }
    </Grid>
  );
};

export default Table;
