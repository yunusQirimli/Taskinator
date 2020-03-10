import { IProject } from 'app/shared/model/project.model';

export interface IProjectNote {
  id?: number;
  content?: string;
  project?: IProject;
}

export const defaultValue: Readonly<IProjectNote> = {};
