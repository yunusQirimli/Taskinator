import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ApplicationUser from './application-user';
import Team from './team';
import ProjectState from './project-state';
import ProjectNote from './project-note';
import Project from './project';
import Board from './board';
import BoardColumn from './board-column';
import Task from './task';
import Comment from './comment';
import CommentLike from './comment-like';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}application-user`} component={ApplicationUser} />
      <ErrorBoundaryRoute path={`${match.url}team`} component={Team} />
      <ErrorBoundaryRoute path={`${match.url}project-state`} component={ProjectState} />
      <ErrorBoundaryRoute path={`${match.url}project-note`} component={ProjectNote} />
      <ErrorBoundaryRoute path={`${match.url}project`} component={Project} />
      <ErrorBoundaryRoute path={`${match.url}board`} component={Board} />
      <ErrorBoundaryRoute path={`${match.url}board-column`} component={BoardColumn} />
      <ErrorBoundaryRoute path={`${match.url}task`} component={Task} />
      <ErrorBoundaryRoute path={`${match.url}comment`} component={Comment} />
      <ErrorBoundaryRoute path={`${match.url}comment-like`} component={CommentLike} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
