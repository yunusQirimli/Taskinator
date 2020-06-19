import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getTasks } from 'app/entities/task/task.reducer';
import { IBoardColumn } from 'app/shared/model/board-column.model';
import { getEntities as getBoardColumns } from 'app/entities/board-column/board-column.reducer';
import { IApplicationUser } from 'app/shared/model/application-user.model';
import { getEntities as getApplicationUsers } from 'app/entities/application-user/application-user.reducer';
import { getEntity, updateEntity, createEntity, reset } from './task.reducer';
import { ITask } from 'app/shared/model/task.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITaskUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TaskUpdate = (props: ITaskUpdateProps) => {
  const [subTasksId, setSubTasksId] = useState('0');
  const [parentTaskId, setParentTaskId] = useState('0');
  const [boardColumnId, setBoardColumnId] = useState('0');
  const [applicationUserId, setApplicationUserId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { taskEntity, tasks, boardColumns, applicationUsers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/task');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTasks();
    props.getBoardColumns();
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
        ...taskEntity,
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
          <h2 id="taskinatorApp.task.home.createOrEditLabel">
            <Translate contentKey="taskinatorApp.task.home.createOrEditLabel">Create or edit a Task</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : taskEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="task-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="task-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="task-name">
                  <Translate contentKey="taskinatorApp.task.name">Name</Translate>
                </Label>
                <AvField id="task-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="task-description">
                  <Translate contentKey="taskinatorApp.task.description">Description</Translate>
                </Label>
                <AvField id="task-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="colorLabel" for="task-color">
                  <Translate contentKey="taskinatorApp.task.color">Color</Translate>
                </Label>
                <AvInput id="task-color" type="select" className="form-control" name="color" value={(!isNew && taskEntity.color) || 'RED'}>
                  <option value="RED">{translate('taskinatorApp.Color.RED')}</option>
                  <option value="GREEN">{translate('taskinatorApp.Color.GREEN')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="createDateLabel" for="task-createDate">
                  <Translate contentKey="taskinatorApp.task.createDate">Create Date</Translate>
                </Label>
                <AvField id="task-createDate" type="date" className="form-control" name="createDate" />
              </AvGroup>
              <AvGroup>
                <Label id="modificationDateLabel" for="task-modificationDate">
                  <Translate contentKey="taskinatorApp.task.modificationDate">Modification Date</Translate>
                </Label>
                <AvField id="task-modificationDate" type="date" className="form-control" name="modificationDate" />
              </AvGroup>
              <AvGroup>
                <Label id="dueDateLabel" for="task-dueDate">
                  <Translate contentKey="taskinatorApp.task.dueDate">Due Date</Translate>
                </Label>
                <AvField id="task-dueDate" type="date" className="form-control" name="dueDate" />
              </AvGroup>
              <AvGroup>
                <Label id="startDateLabel" for="task-startDate">
                  <Translate contentKey="taskinatorApp.task.startDate">Start Date</Translate>
                </Label>
                <AvField id="task-startDate" type="date" className="form-control" name="startDate" />
              </AvGroup>
              <AvGroup>
                <Label id="completeDateLabel" for="task-completeDate">
                  <Translate contentKey="taskinatorApp.task.completeDate">Complete Date</Translate>
                </Label>
                <AvField id="task-completeDate" type="date" className="form-control" name="completeDate" />
              </AvGroup>
              <AvGroup>
                <Label for="task-parentTask">
                  <Translate contentKey="taskinatorApp.task.parentTask">Parent Task</Translate>
                </Label>
                <AvInput id="task-parentTask" type="select" className="form-control" name="parentTask.id">
                  <option value="" key="0" />
                  {tasks
                    ? tasks.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="task-boardColumn">
                  <Translate contentKey="taskinatorApp.task.boardColumn">Board Column</Translate>
                </Label>
                <AvInput id="task-boardColumn" type="select" className="form-control" name="boardColumn.id">
                  <option value="" key="0" />
                  {boardColumns
                    ? boardColumns.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="task-applicationUser">
                  <Translate contentKey="taskinatorApp.task.applicationUser">Application User</Translate>
                </Label>
                <AvInput id="task-applicationUser" type="select" className="form-control" name="applicationUser.id">
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
              <Button tag={Link} id="cancel-save" to="/task" replace color="info">
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
  tasks: storeState.task.entities,
  boardColumns: storeState.boardColumn.entities,
  applicationUsers: storeState.applicationUser.entities,
  taskEntity: storeState.task.entity,
  loading: storeState.task.loading,
  updating: storeState.task.updating,
  updateSuccess: storeState.task.updateSuccess
});

const mapDispatchToProps = {
  getTasks,
  getBoardColumns,
  getApplicationUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TaskUpdate);
