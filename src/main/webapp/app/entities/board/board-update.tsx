import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IApplicationUser } from 'app/shared/model/application-user.model';
import { getEntities as getApplicationUsers } from 'app/entities/application-user/application-user.reducer';
import { IProject } from 'app/shared/model/project.model';
import { getEntities as getProjects } from 'app/entities/project/project.reducer';
import { getEntity, updateEntity, createEntity, reset } from './board.reducer';
import { IBoard } from 'app/shared/model/board.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBoardUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BoardUpdate = (props: IBoardUpdateProps) => {
  const [applicationUserId, setApplicationUserId] = useState('0');
  const [projectId, setProjectId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { boardEntity, applicationUsers, projects, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/board');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getApplicationUsers();
    props.getProjects();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...boardEntity,
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
          <h2 id="taskinatorApp.board.home.createOrEditLabel">
            <Translate contentKey="taskinatorApp.board.home.createOrEditLabel">Create or edit a Board</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : boardEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="board-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="board-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="board-name">
                  <Translate contentKey="taskinatorApp.board.name">Name</Translate>
                </Label>
                <AvField id="board-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label for="board-applicationUser">
                  <Translate contentKey="taskinatorApp.board.applicationUser">Application User</Translate>
                </Label>
                <AvInput id="board-applicationUser" type="select" className="form-control" name="applicationUser.id">
                  <option value="" key="0" />
                  {applicationUsers
                    ? applicationUsers.map(otherEntity => (otherEntity.user ?
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.user.firstName} {otherEntity.user.lastName}
                        </option> : ''
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="board-project">
                  <Translate contentKey="taskinatorApp.board.project">Project</Translate>
                </Label>
                <AvInput id="board-project" type="select" className="form-control" name="project.id">
                  <option value="" key="0" />
                  {projects
                    ? projects.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/board" replace color="info">
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
  applicationUsers: storeState.applicationUser.entities,
  projects: storeState.project.entities,
  boardEntity: storeState.board.entity,
  loading: storeState.board.loading,
  updating: storeState.board.updating,
  updateSuccess: storeState.board.updateSuccess
});

const mapDispatchToProps = {
  getApplicationUsers,
  getProjects,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BoardUpdate);
