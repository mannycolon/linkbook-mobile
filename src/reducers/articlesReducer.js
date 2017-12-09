import ActionTypes from '../actions/ActionTypes';

const INITIAL_STATE = {
  myArticles: {
    articles: [],
    isFetched: false,
    error: {
      on: false,
      message: '',
    },
  },
  publicArticles: {
    articles: [],
    isFetched: false,
    error: {
      on: false,
      message: '',
    },
  },
};

const articlesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${ActionTypes.FETCH_MY_ARTICLES}_PENDING`:
      return INITIAL_STATE;
    case `${ActionTypes.FETCH_MY_ARTICLES}_FULFILLED`:
      return {
        ...state,
        myArticles: {
          articles: action.payload,
          isFetched: true,
          error: {
            on: false,
            message: '',
          },
        },
      };
    case `${ActionTypes.FETCH_MY_ARTICLES}_REJECTED`:
      return {
        ...state,
        myMeetups: {
          articles: [],
          isFetched: true,
          error: {
            on: true,
            message: 'Error when fetching my articles',
          },
        },
      };
    case `${ActionTypes.FETCH_PUBLIC_ARTICLES}_PENDING`:
      return INITIAL_STATE;
    case `${ActionTypes.FETCH_PUBLIC_ARTICLES}_FULFILLED`:
      return {
        ...state,
        publicArticles: {
          articles: action.payload,
          isFetched: true,
          error: {
            on: false,
            message: '',
          },
        },
      };
    case `${ActionTypes.FETCH_PUBLIC_ARTICLES}_REJECTED`:
      return {
        ...state,
        publicArticles: {
          articles: [],
          isFetched: true,
          error: {
            on: true,
            message: 'Error when fetching my public articles',
          },
        },
      };
    case ActionTypes.LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default articlesReducer;
