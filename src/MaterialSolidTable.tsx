import type { JSXElement } from 'solid-js';
import type {
  AggregationFn,
  Cell,
  Column,
  ColumnDef,
  DeepKeys,
  FilterFn,
  Header,
  HeaderGroup,
  OnChangeFn,
  Row,
  SortingFn,
  Table,
  TableOptions,
  TableState,
} from '@tanstack/solid-table';
import { MST_AggregationFns } from './aggregationFns';
// import { MST_DefaultColumn, MST_DefaultDisplayColumn } from './column.utils';
import { MST_FilterFns } from './filterFns';
import { MST_Default_Icons, MST_Icons } from './icons';
import { MST_SortingFns } from './sortingFns';
import { MST_TableRoot } from './table/MST_TableRoot';
import { MST_Localization_EN } from './_locales/en';
import { MST_DefaultColumn, MST_DefaultDisplayColumn } from './column.utils';

/**
 * Most of this file is just TypeScript types
 */

export type DensityState = 'comfortable' | 'compact' | 'spacious';

type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>);

export interface MST_Localization {
  actions: string;
  and: string;
  cancel: string;
  changeFilterMode: string;
  changeSearchMode: string;
  clearFilter: string;
  clearSearch: string;
  clearSort: string;
  clickToCopy: string;
  columnActions: string;
  copiedToClipboard: string;
  dropToGroupBy: string;
  edit: string;
  expand: string;
  expandAll: string;
  filterArrIncludes: string;
  filterArrIncludesAll: string;
  filterArrIncludesSome: string;
  filterBetween: string;
  filterBetweenInclusive: string;
  filterByColumn: string;
  filterContains: string;
  filterEmpty: string;
  filterEndsWith: string;
  filterEquals: string;
  filterEqualsString: string;
  filterFuzzy: string;
  filterGreaterThan: string;
  filterGreaterThanOrEqualTo: string;
  filterInNumberRange: string;
  filterIncludesString: string;
  filterIncludesStringSensitive: string;
  filterLessThan: string;
  filterLessThanOrEqualTo: string;
  filterMode: string;
  filterNotEmpty: string;
  filterNotEquals: string;
  filterStartsWith: string;
  filterWeakEquals: string;
  filteringByColumn: string;
  goToFirstPage: string;
  goToLastPage: string;
  goToNextPage: string;
  goToPreviousPage: string;
  grab: string;
  groupByColumn: string;
  groupedBy: string;
  hideAll: string;
  hideColumn: string;
  max: string;
  min: string;
  move: string;
  noRecordsToDisplay: string;
  noResultsFound: string;
  of: string;
  or: string;
  pinToLeft: string;
  pinToRight: string;
  resetColumnSize: string;
  resetOrder: string;
  rowActions: string;
  rowNumber: string;
  rowNumbers: string;
  rowsPerPage: string;
  save: string;
  search: string;
  select: string;
  selectedCountOfRowCountRowsSelected: string;
  showAll: string;
  showAllColumns: string;
  showHideColumns: string;
  showHideFilters: string;
  showHideSearch: string;
  sortByColumnAsc: string;
  sortByColumnDesc: string;
  sortedByColumnAsc: string;
  sortedByColumnDesc: string;
  thenBy: string;
  toggleDensity: string;
  toggleFullScreen: string;
  toggleSelectAll: string;
  toggleSelectRow: string;
  toggleVisibility: string;
  ungroupByColumn: string;
  unpin: string;
  unpinAll: string;
  unsorted: string;
}

export interface MST_RowModel<TData extends Record<string, any> = {}> {
  flatRows: MST_Row<TData>[];
  rows: MST_Row<TData>[];
  rowsById: { [key: string]: MST_Row<TData> };
}

export type MST_TableInstance<TData extends Record<string, any> = {}> = Omit<
  Table<TData>,
  | 'getAllColumns'
  | 'getAllFlatColumns'
  | 'getAllLeafColumns'
  | 'getCenterLeafColumns'
  | 'getColumn'
  | 'getExpandedRowModel'
  | 'getFlatHeaders'
  | 'getLeftLeafColumns'
  | 'getPaginationRowModel'
  | 'getPreFilteredRowModel'
  | 'getPrePaginationRowModel'
  | 'getRightLeafColumns'
  | 'getRowModel'
  | 'getSelectedRowModel'
  | 'getState'
  | 'options'
