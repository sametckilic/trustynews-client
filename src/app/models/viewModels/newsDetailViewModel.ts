import { VoteType } from '../enums';

export interface NewsDetailsViewModel {
  id: string;
  subject: string;
  content: string;
  createdDate: Date;
  createdByUserName: string;
  newsCoverPhotoBase: string;
  isBookmarked: boolean;
  bookmarkedCount: number;
  voteType: VoteType;
}
