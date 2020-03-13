import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './comment.reducer';
import { IComment } from 'app/shared/model/comment.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Comment = (props: ICommentProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { commentList, match, loading } = props;
  return (
    <div>
      <h2 id="comment-heading">
        <Translate contentKey="taskinatorApp.comment.home.title">Comments</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="taskinatorApp.comment.home.createLabel">Create new Comment</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {commentList && commentList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="taskinatorApp.comment.content">Content</Translate>
                </th>
                <th>
                  <Translate contentKey="taskinatorApp.comment.createDate">Create Date</Translate>
                </th>
                <th>
                  <Translate contentKey="taskinatorApp.comment.applicationUser">Application User</Translate>
                </th>
                <th>
                  <Translate contentKey="taskinatorApp.comment.task">Task</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {commentList.map((comment, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${comment.id}`} color="link" size="sm">
                      {comment.id}
                    </Button>
                  </td>
                  <td>{comment.content}</td>
                  <td>
                    <TextFormat type="date" value={comment.createDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    {comment.applicationUser ? (
                      <Link to={`application-user/${comment.applicationUser.id}`}>{comment.applicationUser.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{comment.task ? <Link to={`task/${comment.task.id}`}>{comment.task.name}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${comment.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${comment.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${comment.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="taskinatorApp.comment.home.notFound">No Comments found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ comment }: IRootState) => ({
  commentList: comment.entities,
  loading: comment.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
