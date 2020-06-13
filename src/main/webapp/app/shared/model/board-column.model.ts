import { ITask } from 'app/shared/model/task.model';
import { IBoard } from 'app/shared/model/board.model';

export interface IBoardColumn {
  id?: number;
  name?: string;
  index?: number;
  tasks?: ITask[];
  board?: IBoard;
}

export const defaultValue: Readonly<IBoardColumn> = {};
