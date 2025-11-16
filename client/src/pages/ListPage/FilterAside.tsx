import { Button, Select, Text, TextInput } from '@gravity-ui/uikit';
import { resetFilters, setCategoryID, setMaxPrice, setMinPrice, setStatus, } from '../../core/store/Slices/filter';
import { useAppDispatch, useAppSelector } from '../../core/store/store.ts';
import { useState } from 'react';
import type { TAdStatus } from '../../core/api/ads/ads.types.ts';
import { MultiToggleButtons } from '../../components/ui/MultiToggleButtons/MultiToggleButtons.tsx';

function FilterAside() {
  const STATUS_OPTIONS: TAdStatus[] = ['pending', 'approved', 'rejected', 'draft'];
  const [selectedStatus, setSelectedStatus] = useState<TAdStatus[]>([]);

  const dispatch = useAppDispatch();

  const filter = useAppSelector((state) => state.filter);

  const handleStatusChange = (value: TAdStatus[]) => {
    setSelectedStatus(value);
    if (value.length === 0) {
      dispatch(setStatus(undefined));
      return;
    }
    dispatch(setStatus(value));
  };

  const handleCategoryChange = (value: string[]) => {
    if (value.length === 0) {
      dispatch(setCategoryID(undefined));
      return;
    }

    if (value[0] === 'none') {
      dispatch(setCategoryID(undefined));
      return;
    }

    const num = Number(value[0].replace(/\D/g, ''));
    if (!Number.isNaN(num)) {
      dispatch(setCategoryID(num));
    }
  };

  const handleMinPriceChange = (value: string) => {
    if (value === '') {
      dispatch(setMinPrice(undefined));
      return;
    }

    const num = Number(value.replace(/\D/g, ''));
    if (!Number.isNaN(num)) {
      dispatch(setMinPrice(num));
    }
  };

  const handleMaxPriceChange = (value: string) => {
    if (value === '') {
      dispatch(setMaxPrice(undefined));
      return;
    }

    const num = Number(value.replace(/\D/g, ''));
    if (!Number.isNaN(num)) {
      dispatch(setMaxPrice(num));
    }
  };

  return (
    <aside
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Text variant={'body-3'} style={{ fontWeight: '600' }}>
        Статус
      </Text>
      <MultiToggleButtons
        options={STATUS_OPTIONS}
        onChange={handleStatusChange}
        value={selectedStatus}
      />
      <Text variant={'body-3'} style={{ fontWeight: '600' }}>
        Категория
      </Text>
      <Select
        defaultValue={['-']}
        size={'xl'}
        options={[
          { value: 'none', content: '-' },
          { value: '0', content: 'Электроника' },
          { value: '1', content: 'Недвижимость' },
          { value: '2', content: 'Транспорт' },
          { value: '3', content: 'Работа' },
          { value: '4', content: 'Услуги' },
          { value: '5', content: 'Животные' },
          { value: '6', content: 'Мода' },
          { value: '7', content: 'Детское' },
        ]}
        onUpdate={handleCategoryChange}
        value={[String(filter.categoryId ?? '-')]}
      />
      <Text variant={'body-3'} style={{ fontWeight: '600' }}>
        Цена, ₽
      </Text>

      <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
        <TextInput
          size="xl"
          placeholder="От"
          value={filter.minPrice?.toString() ?? ''}
          onUpdate={handleMinPriceChange}
        />
        <TextInput
          size="xl"
          placeholder="До"
          value={filter.maxPrice?.toString() ?? ''}
          onUpdate={handleMaxPriceChange}
        />
      </div>

      <Button
        view="action"
        size="xl"
        width="max"
        style={{ position: 'sticky', top: 20 }}
        onClick={() => dispatch(resetFilters())}
      >
        <Text color="inverted-primary" variant="body-2">
          Сбросить все фильтры
        </Text>
      </Button>
    </aside>
  );
}

export default FilterAside;
