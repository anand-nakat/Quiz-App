import React, { useContext, useReducer } from "react";
import axios from "axios";
import { reducer } from "./reducer";

const AppContext = React.createContext();
const categories = {
  sports: 21,
  mythology: 20,
  animals: 27,
  celebrities: 26,
  "entertainment-comics": 29,
  "science:computers": 18,
  "science:mathematics": 19,
};
const initialState = {
  loading: false,
  waiting: true,
  questions: [],
  index: 0,
  error: false,
  correctAnswers: 0,
  isModal: false,
  setup: {
    amount: 10,
    category: "sports",
    difficulty: "easy",
  },
};

const baseURL = `https://opentdb.com/api.php?`;
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    let url = `${baseURL}amount=${state.setup.amount}&category=${
      categories[state.setup.category]
    }&difficulty=${state.setup.difficulty}&type=multiple`;
    dispatch({
      type: "SET_LOADING",
      payload: { loading: true, waiting: false },
    });
    const response = await axios(url).catch((error) => console.log(error));

    if (response) {
      const data = response.data.results;
      console.log(data);
      if (data.length > 0) {
        dispatch({
          type: "SET_QUESTIONS",
          payload: {
            questions: data,
            waiting: false,
            loading: false,
            error: false,
            index: 0,
          },
        });
      } else {
        dispatch({
          type: "QUESTION_NOT_FOUND",
          payload: { error: true, waiting: true, loading: false },
        });
      }
    } else {
      dispatch({ type: "SET_ERROR", payload: true });
    }
  };

  const handleChange = (e) => {
    console.log(`${e.target.name}: ${e.target.value}`);
    dispatch({
      type: "SETUP_QUIZ",
      payload: { attr: e.target.name, value: e.target.value },
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };
  /*  useEffect(() => {
    
  }, []); */

  return (
    <AppContext.Provider
      value={{ ...state, dispatch, handleSubmit, handleChange }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
