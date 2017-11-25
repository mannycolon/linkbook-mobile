import ActionTypes from '../actions/ActionTypes';

const INITIAL_STATE = {
  myArticles: {
    articles: [],
    isFetched: false,
    error: {
      on: false,
      message: null,
    },
  },
};

const articlesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${ActionTypes.FETCH_MY_ARTICLES}_PENDING`:
      return INITIAL_STATE;
    case `${ActionTypes.FETCH_MY_ARTICLES}_FULFILLED`:
      return {
        myArticles: {
          articles: action.payload,
          isFetched: true,
          error: {
            on: false,
            message: null,
          },
        },
      };
    case `${ActionTypes.FETCH_MY_ARTICLES}_REJECTED`:
      return {
        myMeetups: {
          articles: [],
          isFetched: true,
          error: {
            on: true,
            message: 'Error when fetching my articles',
          },
        },
      };
    default:
      return state;
  }
};

export default articlesReducer;
