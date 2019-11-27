import { getPictures } from '../../services/API';
import type { ActionWithPayload, ActionWithoutPayload } from '../../types/actions';

export const PICTURES_FETCH_REQUESTED = 'PICTURES_FETCH_REQUESTED'
export const PICTURES_FETCH_SUCCESS = 'PICTURES_FETCH_SUCCESS'
export const FETCH_FAILED = 'FETCH_FAILED'

export function listIsLoading (): ActionWithoutPayload {
  return {
    type: PICTURES_FETCH_REQUESTED,
  }
}

export function fetchListSuccess (pictures: Array<Object>, page: number, hasMore: boolean): ActionWithPayload {
  return {
    type: PICTURES_FETCH_SUCCESS,
    payload: {
      pictures,
      page,
      hasMore,
    }
  }
}

export function fetchListFailed (errorMessage: string): ActionWithPayload {
  return {
    type: PICTURES_FETCH_REQUESTED,
    payload: {
      errorMessage,
    }
  }
}

export function fetchPictures (page: number = 1) {
  return async dispatch => {
    dispatch(listIsLoading());
    const response = await getPictures(page);
    if (response.status === 200) {
      const { pictures, page, hasMore } = response || {};
      dispatch(fetchListSuccess(pictures, page, hasMore));
    } else {
      const { errorMessage } =  response || {};
      dispatch(fetchListFailed(errorMessage));
    }
  }
}
