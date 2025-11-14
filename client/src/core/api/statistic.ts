import type { HttpClient } from './HttpClient.ts';

export const statsAPI = (http: HttpClient) => ({
  getSummary: () => http.get('/stats/summary'),
  getChartActivity: () => http.get('/stats/chart/activity'),
  getChartDecisions: () => http.get('/stats/chart/decisions'),
  getChartCategories: () => http.get('/stats/chart/categories'),
});
