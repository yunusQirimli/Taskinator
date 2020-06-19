import { IComment } from 'app/shared/model/comment.model';
import { IApplicationUser } from 'app/shared/model/application-user.model';
import { IUser } from 'app/shared/model/user.model';

export interface ICommentLike {
  id?: number;
  comment?: IComment;
  applicationUser?: IApplicationUser;
  user?: IUser;
}

export const defaultValue: Readonly<ICommentLike> = {};
