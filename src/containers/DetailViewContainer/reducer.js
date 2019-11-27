import { PICTURE_DETAILS_FETCH_REQUESTED, PICTURE_DETAILS_FETCH_SUCCESS } from './actions';

const initialState = {
  hiResPictures: [],
  isLoading: false,
}

export default function (state: any = initialState, action: Object) {
  const { payload, type } = action || {};
  
  switch (type) {
    case PICTURE_DETAILS_FETCH_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };

    case PICTURE_DETAILS_FETCH_SUCCESS:
      const { id, full_picture, author, camera } = payload || {};
      const { hiResPictures } = state || {};
      const updatePics = [
        ...hiResPictures,
        {
          id,
          full_picture,
          author,
          camera
        }
      ];
      return {
        hiResPictures: updatePics,
        isLoading: false,
      };
  
    default:
      return state;
  }
}
