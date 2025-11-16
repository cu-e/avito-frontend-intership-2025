import { useState } from 'react';
import { RadioGroup, TextInput } from '@gravity-ui/uikit';

type Option = {
  value: string;
  content: string;
};

type CategoryWithOtherProps = {
  options: Option[];
  onChange?: (value: string) => void;
};

const OTHER_VALUE = 'other';

export function CategoryRadioWithOther({ options, onChange }: CategoryWithOtherProps) {
  const [selected, setSelected] = useState<string>();
  const [otherText, setOtherText] = useState('');

  const allOptions: Option[] = [...options, { value: OTHER_VALUE, content: 'Другое' }];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <RadioGroup
        name="category-with-other"
        options={allOptions}
        value={selected}
        size={'l'}
        direction={'vertical'}
        onUpdate={(nextValue) => {
          setSelected(nextValue);

          if (nextValue === OTHER_VALUE) {
            if (otherText) {
              onChange?.(otherText);
            }
          } else {
            onChange?.(nextValue);
          }
        }}
      />

      {selected === OTHER_VALUE && (
        <TextInput
          size="xl"
          placeholder="Причина, например, Он не любит котиков. :("
          value={otherText}
          onUpdate={(val) => {
            setOtherText(val);
            if (selected === OTHER_VALUE) {
              onChange?.(val);
            }
          }}
        />
      )}
    </div>
  );
}
