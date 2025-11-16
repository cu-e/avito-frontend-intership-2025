import { Button, Hotkey, Text, TextInput } from '@gravity-ui/uikit';
import FilterAside from './FilterAside.tsx';
import ResultSection from './ResultSection.tsx';
import { setSearch } from '../../core/store/Slices/filter.ts';
import { useAppDispatch, useAppSelector } from '../../core/store/store.ts';
import { useHotkeys } from '../../core/hooks/useHotkeys.ts';
import { useRef } from 'react';

function ListPage() {
  const dispatch = useAppDispatch();

  const search = useAppSelector((state) => state.filter.search);

  const handleSearchChange = (searchText: string) => {
    if (searchText === '') {
      dispatch(setSearch(undefined));
      return;
    }
    dispatch(setSearch(searchText));
  };
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchFocus = (e?: KeyboardEvent) => {
    e?.preventDefault();
    inputRef.current?.focus();
  };
  useHotkeys([{ key: '/', handler: handleSearchFocus }]);
  return (
    <>
      <div
        style={{
          margin: '14px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--g-color-base-brand)',
          padding: '2px',
          borderRadius: '12px',
        }}
      >
        <TextInput
          size={'l'}
          style={{ fontWeight: '700', backgroundColor: 'white', borderRadius: '10px' }}
          placeholder={'Поиск по объявлениям'}
          controlRef={inputRef}
          onUpdate={handleSearchChange}
          value={search}
        />
        <Button size={'l'} view={'flat-contrast'} style={{ height: 'max-content' }}>
          Найти
        </Button>
      </div>
      <div>
        <Hotkey value={'/'} /> - Фокус на вводе
      </div>
      <Text variant={'display-1'} style={{ fontWeight: '700', margin: '12px 0' }}>
        Объявления на модерации
      </Text>
      <div style={{ display: 'grid', gridTemplateColumns: '300px auto', gap: '16px' }}>
        <FilterAside />
        <ResultSection />
      </div>
    </>
  );
}

export default ListPage;
