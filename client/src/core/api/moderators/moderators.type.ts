export interface IModerator {
  id: number;
  name: string;
  email: string;
  role: string;
  statistics: IModeratorStats;
  permissions: string[];
}

export interface IModeratorStats {
  totalReviewed: number;
  todayReviewed: number;
  thisWeekReviewed: number;
  thisMonthReviewed: number;
  averageReviewTime: number;
  approvalRate: number;
}
