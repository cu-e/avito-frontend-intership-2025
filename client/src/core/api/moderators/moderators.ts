import type { HttpClient } from '../HttpClient.ts';
import type { IModerator } from './moderators.type.ts';

export const ModeratorsAPI = (http: HttpClient) => ({
  getMe: () => http.get<IModerator>(`/moderators/me`),
});
