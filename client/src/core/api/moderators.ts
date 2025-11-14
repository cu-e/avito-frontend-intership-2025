import type { HttpClient } from './HttpClient.ts';

export const ModeratorsAPI = (http: HttpClient) => ({
  getMe: () => http.get(`/moderators/me`),
});
