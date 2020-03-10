import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProjectState, defaultValue } from 'app/shared/model/project-state.model';

export const ACTION_TYPES = {
  FETCH_PROJECTSTATE_LIST: 'projectState/FETCH_PROJECTSTATE_LIST',
  FETCH_PROJECTSTATE: 'projectState/FETCH_PROJECTSTATE',
  CREATE_PROJECTSTATE: 'projectState/CREATE_PROJECTSTATE',
  UPDATE_PROJECTSTATE: 'projectState/UPDATE_PROJECTSTATE',
  DELETE_PROJECTSTATE: 'projectState/DELETE_PROJECTSTATE',
  RESET: 'projectState/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProjectState>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ProjectStateState = Readonly<typeof initialState>;

// Reducer

export default (state: ProjectStateState = initialState, action): ProjectStateState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROJECTSTATE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROJECTSTATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROJECTSTATE):
    case REQUEST(ACTION_TYPES.UPDATE_PROJECTSTATE):
    case REQUEST(ACTION_TYPES.DELETE_PROJECTSTATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROJECTSTATE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROJECTSTATE):
    case FAILURE(ACTION_TYPES.CREATE_PROJECTSTATE):
    case FAILURE(ACTION_TYPES.UPDATE_PROJECTSTATE):
    case FAILURE(ACTION_TYPES.DELETE_PROJECTSTATE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROJECTSTATE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROJECTSTATE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROJECTSTATE):
    case SUCCESS(ACTION_TYPES.UPDATE_PROJECTSTATE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROJECTSTATE):
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

const apiUrl = 'api/project-states';

// Actions

export const getEntities: ICrudGetAllAction<IProjectState> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PROJECTSTATE_LIST,
  payload: axios.get<IProjectState>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IProjectState> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROJECTSTATE,
    payload: axios.get<IProjectState>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProjectState> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROJECTSTATE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProjectState> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROJECTSTATE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProjectState> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROJECTSTATE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
