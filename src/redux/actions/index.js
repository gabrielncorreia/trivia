import actypes from './actionTypes';

const actions = {
  addNumberOfQuestions: (numberOfQuestions) => ({
    type: actypes.SET_NUMBER_OF_QUESTION,
    numberOfQuestions,
  }),

  saveQuestionsOnStore: (questions) => ({
    type: actypes.SAVE_QUESTIONS_ON_STORE,
    questions }),

  // addScore: (score) => ({
  //   type: actypes.ADD_SCORE,
  //   score,
  // }),
  addTimer: (timer) => ({
    type: actypes.ADD_TIMER,
    timer,
  }),

};
export default actions;
