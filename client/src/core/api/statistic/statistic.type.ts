export type TStatsPeriod = 'today' | 'week' | 'month' | 'custom';

export interface IGetStatsParams {
  period?: TStatsPeriod;
  startDate?: string;
  endDate?: string;
}

export interface IStatsSummary {
  totalReviewed: number;
  totalReviewedToday: number;
  totalReviewedThisWeek: number;
  totalReviewedThisMonth: number;
  approvedPercentage: number;
  rejectedPercentage: number;
  requestChangesPercentage: number;
  averageReviewTime: number;
}

export interface IActivityData {
  date: string;
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface IDecisionsData {
  approved: number;
  rejected: number;
  requestChanges: number;
}
export type TCategoriesDistribution = Record<string, number>;
