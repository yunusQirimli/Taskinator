/* eslint no-console: 0*/
import './board-detail.css';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
import {Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntity} from './board.reducer';

export interface IBoardDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

const BoardTask = props => {

  const task = props.task;

  return (
    <div className={"taskCard"} style={{borderColor: task.color.toLowerCase()}}>
      <Link to={`/task/${task.id}`}>
        {task.name}
      </Link>
    </div>
  )
};

const BoardColumn = props => {

  const boardColumn = props.boardColumn;

  return (
    <div className={`boardColumn ${boardColumn.name}`}>
      <h1 className="boardColumn__title">{boardColumn.name}</h1>
      <div className="boardColumn__taskList">
        {boardColumn.tasks && boardColumn.tasks.map((task) => (
          <BoardTask key={task.id} task={task}/>
        ))}
      </div>
    </div>
  )
};


export const BoardDetail = (props: IBoardDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const {boardEntity} = props;

  return (
    <Row className="justify-content-center">
      <Col md="8">
        <h2>
          <Translate
            contentKey="taskinatorApp.board.detail.title">Board</Translate> [<b>{boardEntity.name}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <Translate contentKey="taskinatorApp.board.applicationUser">Application User</Translate>
          </dt>
          <dd>{boardEntity.applicationUser && boardEntity.applicationUser.user ?
            boardEntity.applicationUser.user.firstName + ' ' + boardEntity.applicationUser.user.lastName : ''}
          </dd>
          <dt>
            <Translate contentKey="taskinatorApp.board.project">Project</Translate>
          </dt>
          <dd>{boardEntity.project ? boardEntity.project.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/board" replace color="info">
          <FontAwesomeIcon icon="arrow-left"/>{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/board/${boardEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt"/>{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
        <div className="parentBoard">
          <div className="board">
            {boardEntity.boardColumns &&
            boardEntity.boardColumns.map((boardColumn, i) => (
              <BoardColumn key={boardColumn.id} boardColumn={boardColumn}/>
            ))}
          </div>
        </div>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({board}: IRootState) => ({
  boardEntity: board.entity
});

const mapDispatchToProps = {getEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BoardDetail);
