import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CommentLike from './comment-like';
import CommentLikeDetail from './comment-like-detail';
import CommentLikeUpdate from './comment-like-update';
import CommentLikeDeleteDialog from './comment-like-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CommentLikeDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CommentLikeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CommentLikeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CommentLikeDetail} />
      <ErrorBoundaryRoute path={match.url} component={CommentLike} />
    </Switch>
  </>
);

export default Routes;
