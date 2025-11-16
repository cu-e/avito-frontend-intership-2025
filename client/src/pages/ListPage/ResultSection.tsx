import { useEffect, useState } from 'react';
import { api } from '../../main.tsx';
import type { IAdsResponse, TAdsSortBy, TSortOrder } from '../../core/api/ads/ads.types.ts';
import AdItem from '../../components/ui/AdItem/AdItem.tsx';
import { Button, Icon, Pagination, type PaginationProps, Select, Text } from '@gravity-ui/uikit';
import {
  ArrowUpArrowDown,
  BarsAscendingAlignLeft,
  LayoutCellsLarge,
  LayoutRows,
} from '@gravity-ui/icons';
import { useAppDispatch, useAppSelector } from '../../core/store/store.ts';
import { setPage, setSortBy, setSortOrder } from '../../core/store/Slices/filter.ts';
import Lottie from 'lottie-react';
import notFound from '../../assets/lottie/notFound.json';
import { getLabel } from '../../core/utils/get-label.tsx';

function ResultSection() {
  const dispatch = useAppDispatch();
  const [list, setList] = useState<IAdsResponse>();
  const [viewItem, setViewItem] = useState<'row' | 'card'>('row');

  const filter = useAppSelector((state) => state.filter);

  useEffect(() => {
    const load = async () => {
      const data = await api.ads.getAll(filter);
      setList(data);
    };

    load();
  }, [filter]);
  const sortOptions = [
    { value: 'none', content: '-' },
    { value: 'createdAt', content: 'Дата' },
    { value: 'price', content: 'Цена' },
    { value: 'priority', content: 'Приоритет' },
  ];

  const sortOrderOptions = [
    { value: 'none', content: '-' },
    { value: 'asc', content: 'АЯ 1-9' },
    { value: 'desc', content: 'ЯА 9-1' },
  ];

  // хочется кода без as ок)
  function isSortBy(value: string): value is TAdsSortBy | 'none' {
    return ['createdAt', 'price', 'priority', 'none'].includes(value);
  }
  function isSortOrder(value: string): value is TSortOrder | 'none' {
    return ['asc', 'desc', 'none'].includes(value);
  }

  const handleSortByChange = (value: TAdsSortBy | 'none') => {
    if (value.length === 0) {
      dispatch(setSortBy(undefined));
      return;
    }

    if (value === 'none') {
      dispatch(setSortBy(undefined));
      return;
    }
    dispatch(setSortBy(value));
  };

  const handleSortOrderChange = (value: TSortOrder | 'none') => {
    if (value.length === 0) {
      dispatch(setSortOrder(undefined));
      return;
    }

    if (value === 'none') {
      dispatch(setSortOrder(undefined));
      return;
    }
    dispatch(setSortOrder(value));
  };

  const handleUpdate: PaginationProps['onUpdate'] = (page) => {
    dispatch(setPage(page));
  };
  const isEmpty = list && list.ads.length === 0;

  return (
    <section>
      <Text
        variant={'body-3'}
        style={{
          fontWeight: '600',
          display: 'block',
          marginBottom: '10px',
        }}
      >
        Найдено:{' '}
        <b style={{ color: 'var(--g-color-text-hint)', fontWeight: '800' }}>
          {list?.pagination.totalItems}
        </b>
      </Text>
      <Button view={'flat'} selected={viewItem === 'row'} onClick={() => setViewItem('row')}>
        <Icon data={LayoutRows} />
      </Button>
      <Button view={'flat'} selected={viewItem === 'card'} onClick={() => setViewItem('card')}>
        <Icon data={LayoutCellsLarge} />
      </Button>
      <Select
        renderControl={({ triggerProps: { onClick, onKeyDown } }, { value }) => {
          return (
            <Button view={'flat'} onClick={onClick} extraProps={{ onKeyDown }}>
              <Icon data={BarsAscendingAlignLeft} size={14} />
              {getLabel(sortOptions, value?.join('') ?? '')}
            </Button>
          );
        }}
        options={sortOptions}
        onUpdate={(val) => {
          if (isSortBy(val[0])) {
            handleSortByChange(val[0]);
          }
        }}
        value={[String(filter.sortBy ?? '-')]}
      />
      <Select
        renderControl={({ triggerProps: { onClick, onKeyDown } }, { value }) => {
          return (
            <Button view={'flat'} onClick={onClick} extraProps={{ onKeyDown }}>
              <Icon data={ArrowUpArrowDown} size={14} />
              {getLabel(sortOrderOptions, value?.join('') ?? '')}
            </Button>
          );
        }}
        options={sortOrderOptions}
        onUpdate={(val) => {
          if (isSortOrder(val[0])) {
            handleSortOrderChange(val[0]);
          }
        }}
        value={[String(filter.sortOrder ?? '-')]}
      />
      <Pagination
        page={filter.page ?? 1}
        pageSize={filter.limit ?? 10}
        total={list?.pagination.totalItems}
        onUpdate={handleUpdate}
      />
      <div style={{ padding: '20px' }}>
        {isEmpty && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <Lottie animationData={notFound} style={{ width: 200, height: 200 }} />
            <Text variant={'header-1'} color={'hint'}>
              Ничего не найдено
            </Text>
          </div>
        )}

        {!isEmpty && (
          <div
            style={
              viewItem === 'card'
                ? {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: '16px',
                    alignItems: 'stretch',
                  }
                : {}
            }
          >
            {' '}
            {list?.ads.map((item) => (
              <AdItem key={item.id} {...item} view={viewItem} />
            ))}
          </div>
        )}
      </div>
      <Pagination
        page={filter.page ?? 1}
        pageSize={filter.limit ?? 10}
        total={list?.pagination.totalItems}
        onUpdate={handleUpdate}
      />
    </section>
  );
}

export default ResultSection;
