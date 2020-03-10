import { IComment } from 'app/shared/model/comment.model';
import { IApplicationUser } from 'app/shared/model/application-user.model';

export interface ICommentLike {
  id?: number;
  comment?: IComment;
  applicationUser?: IApplicationUser;
}

export const defaultValue: Readonly<ICommentLike> = {};
