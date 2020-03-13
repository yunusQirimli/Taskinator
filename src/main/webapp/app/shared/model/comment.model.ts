import { Moment } from 'moment';
import { ICommentLike } from 'app/shared/model/comment-like.model';
import { IApplicationUser } from 'app/shared/model/application-user.model';
import { ITask } from 'app/shared/model/task.model';

export interface IComment {
  id?: number;
  content?: string;
  createDate?: Moment;
  likes?: ICommentLike[];
  applicationUser?: IApplicationUser;
  task?: ITask;
}

export const defaultValue: Readonly<IComment> = {};
