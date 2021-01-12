import Loading from "./Loading";
import Modal from "./Modal";
import SetupForm from "./SetupForm";
import { useGlobalContext } from "./context";

function App() {
  const {
    loading,
    waiting,
    questions,
    index,
    dispatch,
    isModal,
    correctAnswers,
  } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }
  if (waiting) {
    return <SetupForm />;
  } else {
    const { incorrect_answers, correct_answer, question } = questions[index];
    const options = [...incorrect_answers];
    let randomIndex = Math.floor(Math.random() * 4);
    if (randomIndex === 3) {
      options.push(correct_answer);
    } else {
      options.push(options[randomIndex]);
      options[randomIndex] = correct_answer;
    }
    return (
      <>
        {isModal && <Modal />}
        <article className="-translate-x-1/2 -translate-y-1/2 absolute bg-gray-50 left-1/2 md:w-2/3 px-10 py-10 rounded-lg shadow-2xl text-2xl top-1/2 transform w-full">
          <div>
            <h2
              className="font-bold text-3xl text-gray-800"
              dangerouslySetInnerHTML={{ __html: question }}
            ></h2>
            <p className="absolute right-2 top-1 font-semibold  text-green-600 text-lg">
              Correctly Answered {correctAnswers}/{index}
            </p>
          </div>
          <div className="flex flex-col mt-9 space-y-3">
            {options.map((option, index) => {
              return (
                <button
                  key={index}
                  className="bg-blue-300 focus:outline-none font-bold hover:bg-blue-400 hover:text-blue-100 p-2 rounded text-blue-800 transition-colors "
                  dangerouslySetInnerHTML={{ __html: option }}
                  onClick={() => {
                    dispatch({
                      type: "CHECK_ANSWER",
                      payload: {
                        selectedOption: option,
                        correct_answer: correct_answer,
                      },
                    });
                    dispatch({ type: "NEXT_QUESTION" });
                  }}
                ></button>
              );
            })}
          </div>
          <button
            className="bg-yellow-600 flex focus:bg-yellow-500 focus:outline-none hover:bg-yellow-500 justify-end ml-auto mt-6 px-10 py-1 rounded text-center text-white transition-colors w-max"
            onClick={() => dispatch({ type: "NEXT_QUESTION" })}
          >
            Next Question
          </button>
        </article>
      </>
    );
  }
}
export default App;
