// @flow
import { getPictureDetails } from '../../services/API'
import { FETCH_FAILED } from '../HomeContainer/actions'
import type { ActionWithPayload, ActionWithoutPayload } from '../../types/actions'

export const PICTURE_DETAILS_FETCH_REQUESTED = 'PICTURE_DETAILS_FETCH_REQUESTED'
export const PICTURE_DETAILS_FETCH_SUCCESS = 'PICTURE_DETAILS_FETCH_SUCCESS'

export function pictureIsLoading (): ActionWithoutPayload {
  return {
    type: PICTURE_DETAILS_FETCH_REQUESTED,
  }
}

export function fetchPictureSuccess (id: string, full_picture: string, author: string, camera: string): ActionWithPayload {
  return {
    type: PICTURE_DETAILS_FETCH_SUCCESS,
    payload: {
      id,
      full_picture,
      author,
      camera
    }
  }
}

export function fetchPictureFailed (errorMessage: string): ActionWithPayload {
  return {
    type: FETCH_FAILED,
    payload: {
      errorMessage,
    }
  }
}

export function fetchPictureDetails (imageId: string) {
  return async dispatch => {
    dispatch(pictureIsLoading());
    const response = await getPictureDetails(imageId);
    if (response.status === 200) {
      const { id, full_picture, author, camera } = response || {};
      dispatch(fetchPictureSuccess(id, full_picture, author, camera));
    } else {
      const { errorMessage } =  response || {};
      dispatch(fetchPictureFailed(errorMessage));
    }
  }
}
