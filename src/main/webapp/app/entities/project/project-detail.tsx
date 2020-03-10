import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './project.reducer';
import { IProject } from 'app/shared/model/project.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProjectDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProjectDetail = (props: IProjectDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { projectEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="taskinatorApp.project.detail.title">Project</Translate> [<b>{projectEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="taskinatorApp.project.name">Name</Translate>
            </span>
          </dt>
          <dd>{projectEntity.name}</dd>
          <dt>
            <span id="color">
              <Translate contentKey="taskinatorApp.project.color">Color</Translate>
            </span>
          </dt>
          <dd>{projectEntity.color}</dd>
          <dt>
            <span id="createDate">
              <Translate contentKey="taskinatorApp.project.createDate">Create Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={projectEntity.createDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modificationDate">
              <Translate contentKey="taskinatorApp.project.modificationDate">Modification Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={projectEntity.modificationDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="closeDate">
              <Translate contentKey="taskinatorApp.project.closeDate">Close Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={projectEntity.closeDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="taskinatorApp.project.projectState">Project State</Translate>
          </dt>
          <dd>{projectEntity.projectState ? projectEntity.projectState.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/project" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/project/${projectEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ project }: IRootState) => ({
  projectEntity: project.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