> & {
  getAllColumns: () => MST_Column<TData>[];
  getAllFlatColumns: () => MST_Column<TData>[];
  getAllLeafColumns: () => MST_Column<TData>[];
  getCenterLeafColumns: () => MST_Column<TData>[];
  getColumn: (columnId: string) => MST_Column<TData>;
  getExpandedRowModel: () => MST_RowModel<TData>;
  getFlatHeaders: () => MST_Header<TData>[];
  getLeftLeafColumns: () => MST_Column<TData>[];
  getPaginationRowModel: () => MST_RowModel<TData>;
  getPreFilteredRowModel: () => MST_RowModel<TData>;
  getPrePaginationRowModel: () => MST_RowModel<TData>;
  getRightLeafColumns: () => MST_Column<TData>[];
  getRowModel: () => MST_RowModel<TData>;
  getSelectedRowModel: () => MST_RowModel<TData>;
  getState: () => MST_TableState<TData>;
  options: MaterialSolidTableProps<TData> & {
    icons: MST_Icons;
    localization: MST_Localization;
  };
  // refs: {
  //   bottomToolbarRef: MutableRefObject<HTMLDivElement>;
  //   editInputRefs: MutableRefObject<Record<string, HTMLInputElement>>;
  //   filterInputRefs: MutableRefObject<Record<string, HTMLInputElement>>;
  //   searchInputRef: MutableRefObject<HTMLInputElement>;
  //   tableContainerRef: MutableRefObject<HTMLDivElement>;
  //   tableHeadCellRefs: MutableRefObject<Record<string, HTMLTableCellElement>>;
  //   tablePaperRef: MutableRefObject<HTMLDivElement>;
  //   topToolbarRef: MutableRefObject<HTMLDivElement>;
  // };
  // setColumnFilterFns: Dispatch<
  //   SetStateAction<{ [key: string]: MST_FilterOption }>
  // >;
  // setDensity: Dispatch<SetStateAction<DensityState>>;
  // setDraggingColumn: Dispatch<SetStateAction<MST_Column<TData> | null>>;
  // setDraggingRow: Dispatch<SetStateAction<MST_Row<TData> | null>>;
  // setEditingCell: Dispatch<SetStateAction<MST_Cell<TData> | null>>;
  // setEditingRow: Dispatch<SetStateAction<MST_Row<TData> | null>>;
  // setGlobalFilterFn: Dispatch<SetStateAction<MST_FilterOption>>;
  // setHoveredColumn: Dispatch<
  //   SetStateAction<MST_Column<TData> | { id: string } | null>
  // >;
  // setHoveredRow: Dispatch<
  //   SetStateAction<MST_Row<TData> | { id: string } | null>
  // >;
  // setIsFullScreen: Dispatch<SetStateAction<boolean>>;
  // setShowAlertBanner: Dispatch<SetStateAction<boolean>>;
  // setShowFilters: Dispatch<SetStateAction<boolean>>;
  // setShowGlobalFilter: Dispatch<SetStateAction<boolean>>;
};

export type MST_TableState<TData extends Record<string, any> = {}> =
  TableState & {
    columnFilterFns: Record<string, MST_FilterOption>;
    density: DensityState;
    draggingColumn: MST_Column<TData> | null;
    draggingRow: MST_Row<TData> | null;
    editingCell: MST_Cell<TData> | null;
    editingRow: MST_Row<TData> | null;
    globalFilterFn: MST_FilterOption;
    hoveredColumn: MST_Column<TData> | { id: string } | null;
    hoveredRow: MST_Row<TData> | { id: string } | null;
    isFullScreen: boolean;
    isLoading: boolean;
    showAlertBanner: boolean;
    showColumnFilters: boolean;
    showGlobalFilter: boolean;
    showProgressBars: boolean;
    showSkeletons: boolean;
  };

export type MST_ColumnDef<TData extends Record<string, any> = {}> = Omit<
  ColumnDef<TData, unknown>,
  | 'aggregatedCell'
  | 'aggregationFn'
  | 'cell'
  | 'columns'
  | 'filterFn'
  | 'footer'
  | 'header'
  | 'id'
  | 'sortingFn'
