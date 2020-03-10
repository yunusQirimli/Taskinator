import { IUser } from 'app/shared/model/user.model';
import { IBoard } from 'app/shared/model/board.model';
import { ITask } from 'app/shared/model/task.model';
import { ICommentLike } from 'app/shared/model/comment-like.model';
import { ITeam } from 'app/shared/model/team.model';
import { IProject } from 'app/shared/model/project.model';

export interface IApplicationUser {
  id?: number;
  user?: IUser;
  boards?: IBoard[];
  tasks?: ITask[];
  commentLikes?: ICommentLike[];
  teams?: ITeam[];
  projects?: IProject[];
}

export const defaultValue: Readonly<IApplicationUser> = {};
