import { HttpClient } from '../HttpClient.ts';
import type {
  IAd,
  IAdCommentResponse,
  IAdsResponse,
  IComment,
  IGetAdsParams,
} from './ads.types.ts';

export const AdsAPI = (http: HttpClient) => ({
  getAll: (params?: IGetAdsParams) =>
    http.get<IAdsResponse>(`/ads${HttpClient.buildQuery(params)}`),
  getByID: (id: number) => http.get<IAd>(`/ads/${id}`),
  approve: (id: number, body: IComment) =>
    http.post<IAdCommentResponse>(`/ads/${id}/approve`, body),
  reject: (id: number, body: IComment) => http.post<IAdCommentResponse>(`/ads/${id}/reject`, body),
  requestChanges: (id: number, body: IComment) =>
    http.post<IAdCommentResponse>(`/ads/${id}/request-changes`, body),
});
