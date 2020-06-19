import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './task.reducer';
import { ITask } from 'app/shared/model/task.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITaskDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TaskDetail = (props: ITaskDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { taskEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="taskinatorApp.task.detail.title">Task</Translate> [<b>{taskEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="taskinatorApp.task.name">Name</Translate>
            </span>
          </dt>
          <dd>{taskEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="taskinatorApp.task.description">Description</Translate>
            </span>
          </dt>
          <dd>{taskEntity.description}</dd>
          <dt>
            <span id="color">
              <Translate contentKey="taskinatorApp.task.color">Color</Translate>
            </span>
          </dt>
          <dd>{taskEntity.color}</dd>
          <dt>
            <span id="createDate">
              <Translate contentKey="taskinatorApp.task.createDate">Create Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={taskEntity.createDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modificationDate">
              <Translate contentKey="taskinatorApp.task.modificationDate">Modification Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={taskEntity.modificationDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dueDate">
              <Translate contentKey="taskinatorApp.task.dueDate">Due Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={taskEntity.dueDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="taskinatorApp.task.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={taskEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="completeDate">
              <Translate contentKey="taskinatorApp.task.completeDate">Complete Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={taskEntity.completeDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="taskinatorApp.task.parentTask">Parent Task</Translate>
          </dt>
          <dd>{taskEntity.parentTask ? taskEntity.parentTask.name : ''}</dd>
          <dt>
            <Translate contentKey="taskinatorApp.task.boardColumn">Board Column</Translate>
          </dt>
          <dd>{taskEntity.boardColumn ? taskEntity.boardColumn.name : ''}</dd>
          <dt>
            <Translate contentKey="taskinatorApp.task.applicationUser">Application User</Translate>
          </dt>
          <dd>{taskEntity.applicationUser && taskEntity.applicationUser.user ?
            taskEntity.applicationUser.user.firstName + ' ' + taskEntity.applicationUser.user.lastName : ''}
          </dd>
        </dl>
        <Button tag={Link} to="/task" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/task/${taskEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ task }: IRootState) => ({
  taskEntity: task.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);
