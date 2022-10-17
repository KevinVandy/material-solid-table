import type {
  AggregationFn,
  ColumnOrderState,
  GroupingState,
  Row,
} from '@tanstack/solid-table';
import { MST_AggregationFns } from './aggregationFns';
import { MST_FilterFns } from './filterFns';
import { MST_SortingFns } from './sortingFns';
import { Theme } from '@suid/material/styles';
import type { TableCellProps } from '@suid/material/TableCell';
import type {
  MaterialSolidTableProps,
  MST_AggregationFn,
  MST_Column,
  MST_ColumnDef,
  MST_DefinedColumnDef,
  MST_DisplayColumnIds,
  MST_FilterOption,
  MST_Header,
  MST_TableInstance,
} from '.';

export const alpha = (color: any, amount: any) => color;
export const darken = (color: string, amount: number) => color;
export const lighten = (color: string, amount: number) => color;

export const getColumnId = <TData extends Record<string, any> = {}>(
  columnDef: MST_ColumnDef<TData>,
): string =>
  columnDef.id ?? columnDef.accessorKey?.toString?.() ?? columnDef.header;

export const getAllLeafColumnDefs = <TData extends Record<string, any> = {}>(
  columns: MST_ColumnDef<TData>[],
): MST_ColumnDef<TData>[] => {
  const allLeafColumnDefs: MST_ColumnDef<TData>[] = [];
  const getLeafColumns = (cols: MST_ColumnDef<TData>[]) => {
    cols.forEach((col) => {
      if (col.columns) {
        getLeafColumns(col.columns);
      } else {
        allLeafColumnDefs.push(col);
      }
    });
  };
  getLeafColumns(columns);
  return allLeafColumnDefs;
};

export const prepareColumns = <TData extends Record<string, any> = {}>({
  columnDefs,
  columnFilterFns,
  defaultDisplayColumn,
  filterFns,
  sortingFns,
}: {
  columnDefs: MST_ColumnDef<TData>[];
  columnFilterFns: { [key: string]: MST_FilterOption };
  defaultDisplayColumn: Partial<MST_ColumnDef<TData>>;
  filterFns: typeof MST_FilterFns & MaterialSolidTableProps<TData>['filterFns'];
  sortingFns: typeof MST_SortingFns &
    MaterialSolidTableProps<TData>['sortingFns'];
}): MST_DefinedColumnDef<TData>[] =>
  columnDefs.map((columnDef) => {
    if (!columnDef.id) columnDef.id = getColumnId(columnDef);
    if (process.env.NODE_ENV !== 'production' && !columnDef.id) {
      console.error(
        'Column definitions must have a valid `accessorKey` or `id` property',
      );
    }
    if (!columnDef.columnDefType) columnDef.columnDefType = 'data';
    if (columnDef.columns?.length) {
      columnDef.columnDefType = 'group';
      columnDef.columns = prepareColumns({
        columnDefs: columnDef.columns,
        columnFilterFns,
        defaultDisplayColumn,
        filterFns,
        sortingFns,
      });
    } else if (columnDef.columnDefType === 'data') {
      if (Object.keys(filterFns).includes(columnFilterFns[columnDef.id])) {
        columnDef.filterFn =
          filterFns[columnFilterFns[columnDef.id]] ?? filterFns.fuzzy;
        (columnDef as MST_DefinedColumnDef)._filterFn =
          columnFilterFns[columnDef.id];
      }
      if (Object.keys(sortingFns).includes(columnDef.sortingFn as string)) {
        // @ts-ignore
        columnDef.sortingFn = sortingFns[columnDef.sortingFn];
      }
    } else if (columnDef.columnDefType === 'display') {
      columnDef = {
        ...(defaultDisplayColumn as MST_ColumnDef<TData>),
        ...columnDef,
      };
    }
    if (
      Array.isArray(columnDef.aggregationFn) &&
      columnDef.aggregationFn.length
    ) {
      const parsedAggregationFn = (
        columnId: string,
        leafRows: Row<TData>[],
        childRows: Row<TData>[],
      ) => {
        return (
          columnDef.aggregationFn as Array<MST_AggregationFn<TData>>
        )?.map?.((aggFn) => {
          if (
            typeof aggFn === 'string' &&
            Object.keys(MST_AggregationFns).includes(aggFn)
          ) {
            return (
              MST_AggregationFns[
                aggFn as keyof typeof MST_AggregationFns
              ] as AggregationFn<TData>
            )?.(columnId, leafRows, childRows);
          }
          console.log({ aggFn });
          return aggFn;
        });
      };
      console.log(parsedAggregationFn);
      // columnDef.aggregationFn = parsedAggregationFn;
    }
    return columnDef;
  }) as MST_DefinedColumnDef<TData>[];

export const reorderColumn = <TData extends Record<string, any> = {}>(
  draggedColumn: MST_Column<TData>,
  targetColumn: MST_Column<TData>,
  columnOrder: ColumnOrderState,
): ColumnOrderState => {
  if (draggedColumn.getCanPin()) {
    draggedColumn.pin(targetColumn.getIsPinned());
  }
  columnOrder.splice(
    columnOrder.indexOf(targetColumn.id),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumn.id), 1)[0],
  );
  return [...columnOrder];
};