> & {
  AggregatedCell?: ({
    cell,
    column,
    row,
    table,
  }: {
    cell: MST_Cell<TData>;
    column: MST_Column<TData>;
    row: MST_Row<TData>;
    table: MST_TableInstance<TData>;
  }) => JSXElement;
  Cell?: ({
    cell,
    column,
    row,
    table,
  }: {
    cell: MST_Cell<TData>;
    column: MST_Column<TData>;
    row: MST_Row<TData>;
    table: MST_TableInstance<TData>;
  }) => JSXElement;
  Edit?: ({
    cell,
    column,
    row,
    table,
  }: {
    cell: MST_Cell<TData>;
    column: MST_Column<TData>;
    row: MST_Row<TData>;
    table: MST_TableInstance<TData>;
  }) => JSXElement;
  Filter?: ({
    column,
    header,
    rangeFilterIndex,
    table,
  }: {
    column: MST_Column<TData>;
    header: MST_Header<TData>;
    rangeFilterIndex?: number;
    table: MST_TableInstance<TData>;
  }) => JSXElement;
  Footer?:
    | JSXElement
    | (({
        column,
        footer,
        table,
      }: {
        column: MST_Column<TData>;
        footer: MST_Header<TData>;
        table: MST_TableInstance<TData>;
      }) => JSXElement);
  GroupedCell?: ({
    cell,
    column,
    row,
    table,
  }: {
    cell: MST_Cell<TData>;
    column: MST_Column<TData>;
    row: MST_Row<TData>;
    table: MST_TableInstance<TData>;
  }) => JSXElement;
  Header?:
    | JSXElement
    | (({
        column,
        header,
        table,
      }: {
        column: MST_Column<TData>;
        header: MST_Header<TData>;
        table: MST_TableInstance<TData>;
      }) => JSXElement);
  /**
   * Either an `accessorKey` or a combination of an `accessorFn` and `id` are required for a data column definition.
   * Specify a function here to point to the correct property in the data object.
   *
   * @example accessorFn: (row) => row.username
   */
  accessorFn?: (originalRow: TData) => any;
  /**
   * Either an `accessorKey` or a combination of an `accessorFn` and `id` are required for a data column definition.
   * Specify which key in the row this column should use to access the correct data.
   * Also supports Deep Key Dot Notation.
   *
   * @example accessorKey: 'username' //simple
   * @example accessorKey: 'name.firstName' //deep key dot notation
   */
  accessorKey?: DeepKeys<TData>;
  aggregationFn?: MST_AggregationFn<TData> | Array<MST_AggregationFn<TData>>;
  /**
   * Specify what type of column this is. Either `data`, `display`, or `group`. Defaults to `data`.
   * Leave this blank if you are just creating a normal data column.
   *
   * @default 'data'
   *
   * @example columnDefType: 'display'
   */
  columnDefType?: 'data' | 'display' | 'group';
  columnFilterModeOptions?: MST_FilterOption[] | null;
  columns?: MST_ColumnDef<TData>[];
  enableClickToCopy?: boolean;
  enableColumnActions?: boolean;
  enableColumnDragging?: boolean;
  enableColumnFilterModes?: boolean;
  enableColumnOrdering?: boolean;
  enableEditing?: boolean;
  filterFn?: MST_FilterFn<TData>;
  filterSelectOptions?: (string | { text: string; value: any })[];
  filterVariant?: 'text' | 'select' | 'multi-select' | 'range' | 'checkbox';
  /**
   * footer must be a string. If you want custom JSX to render the footer, you can also specify a `Footer` option. (Capital F)
   */
  footer?: string;
  /**
   * header must be a string. If you want custom JSX to render the header, you can also specify a `Header` option. (Capital H)
   */
  header: string;
  /**
   * Either an `accessorKey` or a combination of an `accessorFn` and `id` are required for a data column definition.
   *
   * If you have also specified an `accessorFn`, MST still needs to have a valid `id` to be able to identify the column uniquely.
   *
   * `id` defaults to the `accessorKey` or `header` if not specified.
   *
   * @default gets set to the same value as `accessorKey` by default
   */
  id?: LiteralUnion<string & keyof TData>;
  // muiTableBodyCellCopyButtonProps?:
  //   | ButtonProps
  //   | (({
  //       cell,
  //       column,
  //       row,
  //       table,
  //     }: {
  //       cell: MST_Cell<TData>;
  //       column: MST_Column<TData>;
  //       row: MST_Row<TData>;
  //       table: MST_TableInstance<TData>;
  //     }) => ButtonProps);
  // muiTableBodyCellEditTextFieldProps?:
  //   | TextFieldProps
  //   | (({
  //       cell,
  //       column,
  //       row,
  //       table,
  //     }: {
  //       cell: MST_Cell<TData>;
  //       column: MST_Column<TData>;
  //       row: MST_Row<TData>;
  //       table: MST_TableInstance<TData>;
  //     }) => TextFieldProps);
  // muiTableBodyCellProps?:
  //   | TableCellProps
  //   | (({
  //       cell,
  //       column,
  //       row,
  //       table,
  //     }: {
  //       cell: MST_Cell<TData>;
  //       column: MST_Column<TData>;
  //       row: MST_Row<TData>;
  //       table: MST_TableInstance<TData>;
  //     }) => TableCellProps);
  // muiTableFooterCellProps?:
  //   | TableCellProps
  //   | (({
  //       table,
  //       column,
  //     }: {
  //       table: MST_TableInstance<TData>;
  //       column: MST_Column<TData>;
  //     }) => TableCellProps);
  // muiTableHeadCellColumnActionsButtonProps?:
  //   | IconButtonProps
  //   | (({
  //       table,
  //       column,
  //     }: {
  //       table: MST_TableInstance<TData>;
  //       column: MST_Column<TData>;
  //     }) => IconButtonProps);
  // muiTableHeadCellDragHandleProps?:
  //   | IconButtonProps
  //   | (({
  //       table,
  //       column,
  //     }: {
  //       table: MST_TableInstance<TData>;
  //       column: MST_Column<TData>;
  //     }) => IconButtonProps);
  // muiTableHeadCellFilterCheckboxProps?:
  //   | CheckboxProps
  //   | (({
  //       column,
  //       table,
  //     }: {
  //       column: MST_Column<TData>;
  //       table: MST_TableInstance<TData>;
  //     }) => CheckboxProps);
  // muiTableHeadCellFilterTextFieldProps?:
  //   | TextFieldProps
  //   | (({
  //       table,
  //       column,
  //       rangeFilterIndex,
  //     }: {
  //       table: MST_TableInstance<TData>;
  //       column: MST_Column<TData>;
  //       rangeFilterIndex?: number;
  //     }) => TextFieldProps);
  // muiTableHeadCellProps?:
  //   | TableCellProps
  //   | (({
  //       table,
  //       column,
  //     }: {
  //       table: MST_TableInstance<TData>;
  //       column: MST_Column<TData>;
  //     }) => TableCellProps);
  renderColumnActionsMenuItems?: ({
    closeMenu,
    column,
    table,
  }: {
    closeMenu: () => void;
    column: MST_Column<TData>;
    table: MST_TableInstance<TData>;
  }) => JSXElement[];
  renderColumnFilterModeMenuItems?: ({
    column,
    internalFilterOptions,
    onSelectFilterMode,
    table,
  }: {
    column: MST_Column<TData>;
    internalFilterOptions: MST_InternalFilterOption[];
    onSelectFilterMode: (filterMode: MST_FilterOption) => void;
    table: MST_TableInstance<TData>;
  }) => JSXElement[];
  sortingFn?: MST_SortingFn<TData>;
};

