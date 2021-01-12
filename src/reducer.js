export const reducer = (state, action) => {
  switch (action.type) {
    case "SETUP_QUIZ":
      return {
        ...state,
        setup: {
          ...state.setup,
          [action.payload.attr]: action.payload.value,
        },
      };

    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_LOADING":
      return {
        ...state,
        waiting: action.payload.waiting,
        loading: action.payload.loading,
        correctAnswers: 0,
      };

    case "SET_QUESTIONS":
      return {
        ...state,
        questions: action.payload.questions,
        loading: action.payload.loading,
        error: action.payload.error,
        waiting: action.payload.waiting,
        index: action.payload.index,
      };
    case "QUESTION_NOT_FOUND":
      return {
        ...state,
        error: action.payload.error,
        waiting: action.payload.waiting,
        loading: action.payload.loading,
      };
    case "NEXT_QUESTION":
      let newIndex = state.index + 1;
      if (newIndex > state.questions.length - 1) {
        newIndex = 0;
        return { ...state, isModal: true, index: newIndex };
      } else {
        return {
          ...state,
          index: newIndex,
        };
      }
    case "CHECK_ANSWER":
      console.log("check answer called");
      let correctAnswers = state.correctAnswers;
      if (action.payload.selectedOption === action.payload.correct_answer) {
        console.log("correct Ans");
        correctAnswers = state.correctAnswers + 1;
      }
      return { ...state, correctAnswers: correctAnswers };

    case "PLAY_AGAIN":
      return {
        ...state,
        waiting: action.payload.waiting,
        isModal: action.payload.modal,
      };
    default:
      return state;
  }
};
