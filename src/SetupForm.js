import React from "react";
import { useGlobalContext } from "./context";
const SetupForm = () => {
  const {
    handleSubmit,
    handleChange,
    error,
    setup: { amount, category, difficulty },
  } = useGlobalContext();

  return (
    <form
      className="bg-gray-50 font-bold rounded md:max-w-lg mx-auto my-36 p-4 shadow-2xl space-y-4 text-lg w-5/6"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h1 className="text-4xl font-semibold text-gray-800 mb-10">Quiz Setup</h1>
      <div className="form-control flex flex-col ">
        <label htmlFor="amount">No of Questions</label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={amount}
          min={5}
          max={50}
          className="bg-yellow-400 font-semibold px-4 py-2 rounded text-gray-800 focus:outline-none"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="form-control flex flex-col ">
        <label htmlFor="category">Select Category</label>
        <select
          name="category"
          id="category"
          value={category}
          className="bg-yellow-400 font-semibold px-4 py-2 rounded text-gray-800 focus:outline-none capitalize"
          onChange={(e) => handleChange(e)}
        >
          <option value="sports">Sports</option>
          <option value="mythology">Mythology</option>
          <option value="animals">Animals</option>
          <option value="entertainment-comics">Entertainment comics</option>
          <option value="celebrities">celebrities</option>
          <option value="science:computers">science: Computers</option>
          <option value="science:computers">science: Computers</option>
          <option value="science:mathematics">science: Mathematics</option>
        </select>
      </div>
      <div className="form-control flex flex-col ">
        <label htmlFor="difficulty">Select Difficulty</label>
        <select
          value={difficulty}
          name="difficulty"
          id="difficulty"
          className="bg-yellow-400 font-semibold px-4 py-2 rounded text-gray-800 focus:outline-none"
          onChange={(e) => handleChange(e)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      {error && (
        <div className="mt-2 text-red-500 text-lg p-2 font-semibold capitalize">
          Please select different Category or Difficulty
        </div>
      )}

      <button className="mt-4 p-3 w-full bg-blue-300 hover:bg-blue-400 hover:text-blue-100 transition-colors  text-blue-800 font-bold text-xl focus:outline-none">
        {" "}
        Start Quiz
      </button>
    </form>
  );
};

export default SetupForm;
