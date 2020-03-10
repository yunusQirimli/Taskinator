import { IApplicationUser } from 'app/shared/model/application-user.model';

export interface ITeam {
  id?: number;
  name?: string;
  applicationUsers?: IApplicationUser[];
}

export const defaultValue: Readonly<ITeam> = {};
