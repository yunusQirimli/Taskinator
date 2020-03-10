import { Moment } from 'moment';
import { IBoardColumn } from 'app/shared/model/board-column.model';
import { IApplicationUser } from 'app/shared/model/application-user.model';
import { Color } from 'app/shared/model/enumerations/color.model';

export interface ITask {
  id?: number;
  name?: string;
  description?: string;
  color?: Color;
  createDate?: Moment;
  modificationDate?: Moment;
  dueDate?: Moment;
  startDate?: Moment;
  completeDate?: Moment;
  subTasks?: ITask[];
  parentTask?: ITask;
  boardColumn?: IBoardColumn;
  applicationUser?: IApplicationUser;
}

export const defaultValue: Readonly<ITask> = {};