export type MST_DefinedColumnDef<TData extends Record<string, any> = {}> = Omit<
  MST_ColumnDef<TData>,
  'id' | 'defaultDisplayColumn'
> & {
  defaultDisplayColumn: Partial<MST_ColumnDef<TData>>;
  id: string;
  _filterFn: MST_FilterOption;
};

export type MST_Column<TData extends Record<string, any> = {}> = Omit<
  Column<TData, unknown>,
  'header' | 'footer' | 'columns' | 'columnDef' | 'filterFn'
> & {
  columnDef: MST_DefinedColumnDef<TData>;
  columns?: MST_Column<TData>[];
  filterFn?: MST_FilterFn<TData>;
  footer: string;
  header: string;
};

export type MST_Header<TData extends Record<string, any> = {}> = Omit<
  Header<TData, unknown>,
  'column'
> & {
  column: MST_Column<TData>;
};

export type MST_HeaderGroup<TData extends Record<string, any> = {}> = Omit<
  HeaderGroup<TData>,
  'headers'
> & {
  headers: MST_Header<TData>[];
};

export type MST_Row<TData extends Record<string, any> = {}> = Omit<
  Row<TData>,
  'getVisibleCells' | 'getAllCells' | 'subRows' | '_valuesCache'
> & {
  getAllCells: () => MST_Cell<TData>[];
  getVisibleCells: () => MST_Cell<TData>[];
  subRows?: MST_Row<TData>[];
  _valuesCache: Record<LiteralUnion<string & DeepKeys<TData>>, any>;
};

export type MST_Cell<TData extends Record<string, any> = {}> = Omit<
  Cell<TData, unknown>,
  'column' | 'row'
> & {
  column: MST_Column<TData>;
  row: MST_Row<TData>;
};

export type MST_AggregationOption = string & keyof typeof MST_AggregationFns;

export type MST_AggregationFn<TData extends Record<string, any> = {}> =
  | AggregationFn<TData>
  | MST_AggregationOption;

export type MST_SortingOption = LiteralUnion<
  string & keyof typeof MST_SortingFns
>;

export type MST_SortingFn<TData extends Record<string, any> = {}> =
  | SortingFn<TData>
  | MST_SortingOption;

export type MST_FilterOption = LiteralUnion<
  string & keyof typeof MST_FilterFns
>;

export type MST_FilterFn<TData extends Record<string, any> = {}> =
  | FilterFn<TData>
  | MST_FilterOption;

export type MST_InternalFilterOption = {
  option: string;
  symbol: string;
  label: string;
  divider: boolean;
};

export type MST_DisplayColumnIds =
  | 'mrt-row-actions'
  | 'mrt-row-drag'
  | 'mrt-row-expand'
  | 'mrt-row-numbers'
  | 'mrt-row-select';

