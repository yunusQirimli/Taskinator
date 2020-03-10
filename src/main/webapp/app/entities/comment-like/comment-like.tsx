import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './comment-like.reducer';
import { ICommentLike } from 'app/shared/model/comment-like.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommentLikeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const CommentLike = (props: ICommentLikeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { commentLikeList, match, loading } = props;
  return (
    <div>
      <h2 id="comment-like-heading">
        <Translate contentKey="taskinatorApp.commentLike.home.title">Comment Likes</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="taskinatorApp.commentLike.home.createLabel">Create new Comment Like</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {commentLikeList && commentLikeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="taskinatorApp.commentLike.comment">Comment</Translate>
                </th>
                <th>
                  <Translate contentKey="taskinatorApp.commentLike.applicationUser">Application User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {commentLikeList.map((commentLike, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${commentLike.id}`} color="link" size="sm">
                      {commentLike.id}
                    </Button>
                  </td>
                  <td>{commentLike.comment ? <Link to={`comment/${commentLike.comment.id}`}>{commentLike.comment.id}</Link> : ''}</td>
                  <td>
                    {commentLike.applicationUser ? (
                      <Link to={`application-user/${commentLike.applicationUser.id}`}>{commentLike.applicationUser.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${commentLike.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${commentLike.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${commentLike.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="taskinatorApp.commentLike.home.notFound">No Comment Likes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ commentLike }: IRootState) => ({
  commentLikeList: commentLike.entities,
  loading: commentLike.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CommentLike);
