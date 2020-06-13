import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './team.reducer';
import { ITeam } from 'app/shared/model/team.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITeamProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Team = (props: ITeamProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { teamList, match, loading } = props;
  return (
    <div>
      <h2 id="team-heading">
        <Translate contentKey="taskinatorApp.team.home.title">Teams</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="taskinatorApp.team.home.createLabel">Create new Team</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {teamList && teamList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="taskinatorApp.team.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="taskinatorApp.team.project">Project</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {teamList.map((team, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${team.id}`} color="link" size="sm">
                      {team.id}
                    </Button>
                  </td>
                  <td>{team.name}</td>
                  <td>{team.project ? <Link to={`project/${team.project.id}`}>{team.project.name}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${team.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${team.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${team.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="taskinatorApp.team.home.notFound">No Teams found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ team }: IRootState) => ({
  teamList: team.entities,
  loading: team.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Team);
