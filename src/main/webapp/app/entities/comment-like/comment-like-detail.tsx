import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './comment-like.reducer';
import { ICommentLike } from 'app/shared/model/comment-like.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommentLikeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CommentLikeDetail = (props: ICommentLikeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { commentLikeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="taskinatorApp.commentLike.detail.title">CommentLike</Translate> [<b>{commentLikeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <Translate contentKey="taskinatorApp.commentLike.comment">Comment</Translate>
          </dt>
          <dd>{commentLikeEntity.comment ? commentLikeEntity.comment.id : ''}</dd>
          <dt>
            <Translate contentKey="taskinatorApp.commentLike.applicationUser">Application User</Translate>
          </dt>
          <dd>{commentLikeEntity.applicationUser ? commentLikeEntity.applicationUser.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/comment-like" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/comment-like/${commentLikeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ commentLike }: IRootState) => ({
  commentLikeEntity: commentLike.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CommentLikeDetail);
