import { PICTURES_FETCH_SUCCESS, PICTURES_FETCH_REQUESTED, FETCH_FAILED } from './actions';

// @flow
const initialState = {
  pictures: [],
  isLoading: true,
  page: 1,
  hasMore: false,
  errorMessage: '',
}

export default function (state: any = initialState, action: Object) {
  const { payload, type } = action || {};
  
  switch (type) {
    case PICTURES_FETCH_SUCCESS:
      const { pictures: currentPictures } = state;
      const { pictures, page, hasMore } = payload || {};
      
      // Filter Pictures to update only if have no repeats
      const filterNewPictures = pictures.filter(({ id: newPicId }) => {
        const found = currentPictures.length > 0 && currentPictures.find(({id}) => {
          return id === newPicId;
        });
        return !(!!found);
      });
      const updatePictures = [ ...currentPictures, ...filterNewPictures];

      // uncomment this line and erase the above code to render duplicates.
      // const updatePictures = [ ...currentPictures, ...pictures];

      return {
        ...state,
        pictures: updatePictures,
        page,
        hasMore,
        isLoading: false,
      };
  
  case PICTURES_FETCH_REQUESTED:
    return {
      ...state,
      isLoading: true,
    };

  case FETCH_FAILED:
    const { errorMessage } = payload;
    return {
      ...state,
      errorMessage,
    };
  default:
    return state;
  }
}
