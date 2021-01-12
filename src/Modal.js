import React from "react";
import { useGlobalContext } from "./context";
const Modal = () => {
  const { correctAnswers, questions, dispatch } = useGlobalContext();
  const percentage = ((correctAnswers / questions.length) * 100).toFixed(0);
  return (
    <>
      <div
        className="h-screen w-screen fixed top-0 left-0 flex justify-center items-center z-10"
        style={{ backgroundColor: `#000000a6` }}
      >
        <div className="bg-white font-bold p-6 rounded shadow-xl text-4xl text-gray-800">
          <h1>Congratulations!</h1>
          <h3 className="font-normal mt-5 text-2xl text-center">
            You scored {percentage}%
          </h3>
          <button
            className="bg-yellow-500 font-semibold mt-4 p-2 rounded text-gray-800 text-xl w-full"
            onClick={() =>
              dispatch({
                type: "PLAY_AGAIN",
                payload: { waiting: true, modal: false },
              })
            }
          >
            Play Again
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
