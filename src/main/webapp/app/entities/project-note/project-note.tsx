import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './project-note.reducer';
import { IProjectNote } from 'app/shared/model/project-note.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProjectNoteProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ProjectNote = (props: IProjectNoteProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { projectNoteList, match, loading } = props;
  return (
    <div>
      <h2 id="project-note-heading">
        <Translate contentKey="taskinatorApp.projectNote.home.title">Project Notes</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="taskinatorApp.projectNote.home.createLabel">Create new Project Note</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {projectNoteList && projectNoteList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="taskinatorApp.projectNote.content">Content</Translate>
                </th>
                <th>
                  <Translate contentKey="taskinatorApp.projectNote.project">Project</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {projectNoteList.map((projectNote, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${projectNote.id}`} color="link" size="sm">
                      {projectNote.id}
                    </Button>
                  </td>
                  <td>{projectNote.content}</td>
                  <td>{projectNote.project ? <Link to={`project/${projectNote.project.id}`}>{projectNote.project.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${projectNote.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${projectNote.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${projectNote.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="taskinatorApp.projectNote.home.notFound">No Project Notes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ projectNote }: IRootState) => ({
  projectNoteList: projectNote.entities,
  loading: projectNote.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProjectNote);
