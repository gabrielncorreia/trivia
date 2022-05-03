import actypes from '../actions/actionTypes';

const initialState = {
  numberOfQuestions: 5,
};

function configReducer(state = initialState, action) {
  switch (action.type) {
  case actypes.SET_NUMBER_OF_QUESTION:
    return {
      ...state,
      numberOfQuestions: action.numberOfQuestions,
    };
  default:
    return state;
  }
}

export default configReducer;