export const showExpandColumn = <TData extends Record<string, any> = {}>(
  props: MaterialSolidTableProps<TData>,
  grouping?: GroupingState,
) =>
  !!(
    props.enableExpanding ||
    (props.enableGrouping && (grouping === undefined || grouping?.length)) ||
    props.renderDetailPanel
  );

export const getLeadingDisplayColumnIds = <
  TData extends Record<string, any> = {},
>(
  props: MaterialSolidTableProps<TData>,
) =>
  [
    (props.enableRowDragging || props.enableRowOrdering) && 'mrt-row-drag',
    props.positionActionsColumn === 'first' &&
      (props.enableRowActions ||
        (props.enableEditing &&
          ['row', 'modal'].includes(props.editingMode ?? ''))) &&
      'mrt-row-actions',
    props.positionExpandColumn === 'first' &&
      showExpandColumn(props) &&
      'mrt-row-expand',
    props.enableRowSelection && 'mrt-row-select',
    props.enableRowNumbers && 'mrt-row-numbers',
  ].filter(Boolean) as MST_DisplayColumnIds[];

export const getTrailingDisplayColumnIds = <
  TData extends Record<string, any> = {},
>(
  props: MaterialSolidTableProps<TData>,
) => [
  props.positionActionsColumn === 'last' &&
    (props.enableRowActions ||
      (props.enableEditing &&
        ['row', 'modal'].includes(props.editingMode ?? ''))) &&
    'mrt-row-actions',
  props.positionExpandColumn === 'last' &&
    showExpandColumn(props) &&
    'mrt-row-expand',
];

export const getDefaultColumnOrderIds = <
  TData extends Record<string, any> = {},
>(
  props: MaterialSolidTableProps<TData>,
) =>
  [
    ...getLeadingDisplayColumnIds(props),
    ...getAllLeafColumnDefs(props.columns).map((columnDef) =>
      getColumnId(columnDef),
    ),
    ...getTrailingDisplayColumnIds(props),
  ].filter(Boolean) as string[];

export const getDefaultColumnFilterFn = <
  TData extends Record<string, any> = {},
>(
  columnDef: MST_ColumnDef<TData>,
): MST_FilterOption => {
  if (columnDef.filterVariant === 'multi-select') return 'arrIncludesSome';
  if (columnDef.filterVariant === 'range') return 'betweenInclusive';
  if (
    columnDef.filterVariant === 'select' ||
    columnDef.filterVariant === 'checkbox'
  )
    return 'equals';
  return 'fuzzy';
};

export const getIsLastLeftPinnedColumn = (
  table: MST_TableInstance,
  column: MST_Column,
) => {
  return (
    column.getIsPinned() === 'left' &&
    table.getLeftLeafHeaders().length - 1 === column.getPinnedIndex()
  );
};

export const getIsFirstRightPinnedColumn = (column: MST_Column) => {
  return column.getIsPinned() === 'right' && column.getPinnedIndex() === 0;
};

export const getTotalRight = (table: MST_TableInstance, column: MST_Column) => {
  return (
    (table.getRightLeafHeaders().length - 1 - column.getPinnedIndex()) * 160
  );
};

export const getCommonCellStyles = ({
  column,
  header,
  table,
  tableCellProps,
  theme,
}: {
  column: MST_Column;
  header?: MST_Header;
  table: MST_TableInstance;
  tableCellProps: TableCellProps;
  theme: Theme;
}) => ({
  backgroundColor:
    column.getIsPinned() && column.columnDef.columnDefType !== 'group'
      ? alpha(lighten(theme.palette.background.default, 0.04), 0.97)
      : 'inherit',
  backgroundImage: 'inherit',
  boxShadow: getIsLastLeftPinnedColumn(table, column)
    ? `-4px 0 8px -6px ${alpha(theme.palette.common.black, 0.2)} inset`
    : getIsFirstRightPinnedColumn(column)
    ? `4px 0 8px -6px ${alpha(theme.palette.common.black, 0.2)} inset`
    : undefined,
  left:
    column.getIsPinned() === 'left'
      ? `${column.getStart('left')}px`
      : undefined,
  opacity:
    table.getState().draggingColumn?.id === column.id ||
    table.getState().hoveredColumn?.id === column.id
      ? 0.5
      : 1,
  position:
    column.getIsPinned() && column.columnDef.columnDefType !== 'group'
      ? 'sticky'
      : undefined,
  right:
    column.getIsPinned() === 'right'
      ? `${getTotalRight(table, column)}px`
      : undefined,
  transition: `all ${column.getIsResizing() ? 0 : '150ms'} ease-in-out`,
  ...(tableCellProps?.sx instanceof Function
    ? tableCellProps.sx(theme)
    : (tableCellProps?.sx as any)),
  maxWidth: `min(${column.getSize()}px, fit-content)`,
  minWidth: `max(${column.getSize()}px, ${column.columnDef.minSize ?? 30}px)`,
  width: header?.getSize() ?? column.getSize(),
});

export const MST_DefaultColumn = {
  minSize: 40,
  maxSize: 1000,
  size: 180,
};

export const MST_DefaultDisplayColumn: Partial<MST_ColumnDef> = {
  columnDefType: 'display',
  enableClickToCopy: false,
  enableColumnActions: false,
  enableColumnDragging: false,
  enableColumnFilter: false,
  enableColumnOrdering: false,
  enableEditing: false,
  enableGlobalFilter: false,
  enableGrouping: false,
  enableHiding: false,
  enableResizing: false,
  enableSorting: false,
};
