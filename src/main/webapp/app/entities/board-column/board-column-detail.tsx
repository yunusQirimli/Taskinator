import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './board-column.reducer';
import { IBoardColumn } from 'app/shared/model/board-column.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBoardColumnDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BoardColumnDetail = (props: IBoardColumnDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { boardColumnEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="taskinatorApp.boardColumn.detail.title">BoardColumn</Translate> [<b>{boardColumnEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="taskinatorApp.boardColumn.name">Name</Translate>
            </span>
          </dt>
          <dd>{boardColumnEntity.name}</dd>
          <dt>
            <Translate contentKey="taskinatorApp.boardColumn.board">Board</Translate>
          </dt>
          <dd>{boardColumnEntity.board ? boardColumnEntity.board.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/board-column" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/board-column/${boardColumnEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ boardColumn }: IRootState) => ({
  boardColumnEntity: boardColumn.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BoardColumnDetail);
