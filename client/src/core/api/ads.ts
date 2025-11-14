import type { HttpClient } from './HttpClient.ts';

type TComment = {
  reason: string;
  comment: string;
};

export const AdsAPI = (http: HttpClient) => ({
  getAll: () => http.get('/ads'),
  getByID: (id: number) => http.get(`/ads/${id}`),
  approve: (id: number, body: TComment) => http.post(`/ads/${id}/approve`, body),
  reject: (id: number, body: TComment) => http.post(`/ads/${id}/reject`, body),
  requestChanges: (id: number, body: TComment) => http.post(`/ads/${id}/request-changes`, body),
});
