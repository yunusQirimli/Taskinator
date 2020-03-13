import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProjectState } from 'app/shared/model/project-state.model';
import { getEntities as getProjectStates } from 'app/entities/project-state/project-state.reducer';
import { IApplicationUser } from 'app/shared/model/application-user.model';
import { getEntities as getApplicationUsers } from 'app/entities/application-user/application-user.reducer';
import { getEntity, updateEntity, createEntity, reset } from './project.reducer';
import { IProject } from 'app/shared/model/project.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProjectUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProjectUpdate = (props: IProjectUpdateProps) => {
  const [projectStateId, setProjectStateId] = useState('0');
  const [applicationUsersId, setApplicationUsersId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { projectEntity, projectStates, applicationUsers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/project');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getProjectStates();
    props.getApplicationUsers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...projectEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="taskinatorApp.project.home.createOrEditLabel">
            <Translate contentKey="taskinatorApp.project.home.createOrEditLabel">Create or edit a Project</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : projectEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="project-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="project-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="project-name">
                  <Translate contentKey="taskinatorApp.project.name">Name</Translate>
                </Label>
                <AvField id="project-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="colorLabel" for="project-color">
                  <Translate contentKey="taskinatorApp.project.color">Color</Translate>
                </Label>
                <AvInput
                  id="project-color"
                  type="select"
                  className="form-control"
                  name="color"
                  value={(!isNew && projectEntity.color) || 'RED'}
                >
                  <option value="RED">{translate('taskinatorApp.Color.RED')}</option>
                  <option value="GREEN">{translate('taskinatorApp.Color.GREEN')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="createDateLabel" for="project-createDate">
                  <Translate contentKey="taskinatorApp.project.createDate">Create Date</Translate>
                </Label>
                <AvField id="project-createDate" type="date" className="form-control" name="createDate" />
              </AvGroup>
              <AvGroup>
                <Label id="modificationDateLabel" for="project-modificationDate">
                  <Translate contentKey="taskinatorApp.project.modificationDate">Modification Date</Translate>
                </Label>
                <AvField id="project-modificationDate" type="date" className="form-control" name="modificationDate" />
              </AvGroup>
              <AvGroup>
                <Label id="closeDateLabel" for="project-closeDate">
                  <Translate contentKey="taskinatorApp.project.closeDate">Close Date</Translate>
                </Label>
                <AvField id="project-closeDate" type="date" className="form-control" name="closeDate" />
              </AvGroup>
              <AvGroup>
                <Label for="project-projectState">
                  <Translate contentKey="taskinatorApp.project.projectState">Project State</Translate>
                </Label>
                <AvInput id="project-projectState" type="select" className="form-control" name="projectState.id">
                  <option value="" key="0" />
                  {projectStates
                    ? projectStates.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/project" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  projectStates: storeState.projectState.entities,
  applicationUsers: storeState.applicationUser.entities,
  projectEntity: storeState.project.entity,
  loading: storeState.project.loading,
  updating: storeState.project.updating,
  updateSuccess: storeState.project.updateSuccess
});

const mapDispatchToProps = {
  getProjectStates,
  getApplicationUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUpdate);
