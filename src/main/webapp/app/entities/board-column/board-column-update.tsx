import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IBoard } from 'app/shared/model/board.model';
import { getEntities as getBoards } from 'app/entities/board/board.reducer';
import { getEntity, updateEntity, createEntity, reset } from './board-column.reducer';
import { IBoardColumn } from 'app/shared/model/board-column.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBoardColumnUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BoardColumnUpdate = (props: IBoardColumnUpdateProps) => {
  const [boardId, setBoardId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { boardColumnEntity, boards, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/board-column');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getBoards();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...boardColumnEntity,
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
          <h2 id="taskinatorApp.boardColumn.home.createOrEditLabel">
            <Translate contentKey="taskinatorApp.boardColumn.home.createOrEditLabel">Create or edit a BoardColumn</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : boardColumnEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="board-column-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="board-column-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="board-column-name">
                  <Translate contentKey="taskinatorApp.boardColumn.name">Name</Translate>
                </Label>
                <AvField id="board-column-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label for="board-column-board">
                  <Translate contentKey="taskinatorApp.boardColumn.board">Board</Translate>
                </Label>
                <AvInput id="board-column-board" type="select" className="form-control" name="board.id">
                  <option value="" key="0" />
                  {boards
                    ? boards.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/board-column" replace color="info">
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
  boards: storeState.board.entities,
  boardColumnEntity: storeState.boardColumn.entity,
  loading: storeState.boardColumn.loading,
  updating: storeState.boardColumn.updating,
  updateSuccess: storeState.boardColumn.updateSuccess
});

const mapDispatchToProps = {
  getBoards,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BoardColumnUpdate);
