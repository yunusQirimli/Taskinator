import { IBoardColumn } from 'app/shared/model/board-column.model';
import { IApplicationUser } from 'app/shared/model/application-user.model';
import { IProject } from 'app/shared/model/project.model';

export interface IBoard {
  id?: number;
  name?: string;
  boardColumns?: IBoardColumn[];
  applicationUser?: IApplicationUser;
  project?: IProject;
}

export const defaultValue: Readonly<IBoard> = {};
