import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BoardColumn from './board-column';
import BoardColumnDetail from './board-column-detail';
import BoardColumnUpdate from './board-column-update';
import BoardColumnDeleteDialog from './board-column-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BoardColumnDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BoardColumnUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BoardColumnUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BoardColumnDetail} />
      <ErrorBoundaryRoute path={match.url} component={BoardColumn} />
    </Switch>
  </>
);

export default Routes;
