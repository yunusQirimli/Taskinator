import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICommentLike, defaultValue } from 'app/shared/model/comment-like.model';

export const ACTION_TYPES = {
  FETCH_COMMENTLIKE_LIST: 'commentLike/FETCH_COMMENTLIKE_LIST',
  FETCH_COMMENTLIKE: 'commentLike/FETCH_COMMENTLIKE',
  CREATE_COMMENTLIKE: 'commentLike/CREATE_COMMENTLIKE',
  UPDATE_COMMENTLIKE: 'commentLike/UPDATE_COMMENTLIKE',
  DELETE_COMMENTLIKE: 'commentLike/DELETE_COMMENTLIKE',
  RESET: 'commentLike/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICommentLike>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CommentLikeState = Readonly<typeof initialState>;

// Reducer

export default (state: CommentLikeState = initialState, action): CommentLikeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COMMENTLIKE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COMMENTLIKE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COMMENTLIKE):
    case REQUEST(ACTION_TYPES.UPDATE_COMMENTLIKE):
    case REQUEST(ACTION_TYPES.DELETE_COMMENTLIKE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_COMMENTLIKE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COMMENTLIKE):
    case FAILURE(ACTION_TYPES.CREATE_COMMENTLIKE):
    case FAILURE(ACTION_TYPES.UPDATE_COMMENTLIKE):
    case FAILURE(ACTION_TYPES.DELETE_COMMENTLIKE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMMENTLIKE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMMENTLIKE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COMMENTLIKE):
    case SUCCESS(ACTION_TYPES.UPDATE_COMMENTLIKE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COMMENTLIKE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/comment-likes';

// Actions

export const getEntities: ICrudGetAllAction<ICommentLike> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COMMENTLIKE_LIST,
  payload: axios.get<ICommentLike>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICommentLike> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COMMENTLIKE,
    payload: axios.get<ICommentLike>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICommentLike> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COMMENTLIKE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICommentLike> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COMMENTLIKE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICommentLike> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COMMENTLIKE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
