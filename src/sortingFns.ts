import { compareItems, RankingInfo } from '@tanstack/match-sorter-utils';
import { Row, sortingFns } from '@tanstack/solid-table';
// import { MST_Row } from '.';
type MST_Row<T> = any;

const fuzzy = <TData extends Record<string, any> = {}>(
  rowA: Row<TData>,
  rowB: Row<TData>,
  columnId: string,
) => {
  let dir = 0;
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId] as RankingInfo,
      rowB.columnFiltersMeta[columnId] as RankingInfo,
    );
  }
  // Provide a fallback for when the item ranks are equal
  return dir === 0
    ? sortingFns.alphanumeric(rowA as Row<any>, rowB as Row<any>, columnId)
    : dir;
};

export const MST_SortingFns = {
  ...sortingFns,
  fuzzy,
};

export const rankGlobalFuzzy = <TData extends Record<string, any> = {}>(
  rowA: MST_Row<TData>,
  rowB: MST_Row<TData>,
) =>
  Math.max(...Object.values(rowB.columnFiltersMeta).map((v: any) => v.rank)) -
  Math.max(...Object.values(rowA.columnFiltersMeta).map((v: any) => v.rank));
