import { HttpClient } from '../HttpClient.ts';
import type {
  IActivityData,
  IDecisionsData,
  IGetStatsParams,
  IStatsSummary,
  TCategoriesDistribution,
} from './statistic.type.ts';

export const statsAPI = (http: HttpClient) => ({
  getSummary: (params: IGetStatsParams) =>
    http.get<IStatsSummary>(`/stats/summary${HttpClient.buildQuery(params)}`),
  getChartActivity: (params: IGetStatsParams) =>
    http.get<IActivityData>(`/stats/chart/activity${HttpClient.buildQuery(params)}`),
  getChartDecisions: (params: IGetStatsParams) =>
    http.get<IDecisionsData>(`/stats/chart/decisions${HttpClient.buildQuery(params)}`),
  getChartCategories: (params: IGetStatsParams) =>
    http.get<TCategoriesDistribution>(`/stats/chart/categories${HttpClient.buildQuery(params)}`),
});
