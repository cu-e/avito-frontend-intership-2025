import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IGetAdsParams, TAdsSortBy, TAdStatus, TSortOrder } from '../../api/ads/ads.types.ts';

export const initialGetAdsParams: IGetAdsParams = {
  page: 1,
  limit: 10,

  status: [],

  categoryId: undefined,

  minPrice: undefined,
  maxPrice: undefined,

  search: '',

  sortBy: undefined,
  sortOrder: undefined,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialGetAdsParams,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    setMinPrice(state, action: PayloadAction<number | undefined>) {
      state.minPrice = action.payload;
    },
    setMaxPrice(state, action: PayloadAction<number | undefined>) {
      state.maxPrice = action.payload;
    },
    setStatus(state, action: PayloadAction<TAdStatus[] | undefined>) {
      state.status = action.payload;
    },
    setCategoryID(state, action: PayloadAction<number | undefined>) {
      state.categoryId = action.payload;
    },
    setSearch(state, action: PayloadAction<string | undefined>) {
      state.search = action.payload;
    },
    setSortBy(state, action: PayloadAction<TAdsSortBy | undefined>) {
      state.sortBy = action.payload;
    },
    setSortOrder(state, action: PayloadAction<TSortOrder | undefined>) {
      state.sortOrder = action.payload;
    },
    resetFilters() {
      return initialGetAdsParams;
    },
  },
});

export const {
  setPage,
  setLimit,
  setMinPrice,
  setMaxPrice,
  setStatus,
  setCategoryID,
  setSearch,
  setSortBy,
  setSortOrder,
  resetFilters,
} = filterSlice.actions;
