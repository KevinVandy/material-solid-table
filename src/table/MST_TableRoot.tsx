import { createSignal, Show } from 'solid-js';
import {
  createSolidTable,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/solid-table';
import {
  getAllLeafColumnDefs,
  getColumnId,
  getDefaultColumnFilterFn,
  getDefaultColumnOrderIds,
  prepareColumns,
} from '../column.utils';
import type {
  MST_Column,
  MST_ColumnDef,
  MST_FilterOption,
  MST_Localization,
  MST_TableState,
  MaterialSolidTableProps,
  MST_Row,
  MST_Cell,
  MST_TableInstance,
} from '..';
import { GroupingState, TableState } from '@tanstack/solid-table';
import Modal from '@suid/material/Modal';
import { MST_TablePaper } from './MST_TablePaper';

export const MST_TableRoot = <TData extends Record<string, any> = {}>(
  props: MaterialSolidTableProps<TData> & { localization: MST_Localization },
) => {
  let bottomToolbarRef,
    editInputRefs,
    filterInputRefs,
    searchInputRef,
    tableContainerRef,
    tableHeadCellRefs,
    tablePaperRef,
    topToolbarRef;

  const createInitialState = (): Partial<MST_TableState<TData>> => {
    const initState = props.initialState ?? {};
    initState.columnOrder =
      initState.columnOrder ?? getDefaultColumnOrderIds(props);
    initState.globalFilterFn = props.globalFilterFn ?? 'fuzzy';
    return initState;
  };
  const initialState = createInitialState();

  const [columnFilterFns, setColumnFilterFns] = createSignal<{
    [key: string]: MST_FilterOption;
  }>(
    Object.assign(
      {},
      ...getAllLeafColumnDefs(props.columns as MST_ColumnDef<TData>[]).map(
        (col) => ({
          [getColumnId(col)]:
            col.filterFn instanceof Function
              ? col.filterFn.name ?? 'custom'
              : col.filterFn ??
                initialState?.columnFilterFns?.[getColumnId(col)] ??
                getDefaultColumnFilterFn(col),
        }),
      ),
    ),
  );
  const [columnOrder, setColumnOrder] = createSignal(
    initialState.columnOrder ?? [],
  );
  const [density, setDensity] = createSignal(
    initialState?.density ?? 'comfortable',
  );
  const [draggingColumn, setDraggingColumn] =
    createSignal<MST_Column<TData> | null>(initialState.draggingColumn ?? null);
  const [draggingRow, setDraggingRow] = createSignal<MST_Row<TData> | null>(
    initialState.draggingRow ?? null,
  );
  const [editingCell, setEditingCell] = createSignal<MST_Cell<TData> | null>(
    initialState.editingCell ?? null,
  );
  const [editingRow, setEditingRow] = createSignal<MST_Row<TData> | null>(
    initialState.editingRow ?? null,
  );
  const [globalFilterFn, setGlobalFilterFn] = createSignal<MST_FilterOption>(
    initialState.globalFilterFn ?? 'fuzzy',
  );
  const [grouping, setGrouping] = createSignal<GroupingState>(
    initialState.grouping ?? [],
  );
  const [hoveredColumn, setHoveredColumn] = createSignal<
    MST_Column<TData> | { id: string } | null
  >(initialState.hoveredColumn ?? null);
  const [hoveredRow, setHoveredRow] = createSignal<
    MST_Row<TData> | { id: string } | null
  >(initialState.hoveredRow ?? null);
  const [isFullScreen, setIsFullScreen] = createSignal(
    initialState?.isFullScreen ?? false,
  );
  const [showAlertBanner, setShowAlertBanner] = createSignal(
    props.initialState?.showAlertBanner ?? false,
  );
  const [showColumnFilters, setShowFilters] = createSignal(
    initialState?.showColumnFilters ?? false,
  );
  const [showGlobalFilter, setShowGlobalFilter] = createSignal(
    initialState?.showGlobalFilter ?? false,
  );

  const columnDefs = prepareColumns({
    columnDefs: [
      // ...displayColumns,
      ...props.columns,
    ],
    columnFilterFns: props.state?.columnFilterFns ?? (columnFilterFns as any),
    defaultDisplayColumn: props.defaultDisplayColumn ?? {},
    filterFns: props.filterFns as any,
    sortingFns: props.sortingFns as any,
  });

  const [data] = createSignal<TData[]>(
    (props.state?.isLoading || props.state?.showSkeletons) && !props.data.length
      ? [
          ...Array(
            props.state?.pagination?.pageSize ||
              initialState?.pagination?.pageSize ||
              10,
          ).fill(null),
        ].map(() =>
          Object.assign(
            {},
            ...getAllLeafColumnDefs(props.columns as MST_ColumnDef[]).map(
              (col) => ({
                [col.id ?? col.accessorKey ?? '']: null,
              }),
            ),
          ),
        )
      : props.data,
  );
  //@ts-ignore
  const table = {
    ...createSolidTable({
      getCoreRowModel: getCoreRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getGroupedRowModel: getGroupedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      onColumnOrderChange: setColumnOrder,
      onGroupingChange: setGrouping,
      getSubRows: (row) => row?.subRows,
      ...props,
      //@ts-ignore
      columns: columnDefs,
      get data() {
        return data();
      },
      globalFilterFn:
        props.filterFns?.[globalFilterFn as any] ?? props.filterFns?.fuzzy,
      initialState,
      state: {
        get columnFilterFns() {
          return columnFilterFns();
        },
        get columnOrder() {
          return columnOrder();
        },
        get density() {
          return density();
        },
        get draggingColumn() {
          return draggingColumn();
        },
        get draggingRow() {
          return draggingRow();
        },
        get editingCell() {
          return editingCell();
        },
        get editingRow() {
          return editingRow();
        },
        get globalFilterFn() {
          return globalFilterFn();
        },
        get grouping() {
          return grouping();
        },
        get hoveredColumn() {
          return hoveredColumn();
        },
        get hoveredRow() {
          return hoveredRow();
        },
        get isFullScreen() {
          return isFullScreen();
        },
        get showAlertBanner() {
          return showAlertBanner();
        },
        get showColumnFilters() {
          return showColumnFilters();
        },
        get showGlobalFilter() {
          return showGlobalFilter();
        },
        ...props.state,
      } as TableState,
    }),
    refs: {
      bottomToolbarRef,
      editInputRefs,
      filterInputRefs,
      searchInputRef,
      tableContainerRef,
      tableHeadCellRefs,
      tablePaperRef,
      topToolbarRef,
    },
    setColumnFilterFns: props.onFilterFnsChange ?? setColumnFilterFns,
    setDensity: props.onDensityChange ?? setDensity,
    setDraggingColumn: props.onDraggingColumnChange ?? setDraggingColumn,
    setDraggingRow: props.onDraggingRowChange ?? setDraggingRow,
    setEditingCell: props.onEditingCellChange ?? setEditingCell,
    setEditingRow: props.onEditingRowChange ?? setEditingRow,
    setGlobalFilterFn: props.onGlobalFilterFnChange ?? setGlobalFilterFn,
    setHoveredColumn: props.onHoveredColumnChange ?? setHoveredColumn,
    setHoveredRow: props.onHoveredRowChange ?? setHoveredRow,
    setIsFullScreen: props.onIsFullScreenChange ?? setIsFullScreen,
    setShowAlertBanner: props.onShowAlertBannerChange ?? setShowAlertBanner,
    setShowFilters: props.onShowFiltersChange ?? setShowFilters,
    setShowGlobalFilter: props.onShowGlobalFilterChange ?? setShowGlobalFilter,
  } as MST_TableInstance<TData>;

  return (
    <Show
      fallback={<MST_TablePaper table={table as any} />}
      when={table.getState().isFullScreen}
    >
      <Modal open={table.getState().isFullScreen}>
        <MST_TablePaper table={table as any} />
      </Modal>
    </Show>
  );
};
