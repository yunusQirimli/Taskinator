import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import applicationUser, {
  ApplicationUserState
} from 'app/entities/application-user/application-user.reducer';
// prettier-ignore
import team, {
  TeamState
} from 'app/entities/team/team.reducer';
// prettier-ignore
import projectState, {
  ProjectStateState
} from 'app/entities/project-state/project-state.reducer';
// prettier-ignore
import projectNote, {
  ProjectNoteState
} from 'app/entities/project-note/project-note.reducer';
// prettier-ignore
import project, {
  ProjectState
} from 'app/entities/project/project.reducer';
// prettier-ignore
import board, {
  BoardState
} from 'app/entities/board/board.reducer';
// prettier-ignore
import boardColumn, {
  BoardColumnState
} from 'app/entities/board-column/board-column.reducer';
// prettier-ignore
import task, {
  TaskState
} from 'app/entities/task/task.reducer';
// prettier-ignore
import comment, {
  CommentState
} from 'app/entities/comment/comment.reducer';
// prettier-ignore
import commentLike, {
  CommentLikeState
} from 'app/entities/comment-like/comment-like.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly applicationUser: ApplicationUserState;
  readonly team: TeamState;
  readonly projectState: ProjectStateState;
  readonly projectNote: ProjectNoteState;
  readonly project: ProjectState;
  readonly board: BoardState;
  readonly boardColumn: BoardColumnState;
  readonly task: TaskState;
  readonly comment: CommentState;
  readonly commentLike: CommentLikeState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  applicationUser,
  team,
  projectState,
  projectNote,
  project,
  board,
  boardColumn,
  task,
  comment,
  commentLike,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
