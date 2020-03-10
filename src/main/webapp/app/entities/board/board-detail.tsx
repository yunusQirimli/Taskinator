import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './board.reducer';
import { IBoard } from 'app/shared/model/board.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBoardDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BoardDetail = (props: IBoardDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { boardEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="taskinatorApp.board.detail.title">Board</Translate> [<b>{boardEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="taskinatorApp.board.name">Name</Translate>
            </span>
          </dt>
          <dd>{boardEntity.name}</dd>
          <dt>
            <Translate contentKey="taskinatorApp.board.applicationUser">Application User</Translate>
          </dt>
          <dd>{boardEntity.applicationUser ? boardEntity.applicationUser.id : ''}</dd>
          <dt>
            <Translate contentKey="taskinatorApp.board.project">Project</Translate>
          </dt>
          <dd>{boardEntity.project ? boardEntity.project.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/board" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/board/${boardEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ board }: IRootState) => ({
  boardEntity: board.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BoardDetail);
