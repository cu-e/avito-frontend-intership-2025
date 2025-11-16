import { useState } from 'react';
import { Button } from '@gravity-ui/uikit';

type MultiToggleButtonsProps<T extends string> = {
  options: T[];
  value?: T[];
  onChange?: (next: T[]) => void;
};

export function MultiToggleButtons<T extends string>({
  options,
  value,
  onChange,
}: MultiToggleButtonsProps<T>) {
  const [internalValue, setInternalValue] = useState<T[]>([]);
  const selected = value ?? internalValue;

  const toggle = (option: T) => {
    const isSelected = selected.includes(option);
    const next = isSelected ? selected.filter((item) => item !== option) : [...selected, option];

    if (onChange) {
      onChange(next);
    } else {
      setInternalValue(next);
    }
  };

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {options.map((option) => {
        const isActive = selected.includes(option);

        return (
          <Button
            key={option}
            view={isActive ? 'outlined-action' : 'outlined'}
            size="xl"
            onClick={() => toggle(option)}
          >
            {option}
          </Button>
        );
      })}
    </div>
  );
}
