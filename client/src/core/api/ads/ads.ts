import { HttpClient } from '../HttpClient.ts';
import type { GetAdsParams, IAd, IAdCommentResponse, IAdsResponse, IComment } from './ads.types.ts';

export const AdsAPI = (http: HttpClient) => ({
  getAll: (params: GetAdsParams) => http.get<IAdsResponse>(`/ads${HttpClient.buildQuery(params)}`),
  getByID: (id: number) => http.get<IAd>(`/ads/${id}`),
  approve: (id: number, body: IComment) =>
    http.post<IAdCommentResponse>(`/ads/${id}/approve`, body),
  reject: (id: number, body: IComment) => http.post<IAdCommentResponse>(`/ads/${id}/reject`, body),
  requestChanges: (id: number, body: IComment) =>
    http.post<IAdCommentResponse>(`/ads/${id}/request-changes`, body),
});
