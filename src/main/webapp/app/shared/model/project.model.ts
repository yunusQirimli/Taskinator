import { Moment } from 'moment';
import { IBoard } from 'app/shared/model/board.model';
import { IProjectNote } from 'app/shared/model/project-note.model';
import { ITeam } from 'app/shared/model/team.model';
import { IProjectState } from 'app/shared/model/project-state.model';
import { IApplicationUser } from 'app/shared/model/application-user.model';
import { Color } from 'app/shared/model/enumerations/color.model';

export interface IProject {
  id?: number;
  name?: string;
  color?: Color;
  createDate?: Moment;
  modificationDate?: Moment;
  closeDate?: Moment;
  boards?: IBoard[];
  notes?: IProjectNote[];
  teams?: ITeam[];
  projectState?: IProjectState;
  applicationUsers?: IApplicationUser[];
}

export const defaultValue: Readonly<IProject> = {};
