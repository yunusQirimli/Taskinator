import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProjectNote, defaultValue } from 'app/shared/model/project-note.model';

export const ACTION_TYPES = {
  FETCH_PROJECTNOTE_LIST: 'projectNote/FETCH_PROJECTNOTE_LIST',
  FETCH_PROJECTNOTE: 'projectNote/FETCH_PROJECTNOTE',
  CREATE_PROJECTNOTE: 'projectNote/CREATE_PROJECTNOTE',
  UPDATE_PROJECTNOTE: 'projectNote/UPDATE_PROJECTNOTE',
  DELETE_PROJECTNOTE: 'projectNote/DELETE_PROJECTNOTE',
  RESET: 'projectNote/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProjectNote>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ProjectNoteState = Readonly<typeof initialState>;

// Reducer

export default (state: ProjectNoteState = initialState, action): ProjectNoteState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROJECTNOTE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROJECTNOTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROJECTNOTE):
    case REQUEST(ACTION_TYPES.UPDATE_PROJECTNOTE):
    case REQUEST(ACTION_TYPES.DELETE_PROJECTNOTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROJECTNOTE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROJECTNOTE):
    case FAILURE(ACTION_TYPES.CREATE_PROJECTNOTE):
    case FAILURE(ACTION_TYPES.UPDATE_PROJECTNOTE):
    case FAILURE(ACTION_TYPES.DELETE_PROJECTNOTE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROJECTNOTE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROJECTNOTE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROJECTNOTE):
    case SUCCESS(ACTION_TYPES.UPDATE_PROJECTNOTE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROJECTNOTE):
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

const apiUrl = 'api/project-notes';

// Actions

export const getEntities: ICrudGetAllAction<IProjectNote> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PROJECTNOTE_LIST,
  payload: axios.get<IProjectNote>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IProjectNote> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROJECTNOTE,
    payload: axios.get<IProjectNote>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProjectNote> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROJECTNOTE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProjectNote> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROJECTNOTE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProjectNote> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROJECTNOTE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