export type MaterialSolidTableProps<TData extends Record<string, any> = {}> =
  Omit<
    Partial<TableOptions<TData>>,
    | 'columns'
    | 'data'
    | 'defaultColumn'
    | 'enableRowSelection'
    | 'expandRowsFn'
    | 'globalFilterFn'
    | 'initialState'
    | 'onStateChange'
    | 'state'
  > & {
    columnFilterModeOptions?: (MST_FilterOption | string)[] | null;
    /**
     * The columns to display in the table. `accessorKey`s or `accessorFn`s must match keys in the `data` prop.
     *
     * See more info on creating columns on the official docs site:
     * @link https://www.material-react-table.com/docs/guides/data-columns
     * @link https://www.material-react-table.com/docs/guides/display-columns
     *
     * See all Columns Options on the official docs site:
     * @link https://www.material-react-table.com/docs/api/column-options
     */
    columns: MST_ColumnDef<TData>[];
    /**
     * Pass your data as an array of objects. Objects can theoretically be any shape, but it's best to keep them consistent.
     *
     * See the usage guide for more info on creating columns and data:
     * @link https://www.material-react-table.com/docs/getting-started/usage
     */
    data: TData[];
    /**
     * Instead of specifying a bunch of the same options for each column, you can just change an option in the `defaultColumn` prop to change a default option for all columns.
     */
    defaultColumn?: Partial<MST_ColumnDef<TData>>;
    /**
     * Change the default options for display columns.
     */
    defaultDisplayColumn?: Partial<MST_ColumnDef<TData>>;
    displayColumnDefOptions?: Partial<{
      [key in MST_DisplayColumnIds]: Partial<MST_ColumnDef>;
    }>;
    editingMode?: 'table' | 'modal' | 'row' | 'cell';
    enableBottomToolbar?: boolean;
    enableClickToCopy?: boolean;
    enableColumnActions?: boolean;
    enableColumnDragging?: boolean;
    enableColumnFilterModes?: boolean;
    enableColumnOrdering?: boolean;
    enableDensityToggle?: boolean;
    enableEditing?: boolean;
    enableExpandAll?: boolean;
    enableFullScreenToggle?: boolean;
    enableGlobalFilterModes?: boolean;
    enableGlobalFilterRankedResults?: boolean;
    enablePagination?: boolean;
    enableRowActions?: boolean;
    enableRowDragging?: boolean;
    enableRowNumbers?: boolean;
    enableRowOrdering?: boolean;
    enableRowSelection?: boolean | ((row: MST_Row<TData>) => boolean);
    enableRowVirtualization?: boolean;
    enableSelectAll?: boolean;
    enableStickyFooter?: boolean;
    enableStickyHeader?: boolean;
    enableTableFooter?: boolean;
    enableTableHead?: boolean;
    enableToolbarInternalActions?: boolean;
    enableTopToolbar?: boolean;
    expandRowsFn?: (dataRow: TData) => TData[];
    globalFilterFn?: MST_FilterOption;
    globalFilterModeOptions?: MST_FilterOption[] | null;
    icons?: Partial<MST_Icons>;
    initialState?: Partial<MST_TableState<TData>>;
    /**
     * Pass in either a locale imported from `material-react-table/locales/*` or a custom locale object.
     *
     * See the localization (i18n) guide for more info:
     * @link https://www.material-react-table.com/docs/guides/localization
     */
    localization?: Partial<MST_Localization>;
    /**
     * Memoize cells, rows, or the entire table body to potentially improve render performance.
     *
     * @warning This will break some dynamic rendering features. See the memoization guide for more info:
     * @link https://www.material-react-table.com/docs/guides/memoize-components
     */
    memoMode?: 'cells' | 'rows' | 'table-body';
    // muiBottomToolbarProps?:
    //   | ToolbarProps
    //   | (({ table }: { table: MST_TableInstance<TData> }) => ToolbarProps);
    // muiExpandAllButtonProps?:
    //   | IconButtonProps
    //   | (({ table }: { table: MST_TableInstance<TData> }) => IconButtonProps);
    // muiExpandButtonProps?:
    //   | IconButtonProps
    //   | (({
    //       row,
    //       table,
    //     }: {
    //       table: MST_TableInstance<TData>;
    //       row: MST_Row<TData>;
    //     }) => IconButtonProps);
    // muiLinearProgressProps?:
    //   | LinearProgressProps
    //   | (({
    //       isTopToolbar,
    //       table,
    //     }: {
    //       isTopToolbar: boolean;
    //       table: MST_TableInstance<TData>;
    //     }) => LinearProgressProps);
    // muiSearchTextFieldProps?:
    //   | TextFieldProps
    //   | (({ table }: { table: MST_TableInstance<TData> }) => TextFieldProps);
    // muiSelectAllCheckboxProps?:
    //   | CheckboxProps
    //   | (({ table }: { table: MST_TableInstance<TData> }) => CheckboxProps);
    // muiSelectCheckboxProps?:
    //   | (CheckboxProps | RadioProps)
    //   | (({
    //       table,
    //       row,
    //     }: {
    //       table: MST_TableInstance<TData>;
    //       row: MST_Row<TData>;
    //     }) => CheckboxProps | RadioProps);
    // muiTableBodyCellCopyButtonProps?:
    //   | ButtonProps
    //   | (({
    //       cell,
    //       column,
    //       row,
    //       table,
    //     }: {
    //       cell: MST_Cell<TData>;
    //       column: MST_Column<TData>;
    //       row: MST_Row<TData>;
    //       table: MST_TableInstance<TData>;
    //     }) => ButtonProps);
    // muiTableBodyCellEditTextFieldProps?:
    //   | TextFieldProps
    //   | (({
    //       cell,
    //       column,
    //       row,
    //       table,
    //     }: {
    //       cell: MST_Cell<TData>;
    //       column: MST_Column<TData>;
    //       row: MST_Row<TData>;
    //       table: MST_TableInstance<TData>;
    //     }) => TextFieldProps);
    // muiTableBodyCellProps?:
    //   | TableCellProps
    //   | (({
    //       cell,
    //       column,
    //       row,
    //       table,
    //     }: {
    //       cell: MST_Cell<TData>;
    //       column: MST_Column<TData>;
    //       row: MST_Row<TData>;
    //       table: MST_TableInstance<TData>;
    //     }) => TableCellProps);
    // muiTableBodyCellSkeletonProps?:
    //   | SkeletonProps
    //   | (({
    //       cell,
    //       column,
    //       row,
    //       table,
    //     }: {
    //       cell: MST_Cell<TData>;
    //       column: MST_Column<TData>;
    //       row: MST_Row<TData>;
    //       table: MST_TableInstance<TData>;
    //     }) => SkeletonProps);
    // muiTableBodyProps?:
    //   | TableBodyProps
    //   | (({ table }: { table: MST_TableInstance<TData> }) => TableBodyProps);
    // muiTableBodyRowDragHandleProps?:
    //   | IconButtonProps
    //   | (({
    //       table,
    //       row,
    //     }: {
    //       table: MST_TableInstance<TData>;
    //       row: MST_Row<TData>;
    //     }) => IconButtonProps);
    // muiTableBodyRowProps?:
    //   | TableRowProps
    //   | (({
    //       table,
    //       row,
    //     }: {
    //       table: MST_TableInstance<TData>;
    //       row: MST_Row<TData>;
    //     }) => TableRowProps);
    // muiTableContainerProps?:
    //   | TableContainerProps
    //   | (({
    //       table,
    //     }: {
    //       table: MST_TableInstance<TData>;
    //     }) => TableContainerProps);
    // muiTableDetailPanelProps?:
    //   | TableCellProps
    //   | (({
    //       table,
    //       row,
    //     }: {
    //       table: MST_TableInstance<TData>;
    //       row: MST_Row<TData>;
    //     }) => TableCellProps);
    // muiTableFooterCellProps?:
    //   | TableCellProps
    //   | (({
    //       table,
    //       column,
    //     }: {
    //       table: MST_TableInstance<TData>;
    //       column: MST_Column<TData>;
    //     }) => TableCellProps);
    // muiTableFooterProps?:
    //   | TableFooterProps
    //   | (({ table }: { table: MST_TableInstance<TData> }) => TableFooterProps);
    // muiTableFooterRowProps?:
    //   | TableRowProps
    //   | (({
    //       table,
    //       footerGroup,
    //     }: {
    //       table: MST_TableInstance<TData>;
    //       footerGroup: MST_HeaderGroup<TData>;
    //     }) => TableRowProps);
    // muiTableHeadCellColumnActionsButtonProps?:
    //   | IconButtonProps
    //   | (({
    //       table,
    //       column,
    //     }: {
    //       table: MST_TableInstance<TData>;
    //       column: MST_Column<TData>;
    //     }) => IconButtonProps);
    // muiTableHeadCellDragHandleProps?:
    //   | IconButtonProps
    //   | (({
    //       table,
    //       column,
    //     }: {
    //       table: MST_TableInstance<TData>;
    //       column: MST_Column<TData>;
    //     }) => IconButtonProps);
    // muiTableHeadCellFilterCheckboxProps?:
    //   | CheckboxProps
    //   | (({
    //       column,
    //       table,
    //     }: {
    //       column: MST_Column<TData>;
    //       table: MST_TableInstance<TData>;
    //     }) => CheckboxProps);
    // muiTableHeadCellFilterTextFieldProps?:
    //   | TextFieldProps
    //   | (({
    //       table,
    //       column,
    //       rangeFilterIndex,
    //     }: {
    //       table: MST_TableInstance<TData>;
    //       column: MST_Column<TData>;
    //       rangeFilterIndex?: number;
    //     }) => TextFieldProps);
    // muiTableHeadCellProps?:
    //   | TableCellProps
    //   | (({
    //       table,
    //       column,
    //     }: {
    //       table: MST_TableInstance<TData>;
    //       column: MST_Column<TData>;
    //     }) => TableCellProps);
    // muiTableHeadProps?:
    //   | TableHeadProps
    //   | (({ table }: { table: MST_TableInstance<TData> }) => TableHeadProps);
    // muiTableHeadRowProps?:
    //   | TableRowProps
    //   | (({
    //       table,
    //       headerGroup,
    //     }: {
    //       table: MST_TableInstance<TData>;
    //       headerGroup: MST_HeaderGroup<TData>;
    //     }) => TableRowProps);
    // muiTablePaginationProps?:
    //   | Partial<TablePaginationProps>
    //   | (({
    //       table,
    //     }: {
    //       table: MST_TableInstance<TData>;
    //     }) => Partial<TablePaginationProps>);
    // muiTablePaperProps?:
    //   | PaperProps
    //   | (({ table }: { table: MST_TableInstance<TData> }) => PaperProps);
    // muiTableProps?:
    //   | TableProps
    //   | (({ table }: { table: MST_TableInstance<TData> }) => TableProps);
    // muiToolbarAlertBannerChipProps?:
    //   | ChipProps
    //   | (({ table }: { table: MST_TableInstance<TData> }) => ChipProps);
    // muiToolbarAlertBannerProps?:
    //   | AlertProps
    //   | (({ table }: { table: MST_TableInstance<TData> }) => AlertProps);
    // muiTopToolbarProps?:
    //   | ToolbarProps
    //   | (({ table }: { table: MST_TableInstance<TData> }) => ToolbarProps);
    onDensityChange?: OnChangeFn<DensityState>;
    onDraggingColumnChange?: OnChangeFn<MST_Column<TData> | null>;
    onDraggingRowChange?: OnChangeFn<MST_Row<TData> | null>;
    onEditingCellChange?: OnChangeFn<MST_Cell<TData> | null>;
    onEditingRowSave?: ({
      exitEditingMode,
      row,
      table,
      values,
    }: {
      exitEditingMode: () => void;
      row: MST_Row<TData>;
      table: MST_TableInstance<TData>;
      values: Record<LiteralUnion<string & DeepKeys<TData>>, any>;
    }) => Promise<void> | void;
    onEditingRowChange?: OnChangeFn<MST_Row<TData> | null>;
    onFilterFnsChange?: OnChangeFn<{ [key: string]: MST_FilterOption }>;
    onGlobalFilterFnChange?: OnChangeFn<MST_FilterOption>;
    onHoveredColumnChange?: OnChangeFn<MST_Column<TData> | null>;
    onHoveredRowChange?: OnChangeFn<MST_Row<TData> | null>;
    onIsFullScreenChange?: OnChangeFn<boolean>;
    onShowAlertBannerChange?: OnChangeFn<boolean>;
    onShowFiltersChange?: OnChangeFn<boolean>;
    onShowGlobalFilterChange?: OnChangeFn<boolean>;
    positionActionsColumn?: 'first' | 'last';
    positionExpandColumn?: 'first' | 'last';
    positionGlobalFilter?: 'left' | 'right';
    positionPagination?: 'bottom' | 'top' | 'both';
    positionToolbarAlertBanner?: 'bottom' | 'top' | 'none';
    positionToolbarDropZone?: 'bottom' | 'top' | 'none' | 'both';
    renderBottomToolbar?:
      | JSXElement
      | (({ table }: { table: MST_TableInstance<TData> }) => JSXElement);
    renderBottomToolbarCustomActions?: ({
      table,
    }: {
      table: MST_TableInstance<TData>;
    }) => JSXElement;
    renderColumnActionsMenuItems?: ({
      column,
      closeMenu,
      table,
    }: {
      column: MST_Column<TData>;
      closeMenu: () => void;
      table: MST_TableInstance<TData>;
    }) => JSXElement[];
    renderColumnFilterModeMenuItems?: ({
      column,
      internalFilterOptions,
      onSelectFilterMode,
      table,
    }: {
      column: MST_Column<TData>;
      internalFilterOptions: MST_InternalFilterOption[];
      onSelectFilterMode: (filterMode: MST_FilterOption) => void;
      table: MST_TableInstance<TData>;
    }) => JSXElement[];
    renderDetailPanel?: ({
      row,
      table,
    }: {
      row: MST_Row<TData>;
      table: MST_TableInstance<TData>;
    }) => JSXElement;
    renderGlobalFilterModeMenuItems?: ({
      internalFilterOptions,
      onSelectFilterMode,
      table,
    }: {
      internalFilterOptions: MST_InternalFilterOption[];
      onSelectFilterMode: (filterMode: MST_FilterOption) => void;
      table: MST_TableInstance<TData>;
    }) => JSXElement[];
    renderRowActionMenuItems?: ({
      closeMenu,
      row,
      table,
    }: {
      closeMenu: () => void;
      row: MST_Row<TData>;
      table: MST_TableInstance<TData>;
    }) => JSXElement[];
    renderRowActions?: ({
      cell,
      row,
      table,
    }: {
      cell: MST_Cell<TData>;
      row: MST_Row<TData>;
      table: MST_TableInstance<TData>;
    }) => JSXElement;
    renderToolbarInternalActions?: ({
      table,
    }: {
      table: MST_TableInstance<TData>;
    }) => JSXElement;
    renderTopToolbar?:
      | JSXElement
      | (({ table }: { table: MST_TableInstance<TData> }) => JSXElement);
    renderTopToolbarCustomActions?: ({
      table,
    }: {
      table: MST_TableInstance<TData>;
    }) => JSXElement;
    rowCount?: number;
    rowNumberMode?: 'original' | 'static';
    selectAllMode?: 'all' | 'page';
    state?: Partial<MST_TableState<TData>>;
    // tableInstanceRef?: MutableRefObject<MST_TableInstance<TData> | null>;
    // virtualizerProps?:
    //   | Partial<VirtualizerOptions<HTMLDivElement>>
    //   | (({
    //       table,
    //     }: {
    //       table: MST_TableInstance<TData>;
    //     }) => Partial<VirtualizerOptions<HTMLDivElement>>);
    // virtualizerProps?:
    //   | Partial<VirtualizerOptions<HTMLDivElement, HTMLTableRowElement>>
    //   | (({
    //       table,
    //     }: {
    //       table: MST_TableInstance<TData>;
    //     }) => Partial<VirtualizerOptions<HTMLDivElement, HTMLTableRowElement>>);
    // virtualizerInstanceRef?: MutableRefObject<Virtualizer | null>;
  };

