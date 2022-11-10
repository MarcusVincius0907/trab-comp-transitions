import Transition from "../models/transition";

const transitions: Transition[] = [
  {
    initialState: "0",
    finalState: "1",
    input: "a+",
    output: "x+",
  },
  {
    initialState: "1",
    finalState: "2",
    input: "b+",
    output: "y+",
  },
  {
    initialState: "2",
    finalState: "3",
    input: "c+",
    output: "z+",
  },
  {
    initialState: "3",
    finalState: "4",
    input: "a-",
    output: "x-",
  },
  {
    initialState: "4",
    finalState: "5",
    input: "b-",
    output: "y-",
  },
  {
    initialState: "5",
    finalState: "0",
    input: "c-",
    output: "z-",
  },
];

export { transitions };
