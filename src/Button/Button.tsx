import { For } from 'solid-js';
import Button from '@suid/material/Button';

export namespace SolidButton {
  export interface Props {
    count: number;
  }
}

export function SolidButton({ count }: SolidButton.Props) {
  const labels = Array(count)
    .fill(null)
    .map((_, i) => i + 1);

  return (
    <For each={labels}>
      {(label) => <Button variant="contained">{label}</Button>}
    </For>
  );
}
