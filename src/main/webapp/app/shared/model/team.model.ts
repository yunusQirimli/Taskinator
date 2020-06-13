import { IProject } from 'app/shared/model/project.model';
import { IApplicationUser } from 'app/shared/model/application-user.model';

export interface ITeam {
  id?: number;
  name?: string;
  project?: IProject;
  applicationUsers?: IApplicationUser[];
}

export const defaultValue: Readonly<ITeam> = {};
