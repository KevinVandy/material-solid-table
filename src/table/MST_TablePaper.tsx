import { mergeProps, Show } from 'solid-js';
import Paper from '@suid/material/Paper';
import { MST_TableContainer } from './MST_TableContainer';
import type { MST_TableInstance } from '..';

interface Props {
  table: MST_TableInstance;
}

export const MST_TablePaper = ({ table }: Props) => {
  const {
    getState,
    options: {
      enableBottomToolbar,
      enableTopToolbar,
      muiTablePaperProps,
      renderBottomToolbar,
      renderTopToolbar,
    },
    refs: { tablePaperRef },
  } = table;
  const { isFullScreen } = getState();

  const tablePaperProps =
    muiTablePaperProps instanceof Function
      ? muiTablePaperProps({ table })
      : muiTablePaperProps;

  return (
    <Paper
      ref={tablePaperRef}
      sx={(theme) =>
        mergeProps({ transition: 'all 150ms ease-in-out' }, () =>
          tablePaperProps?.sx instanceof Function
            ? tablePaperProps?.sx(theme)
            : (tablePaperProps?.sx as any),
        )
      }
      style={mergeProps(
        () => tablePaperProps?.style,
        () =>
          isFullScreen
            ? {
                height: '100vh',
                margin: 0,
                maxHeight: '100vh',
                maxWidth: '100vw',
                padding: 0,
                width: '100vw',
              }
            : {},
      )}
    >
      <Show when={enableTopToolbar}>
        {renderTopToolbar instanceof Function
          ? renderTopToolbar({ table: table })
          : renderTopToolbar ?? <MST_TableContainer table={table} />}
      </Show>
      <MST_TableContainer table={table} />
      <Show when={enableBottomToolbar}>
        {renderBottomToolbar instanceof Function
          ? renderBottomToolbar({ table: table })
          : renderBottomToolbar ?? <MST_TableContainer table={table} />}
      </Show>
    </Paper>
  );
};
