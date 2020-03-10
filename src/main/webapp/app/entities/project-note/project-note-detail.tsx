import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './project-note.reducer';
import { IProjectNote } from 'app/shared/model/project-note.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProjectNoteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProjectNoteDetail = (props: IProjectNoteDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { projectNoteEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="taskinatorApp.projectNote.detail.title">ProjectNote</Translate> [<b>{projectNoteEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="content">
              <Translate contentKey="taskinatorApp.projectNote.content">Content</Translate>
            </span>
          </dt>
          <dd>{projectNoteEntity.content}</dd>
          <dt>
            <Translate contentKey="taskinatorApp.projectNote.project">Project</Translate>
          </dt>
          <dd>{projectNoteEntity.project ? projectNoteEntity.project.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/project-note" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/project-note/${projectNoteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ projectNote }: IRootState) => ({
  projectNoteEntity: projectNote.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProjectNoteDetail);
