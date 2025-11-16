export interface IAdsResponse {
  ads: IAd[];
  pagination: IPagination;
}

export interface IAdCommentResponse {
  message: string;
  ad: IAd;
}

export interface IAd {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  categoryId: number;

  status: TAdStatus;
  priority: TAdPriority;

  createdAt: string;
  updatedAt: string;

  images: string[];
  seller: ISeller;

  characteristics: Record<string, string>;
  moderationHistory: IModerationRecord[];
}

export type TAdStatus = 'pending' | 'approved' | 'rejected' | 'draft';

export type TAdPriority = 'normal' | 'urgent';

export interface ISeller {
  id: number;
  name: string;
  rating: string;
  totalAds: number;
  registeredAt: string;
}

export interface IModerationRecord {
  id: number;
  moderatorId: number;
  moderatorName: string;
  action: TModerationAction;

  reason: string;
  comment: string;

  timestamp: string;
}

export type TModerationAction = 'approved' | 'rejected' | 'requestChanges';

export interface IPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface IComment {
  reason: string;
  comment: string;
}

export type TAdsSortBy = 'createdAt' | 'price' | 'priority';

export type TSortOrder = 'asc' | 'desc';

export interface IGetAdsParams {
  page?: number;
  limit?: number;

  status?: TAdStatus[];

  categoryId?: number;

  minPrice?: number;
  maxPrice?: number;

  search?: string;

  sortBy?: TAdsSortBy;
  sortOrder?: TSortOrder;
}
