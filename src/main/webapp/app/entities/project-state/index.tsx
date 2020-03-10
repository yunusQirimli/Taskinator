import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProjectState from './project-state';
import ProjectStateDetail from './project-state-detail';
import ProjectStateUpdate from './project-state-update';
import ProjectStateDeleteDialog from './project-state-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProjectStateDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProjectStateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProjectStateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProjectStateDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProjectState} />
    </Switch>
  </>
);

export default Routes;
