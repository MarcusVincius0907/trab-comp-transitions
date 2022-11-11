import Transition from "../models/transition";

const simple: Transition[] = [
  {
    initialState: 0,
    finalState: 1,
    input: "a+",
    output: "x+",
  },
  {
    initialState: 1,
    finalState: 2,
    input: "b+",
    output: "y+",
  },
  {
    initialState: 2,
    finalState: 3,
    input: "c+",
    output: "z+",
  },
  {
    initialState: 3,
    finalState: 4,
    input: "a-",
    output: "x-",
  },
  {
    initialState: 4,
    finalState: 5,
    input: "b-",
    output: "y-",
  },
  {
    initialState: 5,
    finalState: 0,
    input: "c-",
    output: "z-",
  },
];

const decision: Transition[] = [
  {
    initialState: 0,
    finalState: 1,
    input: "a+",
    output: "z+",
  },
  {
    initialState: 1,
    finalState: 2,
    input: "a-",
    output: "z-",
  },
  {
    initialState: 1,
    finalState: 3,
    input: "b+",
    output: "z-",
  },
  {
    initialState: 2,
    finalState: 4,
    input: "b+",
    output: "x+",
  },
  {
    initialState: 4,
    finalState: 0,
    input: "b-",
    output: "x-",
  },
  {
    initialState: 3,
    finalState: 5,
    input: "a-",
    output: "x+",
  },
  {
    initialState: 5,
    finalState: 0,
    input: "b-",
    output: "x-",
  },
]

export { simple, decision };
