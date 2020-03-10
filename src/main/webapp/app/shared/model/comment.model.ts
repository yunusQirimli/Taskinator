import { Moment } from 'moment';
import { ICommentLike } from 'app/shared/model/comment-like.model';
import { ITask } from 'app/shared/model/task.model';
import { IApplicationUser } from 'app/shared/model/application-user.model';

export interface IComment {
  id?: number;
  content?: string;
  createDate?: Moment;
  likes?: ICommentLike[];
  task?: ITask;
  applicationUser?: IApplicationUser;
}

export const defaultValue: Readonly<IComment> = {};