const MaterialSolidTable = <TData extends Record<string, any> = {}>({
  aggregationFns,
  autoResetExpanded = false,
  columnResizeMode = 'onEnd',
  defaultColumn,
  defaultDisplayColumn,
  editingMode = 'modal',
  enableBottomToolbar = true,
  enableColumnActions = true,
  enableColumnFilters = true,
  enableColumnOrdering = false,
  enableColumnResizing = false,
  enableDensityToggle = true,
  enableExpandAll = true,
  enableFilters = true,
  enableFullScreenToggle = true,
  enableGlobalFilter = true,
  enableGlobalFilterRankedResults = true,
  enableGrouping = false,
  enableHiding = true,
  enableMultiRowSelection = true,
  enableMultiSort = true,
  enablePagination = true,
  enablePinning = false,
  enableRowSelection = false,
  enableSelectAll = true,
  enableSorting = true,
  enableStickyHeader = false,
  enableTableFooter = true,
  enableTableHead = true,
  enableToolbarInternalActions = true,
  enableTopToolbar = true,
  filterFns,
  icons,
  localization,
  positionActionsColumn = 'first',
  positionExpandColumn = 'first',
  positionGlobalFilter = 'right',
  positionPagination = 'bottom',
  positionToolbarAlertBanner = 'top',
  positionToolbarDropZone = 'top',
  rowNumberMode = 'original',
  selectAllMode = 'page',
  sortingFns,
  ...rest
}: MaterialSolidTableProps<TData>) => {
  const _icons = { ...MST_Default_Icons, ...icons };
  const _localization = {
    ...MST_Localization_EN,
    ...localization,
  };
  const _aggregationFns = { ...MST_AggregationFns, ...aggregationFns };
  const _filterFns = { ...MST_FilterFns, ...filterFns };
  const _sortingFns = { ...MST_SortingFns, ...sortingFns };
  const _defaultColumn: Partial<MST_ColumnDef<TData>> = {
    ...MST_DefaultColumn,
    ...defaultColumn,
  };
  const _defaultDisplayColumn: Partial<MST_ColumnDef<TData>> = {
    ...(MST_DefaultDisplayColumn as Partial<MST_ColumnDef<TData>>),
    ...defaultDisplayColumn,
  };

  return (
    <MST_TableRoot
      aggregationFns={_aggregationFns}
      autoResetExpanded={autoResetExpanded}
      columnResizeMode={columnResizeMode}
      defaultColumn={_defaultColumn}
      defaultDisplayColumn={_defaultDisplayColumn}
      editingMode={editingMode}
      enableBottomToolbar={enableBottomToolbar}
      enableColumnActions={enableColumnActions}
      enableColumnFilters={enableColumnFilters}
      enableColumnOrdering={enableColumnOrdering}
      enableColumnResizing={enableColumnResizing}
      enableDensityToggle={enableDensityToggle}
      enableExpandAll={enableExpandAll}
      enableFilters={enableFilters}
      enableFullScreenToggle={enableFullScreenToggle}
      enableGlobalFilter={enableGlobalFilter}
      enableGlobalFilterRankedResults={enableGlobalFilterRankedResults}
      enableGrouping={enableGrouping}
      enableHiding={enableHiding}
      enableMultiRowSelection={enableMultiRowSelection}
      enableMultiSort={enableMultiSort}
      enablePagination={enablePagination}
      enablePinning={enablePinning}
      enableRowSelection={enableRowSelection}
      enableSelectAll={enableSelectAll}
      enableSorting={enableSorting}
      enableStickyHeader={enableStickyHeader}
      enableTableFooter={enableTableFooter}
      enableTableHead={enableTableHead}
      enableToolbarInternalActions={enableToolbarInternalActions}
      enableTopToolbar={enableTopToolbar}
      filterFns={_filterFns}
      icons={_icons}
      localization={_localization}
      positionActionsColumn={positionActionsColumn}
      positionExpandColumn={positionExpandColumn}
      positionGlobalFilter={positionGlobalFilter}
      positionPagination={positionPagination}
      positionToolbarAlertBanner={positionToolbarAlertBanner}
      positionToolbarDropZone={positionToolbarDropZone}
      rowNumberMode={rowNumberMode}
      selectAllMode={selectAllMode}
      sortingFns={_sortingFns}
      {...rest}
    />
  );
};

export default MaterialSolidTable;
