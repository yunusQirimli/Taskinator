import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProjectNote from './project-note';
import ProjectNoteDetail from './project-note-detail';
import ProjectNoteUpdate from './project-note-update';
import ProjectNoteDeleteDialog from './project-note-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProjectNoteDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProjectNoteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProjectNoteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProjectNoteDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProjectNote} />
    </Switch>
  </>
);

export default Routes;
