import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './board.reducer';
import { IBoard } from 'app/shared/model/board.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBoardProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Board = (props: IBoardProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { boardList, match, loading } = props;
  return (
    <div>
      <h2 id="board-heading">
        <Translate contentKey="taskinatorApp.board.home.title">Boards</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="taskinatorApp.board.home.createLabel">Create new Board</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {boardList && boardList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="taskinatorApp.board.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="taskinatorApp.board.applicationUser">Application User</Translate>
                </th>
                <th>
                  <Translate contentKey="taskinatorApp.board.project">Project</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {boardList.map((board, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${board.id}`} color="link" size="sm">
                      {board.id}
                    </Button>
                  </td>
                  <td>{board.name}</td>
                  <td>
                    {board.applicationUser ? (
                      <Link to={`application-user/${board.applicationUser.id}`}>{board.applicationUser.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{board.project ? <Link to={`project/${board.project.id}`}>{board.project.name}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${board.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${board.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${board.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="taskinatorApp.board.home.notFound">No Boards found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ board }: IRootState) => ({
  boardList: board.entities,
  loading: board.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Board);
